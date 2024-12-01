import React from "react";
import { useRoutes } from "react-router-dom";
import DashBoard from "../pages/DashBoard";
import MovieDetails from "../pages/MovieDetails";
import Favorite from "../pages/Favorite";

export default function Routes() {
  const elements = useRoutes([
    { path: "/", element: <DashBoard /> },
    { path: "/details/:id", element: <MovieDetails /> },
    { path: "/favorite", element: <Favorite /> },
  ]);
  return elements;
}
