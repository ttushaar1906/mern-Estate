import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
export default function Profile() {
  const [file, setFile] = useState(undefined);
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [filePer, setFilePer] = useState(0);
  const [fileUploadErr, setFileUploadErr] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  console.log(formData);
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePer(Math.round(progress));
      },
      (error) => {
        setFileUploadErr(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async (e) => {
    try {
      dispatch(deleteUserStart);
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold py-7 text-center">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profilePic"
          className="h-24 object-cover w-24 rounded-full self-center mt-2 cursor-pointer"
        />
        <p className="self-center text-sm">
          {fileUploadErr ? (
            <span className="text-red700 font-semibold">
              Error while Uploading
            </span>
          ) : filePer > 0 && filePer < 100 ? (
            <span className="text-primary-color font-semibold">{`Uploading ${filePer}%`}</span>
          ) : filePer === 100 ? (
            <span className="text-green font-semibold">
              Image Uploaded Successfully!
            </span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          className="p-3 border mt-3 rounded-lg"
          id="username"
          defaultValue={currentUser.username}
          placeholder="username"
          onChange={handleChange}
        />
        <input
          type="email"
          className="p-3 border mt-3 rounded-lg"
          id="email"
          defaultValue={currentUser.email}
          placeholder="email"
          onChange={handleChange}
        />
        <input
          type="password"
          className="p-3 border mt-3 rounded-lg"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-secondary-color uppercase text-primary-color p-3 font-bold rounded-lg disabled:opacity-80 hover:opacity-95"
        >
          {loading ? "Loading...." : "Update"}
        </button>
      </form>
      <div className="flex justify-between p-2">
        <p
          onClick={handleDeleteUser}
          className="text-red font-medium cursor-pointer"
        >
          Delete account
        </p>
        <p className="text-red font-medium">Sign out</p>
      </div>
      {/* <p className="text-red700 mt-4">{error ? error : ""}</p> */}
      <p className="text-green">
        {updateSuccess ? "User Updated Successfully!" : ""}
      </p>
    </div>
  );
}
