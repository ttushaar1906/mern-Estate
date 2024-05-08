import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const [file, setFile] = useState(undefined);
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [filePer, setFilePer] = useState(0);
  const [fileUploadErr, setFileUploadErr] = useState(false);
  const [formData, setFormData] = useState({});

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

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold py-7 text-center">Profile</h1>
      <form className="flex flex-col gap-4">
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
            <span className="text-red700 font-semibold">Error while Uploading</span>
          ) : filePer > 0 && filePer < 100 ? (
            <span className="text-primary-color font-semibold">{`Uploading ${filePer}%`}</span>
          ) : filePer === 100 ? (
            <span className="text-green font-semibold">Image Uploaded Successfully!</span>
          ) : (
            ''
          )}
        </p>
        <input
          type="text"
          className="p-4 border mt-4 rounded-lg"
          id="username"
          placeholder="username"
        />
        <input
          type="email"
          className="p-4 border mt-4 rounded-lg"
          id="email"
          placeholder="email"
        />
        <input
          type="password"
          className="p-4 border mt-4 rounded-lg"
          id="password"
          placeholder="password"
        />
        <button className="bg-secondary-color uppercase text-primary-color p-4 font-bold rounded-lg disabled:opacity-80 hover:opacity-95">
          Update
        </button>
      </form>
      <div className="flex justify-between p-2">
        <p className="text-red font-medium">Delete account</p>
        <p className="text-red font-medium">Sign out</p>
      </div>
    </div>
  );
}
