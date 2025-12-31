"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

enum Season {
  Spring = "Spring",
  Summer = "Summer",
  Autumn = "Autumn",
  Winter = "Winter",
}

/**
 * Determines the season based on the month index (0-11).
 * This follows the standard Northern Hemisphere seasonal periods.
 */
function getCurrentSeason(monthIndex: number): Season {
  // March (2), April (3), May (4)
  if (monthIndex >= 2 && monthIndex <= 4) {
    return Season.Spring;
  }

  // June (5), July (6), August (7)
  if (monthIndex >= 5 && monthIndex <= 7) {
    return Season.Summer;
  }

  // September (8), October (9), November (10)
  if (monthIndex >= 8 && monthIndex <= 10) {
    return Season.Autumn;
  }

  // December (11), January (0), February (1)
  return Season.Winter;
}

function Banner_01() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-linear-to-r from-blue-600 to-violet-600 p-8 text-white shadow-xl">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-16 -left-16 h-32 w-32 animate-pulse rounded-full bg-white opacity-10"></div>
        <div className="absolute top-5 right-10 h-12 w-12 rounded-full bg-white opacity-10"></div>
        <div className="absolute -right-8 -bottom-8 h-32 w-32 animate-pulse rounded-full bg-blue-400 opacity-20 delay-300"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
        <div
          className={`transition-all duration-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <p className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-semibold tracking-wider backdrop-blur-sm">
            JUST RELEASED
          </p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            New Collection <span className="text-blue-200">Launch</span>
          </h1>
          <p className="mt-3 max-w-md text-sm text-blue-100 md:text-base">
            Exclusive designs at special introductory prices. Limited time offer
            ending soon. Don&apos;t miss out.
          </p>
        </div>

        <div
          className={`transition-all delay-300 duration-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <Link
            href="/collections"
            className="group relative isolate overflow-hidden rounded-full bg-white px-8 py-3 font-medium text-blue-600 shadow-md transition-all hover:shadow-lg"
          >
            <span className="absolute inset-0 h-full w-1/2 -translate-x-full transform bg-linear-to-r from-blue-400/20 via-transparent to-transparent transition-transform duration-300 group-hover:translate-x-full"></span>
            Shop Now
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Banner_05() {
  const currentMonthIndex: number = new Date().getMonth();
  const currentSeason: Season = getCurrentSeason(currentMonthIndex);

  return (
    <div className="relative overflow-hidden rounded-lg bg-linear-to-r from-yellow-500 to-orange-500">
      {/* Summer themed background patterns */}
      <div className="absolute inset-0">
        <svg
          className="absolute top-0 left-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <circle cx="80%" cy="60%" r="100" fill="white" fillOpacity="0.1" />
          <circle cx="50%" cy="20%" r="40" fill="white" fillOpacity="0.1" />
          <path
            d="M0 20 L40 0 L40 40 Z"
            fill="white"
            fillOpacity="0.1"
            transform="translate(20, 40)"
          />
          <path
            d="M0 20 L40 0 L40 40 Z"
            fill="white"
            fillOpacity="0.1"
            transform="translate(460, 140) rotate(180)"
          />
        </svg>
      </div>

      <div className="relative z-10 px-6 py-8 md:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="mb-2 flex items-center justify-center">
            <div className="bg-opacity-20 rounded-full bg-white px-4 py-1 text-sm font-medium tracking-wider text-black uppercase backdrop-blur-sm">
              Limited Time Offer
            </div>
          </div>

          <h2 className="mb-3 text-center text-3xl font-extrabold tracking-wide text-white uppercase md:text-4xl lg:text-5xl">
            {currentSeason} Sale
          </h2>

          <div className="mb-4 flex justify-center">
            <div className="relative">
              <div className="text-center text-5xl font-bold text-white md:text-6xl">
                20% OFF
              </div>
              <div className="bg-opacity-20 absolute -top-1 -right-6 rotate-12 rounded-md border-2 border-green-600 bg-green-500 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                EXCLUSIVE
              </div>
            </div>
          </div>

          <p className="text-opacity-90 mb-6 text-center text-lg text-white">
            Refresh your wardrobe with our latest summer collection. All items
            included in this special seasonal promotion!
          </p>

          <div className="flex flex-col items-center justify-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Link
              href="/collections"
              className="hover:bg-opacity-90 rounded-md bg-white px-6 py-3 font-medium text-orange-500 transition-all"
            >
              Shop Summer Collection
            </Link>
            <Link
              href="/collections"
              prefetch
              className="border-opacity-40 hover:bg-opacity-10 rounded-md border border-white bg-transparent px-6 py-3 font-medium text-white transition-all hover:bg-white hover:text-orange-500"
            >
              View All Deals
            </Link>
          </div>

          <div className="text-opacity-80 mt-4 text-center text-sm text-white">
            * Offer valid until August 31st. Cannot be combined with other
            promotions.
          </div>
        </div>
      </div>
    </div>
  );
}

export { Banner_01, Banner_05 };
