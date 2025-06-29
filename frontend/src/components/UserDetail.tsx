import { AiOutlineMail, AiOutlinePhone, AiOutlineCalendar } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { SnackBarState } from "../interfaces/NotificationInt";
import Notification from "../components/Notification";
import axios from "axios";
import { logoutUser } from "../apis/userAPI";
import { signOutUserSuccess } from "../redux/User/userSlice";
import { updateUserFn } from "../controllers/Users/createUser";
import { CircularProgress } from "@mui/material";

export default function UserDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [snackBar, setSnackBar] = useState<SnackBarState>({
    open: false,
    severity: "info",
    message: "",
    autoHideDuration: 3000,
  });

  const user = useSelector((state: any) => state.currentUser);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    userName: user?.userName || "",
    userEmail: user?.userEmail || "",
    mobileNo: user?.mobileNo || "",
    avatar: user?.avatar || "",
  });
  const [isLoading, setLoading] = useState<boolean>(false);

  // if (!user) {
  //   return (
  //     <div className="mt-[35%] sm:mt-8 block m-auto sm:w-[500px] sm:h-[500px] text-center">
  //       <LoginFirst />
  //       <h1 className="text-xl font-semibold my-4">Please Login First to view Details</h1>
  //       <Link to="/signIn">
  //         <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
  //           Login
  //         </button>
  //       </Link>
  //     </div>
  //   );
  // }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogout = async () => {
    try {
      await axios.get(logoutUser, { withCredentials: true });
      setSnackBar({
        open: true,
        severity: "success",
        message: "User Logged out successfully",
        autoHideDuration: 3000,
      });

      dispatch(signOutUserSuccess());

      setTimeout(() => {
        navigate("/");
      }, 1000); // Wait for snackbar to fully show before navigating

    } catch (error) {
      console.log("Failed to Logout!!", error);
      setSnackBar({
        open: true,
        severity: "error",
        message: `Failed to Logout !!`,
        autoHideDuration: 3000,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await updateUserFn(formData);
      console.log("Success !!!", response);
      handleClose();
      setSnackBar({
        open: true,
        severity: "success",
        message: "User Updated successfully !!",
        autoHideDuration: 3000,
      });
    } catch (error: any) {
      console.log("Failed to Update User", error);
      setSnackBar({
        open: true,
        severity: "error",
        message: `Failed to update User: ${error.message}`,
        autoHideDuration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        avatar: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const details = [
    { label: "Username", name: "userName", type: "text", value: `${formData.userName}` },
    { label: "Mobile No", name: "mobileNo", type: "number", value: `${formData.mobileNo}` },
  ];

  return (
    <div className="bg-white rounded-xl gap-4 shadow-lg sm:flex sm:items-start mt-10 p-6 max-w-4xl mx-auto transition hover:shadow-xl">
      <div className="flex justify-center sm:justify-start">
        <img
          src={user?.avatar || "/default-avatar.png"}
          alt="User Avatar"
          className="w-32 h-32 rounded-full object-cover border shadow-md"
        />
      </div>

      <div className="sm:mt-0 p-4 w-full">
        <p className="text-2xl font-bold text-slate-700 text-center sm:text-left">
          {user?.userName}
        </p>

        <p className="flex items-center gap-2 mt-3 text-sm sm:text-base">
          <AiOutlineMail className="text-blue-500" />
          {user?.userEmail}
        </p>
        <p className="flex items-center gap-2 mt-1 text-sm sm:text-base">
          <AiOutlineCalendar className="text-green-500" />
          {new Date(user?.createdAt).toLocaleDateString()}
        </p>
        <p className="flex items-center gap-2 mt-1 text-sm sm:text-base">
          <AiOutlinePhone className="text-pink-500" />
          {user?.mobileNo}
        </p>

        <div className="mt-6 flex gap-4 flex-wrap">
          <button onClick={handleOpen} className="buttonStyle">
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 cancelButtonStyle"
          >
            Logout
          </button>
        </div>

        {snackBar.open && (
          <Notification
            open={snackBar.open}
            severity={snackBar.severity}
            message={snackBar.message}
            onClose={() => setSnackBar({ ...snackBar, open: false })}
            autoHideDuration={snackBar.autoHideDuration}
          />
        )}
      </div>

      {/* Edit Modal */}
      <Dialog open={open} onClose={handleClose}>
        <div className="bg-white w-[95vw] max-w-lg rounded-lg shadow-lg p-6 border border-gray-300 mx-auto">
          <h2 className="text-xl font-bold text-slate-700 mb-4 text-center">Edit Profile</h2>

          <div className="mb-4 text-center">
            <label className="block text-sm font-medium mb-2">Update Avatar</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block mx-auto border border-gray-300 rounded cursor-pointer p-2"
            />
          </div>

          <img
            src={formData?.avatar || user?.avatar}
            alt="Avatar Preview"
            className="w-24 h-24 rounded-full object-cover mx-auto shadow mb-6"
          />

          {details.map((detail) => (
            <div className="mb-4" key={detail.name}>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {detail.label}
              </label>
              <input
                type={detail.type}
                name={detail.name}
                value={detail.value}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          ))}

          <div className="flex justify-center gap-4 mt-6">
            {isLoading ? (
              <div className="buttonStyle text-center">
                <CircularProgress color="inherit" size={18} />
              </div>
            ) : (
              <button className="buttonStyle" onClick={handleUpdate}>
                Update
              </button>
            )}
            <button className="cancelButtonStyle" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
