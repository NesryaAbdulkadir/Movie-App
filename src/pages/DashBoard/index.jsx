import React, { useContext, useState } from "react";
import PopularMovies from "../../components/PopularMovies";
import Search from "../../components/Search";
import { MovieContext } from "../../context";
import { StarIcon } from "lucide-react";

export default function DashBoard() {
  const { movies, setMovies, loading, setLoading, setFavoriteId, favoriteId } =
    useContext(MovieContext);

  return (
    <div>
      <Search setMovies={setMovies} setLoading={setLoading} />
      <h1 className="text-black lg:text-7xl md:text-6xl text-4xl text-wrap text-center font-bold pt-10 pb-10 px-10">
        Popular Movies
      </h1>

      <PopularMovies
        movies={movies}
        setMovies={setMovies}
        loading={loading}
        setLoading={setLoading}
        favoriteId={favoriteId}
        setFavoriteId={setFavoriteId}
      />
    </div>
  );
}
