import { AiOutlineMail, AiOutlinePhone, AiOutlineCalendar } from "react-icons/ai";

export default function UserDetail() {
  return (
    <div className=" bg-gray-50 rounded-lg shadow-md sm:flex sm:items-center ">
      <div className="m-2">
        <img src="" alt="" className="w-24 h-24 sm:w-50 sm:h-50 border rounded-full object-cover" />
      </div>
      <div className=" p-4 mb-2 leading-8 text-slate-600">
        <p className="mdHead">
          Tuhar Tharwani
        </p>
        <p className="text-slate-700 flex gap-2 items-center">
          <AiOutlineMail />
          tuhartharwani@gmail.com
        </p>
        <p className="text-slate-700 flex gap-2 items-center">
          <AiOutlineCalendar />
          Member Since: 19 June
        </p>
        <p className="text-slate-700 flex gap-2 items-center">
          <AiOutlinePhone />
          9527878712
        </p>
        <button className="buttonStyle mt-2">Edit User</button>
      </div>
    </div>
  )
}
