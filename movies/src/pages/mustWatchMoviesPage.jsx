import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromMustWatch from "../components/cardIcons/removeFromMustWatch";
import WriteReview from "../components/cardIcons/writeReview"; // optional

const MustWatchMoviesPage = () => {
  const { mustWatch: movieIds } = useContext(MoviesContext);

  // fetch all selected movies in parallel
  const queries = useQueries({
    queries: movieIds.map((id) => ({
      queryKey: ["movie", { id }],
      queryFn: getMovie,
    })),
  });

  const pending = queries.some((q) => q.isPending);
  if (pending) return <Spinner />;

  // Filter out errored/undefined
  const movies = queries
    .map((q) => q.data)
    .filter(Boolean)
    .map((m) => ({
      ...m,
      // template expects genre_ids; map from detail shape
      genre_ids: (m.genres || []).map((g) => g.id),
    }));

  return (
    <PageTemplate
      title="Must-Watch Movies"
      movies={movies}
      action={(movie) => (
        <>
          <RemoveFromMustWatch movie={movie} />
          <WriteReview movie={movie} />
        </>
      )}
    />
  );
};

export default MustWatchMoviesPage;
