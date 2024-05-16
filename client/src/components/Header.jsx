import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const checkedPath = ["/sign-up", "/sign-in"];
  const unAbledNavbar = checkedPath.includes(location.pathname);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const submitSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-secondary-color shadow-md">
      {!unAbledNavbar && (
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-primary-color">Tushar </span>
            <span className="text-white">Estate</span>
          </h1>
          <form
            onSubmit={submitSearch}
            className="bg-third-color rounded-lg flex items-center p-2"
          >
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-white focus:outline-none w-24 sm:w-64"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <button>
              <FaSearch className="text-white" />
            </button>
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
            <Link to="/Profile">
              {currentUser ? (
                <img
                  className="rounded-full h-8 w-8 object-cover"
                  src={currentUser.avatar}
                  alt="profile"
                />
              ) : (
                <li className="text-primary-color font-semibold">Sign In</li>
              )}
            </Link>
          </ul>
        </div>
      )}
    </header>
  );
}
