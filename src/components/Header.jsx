import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import Lottie from "react-lottie";
import logo from "../assets/logo.json";
import tmdb from "../assets/tmdb.svg";

function Header({ search, setSearch, handleSearch, handleKeyPress }) {
  const [focused, setFocused] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: logo,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearchClick = () => {
    handleSearch();
    setShowCancel(true);
  };

  const handleInputChange = (event) => {
    setSearch(event.target.value);
    setShowCancel(event.target.value !== "");
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        isVisible ? "transform translate-y-0" : "transform -translate-y-full"
      } bg-gradient-to-r from-black via-transparent to-transparent h-16 shadow-lg border-b-2 border-white`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 h-full"
        aria-label="Global"
      >
        <div className="flex items-center">
          <Lottie options={defaultOptions} height={40} width={40} />
          <h1 className="text-2xl ml-1.5 bg-gradient-to-r from-violet-500 to-cyan-600 font-bold text-transparent bg-clip-text font-roboto">
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
