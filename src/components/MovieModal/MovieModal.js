import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsMovieModalOpen,
  setModalMovie
} from "../../store/movies/moviesSlice";

export const MovieModal = () => {
  const movie = useSelector((state) => state.movies.modalMovie);
  const dispatch = useDispatch();
  return (
    <div
      className="modal "
      id="movieModal"
      tabindex="-1"
      aria-labelledby="movieModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              id="modal-close"
              aria-label="Close"
              onClick={() => {
                dispatch(setModalMovie({}));
                dispatch(setIsMovieModalOpen(false));
              }}
            ></button>
          </div>
          <div className="modal-body movie">
            <div className="row align-items-center">
              <div className="col-md-5">
                <div className="imgCont">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className="col-md-7">
                <h2 className="movie-title">{movie.title}</h2>
                <h3 className="movie-rating">
                  Rating: {movie.vote_average}/10 ({movie.vote_count})
                </h3>
                <p className="lead">{movie.overview}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
