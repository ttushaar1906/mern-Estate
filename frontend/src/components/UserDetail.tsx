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
import userAvatar from "../images/userAvatar.png"
import CityPreference from "./CityPreference";

export default function UserDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [snackBar, setSnackBar] = useState<SnackBarState>({
    open: false,
    severity: "info",
    message: "",
    autoHideDuration: 3000,
  });

  const user = useSelector((state: any) => state.user.currentUser);
  const avatar = user?.avatar || userAvatar;
  
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    userName: user?.userName || "",
    userEmail: user?.userEmail || "",
    mobileNo: user?.mobileNo || "",
    avatar: user?.avatar || "",
    preferencedLocation: user?.preferencedLocation || ""
  });
  const [isLoading, setLoading] = useState<boolean>(false);

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
      await updateUserFn(formData);
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
    { label: "Prefered Location", name: "preferencedLocation", type: "text", value: `${formData.preferencedLocation}` }, 
  ];

  return (
  <section className="bg-white rounded-xl mt-10 shadow-sm transition hover:shadow-xl p-4">
  <div className="flex flex-col lg:flex-row gap-6">
    {/* Left Section: Profile Info */}
    <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start w-full lg:w-1/2">
      <img
        src={avatar}
        alt="User Avatar"
        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border shadow-md"
      />

      <div className="w-full sm:w-auto">
        <p className="text-2xl font-bold text-slate-700 text-center sm:text-left">
          {user?.userName}
        </p>

        <div className="mt-3 space-y-1 text-sm sm:text-base">
          <div className="flex items-center gap-2">
            <AiOutlineMail className="text-blue-500" />
            <span className="text-slate-600 break-all">{user?.userEmail}</span>
          </div>
          <div className="flex items-center gap-2">
            <AiOutlinePhone className="text-pink-500" />
            <span className="text-slate-600">{user?.mobileNo || "-"}</span>
          </div>
          <div className="flex items-center gap-2">
            <AiOutlineCalendar className="text-green-500" />
            <span className="text-slate-600">
              {new Date(user?.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 justify-center sm:justify-start">
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
    </div>

    {/* Right Section: City Preference */}
    <div className="w-full lg:w-1/2">
      <CityPreference />
    </div>
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
          placeholder="image"
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
            placeholder={`Enter user's ${detail?.name ?? 'detail'}`}
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
</section>


  );
}
