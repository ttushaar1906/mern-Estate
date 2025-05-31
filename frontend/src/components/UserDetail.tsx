import { AiOutlineMail, AiOutlinePhone, AiOutlineCalendar } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import LoginFirst from "./LoginFirst";
import { SnackBarState } from "../interfaces/NotificationInt";
import Notification from "../components/Notification";
import axios from "axios";
import { logoutUser } from "../apis/userAPI";
import { signOutUserSuccess } from "../redux/User/userSlice";

// Assuming you have a logout action
// import { logout } from "../redux/userSlice";

export default function UserDetail() {
  const [snackBar, setSnackBar] = useState<SnackBarState>({
    open: false,
    severity: "info",
    message: "",
    autoHideDuration: 3000
  });
  const navigate = useNavigate()
  const user = useSelector((state: any) => state.currentUser);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    userName: user?.userName || "",
    userEmail: user?.userEmail || "",
    mobileNo: user?.mobileNo || "",
  });

  if (!user) {
    return (
      <div className="mt-[35%] sm:mt-8 block m-auto sm:w-[500px] sm:h-[500px] text-center">
        <LoginFirst />
        <h1 className="text-xl font-semibold my-4">Please Login First to view Details</h1>
        <Link to="/signIn">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Login
          </button>
        </Link>
      </div>
    );
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogout = async () => {
    try {
      const response = await axios.get(logoutUser, { withCredentials: true })
      setSnackBar({
        open: true,
        severity: "success",
        message: "User Logged out successfully",
        autoHideDuration: 3000
      });
      dispatch(signOutUserSuccess(response))
      setTimeout(() => {
        navigate("/")
      }, 1000)

    } catch (error) {
      console.log("Failed to Logout!!", error);
      setSnackBar({
        open: true,
        severity: "error",
        message: `Failed to Logout !!`,
        autoHideDuration: 3000
      })
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    // Save logic here (e.g. API call)
    console.log("Saving user:", formData);
    handleClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-md sm:flex sm:items-center mt-10 p-6 max-w-3xl mx-auto">
      <div className="sm:mx-6">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border"
        />
      </div>
      <div className="sm:ml-8 mt-6 sm:mt-0 text-gray-700 w-full">
        <p className="text-2xl font-bold text-gray-900">{user.userName}</p>
        <p className="flex items-center gap-2 mt-2">
          <AiOutlineMail />
          {user.userEmail}
        </p>
        <p className="flex items-center gap-2 mt-1">
          <AiOutlineCalendar />
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
        <p className="flex items-center gap-2 mt-1">
          <AiOutlinePhone />
          {user.mobileNo}
        </p>
        <div className="mt-4 flex gap-4">
          <button
            onClick={handleOpen}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit User
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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

      {/* Edit User Modal */}
      <Dialog open={open} onClose={handleClose} className="border-2 border-red-400">
        <div className="border-2 border-yellow-900 w-[450px] h-[1000px]">


          <DialogTitle>Edit User Details</DialogTitle>
          <DialogContent className="flex flex-col gap-4 mt-2 border-2 border-yellow-900">
            <div
              label="Name"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
            // fullWidth
            />
            <div
              label="Email"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleChange}
            // fullWidth
            />
            <TextField
              label="Mobile"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="inherit">
              Cancel
            </Button>
            <Button onClick={handleSave} variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </div>
      </Dialog>


    </div>

  );
}

