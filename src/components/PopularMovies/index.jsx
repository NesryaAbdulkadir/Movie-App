import React, { useEffect, useState } from "react";
import { genres } from "../../genre";
import { Link } from "react-router-dom";

export default function PopularMovies() {
  const [movies, setMovies] = useState([]);
  const [showDetailsIndex, setShowDetailsIndex] = useState(false);

  async function fetchMovies() {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();

    setMovies(data.results);
  }
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="max-w-max mx-auto px-40">
      <ul className="flex flex-wrap gap-10">
        {movies?.map((movie, index) => (
          <Link
            to={`/details/${movie.id}`}
            className="text-white cursor-pointer"
            key={index}
          >
            <li
              onMouseEnter={() => setShowDetailsIndex(index)}
              onMouseLeave={() => setShowDetailsIndex(null)}
              className="relative"
            >
              {showDetailsIndex === index && (
                <div className="bg-black/40 backdrop-blur-xl p-6 rounded-lg shadow-md absolute bottom-0 left-0 w-full ">
                  <div className="flex justify-between">
                    <h2 className="text-xl font-bold text-white">
                      {movie.title}
                    </h2>
                    <span className="text-white">{movie.vote_average}%</span>
                  </div>
                  <div className="flex gap-4">
                    {movie?.genre_ids?.map((genre) => (
                      <p key={genre} className="text-white">
                        {genres[genre]}
                      </p>
                    ))}
                  </div>
                  <div></div>
                  <p className="text-white">
                    Language: {movie.original_language}
                  </p>
                  <p className="text-white">
                    Realese Date: {movie.release_date}
                  </p>
                </div>
              )}
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
                className="w-96 h-full object-cover rounded-lg"
              />
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
