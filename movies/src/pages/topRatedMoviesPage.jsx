import React from "react";
import { useQuery } from "@tanstack/react-query";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import { getTopRatedMovies } from "../api/tmdb-api";

export default function TopRatedMoviesPage() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["top_rated"],     
    queryFn: getTopRatedMovies, 
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results ?? [];
  return (
    <PageTemplate
      title="Top Rated"
      movies={movies}
      action={(m) => <AddToFavoritesIcon movie={m} />}
    />
  );
}
