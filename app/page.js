"use client";
import { useState, useEffect } from "react";
import Card from "@/components/ui/card";
import { Nav } from "@/components/navbar";
import { Home_Skeleton } from "@/components/ui/skeleton";
import Footer from "@/components/ui/footer";
import { motion } from "motion/react";

export default function Home() {
  const [popular, setPopular] = useState([]);
  const [genres, setGenres] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getPopular() {
    try {
      const response = await fetch("/api/popular");
      const data = await response.json();
      setPopular(data.popular.results);
    } catch (error) {
      console.error(error);
    }
  }

  async function getGenre() {
    try {
      const response = await fetch("/api/genre");
      const data = await response.json();
      setGenres(data.genre.genres);
    } catch (error) {
      console.error(error);
    }
  }

  async function getTopRated() {
    try {
      const response = await fetch("/api/topRated");
      const data = await response.json();
      setTopRated(data.topRated.results);
    } catch (error) {
      console.error(error);
    }
  }

  async function getUpcoming() {
    try {
      const response = await fetch("/api/upcoming");
      const data = await response.json();
      setUpcoming(data.upcoming.results);
    } catch (error) {
      console.error(error);
    }
  }

  const movies_popular = popular.map((item) => ({
    overview: item.overview,
    title: item.title,
    release: item.release_date,
    poster: item.poster_path,
    id: item.id,
    poster: item.poster_path,
    rating: item.vote_average,
    genre:
      genres.find((genre) => genre.id === item.genre_ids[0])?.name || "Unknown",
  }));

  const movies_topRated = topRated.map((item) => ({
    overview: item.overview,
    title: item.title,
    release: item.release_date,
    poster: item.poster_path,
    id: item.id,
    poster: item.poster_path,
    rating: item.vote_average,
    genre:
      genres.find((genre) => genre.id === item.genre_ids[0])?.name || "Unknown",
  }));

  const movies_upcoming = upcoming.map((item) => ({
    overview: item.overview,
    title: item.title,
    release: item.release_date,
    poster: item.poster_path,
    id: item.id,
    poster: item.poster_path,
    rating: item.vote_average,
    genre:
      genres.find((genre) => genre.id === item.genre_ids[0])?.name || "Unknown",
  }));

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      try {
        await Promise.all([
          getPopular(),
          getTopRated(),
          getGenre(),
          getUpcoming(),
        ]);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    fetchAll();
  }, []);

  return (
    <>
      <Nav />
      <motion.div
        className="flex flex-col items-center justify-center h-screen"
        initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
        animate={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <h1 className="text-[1.9rem] md:text-6xl font-bold text-center font-mono antialiased">
          ~/TheMovieCentral
        </h1>
        <p className="mt-3 md:mt-6 text-md md:text-[1.8rem] text-center font-sans antialiased ml-2">
          &quot;Cinema is a matter of what&apos;s in the frame and what&apos;s
          out of it.&quot;
          <br />
          <span className="font-sans text-[#3f51b5] text-md md:text-[1.65rem]">
            {" "}
            - Martin Scorsese
          </span>
        </p>
        <p className="mt-3 text-md md:text-xl text-center antialiased font-mono ml-2 md:ml-0">
          Crime, Drama, Sci-Fi, we got it all!
        </p>
      </motion.div>
      <section
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 mb-10"
        id="popular"
      >
        <motion.h2
          initial={{ opacity: 0, filter: "blur(10px)" }}
          whileInView={{
            opacity: 1,

            filter: "blur(0px)",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-3xl font-bold mb-2 relative inline-block"
        >
          Popular
          <motion.span
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{
              opacity: 1,

              filter: "blur(0px)",
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 w-29 h-1 bg-[#3f51b5] -mb-2"
          ></motion.span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, filter: "blur(10px)" }}
          whileInView={{
            opacity: 1,

            filter: "blur(0px)",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-gray-600 mb-8 mt-2 font-mono font-medium"
        >
          What we&apos;ve been watching
        </motion.p>
        {loading ? <Home_Skeleton /> : <Card movies={movies_popular} />}
      </section>
      <section
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16"
        id="top-rated"
      >
        <motion.h2
          initial={{ opacity: 0, filter: "blur(10px)" }}
          whileInView={{
            opacity: 1,

            filter: "blur(0px)",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-3xl font-bold mb-2 relative inline-block"
        >
          Top Rated
          <motion.span
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{
              opacity: 1,

              filter: "blur(0px)",
            }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 w-38 h-1 bg-[#3f51b5] -mb-2"
          ></motion.span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, filter: "blur(10px)" }}
          whileInView={{
            opacity: 1,

            filter: "blur(0px)",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-gray-600 mb-8 mt-2 font-mono font-medium"
        >
          &quot;I&apos;m the king of the world!&apos; - Jack Dawson, Titanic
        </motion.p>
        {loading ? <Home_Skeleton /> : <Card movies={movies_topRated} />}
      </section>
      <section
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16"
        id="upcoming"
      >
        <motion.h2
          initial={{ opacity: 0, filter: "blur(10px)" }}
          whileInView={{
            opacity: 1,

            filter: "blur(0px)",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-3xl font-bold mb-2 relative inline-block"
        >
          Upcoming
          <motion.span
            initial={{ opacity: 0, filter: "blur(20px)" }}
            whileInView={{
              opacity: 1,

              filter: "blur(0px)",
            }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 w-38 h-1 bg-[#3f51b5] -mb-2"
          ></motion.span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, filter: "blur(10px)" }}
          whileInView={{
            opacity: 1,

            filter: "blur(0px)",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-gray-600 mb-8 mt-2 font-mono font-medium"
        >
          &quot;You hold onto the past, but jazz is about the future.&quot; -
          Keith, La La Land
        </motion.p>
        {loading ? <Home_Skeleton /> : <Card movies={movies_upcoming} />}
      </section>
      <Footer />
    </>
  );
}
