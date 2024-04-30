import { Link } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state before the fetch call
    try {
      const res = await fetch("/api/auth/signUp", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
      } else {
        console.log(data); // Handle successful response here
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Reset loading state
      
    }
  };

  return (
    <div className="max-w-lg m-auto p-4 shadow-lg bg-gray-200 mt-4">
      <h1 className="text-center py-8 font-bold text-3xl">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
        <div className="flex gap-2">
          <p>Already have an account?</p>
          <Link to="/sign-in">
            <span className="text-primary-color font-bold">Sign In</span>
          </Link>
        </div>
        {error && <p className="text-red mt-4">{error}</p>}
      </form>
    </div>
  );
}
