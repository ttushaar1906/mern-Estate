import { useState } from "react";
import UserDetail from "../components/UserDetail";
import MyListing from "../components/MyListing";
import Inequires from "../components/Inequires";
import { useSelector } from "react-redux";
import LoginFirst from "../components/LoginFirst";
import { Link } from "react-router-dom";
import UpcomingHomeTours from "../components/UpcomingHomeTours";

export default function User() {

  const user = useSelector((state: any) => state.user.currentUser);
  const [activeTab, setActiveTab] = useState("myProperties");

  return (
    <div className="customeContainer">

      {!user ? (
        <div className=" block m-auto sm:w-[500px] text-center">
          <LoginFirst />
          <h1 className="text-xl font-semibold my-4">Please Login First to view Details</h1>
          <Link to="/signIn">
            <button className="bg-blue-500 text-white px-4 py-2 mb-6 rounded hover:bg-blue-600">
              Login
            </button>
          </Link>
        </div>
      ) : (
        <>
          <UserDetail />

          <div className="flex justify-center gap-4 items-center my-4 text-xl font-semibold">
            <button
              onClick={() => setActiveTab("myProperties")}
              className={`hover:text-cyan-600 cursor-pointer ${activeTab === "myProperties" ? "text-slate-700 font-bold underline" : ""
                }`}
            >
              My Properties
            </button>

            <button
              onClick={() => setActiveTab("inquiries")}
              className={`hover:text-cyan-600 cursor-pointer ${activeTab === "inquiries" ? "text-slate-700 font-bold underline" : ""
                }`}
            >
              Inquiries Sent
            </button>

            <button
              onClick={() => setActiveTab("tours")}
              className={`hover:text-cyan-600 cursor-pointer ${activeTab === "tours" ? "text-slate-700 font-bold underline" : ""
                }`}
            >
              Upcoming Home Tour's
            </button>
          </div>

          {activeTab === "myProperties" ? (
            <MyListing />
          ) : activeTab === "inquiries" ? (
            <Inequires />
          ) : (
            <UpcomingHomeTours />
          )}
        </>
      )}
    </div>
  );
}
