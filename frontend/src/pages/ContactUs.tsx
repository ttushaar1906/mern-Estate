import React, { useState } from 'react';
import { freqAskQues } from '../config/ContactUsConfig';
import { AiOutlineArrowDown, AiOutlineArrowUp, AiOutlineMail, AiOutlinePhone, AiOutlineEnvironment } from "react-icons/ai";
import { createInequery } from '../controllers/ContactUs/createInequery';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    fullName:"",
    email:"",
    mobileNo:"",
    propertyType:"",
    inquiresType:"",
    message:""
  })

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // Toggle FAQ item
  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleSubmit =  async(e: React.FormEvent)=>{
    e.preventDefault()
    try {
      const response = await createInequery(formData)

    } catch (error) {
      console.log(`error ${error}`); 
    }
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="lgHeading">Contact Us</h1>
          <p className="paraStyle">
            Have questions about buying, selling, or renting properties? Get in touch with our team of experts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="mdHead mb-6">Get In Touch</h2>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <AiOutlinePhone className="h-6 w-6 text-slate-700" />
                </div>
                <div className="ml-4">
                  <p className="text-slate-700 font-medium">Phone</p>
                  <p className="text-slate-600">(+91) 9527921209</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <AiOutlineMail className="h-6 w-6 text-slate-700" />
                </div>
                <div className="ml-4">
                  <p className="text-slate-700 font-medium">Email</p>
                  <p className="text-slate-600">tharwanitushar@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <AiOutlineEnvironment className="h-6 w-6 text-slate-700" />
                </div>
                <div className="ml-4">
                  <p className="text-slate-700 font-medium">Address</p>
                  <p className="text-slate-600">
                    123 Main Street, Suite 400<br />
                    Pune, India
                  </p>
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
                  <label htmlFor="name" className="block text-sm font-medium text-slate-600 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="inputFieldInfo"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-600 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="inputFieldInfo"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-600 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="inputFieldInfo"
                    placeholder="(123) 456-7890"
                  />
                </div>

                <div>
                  <label htmlFor="propertyType" className="block text-sm font-medium text-slate-600 mb-1">
                    Property Type
                  </label>
                  <select
                    id="propertyType"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="inputFieldInfo"
                  >
                    <option value="" disabled>Select Property Type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="industrial">Industrial</option>
                    <option value="land">Land</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  I'm interested in:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="interest"
                      value="buying"
                      checked={interest === 'buying'}
                      onChange={() => setInterest('buying')}
                      className="h-4 w-4"
                    />
                    <span className="ml-2 text-slate-600">Buying a property</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="interest"
                      value="selling"
                      checked={interest === 'selling'}
                      onChange={() => setInterest('selling')}
                      className="h-4 w-4"
                    />
                    <span className="ml-2 text-slate-600">Selling a property</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="interest"
                      value="renting"
                      checked={interest === 'renting'}
                      onChange={() => setInterest('renting')}
                      className="h-4 w-4"
                    />
                    <span className="ml-2 text-slate-600">Renting a property</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="interest"
                      value="other"
                      checked={interest === 'other'}
                      onChange={() => setInterest('other')}
                      className="h-4 w-4"
                    />
                    <span className="ml-2 text-slate-600">Other inquiries</span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-600 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="inputFieldInfo"
                  placeholder="How can we help you?"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="buttonStyle"
                >
                  Send Message
                </button>
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
                  <span className="text-lg font-medium text-slate-600 ">{item.question}</span>
                  {openFAQ === index ? (
                    <AiOutlineArrowUp className="h-5 w-5 text-slate-600" />
                  ) : (
                    <AiOutlineArrowDown className="h-5 w-5 text-slate-600" />
                  )}
                </button>

                {openFAQ === index && (
                  <div className="px-6 py-4 bg-gray-50 rounded-b-lg mt-1 text-slate-600 ">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
