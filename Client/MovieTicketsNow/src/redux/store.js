import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import loaderReducer from "./slices/loaderSlice";
import modalReducer from "./slices/modalSlice";
import movieReducer from "./slices/movieSlice";
import theatreReducer from "./slices/theatreSlice";

const store = configureStore({
  reducer: {
    loaders: loaderReducer,
    users: userReducer,
    modal: modalReducer,
    movie: movieReducer,
    theatre: theatreReducer,
  },
});

export default store;
