import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToPlaylist from "../components/cardIcons/addToPlaylist";
import { MoviesContext } from "../contexts/moviesContext";  

export default function UpcomingMoviesPage() {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["upcoming"],
    queryFn: getUpcomingMovies,
  });

  const { addToMustWatch } = useContext(MoviesContext);

  if (isPending) return <Spinner />;
  if (isError)   return <h1>{error.message}</h1>;

  const movies = data?.results ?? [];

  return (
    <PageTemplate
  title="Upcoming Movies"
  movies={movies}
  action={(movie) => <AddToPlaylist movie={movie} onClick={addToMustWatch} />}
/>
  );
}
