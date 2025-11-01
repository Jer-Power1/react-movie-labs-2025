import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getCredits, getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMoviePage";
import Grid from "@mui/material/Grid";
import CastCard from "../components/cast/index";

export default function CastPage() {
  const { id } = useParams();
  
  const { data: movie, isPending: mLoading, isError: mErr, error: mError } = useQuery({
    queryKey: ["movie", { id }],
    queryFn: getMovie,
    });

  const { data: credits, isPending: cLoading, isError: cErr, error: cError } = useQuery({
    queryKey: ["credits", { id }],
    queryFn: getCredits,
  });

  if (mLoading || cLoading) return <Spinner />;
  if (mErr) return <h1>{mError.message}</h1>;
  if (cErr) return <h1>{cError.message}</h1>;

  const cast = credits?.cast ?? [];

  return (
    <PageTemplate movie={movie}>
      <Grid container spacing={2}>
        {cast.map((person) => (
          <Grid key={person.cast_id ?? `${person.id}-${person.credit_id}`} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <CastCard person={person} />
          </Grid>
        ))}
      </Grid>
    </PageTemplate>
  );
}