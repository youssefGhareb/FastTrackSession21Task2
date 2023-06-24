import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovies,
  setIsMovieModalOpen,
  setModalMovie
} from "../../store/movies/moviesSlice";
import { MoviesStats } from "../MoviesStats/MoviesStats";
import { MoviesPagination } from "../MoviesPagination/MoviesPagination";
import { MovieModal } from "../MovieModal/MovieModal";

export const Movies = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const page = useSelector((state) => state.movies.page);
  const isModalOpen = useSelector((state) => state.movies.isModalOpen);

  useEffect(() => {
    dispatch(fetchMovies(page));
  }, []);

  return (
    <div className="movies">
      <div className="container">
        <h1>Movies</h1>
        <MoviesStats />
        <div className="movies-data">
          <div className="row gy-4" id="movies-row-wrapper">
            {Array.isArray(movies) &&
              movies.length > 0 &&
              movies.map((movie) => {
                return (
                  <div className="col-md-3">
                    <div
                      className="movies-data-movie"
                      onClick={() => {
                        dispatch(setIsMovieModalOpen(true));
                        dispatch(setModalMovie(movie));
                      }}
                    >
                      <div className="movies-data-movie-imgCont">
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                          alt=""
                        />
                      </div>
                      <div className="movies-data-movie-body">
                        <h4 className="movies-data-movie-body-title">
                          {movie.title}
                        </h4>
                        <span className="movies-data-movie-body-rating">
                          {movie.vote_average}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <MoviesPagination />
      </div>

      {isModalOpen && <MovieModal />}
    </div>
  );
};
