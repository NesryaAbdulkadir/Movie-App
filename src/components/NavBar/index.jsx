import { Menu, StarIcon, X } from "lucide-react";
import React, { useState } from "react";

export default function NavBar() {
  const [hoverText, setHoverText] = useState("");

  const [showMenu, setShowMenu] = useState(false);
  return (
    <nav className="flex justify-between items-center w-full px-10 lg:px-40 py-5 bg-black relative">
      <h1 className="text-white sm:text-4xl text-2xl font-bold">Movie App</h1>

      <button
        onClick={() => setShowMenu(!showMenu)}
        className="text-white sm:text-4xl text-2xl font-bold sm:hidden"
      >
        {showMenu ? <X /> : <Menu />}
      </button>

      {showMenu && (
        <ul
          className={`transition duration-1000 ease-in-out flex flex-col gap-5 mt-10 absolute right-0 top-5 bg-black/60 backdrop-blur-xl p-5 shadow-md w-full text-center text-xl items-center justify-center z-50 sm:hidden h-72 rounded-b-full `}
        >
          <li>
            <a href="/" className="text-white">
              Home
            </a>
          </li>
          <li>
            <a
              href="/favorite"
              onMouseEnter={() => setHoverText("Favorite")}
              onMouseLeave={() => setHoverText("")}
              className="relative"
            >
              <StarIcon
                fill="yellow"
                className="text-yellow-500 w-8 h-8 mr-40"
              />
              {hoverText && (
                <span className="text-black absolute top-8 -left-5 shadow-md p-2 rounded-lg bg-white">
                  {hoverText}
                </span>
              )}
            </a>
          </li>
        </ul>
      )}

      <ul className="hidden sm:flex gap-10 items-center">
        <li>
          <a href="/" className="text-white">
            Home
          </a>
        </li>
        <li>
          <a
            href="/favorite"
            onMouseEnter={() => setHoverText("Favorite")}
            onMouseLeave={() => setHoverText("")}
            className="relative"
          >
            <StarIcon fill="yellow" className="text-yellow-500 w-8 h-8 mr-40" />
            {hoverText && (
              <span className="text-black absolute top-8 -left-5 shadow-md p-2 rounded-lg bg-white">
                {hoverText}
              </span>
            )}
          </a>
        </li>
      </ul>
    </nav>
  );
}
