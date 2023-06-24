import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementPage,
  fetchMovies,
  incrementPage
} from "../../store/movies/moviesSlice";

export const MoviesPagination = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.movies.page);
  return (
    <div className="movies-pagination">
      <button
        type="button"
        class="btn btn-secondary"
        id="prev-btn"
        onClick={() => {
          dispatch(decrementPage());
          dispatch(fetchMovies(page - 1));
        }}
      >
        Prev
      </button>
      <button
        type="button"
        class="btn btn-primary"
        id="next-btn"
        onClick={() => {
          dispatch(incrementPage());
          dispatch(fetchMovies(page + 1));
        }}
      >
        Next
      </button>
    </div>
  );
};
