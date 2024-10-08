import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Watch } from "react-loader-spinner";
import { motion } from "framer-motion";
import Header from "./Header";
import Pill from "./Pill";
import Home from "./Home";

const apiKey = import.meta.env.VITE_API_KEY;

function Movie() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [color, setColor] = useState([]);

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  async function getData(search) {
    if (search === "") {
      toast.error("Please enter a movie name!", {
        icon: true,
        position: "bottom-right",
        autoClose: 4000,
        draggable: false,
        theme: "dark",
        style: {
          background: "#09090b",
          color: "#f8fafc",
          "--toastify-color-progress-error": "#ef4444",
          "--toastify-icon-color-error": "#ef4444",
        },
        closeOnClick: true,
      });
      return;
    }
    setLoading(true);
    await timeout(1000);
    const search_array = search.split(" ");
    const query = search_array.map(encodeURIComponent).join("+");
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`
      );
      const data = await response.json();
      if (data.results.length === 0) {
        console.log(response);
        toast.error(`${search} was not found!`, {
          icon: true,
          position: "bottom-right",
          autoClose: 4000,
          draggable: false,
          theme: "dark",
          style: {
            background: "#09090b",
            color: "#f8fafc",
            "--toastify-color-progress-error": "#ef4444",
            "--toastify-icon-color-error": "#ef4444",
          },
          closeOnClick: true,
        });
        setLoading(false);
        return;
      }
      setHasSearched(true);
      setData(data);
      if (data.results.length > 0) {
        getMovie(data.results[0].id);
        getCast(data.results[0].id);
        getBorderColor(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getMovie(movieId) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
      );
      const movie = await response.json();
      setMovie(movie);
      setGenre(movie.genres.map((genre) => genre.name));
    } catch (error) {
      console.error(error);
    }
  }

  async function getCast(movieId) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
      );
      const data = await response.json();
      setCast(data.cast);
      setDirector(data.crew.find((member) => member.job === "Director").name);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function getPopular() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
      );
      const data = await response.json();
      setPopular(data.results);
    } catch (error) {
      console.error(error);
    }
  }

  async function getTopRated() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
      );
      const data = await response.json();
      setTopRated(data.results);
    } catch (error) {
      console.error(error);
    }
  }

  function handleSearch() {
    getData(search);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      getData(search);
    }
  }

  function getBorderColor(data) {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = `https://image.tmdb.org/t/p/w780/${data?.results[0].poster_path}`;
    img.onload = () => {
      const colorThief = new ColorThief();
      const color = colorThief.getColor(img);
      setColor(color);
      console.log(color);
    };
  }

  useEffect(() => {
    getPopular();
    getTopRated();
  }, []);

  return (
    <>
      <Header
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        handleKeyPress={handleKeyPress}
      />
      {!hasSearched ? (
        loading ? (
          <div className="relative w-full h-screen flex justify-center items-center bg-neutral-950">
            <Watch color="#f8fafc" height={80} width={80} />
          </div>
        ) : (
          <Home
            popular={popular}
            getPopular={getPopular}
            getData={getData}
            topRated={topRated}
          />
        )
      ) : (
        <>
          <div className="relative w-full h-screen flex flex-col">
            {loading ? (
              <div className="relative w-full h-full overflow-hidden flex-grow flex bg-neutral-950 pt-16">
                <div className="absolute inset-0 flex justify-center items-center ">
                  <Watch color="#f8fafc" height={80} width={80} />
                </div>
              </div>
            ) : (
              <>
                <div className="relative w-full h-full overflow-hidden flex-grow flex bg-neutral-950 pt-16">
                  <>
                    <div className="w-1/2 h-full flex flex-col justify-center items-center p-8 bg-gradient-to-l border-r-2 border-white">
                      <img
                        src={`https://image.tmdb.org/t/p/w780/${data?.results[0].poster_path}`}
                        alt={`${data?.results[0].title} Poster`}
                        className="w-[200px] mb-5 rounded-lg shadow-lg h-auto animate-fadeIn transition duration-200 hover:scale-105"
                      />
                      <h1 className="text-4xl text-slate-50 font-bold mb-1 animate-fadeIn">
                        {data?.results[0].title}
                      </h1>
                      <p className="text-md text-slate-300 italic max-w-2xl text-center font-medium animate-fadeIn mb-5">
                        {movie?.tagline}
                      </p>
                      <motion.hr
                        initial={{ opacity: 0.5, width: "15rem" }}
                        whileInView={{ opacity: 1, width: "30rem" }}
                        transition={{
                          delay: 0.3,
                          duration: 0.8,
                          ease: "easeInOut",
                        }}
                        className="w-1/2 mb-4 border-t-2 animate-fadeIn"
                        style={{
                          borderColor: `rgb(${color[0]},${color[1]},${color[2]})`,
                        }}
                      />
                      <p className="text-lg text-gray-400 max-w-2xl text-center animate-fadeIn">
                        {data?.results[0].overview}
                      </p>
                      <div className="mt-4 flex items-center animate-fadeIn">
                        {genre.map((genre, index) => (
                          <Pill key={index} genre={genre} />
                        ))}
                      </div>
                      <p className="text-md text-slate-500 max-w-2xl text-center mt-4 animate-fadeIn">
                        {director} | {movie?.runtime} minutes |{" "}
                        {movie?.release_date.split("-")[0]}
                      </p>
                      <p className="text-md text-slate-300 max-w-2xl text-center mt-3.5 animate-fadeIn font-semibold">
                        Starring :{" "}
                        {cast
                          .slice(0, 4)
                          .map((member) => member.name)
                          .join(", ")}
                      </p>
                      <div className="mt-3.5 flex items-center">
                        <i className="fas fa-star text-yellow-400 animate-fadeIn"></i>
                        <span className="text-lg text-white ml-2 mt-0.5 animate-fadeIn">
                          {movie?.vote_average.toFixed(2)} / 10
                        </span>
                      </div>
                    </div>
                  </>
                  <div className="w-1/2 h-full relative">
                    <img
                      src={`https://image.tmdb.org/t/p/original/${data?.results[0].backdrop_path}`}
                      alt={`${data?.results[0].title} Backdrop`}
                      className="absolute inset-0 w-full h-full object-cover object-center animate-fadeIn"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent"></div>
                  </div>
                </div>
              </>
            )}
          </div>
          <ToastContainer />
        </>
      )}
    </>
  );
}

export default Movie;
