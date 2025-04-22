import { NavLink } from "react-router-dom";
import Logo from "../images/logo.png";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `hover:text-[#2DA8BE] ${isActive ? "text-[#2DA8BE]" : ""}`;

  return (
    <div className="bg-gray-800 text-white">
      <div className="h-14 flex items-center justify-between px-4 relative">
        <div className="h-full">
          <img src={Logo} alt="Logo" className="h-full object-cover block" />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex gap-8 items-center">
          <NavLink to="/" className={navLinkClass}><li>HOME</li></NavLink>
          <NavLink to="/about" className={navLinkClass}><li>ABOUT US</li></NavLink>
          <NavLink to="/properties" className={navLinkClass}><li>Properties</li></NavLink>
          <NavLink to="/lorem2" className={navLinkClass}><li>LOREM</li></NavLink>
          <NavLink to="/contactUs" className={navLinkClass}><li>Contact Us</li></NavLink>
        </ul>

        {/* Hamburger Button */}
        <button className="sm:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu with animation */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col items-center bg-gray-800 p-3">
          <NavLink to="/" className={navLinkClass} onClick={() => setIsOpen(false)}><li className="py-2">HOME</li></NavLink>
          <NavLink to="/about" className={navLinkClass} onClick={() => setIsOpen(false)}><li className="py-2">ABOUT US</li></NavLink>
          <NavLink to="/lorem1" className={navLinkClass} onClick={() => setIsOpen(false)}><li className="py-2">LOREM</li></NavLink>
          <NavLink to="/lorem2" className={navLinkClass} onClick={() => setIsOpen(false)}><li className="py-2">LOREM</li></NavLink>
          <NavLink to="/lorem3" className={navLinkClass} onClick={() => setIsOpen(false)}><li className="py-2">LOREM</li></NavLink>
        </ul>
      </div>
    </div>
  );
}
