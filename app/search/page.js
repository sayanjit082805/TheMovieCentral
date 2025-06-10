"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/search";
import { useState } from "react";
import { placeholders } from "@/lib/placeholders";
import { useRouter } from "next/navigation";
import { Nav } from "@/components/navbar";
import Footer from "@/components/ui/footer";

export default function Search() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };
  const handleSearch = () => {
    router.push(`/search/results?query=${encodeURIComponent(search)}`);
  };

  return (
    <>
      <Nav />
      <div className="flex flex-col items-center justify-center h-screen px-4 md:px-0">
        <h2 className="mb-10 text-4xl md:text-5xl text-center antialiased font-sans">
          Search your feelings, find your movie!
        </h2>
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleInputChange}
          onSubmit={handleSearch}
        />
      </div>
      <Footer />
    </>
  );
}
