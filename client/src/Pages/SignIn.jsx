import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="container flex-col item-center mt-0 sm:flex-row sm:mt-24 shadow-lg">
      <div className="w-full sm:w-1/2 order-1 sm:order-2 shadow-sm">
        <img
          src="https://i.postimg.cc/hG659PJk/image.png"
          alt="loginImg"
          className="w-full object-cover bg-no-repeat block m-auto"
        />
      </div>
      <div className="max-w-lg p-2 bg-grey w-full sm:w-1/2 sm:order-1">
        <h1 className="text-center py-6 font-bold text-3xl">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <input
            type="email"
            placeholder="Enter Email"
            className="p-2 border rounded-md"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="p-2 border rounded-md"
            id="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="p-2 border uppercase rounded-md font-bold bg-third-color text-primary-color hover:bg-secondary-color hover:text-white"
          >
            {loading ? "Loading...." : "Sign In"}
          </button>
          <OAuth />
          <div className="flex gap-2">
            <p>Don't have an account?</p>
            <Link to="/sign-up">
              <span className="text-primary-color font-bold">Sign Up</span>
            </Link>
          </div>
          {error && <p className="text-red mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
}
