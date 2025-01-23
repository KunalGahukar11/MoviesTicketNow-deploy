import { axiosInstance } from ".";

export const addShow = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/shows/add-show", payload);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response) {
        console.log(error);

        throw new Error(error.response.data.error);
      } else {
        throw new Error("Something went wrong. Please try again.");
      }
    }
  }
};

export const getAllShows = async () => {
  try {
    const response = await axiosInstance.get("/api/shows/get-show");
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response) {
        console.log(error);

        throw new Error(error.response.data.error);
      } else {
        throw new Error("Something went wrong. Please try again.");
      }
    }
  }
};

export const getShowByShowId = async (showId) => {
  try {
    const show = await axiosInstance.get(`/api/shows/get-show/${showId}`);
    return show.data;
  } catch (error) {
    if (error.response) {
      if (error.response) {
        console.log(error);

        throw new Error(error.response.data.error);
      } else {
        throw new Error("Something went wrong. Please try again.");
      }
    }
  }
};

export const getShowByTheatre = async (theatreId) => {
  try {
    const response = await axiosInstance.get(
      `/api/shows/get-show-by-theatre/${theatreId}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response) {
        console.log(error);

        throw new Error(error.response.data.error);
      } else {
        throw new Error("Something went wrong. Please try again.");
      }
    }
  }
};

export const getAllShowsByMovieAndDate = async ({ movie_name, date }) => {
  try {
    const theatreShowsByMovies = await axiosInstance.get(
      `/api/shows/get-all-theatres/${movie_name}/${date}`
    );
    return theatreShowsByMovies.data;
  } catch (error) {
    if (error.response) {
      if (error.response) {
        console.log(error);

        throw new Error(error.response.data.error);
      } else {
        throw new Error("Something went wrong. Please try again.");
      }
    }
  }
};

export const updateShowById = async (id, data) => {
  try {
    const updatedShow = await axiosInstance.put(
      `/api/shows/update-show/${id}`,
      data
    );
    return updatedShow.data;
  } catch (error) {
    if (error.response) {
      if (error.response) {
        console.log(error);

        throw new Error(error.response.data.error);
      } else {
        throw new Error("Something went wrong. Please try again.");
      }
    }
  }
};

export const deleteShowById = async (id) => {
  try {
    const deleted = await axiosInstance.put("/api/shows/delete-show", id);
    return deleted.data;
  } catch (error) {
    if (error.response) {
      if (error.response) {
        console.log(error);

        throw new Error(error.response.data.error);
      } else {
        throw new Error("Something went wrong. Please try again.");
      }
    }
  }
};
