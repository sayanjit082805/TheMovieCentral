"use client";
import { use, useState, useEffect } from "react";
import { Star, Clock, Calendar, MessageSquare } from "lucide-react";
import Card from "@/components/ui/card";
import Footer from "@/components/ui/footer";
import { motion } from "motion/react";
import Poster from "@/components/ui/poster";
import { Loading } from "@/components/ui/skeleton";
import Review from "@/components/ui/review";

export default function Search({ params }) {
  const query = use(params);
  const id = decodeURIComponent(query.query || "");
  const [movie, setMovie] = useState(null);
  const [genre, setGenre] = useState([]);
  const [simGenre, setSimGenre] = useState([]);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [director, setDirector] = useState("");
  const [writer, setWriter] = useState("");
  const [images, setImages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(true);
  const [loading, setLoading] = useState(true);

  async function getMovie(movieId) {
    try {
      const response = await fetch(`/api/movie?id=${movieId}`);
      const data = await response.json();
      if (data.movie) {
        setMovie(data.movie);
        setGenre(data.movie.genres.map((genre) => genre.name));
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getCast(movieId) {
    try {
      const response = await fetch(`/api/cast?id=${movieId}`);
      const data = await response.json();
      if (data) {
        setCast(data.cast.cast.slice(0, 20));
        setDirector(
          data.cast.crew.find((member) => member.job === "Director").name
        );
        setWriter(
          data.cast.crew
            .filter((member) =>
              ["Writer", "Screenplay", "Story", "Author"].includes(member.job)
            )
            .map((writer) => writer.name)
            .slice(0, 3)
            .join(", ")
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getImages(movieId) {
    try {
      const response = await fetch(`/api/images?id=${movieId}`);
      const data = await response.json();
      if (data) {
        setImages(data.images.backdrops.slice(0, 6));
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getSimilarMovies(movieId) {
    try {
      const response = await fetch(`/api/similar?id=${movieId}`);
      const data = await response.json();
      setSimilar(data.similar.results);
    } catch (error) {
      console.error(error);
    }
  }

  async function getSimilarGenre() {
    try {
      const response = await fetch("/api/genre");
      const data = await response.json();
      setSimGenre(data.genre.genres);
    } catch (error) {
      console.error(error);
    }
  }

  async function getReviews(movieId) {
    try {
      const response = await fetch(`/api/reviews?id=${movieId}`);
      const data = await response.json();
      if (data.reviews.results && data.reviews.results.length > 0) {
        setReviews(data.reviews.results.slice(0, 5));
        setError(false);
      } else {
        setReviews([]);
        setError(true);
      }
    } catch (error) {
      setReviews([]);
      setError(true);
      console.error(error);
    }
  }

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      try {
        await Promise.all([
          getMovie(id),
          getCast(id),
          getImages(id),
          getSimilarMovies(id),
          getSimilarGenre(),
          getReviews(id),
        ]);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    fetchAll();
  }, [id]);

  const movies_similar = similar.map((item) => ({
    overview: item.overview,
    title: item.title,
    release: item.release_date,
    poster: item.poster_path,
    id: item.id,
    poster: item.poster_path,
    rating: item.vote_average,
    genre:
      simGenre.find((genre) => genre.id === item.genre_ids[0])?.name ||
      "Unknown",
  }));

  return (
    <>
      <div className="h-screen pt-16 md:pt-10 mb-20">
        {loading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <section className="relative py-12 md:py-24">
              <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                  <div className="md:w-3/5 space-y-6">
                    <div className="space-y-2">
                      <motion.h1
                        className="text-5xl md:text-7xl font-bold tracking-tight font-sans"
                        initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        {movie?.title}
                      </motion.h1>
                      <motion.p
                        className="font-light text-xl md:text-2xl font-sans"
                        initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        {movie?.tagline}
                      </motion.p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {genre.map((genre, index) => (
                        <span
                          className="px-3 py-1 rounded-full bg-neutral-300 text-sm font-mono"
                          key={index}
                        >
                          {genre}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <Star className="mr-1" size={16} />
                        <span>{movie?.vote_average.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1" size={16} />
                        <span>{movie?.runtime} mins</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="mr-1" size={16} />
                        <span>{movie?.release_date.split("-")[0]}</span>
                      </div>
                    </div>

                    <motion.p
                      initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="text-lg max-w-xl"
                    >
                      {movie?.overview}
                    </motion.p>
                  </div>
                  <div className="md:w-2/5 relative">
                    <div className="relative rounded-lg overflow-hidden shadow-2xl transform transition-transform hover:scale-105 duration-500">
                      <Poster poster_path={movie?.poster_path} />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="container mx-auto px-4 py-12 border-t border-neutral-300">
              <h2 className="text-3xl font-bold mb-8 font-mono">About</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold flex items-center font-mono">
                    Cast
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cast.map((member, i) => (
                      <button
                        key={i}
                        className="bg-neutral-200 rounded px-3 py-1.5 text-sm font-mono disabled:"
                      >
                        {member.name}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm font-mono font-medium hover:underline">
                    More at{" "}
                    <a
                      href={`https://www.themoviedb.org/movie/${id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      TMDB
                    </a>
                  </p>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold flex items-center font-mono">
                    Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex">
                      <span className="w-32 font-sans font-medium">
                        Director
                      </span>
                      <span className="font-sans">{director}</span>
                    </div>
                    <div className="flex">
                      <span className="w-32 font-sans font-medium">
                        Writers
                      </span>
                      <span className="font-sans">{writer || "Not found"}</span>
                    </div>

                    <div className="flex">
                      <span className="w-32 font-sans font-medium">
                        Release Date
                      </span>
                      <span className="font-sans">
                        {new Date(movie?.release_date).toLocaleDateString(
                          "en-us",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="w-32 font-sans font-medium">Studio</span>
                      <span className="font-sans">
                        {movie?.production_companies[0].name}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="w-32 font-sans font-medium">Budget</span>
                      <span className="font-sans">
                        {Intl.NumberFormat("en", {
                          notation: "compact",
                          currency: "USD",
                          style: "currency",
                        }).format(movie?.budget)}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="w-32 font-sans font-medium">
                        Box Office
                      </span>
                      <span className="font-sans">
                        {Intl.NumberFormat("en", {
                          notation: "compact",
                          currency: "USD",
                          style: "currency",
                        }).format(movie?.revenue)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="container mx-auto px-4 py-12 border-t border-neutral-300">
              <div className="mb-8">
                <h2 className="text-3xl font-bold font-mono">Reviews</h2>
              </div>
              {error ? (
                <div className="p-8 rounded-sm">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-[#f3f3ee] rounded-full flex items-center justify-center">
                      <MessageSquare className="w-8 h-8 text-neutral-900" />
                    </div>
                  </div>

                  <div className="text-center mb-6">
                    <h3 className="font-medium font-mono text-lg mb-2">
                      No reviews yet
                    </h3>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {reviews.map((review, i) => (
                    <Review review={review} index={i} key={i} />
                  ))}
                  <p className="text-md font-mono font-medium hover:underline">
                    More reviews at{" "}
                    <a
                      href={`https://www.themoviedb.org/movie/${id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      TMDB
                    </a>
                  </p>
                </div>
              )}
            </section>
            <section className="container mx-auto px-4 py-12 border-t border-neutral-300">
              <div className="flex items-center mb-8">
                <h2 className="text-3xl font-bold font-mono">Gallery</h2>
              </div>
              <motion.div
                initial={{ opacity: 0, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 group">
                  {images.map((image, i) => (
                    <div
                      key={i}
                      className="relative aspect-video rounded-lg overflow-hidden group"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w780/${image.file_path}`}
                        alt={`Movie scene ${i + 1}`}
                        className="object-cover transition-all duration-300 group-hover:blur-[5px] hover:!blur-none hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            </section>
            <section className="container mx-auto px-4 py-12 border-t border-neutral-300">
              <div className="flex items-center mb-8">
                <h2 className="text-3xl font-bold font-mono">
                  You Might Also Like
                </h2>
              </div>
              <Card movies={movies_similar} />
            </section>
            <Footer />
          </>
        )}
      </div>
    </>
  );
}
