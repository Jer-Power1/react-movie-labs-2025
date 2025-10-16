import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromMustWatch = ({ movie }) => {
  const { removeFromMustWatch } = useContext(MoviesContext);

  const handleClick = (e) => {
    e.preventDefault();
    removeFromMustWatch(movie);
  };

  return (
    <IconButton aria-label="remove from must watch" onClick={handleClick}>
      <PlaylistRemoveIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromMustWatch;
