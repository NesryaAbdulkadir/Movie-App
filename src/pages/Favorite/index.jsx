import React, { useContext, useEffect, useState } from "react";
import { MovieContext } from "../../context";
import PopularMovies from "../../components/PopularMovies";

export default function Favorite() {
  const { favoriteId, loading, setLoading, setFavoriteId, setMovies } =
    useContext(MovieContext);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      setTimeout(async () => {
        const apiKey = import.meta.env.VITE_API_KEY;
        const fetchedMovies = [];

        if (favoriteId.length === 0) {
          console.log("No favorite IDs found.");
          setLoading(false);
          return;
        }

        for (const id of favoriteId) {
          const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${apiKey}`;
          const res = await fetch(url);

          if (!res.ok) {
            throw new Error(`Failed to fetch movie with ID ${id}`);
          }

          const data = await res.json();
          fetchedMovies.push(data);
        }

        setFavoriteMovies(fetchedMovies);
      }, 1000);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen  flex flex-col gap-10">
      <h1 className="text-center text-5xl font-bold lg:px-40 px-10 py-10">
        Favorite Movies
      </h1>
      {favoriteMovies.length > 0 ? (
        <PopularMovies
          movies={favoriteMovies}
          setMovies={setMovies}
          loading={loading}
          setLoading={setLoading}
          favoriteId={favoriteId}
          setFavoriteId={setFavoriteId}
        />
      ) : (
        <div className="text-center text-gray-400 flex flex-col items-center gap-5 mt-10">
          <h2 className="text-center text-5xl font-bold">
            You have no favorite movies.
          </h2>
          <p>Add some favorite movies to see them here.</p>
          <a href="/" className="text-blue-500 underline">
            Go to dashboard
          </a>
        </div>
      )}
    </div>
  );
}
