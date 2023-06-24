import React from "react";
import { useSelector } from "react-redux";

export const MoviesStats = () => {
  const stats = useSelector((state) => state.movies.stats);
  const page = useSelector((state)=>state.movies.page)
  return (
    <div className="stats">
      <h3 className="stats-header">Stats</h3>
      <div className="stats-item">
        Current Page : <span id="current-page-value">{page}</span>
      </div>
      <div className="stats-item">
        Number of movies :
        <span id="total-movies-value">{stats.numberOfMovies}</span>
      </div>
      <div className="stats-item">
        Top rated movie:{" "}
        <span id="top-rated-value">{stats.topRatedMovie}</span>
      </div>
      <div className="stats-item">
        Rating : <span id="top-rating-value">{stats.topRatedMovieRating}</span>
      </div>
    </div>
  );
};
