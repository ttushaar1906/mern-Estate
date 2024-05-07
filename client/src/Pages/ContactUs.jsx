import React, { useState } from "react";

export default function ContactUs() {
    const [error,setError] = useState(false)
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        mobileNo: "",
        msg: ""
      });
    const handleSubmit = async(e) =>{
        try {
            
        } catch (error) {
            setError(true)
        }
    }
  return (
    <div className="container justify-around">
      <div className="max-w-lg  w-full">
        <h1 className="text-primary-color text-3xl font-bold">Contact Us</h1>
        <form onSubmit={handleSubmit} className="flex gap-4 flex-col mt-4">
          <input
            type="text"
            placeholder="Enter Name"
            className="p-2 border rounded-md"
            name="userName"
            id="userName"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Enter email address"
            className="p-2 border rounded-md "
            name="email"
            id="email"
            onChange={handleChange}
          />
          <input
            type="tel"
            placeholder="Enter Mobile Number"
            className="p-2 border rounded-md "
            name="mobileNo"
            id="mobileNo"
            onChange={handleChange}
          />
          <textarea
            name="msg"
            id="msg"
            placeholder="Enter Query"
            className="border p-2 rounded-md"
            onChange={handleChange}
          ></textarea>
          <input
            type="button"
            value="Submit"
            className="bg-secondary-color text-primary-color mb-4 p-2 uppercase hover:opacity-90"
          />
        </form>
      </div>
      <div className="border object-cover">
        <img src="../src/assets/contactUs.png" alt="" />
      </div>
    </div>
  );
}
