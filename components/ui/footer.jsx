import Link from "next/link";
import { useEffect, useState } from "react";
import {
  IconBrandGithub,
  IconBrandBluesky,
  IconBrandReddit,
  IconBrandLinkedin,
} from "@tabler/icons-react";

export default function Footer() {
  const [apiStatus, setApiStatus] = useState("");
  const [color, setColor] = useState("");

  async function checkOnline() {
    try {
      const response = await fetch("/api/popular");
      if (response.ok) {
        setApiStatus("API Online");
        setColor("bg-green-500");
      } else {
        setApiStatus("API Offline");
        setColor("bg-red-500");
      }
    } catch (error) {
      setApiStatus("API Offline");
      setColor("bg-red-500");
    }
  }

  useEffect(() => {
    checkOnline();
    const interval = setInterval(checkOnline, 60000); 
    return () => clearInterval(interval); 
  }
  , []);

  return (
    <footer className="bg-[#f3f3ee]">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <img className="h-8 w-8" src="logo.svg" />
              <span className="text-xl font-semibold font-mono">
                ~/TheMovieCentral
              </span>
            </Link>
            <p className="text-md mb-4 font-mono tracking-tight font-medium">
              Search and fetch details of millions of movies.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm">Browse</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="#popular"
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Popular
                </Link>
              </li>
              <li>
                <Link
                  href="#top-rated"
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Top Rated
                </Link>
              </li>
              <li>
                <Link
                  href="#upcoming"
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Upcoming
                </Link>
              </li>
              <li>
                <Link
                  href="#upcoming"
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                  New Releases
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Search
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm">Genres</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <p className="text-gray-700 transition-colors">Action</p>
              </li>
              <li>
                <p className="text-gray-700 transition-colors">Comedy</p>
              </li>
              <li>
                <p className="text-gray-700 transition-colors">Drama</p>
              </li>
              <li>
                <p className="text-gray-700 transition-colors">Horror</p>
              </li>
              <li>
                <p className="text-gray-700 transition-colors">Sci-Fi</p>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm">Features</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <p className="text-gray-700 transition-colors">Details</p>
              </li>
              <li>
                <p className="text-gray-700 transition-colors">Cast</p>
              </li>
              <li>
                <p className="text-gray-700 transition-colors">Posters</p>
              </li>
              <li>
                <p className="text-gray-700 transition-colors">Ratings</p>
              </li>
              <li>
                <p className="text-gray-700 transition-colors">
                  Recommendations
                </p>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/sayanjit082805/TheMovieCentral/issues"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Report Issue
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Feedback
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-300 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
            <div className="text-sm font-mono tracking-tight font-medium">
              © {new Date().getFullYear()} ~/TheMoveCentral. Film Data provided
              by{" "}
              <Link
                href="https://themoviedb.org"
                className="hover:text-blue-500"
                rel="noopener noreferrer"
                target="_blank"
              >
                {" "}
                TMDB.{" "}
              </Link>
            </div>
          </div>
          <div className="flex space-x-6 text-sm">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-200 md:text-sm text-xs rounded-md border border-neutral-200 shadow-sm">
              <div className={`w-3 h-3 ${color} rounded-full`}></div>
              <span className="font-medium font-mono">{apiStatus}</span>
            </div>
            <Link
              href="https://bsky.app"
              rel="noopener noreferrer"
              target="_blank"
              className="hover:text-blue-500 transition-colors"
            >
              <IconBrandBluesky />
            </Link>
            <Link
              href="https://github.com/sayanjit082805/TheMovieCentral"
              rel="noopener noreferrer"
              target="_blank"
              className="hover:text-slate-500 transition-colors"
            >
              <IconBrandGithub />
            </Link>
            <Link
              href="https://www.reddit.com/user/EliteConqueror20/"
              rel="noopener noreferrer"
              target="_blank"
              className=" hover:text-orange-500 transition-colors"
            >
              <IconBrandReddit />
            </Link>
            <Link
              href="https://www.linkedin.com/in/sayanjit-ukil-7bb303322/"
              rel="noopener noreferrer"
              target="_blank"
              className=" hover:text-blue-600 transition-colors"
            >
              <IconBrandLinkedin />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
