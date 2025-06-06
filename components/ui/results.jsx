import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function MovieCard({ movie }) {
  const [blurDataURL, setBlurDataURL] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchBlur() {
      if (!movie.poster_path) return;
      const imageUrl = `https://image.tmdb.org/t/p/w780/${movie.poster_path}`;
      const res = await fetch(
        `/api/blur?imageUrl=${encodeURIComponent(imageUrl)}`
      );
      const data = await res.json();
      setBlurDataURL(data.blurDataURL);
    }
    fetchBlur();
  }, [movie.poster_path]);

  const handleClick = (movie) => {
    router.push(`/movie/${movie.id}`);
  };

  return (
    <div key={movie.id} className="border-b pb-6 font-sans border-neutral-300">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <Image
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w780/${movie?.poster_path}`
                : "/placeholder.svg"
            }
            alt={`${movie.title} poster`}
            width={150}
            height={225}
            className="border border-gray-200 rounded-md transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:border-gray-300"
            placeholder={blurDataURL ? "blur" : "empty"}
            blurDataURL={blurDataURL}
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-semibold">
              {movie.title} ({movie.release_date.split("-")[0] || "N/A"})
            </h2>
            <div className="text-sm flex flex-row">
              {movie.vote_average.toFixed(2)} / 10
            </div>
          </div>
          <p className="mt-3">{movie.overview}</p>
          <div className="mt-4">
            <button
              onClick={() => handleClick(movie)}
              className="text-[#3f51b5] hover:text-blue-600 hover:underline font-mono"
            >
              View details →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
