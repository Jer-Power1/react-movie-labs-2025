import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [myReviews, setMyReviews] = useState({});
  const [mustWatch, setMustWatch] = useState([]); 

  const addToFavorites = (movie) => {
    if (!favorites.includes(movie.id)) setFavorites((prev) => [...prev, movie.id]);
  };

  const removeFromFavorites = (movie) => {
    setFavorites((prev) => prev.filter((mId) => mId !== movie.id));
  };

  const addReview = (movie, review) => {
    setMyReviews((prev) => ({ ...prev, [movie.id]: review }));
  };

  
  const addToMustWatch = (movie) => {
    setMustWatch((prev) => {
      const next = prev.includes(movie.id) ? prev : [...prev, movie.id];
      console.log("Must-Watch IDs:", next);
      return next;
    });
  };

  const removeFromMustWatch = (movie) => {
    setMustWatch((prev) => prev.filter((id) => id !== movie.id));
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        myReviews,
        mustWatch,              
        addToMustWatch,         
        removeFromMustWatch,    
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
