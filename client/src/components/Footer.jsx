import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaGoogle,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaEnvelope,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const checkedPath = ["/sign-in", "/sign-up"];
  const unAbledFooter = checkedPath.includes(location.pathname);

  return (
    <div>
      {!unAbledFooter && (
        <>
          <img
            src="../src/assets/footerBg.png"
            alt=""
            className="w-full h-[770px] object-cover md:h-[90%]"
            style={{ position: "absolute" }}
          />
          <div className="top-36 sm:top-38 md:top-40" style={{ position: "relative" }}>
            <div className="container justify-between">
              <h1 className="block mx-auto sm:mx-0 text-base sm:text-3xl font-bold text-primary-color">
                Tushar<span className="text-white">Estate</span>
                <span className="text-xs text-white sm:text-sm font-semibold">
                  / Simply #1 Real Estate Platform
                </span>
              </h1>
              <ul className="flex justify-center gap-4 align-middle m-auto sm:justify-between sm:m-0 ">
                <li className="text-white p-2 m-auto sm:text-lg cursor-pointer">
                  <FaFacebook />
                </li>
                <li className="text-white p-2 m-auto sm:text-lg cursor-pointer">
                  <a href="https://www.instagram.com/_tushaar_19/">
                    <FaInstagram />
                  </a>
                </li>
                <li className="text-white p-2 m-auto sm:text-lg cursor-pointer">
                  <FaGoogle />
                </li>
                <li className="text-white p-2 m-auto sm:text-lg cursor-pointer">
                  <a href="https://twitter.com/tushaar_19">
                    <FaTwitter />
                  </a>
                </li>
                <li className="text-white p-2 m-auto sm:text-lg cursor-pointer">
                  <a href="https://www.linkedin.com/in/tushar-tharwani-6527b5244/">
                    <FaLinkedinIn />
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="container justify-between sm:py-4">
              <div className="text-white my-4">
                <h1 className="font-bold text-primary-color p-2 text-lg sm:text-xl">
                  Quick Links
                </h1>
                <div className="flex flex-col gap-4 px-4 sm:px-2">
                  <div className="font-semibold hover:opacity-90">
                    <Link to="/">Home</Link>
                  </div>
                  <div className="font-semibold hover:opacity-90">
                    <Link to="about">About Us</Link>
                  </div>
                  <div className="font-semibold hover:opacity-90">
                    <Link to="/">Contact Us</Link>
                  </div>
                </div>
              </div>
              <div className="text-white sm:my-4">
                <h1 className="font-bold text-primary-color p-2 text-lg sm:text-xl">
                  Contact Us
                </h1>
                <div className="flex flex-col gap-4 px-4 sm:px-2">
                  <div className="">
                    <FaMapMarkerAlt className="inline m-auto" /> 1945 Grand Ave
                    Chandani Street Pune-17
                  </div>
                  <div className="">
                    <FaWhatsapp className="inline m-auto" /> 9527921209
                  </div>
                  <div className="">
                    <FaEnvelope className="inline m-auto" />{" "}
                    ttushaar45@gmail.com
                  </div>
                </div>
              </div>

              <div className="text-white my-4">
                <h1 className="font-bold text-primary-color p-2 text-lg sm:text-xl">
                  Remain Updated
                </h1>
                <form className="px-4 sm:px-2 flex gap-2 sm:flex-col">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="p-2"
                  />
                  <input
                    type="button"
                    value="Submit"
                    className="bg-primary-color p-2 mt-4 w-1/2 font-semibold hover:opacity-95 cursor-pointer"
                  />
                </form>
              </div>
            </div>

            {/* Footer 3 */}
            <div className="container justify-between sm:pt-4">
              <p className="mt-4">
                <span className="text-primary-color font-semibold text-xl">
                  Tushar
                </span>
                <span className="text-white">
                  Estate &copy; 2024, All Rights Reserve
                </span>
              </p>

              <p className="mt-4 text-white font-semibold">
                Design & code by
                <span className="text-primary-color font-bold">
                  Tushar Tharwani
                </span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
