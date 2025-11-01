import React from "react";
import { useQuery } from "@tanstack/react-query";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import { getLowestRatedMovies } from "../api/tmdb-api";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const LowestRatedMoviesPage = () => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["lowest_rated"],
    queryFn: getLowestRatedMovies,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results ?? [];

  return (
    <PageTemplate
      title="Lowest Rated Movies"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};

export default LowestRatedMoviesPage;
