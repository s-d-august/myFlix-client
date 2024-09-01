import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: [],
  reducers: {
    setMovies: (state, action) => {
      return action.payload; // Directly return the new state array
    }
  }
});

export const { setMovies } = moviesSlice.actions;
export default moviesSlice.reducer;