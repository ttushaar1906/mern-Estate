// ! Add redux for google Login add snackbar and username in backend

import { AiFillGoogleCircle } from 'react-icons/ai';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import axios from 'axios';
import { googleLogin } from '../apis/userAPI';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/User/userSlice";
import { useState } from 'react';
import { SnackBarState } from '../interfaces/NotificationInt';
import Notification from './Notification';

export default function GoogleLogin() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [snackBar, setSnackBar] = useState<SnackBarState>({
    open: false,
    severity: "info",
    message: "",
    autoHideDuration: 3000,
  });

  const handleGoogleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user;

      const idToken = await user.getIdToken();

      // ✅ Send token and user data to your backend
      const response = await axios.post(googleLogin, {
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
        token: idToken,
      }, { withCredentials: true });
      dispatch(signInSuccess(response.data.data))
      setTimeout(() => {
        navigate("/")
      }, 3000)
      setSnackBar({
        open: true,
        severity: "success",
        message: `${response.data.message}`,
        autoHideDuration: 3000
      })
    } catch (error: any) {
      console.error("Google Sign-In Error:", error?.message || error);      
      setSnackBar({
        open: true,
        severity: "error",
        message: error.response.data || `Failed to signup with google account`,
        autoHideDuration: 3000
      })
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex border w-[75%] hover:scale-x-105 rounded-xl mt-2 darkColor items-center p-4 gap-2 justify-center hover:cursor-pointer hover:shadow-md">
      <AiFillGoogleCircle size={20} />
      <p>
        Continue with Google
      </p>
      {snackBar.open && (
        <Notification
          open={snackBar.open}
          severity={snackBar.severity}
          message={snackBar.message}
          onClose={() => setSnackBar({ ...snackBar, open: false })}
          autoHideDuration={snackBar.autoHideDuration}
        />
      )}
    </button>
  )
}
