"use client";

import { cn } from "../lib/utils";
import React, { useEffect, useState } from "react";

function Cards({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
  getData,
}) {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "flex min-w-full flex-nowrap scroller relative z-20  max-w-7xl overflow-x-auto  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-5 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item) => (
          <li
            className="w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 md:w-[450px] hover:scale-105 transition-transform duration-200"
            key={item.id}
          >
            <div
              className="h-56 rounded-t-2xl"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w780/${item.backdrop})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="px-4 py-2">
              <blockquote>
                <div
                  aria-hidden="true"
                  className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                ></div>
                <span className="relative z-20 text-sm leading-[1.6] text-gray-100 font-normal">
                  {item.overview}
                </span>
                <div className="relative z-20 mt-6 flex flex-row items-center">
                  <span className="flex flex-col gap-1">
                    <span className="text-sm leading-[1.6] text-gray-400 font-normal">
                      {item.title}
                    </span>
                    <span className="text-sm leading-[1.6] text-gray-400 font-normal">
                      {item.release.split("-")[0]}
                    </span>
                    <span className="text-sm leading-[1.6] text-gray-400 font-normal">
                      <button
                        className="text-blue-500"
                        onClick={() => getData(item.title)}
                      >
                        More Details
                      </button>
                    </span>
                  </span>
                </div>
              </blockquote>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cards;
