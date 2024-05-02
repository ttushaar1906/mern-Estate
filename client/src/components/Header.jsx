import { FaSearch } from "react-icons/fa";
import { Link , useLocation  } from "react-router-dom";
export default function Header() {
  const location = useLocation()
  const checkedPath = [
    '/sign-up',
    '/sign-in'
  ];
  const unAbledNavbar = checkedPath.includes(location.pathname)
  return (
    <header className="bg-secondary-color shadow-md">
      {!unAbledNavbar && (
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-primary-color">Tushar </span>
          <span className="text-white">Estate</span>
        </h1>
        <form className="bg-third-color rounded-lg flex items-center p-2">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-white focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-white" />
        </form>
        <ul className="flex gap-5">
          <Link to="/">
          <li className="text-primary-color font-semibold hidden  sm:inline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="text-primary-color font-semibold hidden sm:inline">
              About
            </li>
          </Link>
          <Link to="/sign-in">
            <li className="text-primary-color font-semibold">Sign In</li>
          </Link>
        </ul>
      </div>
      )}
    </header>
  );
}
