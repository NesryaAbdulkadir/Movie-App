import React, { useContext, useEffect, useState } from "react";
import { genres } from "../../genre";
import { Link } from "react-router-dom";
import { Star, StarIcon } from "lucide-react";

export default function PopularMovies({
  movies,
  setMovies,
  loading,
  setLoading,
  favoriteId,
  setFavoriteId,
}) {
  const [showDetailsIndex, setShowDetailsIndex] = useState(false);

  async function fetchMovies() {
    setLoading(true);
    setTimeout(async () => {
      const apiKey = import.meta.env.VITE_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();

      setMovies(data.results);
      setLoading(false);
    }, 1000);
  }

  function toggleFavorite(id) {
    setFavoriteId((prevFavorites) => {
      if (prevFavorites.includes(id)) {
        // Remove if already a favorite
        return prevFavorites.filter((movieId) => movieId !== id);
      } else {
        // Add if not a favorite
        return [...prevFavorites, id];
      }
    });
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="text-8xl grid grid-cols-3 items-center gap-5 px-32">
        {[...Array(6)].map((_, index) => (
          <div
            className="w-full h-[600px] bg-black/10 rounded-lg animate-pulse"
            key={index}
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-max mx-auto px-10 lg:px-40">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        {movies?.map((movie, index) => (
          <div className="relative" key={movie.id}>
            {movie?.adult === true ? (
              <span className="bg-red-500 text-white  ml-4 p-3 absolute top-0 left-0 z-40 rounded-b-lg">
                18+
              </span>
            ) : null}

            <button
              onClick={() => toggleFavorite(movie.id)}
              className="absolute top-0 right-0 z-40 p-2 bg-black/40 rounded-full m-2"
            >
              {favoriteId.includes(movie.id) ? (
                <StarIcon fill="yellow" className="text-yellow-500" />
              ) : (
                <StarIcon className="text-white" />
              )}
            </button>
            <Link
              to={`/details/${movie.id}`}
              className="text-white cursor-pointer relative"
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
                  className="w-full h-full object-cover rounded-lg"
                />
              </li>
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
}
