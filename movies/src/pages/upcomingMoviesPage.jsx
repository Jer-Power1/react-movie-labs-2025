import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToPlaylist from "../components/cardIcons/addToPlaylist"; 

export default function UpcomingMoviesPage() {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["upcoming"],
    queryFn: getUpcomingMovies,
  });

  if (isPending) return <Spinner />;
  if (isError)   return <h1>{error.message}</h1>;

  const movies = data?.results ?? [];

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => <AddToPlaylist movie={movie} />}  // step 3
    />
  );
}
