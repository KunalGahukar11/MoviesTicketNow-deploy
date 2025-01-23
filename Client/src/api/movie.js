import { axiosInstance } from ".";

// to add movies by admin
export const addMovie = async (value) => {
  try {
    const movie = await axiosInstance.post("/api/movies/add-movie", value);
    return movie.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

// to get movies
export const getAllMovies = async () => {
  try {
    const movies = await axiosInstance.get("/api/movies/all-movies");
    return movies.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

// get movie by id
export const getMovieById = async (movieId) => {
  try {
    const movie = await axiosInstance.get(`/api/movies/by-movieId/${movieId}`);
    return movie.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

// update movies
export const updateMovie = async (payload) => {
  try {
    const movie = await axiosInstance.put("/api/movies/update-movie", payload);
    return movie.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

// delete movie
export const deleteMovie = async (payload) => {
  try {
    const movie = await axiosInstance.put("/api/movies/delete-movie", payload);
    return movie.data;
  } catch (error) {
    if (error.response) {
      console.log(error);

      throw new Error(error.response.data.error);
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};
