import { createContext, useEffect, useState } from "react";

const MovieContext = createContext();

function MovieProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [favoriteId, setFavoriteId] = useState(() => {
    // Initialize favoriteId from local storage if it exists
    const storedFavorites = localStorage.getItem("favorite-id");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const saveToLocalStorage = () => {
    if (favoriteId) {
      localStorage.setItem("favorite-id", JSON.stringify(favoriteId));
    }
  };

  useEffect(() => {
    saveToLocalStorage();
  }, [favoriteId, setFavoriteId]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorite-id");
    if (storedFavorites) {
      setFavoriteId(JSON.parse(storedFavorites));
    }
  }, []);

  const value = {
    movies,
    setMovies,
    loading,
    setLoading,
    error,
    setError,
    favoriteId,
    setFavoriteId,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
}

export { MovieContext, MovieProvider };
