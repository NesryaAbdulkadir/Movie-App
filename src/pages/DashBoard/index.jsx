import React from "react";
import PopularMovies from "../../components/PopularMovies";

export default function DashBoard() {
  return (
    <div>
      <h1 className="text-black text-7xl text-center font-bold pt-10 pb-10">
        Popular Movies
      </h1>
      <PopularMovies />
    </div>
  );
}
