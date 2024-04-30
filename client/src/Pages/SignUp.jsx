import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="max-w-lg m-auto p-4 shadow-lg bg-grey mt-4">
      <h1 className="text-center py-8 font-bold text-3xl">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter Username"
          className="p-2 border rounded-md"
          id="username"
        />
        <input
          type="email"
          placeholder="Enter Email"
          className="p-2 border rounded-md"
          id="email"
        />
        <input
          type="password"
          placeholder="Enter Password"
          className="p-2 border rounded-md"
          id="password"
        />
        <button className="p-2 border uppercase rounded-md font-bold bg-third-color text-primary-color hover:bg-secondary-color hover:text-white">
          Sign Up
        </button>
        <div className="flex gap-2">
          <p>Already have an account?</p>
          <Link to="/sign-in"><span className="text-primary-color font-bold">Sign In</span></Link>
        </div>
      </form>
    </div>
  );
}
