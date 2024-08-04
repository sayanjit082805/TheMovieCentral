import React from 'react';

const Pill = ({ genre }) => {
  return (
    <span className="bg-slate-200 text-neutral-950 text-xs font-semibold mr-2.5 px-3 py-1 rounded-full shadow-md">
      {genre}
    </span>
  );
};

export default Pill;