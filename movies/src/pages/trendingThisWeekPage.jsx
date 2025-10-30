import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import { getTrendingThisWeek } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const TrendingThisWeekPage = () => {
    const {data, error, isPending, isError} = useQuery({
        queryKey: ["trending-week"],
        queryFn: getTrendingThisWeek,
    });

    if (isPending) return <Spinner/>;
    if (isError) return <h1>{error.message}</h1>

    const movies = data.results;

    return(
    <PageTemplate
    title = "Trending This Week"
    movies = {movies}
    action = {(movie) => <AddToFavoritesIcon movie = {movie}/>}
    />
    );
};

export default TrendingThisWeekPage;