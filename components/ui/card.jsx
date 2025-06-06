import { Star } from "lucide-react";
import { useRouter } from "next/navigation";

const getRatingColor = (rating) => {
  if (rating >= 8.5) return "text-yellow-400";
  if (rating >= 7) return "text-yellow-500";
  if (rating >= 5) return "text-orange-400";
  return "text-red-500";
};

const renderStarRating = (rating) => {
  const fullStars = Math.floor(rating / 2);
  const halfStar = rating % 2 >= 1 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className={`w-4 h-4 fill-current ${getRatingColor(rating)}`}
        />
      ))}
      {halfStar === 1 && (
        <div className="relative">
          <Star className={`w-4 h-4 ${getRatingColor(rating)}`} />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star
              className={`w-4 h-4 fill-current ${getRatingColor(rating)}`}
            />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      ))}
      <span className={`ml-1 text-sm font-medium ${getRatingColor(rating)}`}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

export default function Card({ movies }) {
  const router = useRouter();

  const handleClick = (id) => {
    router.push(`/movie/${id}`);
  };

  return (
    <div className="relative">
      <div className="overflow-x-auto pb-6 scrollbar-container">
        <div className="flex space-x-6" style={{ minWidth: "max-content" }}>
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col w-[180px] transform hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  src={`https://image.tmdb.org/t/p/w780/${movie.poster}`}
                  alt={`${movie.title} poster`}
                  width={180}
                  height={270}
                  className="w-full h-auto object-cover aspect-[2/3]"
                />
                <div className="absolute top-2 right-2 bg-black/75 text-white text-xs font-bold px-2 py-1 rounded font-mono">
                  {movie.genre}
                </div>
              </div>

              <div className="p-4 flex-grow">
                <h3 className="font-semibold text-sm mb-1 line-clamp-1 font-mono">
                  {movie.title}
                </h3>
                <p className="text-gray-500 text-xs mb-2 font-mono">
                  {new Date(movie.release).getFullYear() || 'Not Found'}
                </p>
                <div className="mb-3">{renderStarRating(movie.rating)}</div>
              </div>

              <button onClick={() => handleClick(movie.id)} className="block w-full py-2 px-3 bg-[#3f51b5] hover:bg-blue-700 text-white text-center text-sm font-medium transition-colors duration-200 font-mono">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
