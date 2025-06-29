import { NavLink } from "react-router-dom";
import Logo from "../images/logo.jpg";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import userAvatar from "../images/userAvatar.png"

export default function Navbar() {
 const user = useSelector((state: any) => state.currentUser);
 
  const avatar = user?.avatar || userAvatar;
    
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `hover:text-[#2DA8BE] ${isActive ? "text-[#2DA8BE] font-semibold" : "font-semibold"}`;

  
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
          <NavLink to="/contactUs" className={navLinkClass}><li>Contact Us</li></NavLink>
          {user === null ? (
  <NavLink to="/signIn" className={navLinkClass}>
    <li>Login</li>
  </NavLink>
) : (
  <NavLink to="/user" className={navLinkClass}>
    <li>
      <img
        src={avatar}
        alt="User Avatar"
        className="w-10 h-10 rounded-full object-cover"
      />
    </li>
  </NavLink>
)}
        </ul>

        {/* Hamburger Button */}
        <button className="sm:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu with animation */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px]" : "max-h-0"
          }`}
      >
        <ul className="flex flex-col items-center bg-gray-800 p-3">
          <NavLink to="/" className={navLinkClass} onClick={() => setIsOpen(false)}><li className="py-2">HOME</li></NavLink>
          <NavLink to="/about" className={navLinkClass} onClick={() => setIsOpen(false)}><li className="py-2">ABOUT US</li></NavLink>
          <NavLink to="/properties" className={navLinkClass} onClick={() => setIsOpen(false)}><li className="py-2">Properties</li></NavLink>
          <NavLink to="/contactUs" className={navLinkClass} onClick={() => setIsOpen(false)}><li className="py-2">Contact Us</li></NavLink>
          <NavLink to="/user" className={navLinkClass} onClick={() => setIsOpen(false)}><li className="py-2">User</li></NavLink>
        </ul>
      </div>
    </div>
  );
}
