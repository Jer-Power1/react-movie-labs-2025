import React from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const AddToPlaylist = ({ movie, onClick }) => (
  <IconButton
    aria-label={`add ${movie?.title ?? "movie"} to must-watch`}
    onClick={(e) => {
      e.preventDefault();
      onClick?.(movie);
    }}
  >
    <PlaylistAddIcon />
  </IconButton>
);

export default AddToPlaylist;
