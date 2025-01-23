import { createSlice } from "@reduxjs/toolkit";

const theatreSlice = createSlice({
  name: "theatre",
  initialState: {
    theatre: [],
  },
  reduces: {
    setTheatre: (state, action) => {
      state.theatre = action.payload;
    },
  },
});

export const { setTheatre } = theatreSlice.actions;
export default theatreSlice.reducer;
