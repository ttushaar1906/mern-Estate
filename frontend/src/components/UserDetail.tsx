import { AiOutlineMail, AiOutlinePhone, AiOutlineCalendar } from "react-icons/ai";
import { useSelector } from "react-redux";
import LoginFirst from "./LoginFirst";
import { Link } from "react-router-dom";


export default function UserDetail() {


  const user = useSelector(state => state.currentUser);
  const userData = user?.data?.data;

  if (!userData) {
    return (
      <div className="mt-[35%] sm:mt-8 block m-auto sm:w-[500px] sm:h-[500px]">
        <LoginFirst />
        <h1>Please Login First to view Details</h1>
        <Link to = "/signIn">
        <button>Login</button>
        </Link>

      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg shadow-md sm:flex sm:items-center mt-8 p-4">
      <div className="mx-auto sm:mx-4">
        <img
          src={userData.avatar}
          alt="User Avatar"
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border mx-auto"
        />
      </div>
      <div className="sm:ml-6 mt-4 sm:mt-0 text-slate-600">
        <p className="text-xl font-semibold text-slate-800">{userData.userName}</p>
        <p className="flex items-center gap-2 mt-2 text-slate-700">
          <AiOutlineMail />
          {userData.userEmail}
        </p>
        <p className="flex items-center gap-2 mt-1 text-slate-700">
          <AiOutlineCalendar />
          {userData.createdAt}
        </p>
        <p className="flex items-center gap-2 mt-1 text-slate-700">
          <AiOutlinePhone />
          {userData.mobileNo}
        </p>
        <button className="buttonStyle mt-3">Edit User</button>
      </div>
    </div>
  );
}
