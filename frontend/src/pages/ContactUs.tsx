import React, { useState } from 'react';
import { freqAskQues } from '../config/ContactUsConfig';
import {
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineEnvironment,
} from "react-icons/ai";
import { createInequery } from '../controllers/ContactUs/createInequery';
import { ContactUsInt } from '../interfaces/ContactUsInt';
import CircularProgress from '@mui/material/CircularProgress';
import Notification from '../components/Notification';

export default function ContactUs() {
  const [formData, setFormData] = useState<ContactUsInt>({
    fullName: "",
    email: "",
    mobileNo: "",
    propertyType: "",
    inquiresType: "",
    message: ""
  });
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [snackBar, setSnackBar] = useState({
    open: false,
    severity: "",
    message: "",
    autoHideDuration:3000
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await createInequery(formData);
      console.log("Response:", response);
      setFormData({
        fullName: "",
        email: "",
        mobileNo: "",
        propertyType: "",
        inquiresType: "",
        message: ""
      });
      setSnackBar({
        open: true,
        severity: "success",
        message: "Inquiry Sent Successfully",
        autoHideDuration:3000
      });
    } catch (error) {
      // console.error("Error:", error);
      console.log(error.response.data.message);
      
      setSnackBar({
        open: true,
        severity: "error",
        message: `${error.response.data.message}`,
        autoHideDuration:3000
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="lgHeading">Contact Us</h1>
          <p className="paraStyle">
            Have questions about buying, selling, or renting properties? Get in touch with our team of experts.
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 text-center lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="mdHead mb-6">Get In Touch</h2>
            <div className="space-y-6 flex items-center justify-evenly gap-4 lg:block">
              <div className="flex items-center">
                <AiOutlinePhone className="h-6 w-6 text-slate-700" />
                <div className="ml-4 text-left">
                  <p className="text-slate-700 font-medium">Phone</p>
                  <p className="text-slate-600">(+91) 9527921209</p>
                </div>
              </div>
              <div className="flex items-center">
                <AiOutlineMail className="h-6 w-6 text-slate-700" />
                <div className="ml-4 text-left">
                  <p className="text-slate-700 font-medium">Email</p>
                  <p className="text-slate-600">tharwanitushar@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center">
                <AiOutlineEnvironment className="h-6 w-6 text-slate-700" />
                <div className="ml-4 text-left">
                  <p className="text-slate-700 font-medium">Address</p>
                  <p className="text-slate-600">123 Main Street, Suite 400<br />Pune, India</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Office Hours</h3>
              <div className="text-sm text-slate-600">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
            <h2 className="mdHead mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="labelStyleCont">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="inputFieldInfo"
                    placeholder='Enter Full Name'
                    required
                  />
                </div>
                <div>
                  <label className="labelStyleCont">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="inputFieldInfo"
                    placeholder='Enter Email'
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="labelStyleCont">Mobile No</label>
                  <input
                    type="number"
                    name="mobileNo"
                    value={formData.mobileNo}
                    onChange={handleChange}
                    className="inputFieldInfo"
                    placeholder='Enter Mobile No'
                    required
                  />
                </div>
                <div>
                  <label className="labelStyleCont">Property Type</label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="inputFieldInfo w-full"
                  >
                    <option value="" disabled>Select Property Type</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Land">Land</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="labelStyleCont pb-1">Inquiry Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {["Buying", "Selling", "Renting", "Other"].map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="radio"
                        name="inquiresType"
                        value={type}
                        checked={formData.inquiresType === type}
                        onChange={handleChange}
                        className="h-4 w-4"
                      />
                      <span className="ml-2 text-slate-600 capitalize">{type} a property</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="labelStyleCont pb-1">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="inputFieldInfo"
                  placeholder="How can we help you?"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end">
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <button type="submit" className="buttonStyle">
                    Send Message
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8">
          <h2 className="lgHeading">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            {freqAskQues.map((item, index) => (
              <div key={index} className="mb-4">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full px-6 py-4 text-left bg-white rounded-lg shadow-sm hover:shadow-md transition duration-200"
                >
                  <span className="text-lg font-medium text-slate-600">{item.question}</span>
                  {openFAQ === index ? (
                    <AiOutlineArrowUp className="h-5 w-5 text-slate-600" />
                  ) : (
                    <AiOutlineArrowDown className="h-5 w-5 text-slate-600" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="px-6 py-4 text-slate-600">{item.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Show Notification */}
      {snackBar.open && (
        <Notification
          open={snackBar.open}
          severity={snackBar.severity}
          message={snackBar.message}
          onClose={() => setSnackBar({ ...snackBar, open: false })}
          autoHideDuration={snackBar.autoHideDuration}
        />
      )}
    </div>
  );
}
