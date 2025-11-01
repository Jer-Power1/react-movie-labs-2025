import React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router";
import img from "../../images/film-poster-placeholder.png";

const avatar = (path) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : img;

export default function CastCard({ person }) {
  return (
    <Card>
      <CardActionArea component={Link} to={`/person/${person.id}`}>
        <CardMedia
          sx={{ height: 278, backgroundSize: "cover" }}
          image={avatar(person.profile_path)}
          title={person.name}
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {person.name}
          </Typography>
          {person.character ? (
            <Typography variant="body2" color="text.secondary">
              as {person.character}
            </Typography>
          ) : null}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}