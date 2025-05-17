import { useState } from "react";
import UserDetail from "../components/UserDetail";
import MyListing from "../components/MyListing";
import Inequires from "../components/Inequires";

export default function User() {
 
  const [myProperty, setMyProperty] = useState(true);

  return (
    <div className="customeContainer">
      <UserDetail />

      <div className="flex justify-center gap-4 items-center my-4 text-lg">
        <button
          onClick={() => setMyProperty(true)}
          className={`hover:text-cyan-600 cursor-pointer ${myProperty ? "text-slate-700 font-semibold underline" : ""}`}
        >
          My Properties
        </button>

        <button
          onClick={() => setMyProperty(false)}
          className={`hover:text-cyan-600 hover:cursor-pointer ${!myProperty ? "text-slate-700 font-semibold underline" : ""}`}
        >
          Inquiries Sent
        </button>
      </div>

      {myProperty ? <MyListing /> : <Inequires />}
    </div>
  );
}
