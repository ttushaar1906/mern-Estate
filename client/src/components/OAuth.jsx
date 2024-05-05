import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import {useDispatch} from 'react-redux'
import {signInSuccess} from '../redux/user/userSlice'

export default function OAuth() {
  const dispatech = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch("api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatech(signInSuccess(data))
    } catch (error) {
      console.log("Could Not Sign in with Google", error);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="p-2 border uppercase rounded-md font-bold bg-red700 text-white hover:bg-red hover:text-white"
    >
      Continue with google
    </button>
  );
}
