import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import logo from "/logo.svg";
import tmdb from "../assets/tmdb.svg";

function Header({ search, setSearch, handleSearch, handleKeyPress }) {
  const [focused, setFocused] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  const handleSearchClick = () => {
    handleSearch();
    setShowCancel(true);
  };

  const handleInputChange = (event) => {
    setSearch(event.target.value);
    setShowCancel(event.target.value !== "");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-10 bg-gradient-to-r from-black via-transparent to-transparent h-16 shadow-lg border-b-2 border-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 h-full"
        aria-label="Global"
      >
        <div className="flex items-center">
          <img className="h-9 w-auto" src={logo} alt="movie-icon" />
          <h1 className="text-2xl ml-1.5 bg-gradient-to-r from-slate-500 to-slate-100 font-bold text-transparent bg-clip-text font-roboto">
            TheMovieCentral
          </h1>
          <img src={tmdb} alt="tmdb" className="h-6 ml-2" />
        </div>
        <div className="flex-grow"></div>
        <div className="pt-1.5 relative mx-auto text-gray-600">
          <input
            className={`border-2 border-gray-300 mb-1 bg-slate-200 h-10 px-5 ${
              showCancel ? "pr-10" : "pr-5"
            } rounded-lg text-sm focus:outline-none transition-width duration-300 ease-in-out w-44 focus:w-64 focus:border-gray-300-500 focus:ring-2`}
            type="search"
            name="search"
            placeholder="Search"
            value={search}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            onFocus={() => {
              setShowCancel(true);
              setFocused(true);
            }}
            onBlur={() => {
              setShowCancel(search !== "");
              setFocused(false);
            }}
          />
          <button
            type="submit"
            className="absolute right-0 top-0 mt-3.5 mr-4"
            onClick={handleSearchClick}
          >
            <FontAwesomeIcon
              icon={faSearch}
              className="text-gray-600 h-4 w-4 fill-current"
            />
          </button>
          {focused && showCancel && (
            <button
              type="button"
              className="absolute right-10 top-0 mt-3.5 mr-4"
              onClick={() => {
                setSearch("");
                setShowCancel(false);
              }}
            >
              <FontAwesomeIcon
                icon={faTimes}
                className="text-gray-600 h-4 w-4 fill-current"
              />
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;