import React, { useContext, useState } from "react";

export default function Search() {
  const [value, setValue] = useState("");

  async function fetchMovies() {
    setLoading(true);
    setTimeout(async () => {
      const apiKey = import.meta.env.VITE_API_KEY;

      const url = `https://api.themoviedb.org/3/search/movie?query=${value}&page=1&api_key=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();

      setMovies(data.results);
      setLoading(false);
    }, 1000);
  }

  function handleSearch() {
    fetchMovies();
  }
  return (
    <div className="flex sm:items-center gap-4  max-w-max md:mx-auto  mt-4 mx-10 sm:flex-row flex-col">
      <input
        type="text"
        placeholder="Search for a movie"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full  border-b-2 border-black p-2 text-black text-xl outline-none"
      />
      <button
        onClick={handleSearch}
        className="py-2 px-4 rounded-md text-xl text-black bg-slate-50 hover:bg-slate-100 max-w-max"
      >
        Search
      </button>
    </div>
  );
}
