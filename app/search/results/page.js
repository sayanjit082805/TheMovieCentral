"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Nav } from "@/components/navbar";
import MovieCard from "@/components/ui/results";
import { Skeleton } from "@/components/ui/skeleton";

const Results = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  async function getData(name) {
    setLoading(true);
    try {
      const response = await fetch(
       `/api/results?query=${name}`
      );
      const data = await response.json();
      console.log(data)
      setData(data.results.results.slice(0, 10));
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (query) getData(query);
  }, [query]);

  return (
    <>
      <Nav />
      <div className="min-h-screen flex flex-col pt-20">
        <main className="flex-1 container mx-auto py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center font-sans font-medium border-b border-neutral-200 py-4">
              {loading ? (
                <div className="space-y-2">
                  <div className="h-6 bg-neutral-200 rounded w-64 mx-auto animate-pulse"></div>
                </div>
              ) : (
                <>
                  <p className="text-lg mb-2 font-mono">
                    Showing matches for : 
                    <span className="font-mono"> &quot;{query}&quot;</span>
                  </p>
                </>
              )}
            </div>
            <div className="space-y-8">
              {loading
                ? Array.from({ length: 10 }).map((_, index) => (
                    <Skeleton key={index} />
                  ))
                : data.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                  ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default function SearchResults() {
  return (
    <Suspense>
      <Results />
    </Suspense>
  );
}
