"use client";

import { useState } from "react";
import { Star, ChevronDown, ChevronUp } from "lucide-react";

const getRatingColor = (rating) => {
  if (rating >= 8.5) return "text-yellow-400";
  if (rating >= 7) return "text-yellow-500";
  if (rating >= 5) return "text-orange-400";
  return "text-red-500";
};

const renderStarRating = (rating, width, height, width2, height2) => {
  const fullStars = Math.floor(rating / 2);
  const halfStar = rating % 2 >= 1 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className={`${width} ${height} md:${width2} md:${height2} fill-current ${getRatingColor(
            rating
          )}`}
        />
      ))}
      {halfStar === 1 && (
        <div className="relative">
          <Star
            className={`${width} ${height} md:${width2} md:${height2} ${getRatingColor(
              rating
            )}`}
          />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star
              className={`${width} ${height} md:${width2} md:${height2} fill-current ${getRatingColor(
                rating
              )}`}
            />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          className={`${width} ${height} md:${width2} md:${height2} h-4 text-gray-300`}
        />
      ))}
    </div>
  );
};
const Review = ({ review, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const charLimit = 1000;

  const shouldTruncate = review.content.length > charLimit;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div key={index} className="p-4 rounded-sm border border-neutral-300">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium font-mono">{review.author}</h3>
          <div className="flex items-center mt-1">
            {renderStarRating(
              review.author_details.rating,
              "w-4",
              "h-4",
              "w-4",
              "h-4"
            )}
            <span className="ml-2 text-sm font-mono font-medium">
              {new Date(review.updated_at).toLocaleString("en-us", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
                timeZone: "UTC",
              })}
            </span>
          </div>
        </div>
      </div>

      <div className="relative">
        <p
          className={`font-sans text-wrap transition-all duration-300 ${
            isExpanded ? "max-h-none" : "max-h-[300px] overflow-hidden"
          }`}
        >
          {isExpanded || !shouldTruncate
            ? review.content
            : review.content.slice(0, charLimit)}
        </p>

        {shouldTruncate && !isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#fcfcf9] to-transparent pointer-events-none"></div>
        )}
      </div>

      {shouldTruncate && (
        <button
          onClick={toggleExpand}
          className="mt-3 flex items-center space-x-1 text-[#3f51b5] hover:text-blue-800 transition-colors text-sm font-medium group"
        >
          <span>{isExpanded ? "Show less" : "Show more"}</span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          ) : (
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          )}
        </button>
      )}
    </div>
  );
};

const Summary = ({ rating, votes, popularity }) => {
  return (
    <div className="rounded-md p-6 border border-neutral-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div
            className={`text-3xl md:text-4xl font-bold font-sans ${getRatingColor(
              rating
            )}`}
          >
            {rating.toFixed(2)}
          </div>
          <div>
            <div className="flex items-center space-x-1 mb-1">
              {renderStarRating(rating, "w-4", "h-4", "w-5", "h-5")}
            </div>
            <div className="text-xs md:text-sm font-mono text-gray-400 font-medium">
              Based on {votes} votes
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-green-400 text-md md:text-2xl font-bold font-sans">
            {popularity.toFixed(2)}
          </div>
          <div className="text-gray-400 text-xs md:text-sm font-sans font-medium">
            Popularity Score
          </div>
        </div>
      </div>
    </div>
  );
};

export { Review, Summary };
