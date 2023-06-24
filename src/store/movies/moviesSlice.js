import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  page: 1,
  isModalOpen: false,
  modalMovie: {},
  stats: {
    numberOfMovies: 0,
    topRatedMovie: "",
    topRatedMovieRating: 0
  }
};

export const fetchMovies = createAsyncThunk(
  "app/fetchMovies",
  async (page, thunkAPI) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`
    );
    const data = await response.json();

    let numberOfMovies = data.results.length;
    let topRating = 0,
      topTitle = "";
    for (var i = 0; i < data.results.length; i++) {
      var current = data.results[i];
      if (current.vote_average > topRating) {
        topRating = current.vote_average;
        topTitle = current.title;
      }
    }
    thunkAPI.dispatch(
      setStats({
        numberOfMovies: numberOfMovies,
        topRatedMovie: topTitle,
        topRatedMovieRating: topRating
      })
    );
    
    return data.results;
  }
);

var apiKey = "3b1dd1354c97059318eb7f74932a5430",
  apiReadAccessToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjFkZDEzNTRjOTcwNTkzMThlYjdmNzQ5MzJhNTQzMCIsInN1YiI6IjY0Nzc0N2ZmODlkOTdmMDBhNThmNTY4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j3HYHh9oRgdyT9i0J2eqjQASQh7WXJG72WvY2Fa6u-U";

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    incrementPage: (state) => {
      state.page++;
    },
    decrementPage: (state) => {
      if (state.page > 0) {
        state.page--;
      }
    },
    setIsMovieModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setStats: (state, action) => {
      state.stats = action.payload;
    },
    setModalMovie: (state, action) => {
        state.modalMovie = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  }
});

export const { decrementPage, incrementPage, setIsMovieModalOpen, setStats,setModalMovie } =
  movieSlice.actions;

export default movieSlice.reducer;
