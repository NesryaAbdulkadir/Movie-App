import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  async function fetchMovies() {
    const apiKey = import.meta.env.VITE_API_KEY;

    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    setMovie(data);
    console.log(data);
  }
  useEffect(() => {
    fetchMovies();
  }, [id]);

  console.log(movie);

  return (
    <div className="w-full relative">
      <img
        src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
        alt="{movie?.title}"
        className="w-full h-full object-cover blur-sm"
      />

      <ul className="flex flex-wrap gap-4 absolute top-0 left-0 w-[90%] p-20">
        <li className="flex gap-5 items-center w-full">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
            alt={movie?.title}
            className="w-96 h-full object-cover rounded-lg"
          />
          <div className="bg-black/40 backdrop-blur-xl p-6 rounded-lg shadow-md  bottom-0 left-0 w-full flex flex-col gap-4 relative">
            <span className="absolute right-0 top-0 bg-yellow-400 text-black p-2  rounded-b-md">
              {movie?.status}
            </span>
            <div className="flex flex-col justify-between">
              <h2 className="text-2xl font-bold text-white">{movie?.title}</h2>
              <p className="text-white">{movie?.tagline}</p>
            </div>
            <div className="flex gap-4">
              {movie?.genre_ids?.map((genre) => (
                <p key={genre} className="text-white">
                  {genres[genre]}
                </p>
              ))}
            </div>
            <span className="text-white">Rating: {movie?.vote_average}%</span>
            <p className="text-white">Language: {movie?.original_language}</p>
            <p className="text-white">Realese Date: {movie?.release_date}</p>
            <p className="text-white">{movie?.overview}</p>
            <div className="flex gap-6 items-center flex-wrap">
              <p className="text-white">Run Time: {movie?.runtime} min</p>
            </div>
            <p className="text-white">Budget: {movie?.budget} USD</p>
            <a
              href={movie?.homepage}
              target="_blank"
              className="text-white underline cursor-pointer"
            >
              {movie?.homepage}
            </a>
          </div>
        </li>
      </ul>
    </div>
  );
}
