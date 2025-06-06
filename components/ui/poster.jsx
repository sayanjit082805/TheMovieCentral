import Image from "next/image";

export default function Poster({ poster_path }) {

  return (
    <Image
      src={`https://image.tmdb.org/t/p/w780/${poster_path}`}
      alt="Movie poster"
      className="w-full h-auto hover:blur-xs transition-all duration-300 ease-in-out hover:border-2 hover:border-e-neutral-200"
      width={500}
      height={500}
      loading="lazy"
    />
  );
}
