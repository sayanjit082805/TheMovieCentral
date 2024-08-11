"use client";
import React from "react";
import { motion } from "framer-motion";
import LampContainer from "./Lamp";
import TypewriterEffectSmooth from "./TypeWriter";
import words from "../lib/text";
import Cards from "./Cards";

export default function Home({ popular, getData, topRated }) {
  const movies = popular.map((item) => ({
    overview: item.overview,
    title: item.title,
    release: item.release_date,
    backdrop: item.backdrop_path,
    id: item.id,
    poster: item.poster_path,
    rating: item.vote_average.toFixed(2),
  }));

  const topRatedMovies = topRated.map((item) => ({
    overview: item.overview,
    title: item.title,
    release: item.release_date,
    backdrop: item.backdrop_path,
    id: item.id,
    poster: item.poster_path,
    rating: item.vote_average.toFixed(2),
  }));

  return (
    <>
      <div className="h-100vh">
        <LampContainer>
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-8 text-center text-4xl tracking-tight text-transparent"
          >
            <TypewriterEffectSmooth words={words} />
            <span />{" "}
            <p className="text-3xl text-slate-300 font-semibold mt-1">
              Powered by{" "}
              <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                TMDB.
              </span>
            </p>{" "}
            <p className="text-2xl text-slate-300 font-semibold mt-4">
              To get started, simply search away!
            </p>{" "}
          </motion.h1>
        </LampContainer>
        <h2 className="text-slate-300 flex justify-center items-center font-semibold text-4xl">
          In the meantime, here's what we've been watching
        </h2>
        <div className="mt-8 bg-neutral-950 mb-20">
          <Cards
            items={movies}
            direction="left"
            speed="normal"
            getData={getData}
          />
        </div>
        <h2 className="text-slate-300 flex justify-center items-center font-semibold text-4xl">
          Top Rated
        </h2>
        <div className="mt-8 bg-neutral-950 mb-20">
          <Cards
            items={topRatedMovies}
            direction="right"
            speed="normal"
            getData={getData}
          />
        </div>
      </div>
    </>
  );
}
