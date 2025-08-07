import { AiOutlineMail, AiOutlinePhone, AiOutlineCalendar, AiOutlineEdit, AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
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
      }, 1000);

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
    { label: "Username", name: "userName", type: "text", value: `${formData.userName}`, icon: AiOutlineUser },
    { label: "Mobile No", name: "mobileNo", type: "tel", value: `${formData.mobileNo}`, icon: AiOutlinePhone },
    // { label: "Preferred Location", name: "preferencedLocation", type: "text", value: `${formData.preferencedLocation}`, icon: AiOutlineEnvironment },
  ];

  const profileStats = [
    { label: "Email", value: user?.userEmail, icon: AiOutlineMail, color: "text-blue-500" },
    { label: "Mobile", value: user?.mobileNo || "Not provided", icon: AiOutlinePhone, color: "text-green-500" },
    { label: "Member Since", value: new Date(user?.createdAt).toLocaleDateString(), icon: AiOutlineCalendar, color: "text-orange-500" },
  ];

  return (
    <div className="min-h-screen customeContainer p-4 sm:p-6 lg:p-8">
      <div className="mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 rounded-2xl shadow-xl p-6 sm:p-8 mb-8 text-white">
          <div className="flex flex-col items-center space-y-6">
            {/* Avatar Section */}
            <div className="relative">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full p-1 shadow-2xl">
                <img
                  src={avatar}
                  alt="User Avatar"
                  className="w-full h-full rounded-full object-cove"
                />
              </div>
              <div className="absolute -bottom-0 -right-0 bg-green-500 w-8 h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>

            {/* User Name */}
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-bold mb-2 darkColor">
                {user?.userName}
              </h1>
              <p className="text-slate-300 text-lg">Active User</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={handleOpen}
                className="flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl transform hover:scale-105 transition-all duration-200 shadow-lg"
                style={{ backgroundColor: "#2da8be" }}
              >
                <AiOutlineEdit className="text-lg" />
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-3 cancelButtonStyle text-white font-semibold rounded-xl duration-200 shadow-lg transform hover:scale-105 transition-all"
              >
                <AiOutlineLogout className="text-lg" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Profile Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 mb-8">
          {profileStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-gradient-to-b from-yellow-400 to-orange-500"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-slate-50 ${stat.color}`}>
                  <stat.icon className="text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                    {stat.label}
                  </p>
                  <p className="text-lg font-semibold text-slate-700 mt-1 break-words">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h3 className="text-xl font-bold text-slate-700 mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded"></div>
            Account Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-4 py-2 border-b border-slate-100 ">
              <p className="text-slate-500">Account Status:</p>
              <p className="font-semibold text-green-600">Active</p>
            </div>
            <div className="flex items-center gap-4 py-2 border-b border-slate-100">
              <p className="text-slate-500">Profile Complete:</p>
              <p className="font-semibold text-slate-700">
                {user?.mobileNo && user?.userEmail ? '100%' : '75%'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 m-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-700 mb-2">Edit Profile</h2>
            <p className="text-slate-500">Update your profile information</p>
          </div>

          <form onSubmit={handleUpdate} className="space-y-6">
            {/* Avatar Upload Section */}
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 p-1 shadow-lg">
                  <img
                    src={formData?.avatar || user?.avatar}
                    alt="Avatar Preview"
                    className="w-full h-full rounded-full object-cover bg-white"
                  />
                </div>
                <label className="absolute -bottom-2 -right-2 bg-slate-700 hover:bg-slate-800 text-white p-2 rounded-full cursor-pointer shadow-lg transition-colors duration-200">
                  <AiOutlineEdit className="text-sm" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    placeholder="update image"
                  />
                </label>
              </div>
              <p className="text-sm text-slate-500">Click the edit icon to update your avatar</p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {details.map((detail) => (
                <div key={detail.name} className="relative">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <detail.icon className="inline mr-2 text-slate-500" />
                    {detail.label}
                  </label>
                  <input
                    type={detail.type}
                    name={detail.name}
                    value={detail.value}
                    onChange={handleChange}
                    placeholder={`Enter your ${detail.label.toLowerCase()}`}
                    className="w-full border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
                  />
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              {isLoading ? (
                <div className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-semibold py-3 px-6 rounded-xl flex items-center justify-center">
                  <CircularProgress color="inherit" size={20} className="mr-2" />
                  Updating...
                </div>
              ) : (
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-slate-900 font-semibold py-3 px-6 rounded-xl transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Update Profile
                </button>
              )}
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Dialog>

      {/* Notification */}
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
  );
}