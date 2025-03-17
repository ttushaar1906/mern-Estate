import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    } 
  };
  return (
    <div className="container flex-col mt-0 sm:flex-row sm:mt-24 shadow-lg">
      <div className=" w-full sm:w-1/2 order-2 sm:order-1 shadow-sm">
        <img src="https://i.postimg.cc/hG659PJk/image.png" alt="signUpImg" className="w-full object-cover bg-no-repeat block m-auto" />
      </div>
      <div className="max-w-lg p-2 bg-grey w-full sm:w-1/2 sm:order-2 shadow-md ">
        <h1 className="text-center py-6 font-bold text-3xl">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <input
            type="text"
            placeholder="Enter Username"
            className="p-2 border rounded-md"
            id="username"
            onChange={handleChange}
          />
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
            {loading ? "Loading...." : "Sign Up"}
          </button>
          <OAuth />
          <div className="flex gap-2">
            <p>Already have an account?</p>
            <Link to="/sign-in">
              <span className="text-primary-color font-bold">Sign In</span>
            </Link>
          </div>
          {error && <p className="text-red mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
}
