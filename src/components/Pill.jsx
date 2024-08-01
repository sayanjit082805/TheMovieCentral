function Pill({ genre }) {
  return (
    <span className="bg-zinc-800 text-slate-50 text-xs font-semibold mr-2 px-3 py-1 rounded-full shadow-md">
      {genre}
    </span>
  );
}

export default Pill;
