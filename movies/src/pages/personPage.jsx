import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getPerson, getPersonMovieCredits } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import MovieList from "../components/movieList";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

export default function PersonPage() {
  const { id } = useParams();

  const { data: person, isPending: pLoading, isError: pErr, error: pError } = useQuery({
    queryKey: ["person", { id }],
    queryFn: getPerson,
  });

  const { data: credits, isPending: cLoading, isError: cErr, error: cError } = useQuery({
    queryKey: ["person-credits", { id }],
    queryFn: getPersonMovieCredits,
  });

  if (pLoading || cLoading) return <Spinner />;
  if (pErr) return <h1>{pError.message}</h1>;
  if (cErr) return <h1>{cError.message}</h1>;

  const movies = credits?.crew?.length ? credits.crew : credits?.cast || [];

  return (
    <div style={{ padding: 16 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          {person.profile_path && (
            <CardMedia
              component="img"
              image={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
              alt={person.name}
              sx={{ borderRadius: 2 }}
            />
          )}
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography variant="h4" gutterBottom>{person.name}</Typography>
          <Typography variant="subtitle1" gutterBottom>
            {person.known_for_department || "Film Professional"}
          </Typography>
          {person.biography && (
            <Typography variant="body1" paragraph sx={{ whiteSpace: "pre-line" }}>
              {person.biography}
            </Typography>
          )}
        </Grid>
      </Grid>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Movies</Typography>
      <MovieList movies={movies} action={(m) => <AddToFavoritesIcon movie={m} />} />
    </div>
  );
}