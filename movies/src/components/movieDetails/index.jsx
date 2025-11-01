import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import { useQuery } from "@tanstack/react-query";
import { getCredits, getRecommendations } from "../../api/tmdb-api";
import MovieList from "../movieList";
import AddToFavoritesIcon from "../cardIcons/addToFavorites";
import Grid from "@mui/material/Grid";



const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);


const {data: credits, isPending: creditsLoading, isError: creditsError, error} = useQuery({
  queryKey: ["credits", {id: movie.id}],
  queryFn: getCredits,
  enabled: !!movie?.id
});

const directors = credits?.crew
?.filter((p) => p.job === "Director")
.map((p) => p.name) || [];

const { data: recsData, isPending: recsLoading, isError: recsError } = useQuery({
   queryKey: ["recommendations", { id: movie.id }],
   queryFn: getRecommendations,
   enabled: !!movie?.id,
   });

   const recs = recsData?.results ?? [];



  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      {/* Director */}
      <Paper component="ul" sx={{...root }}>
        <li>
          <Chip 
          label={directors.length > 1 ? "Directors" : "Director"}
          sx={{ ...chip }}
          color="primary"
          />
        </li>
      {creditsLoading ? (
        <li><Chip label="Loading..." sx={{ ...chip }} /></li>
        ) : creditsError || directors.length === 0 ? (
         <li><Chip label="Unknown" sx={{ ...chip }} /></li>
        ) : (
        directors.map((name) => (
          <li key={name}><Chip label={name} sx={{ ...chip }} /></li>
        ))
      )}
      </Paper>

      {/* Genres */}
      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Genres" sx={{ ...chip }} color="primary" />
        </li>
        {movie.genres?.map((g) => (
          <li key={g.id ?? g.name}>
            <Chip label={g.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>

      {/* Production Countries */}
      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Production Countries" sx={{ ...chip }} color="primary" />
        </li>
        {movie.production_countries?.map((c) => (
          <li key={c.iso_3166_1 ?? c.name}>
            <Chip label={c.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>

      {/* Stats */}
      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        </li>
        <li>
          <Chip
            icon={<MonetizationIcon />}
            label={`${(movie.revenue ?? 0).toLocaleString()}`}
          />
        </li>
        <li>
          <Chip
            icon={<StarRate />}
            label={`${movie.vote_average} (${movie.vote_count})`}
          />
        </li>
        <li>
          <Chip label={`Released: ${movie.release_date}`} />
        </li>
      </Paper>

      <Typography variant="h5" component="h3" sx={{ mt: 3, mb: 1.5 }}>
        Recommended
      </Typography>

      {recsLoading ? (
        <Typography variant="body1">Loading…</Typography>
      ) : recsError ? (
        <Typography variant="body1" color="error">Couldn’t load recommendations.</Typography>
      ) : recs.length === 0 ? (
        <Typography variant="body1">No recommendations found.</Typography>
      ) : (
        // 👇 Wrap the items in a Grid container
        <Grid container spacing={2}>
          <MovieList
            movies={recs}
            action={(m) => <AddToFavoritesIcon movie={m} />}
          />
        </Grid>
      )}

      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{ position: "fixed", bottom: "1em", right: "1em" }}
      >
        <NavigationIcon />
        Reviews
      </Fab>

      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <MovieReviews movie={movie} />
      </Drawer>
    </>
  );
};

export default MovieDetails;
