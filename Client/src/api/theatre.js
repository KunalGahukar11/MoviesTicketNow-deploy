import { axiosInstance } from ".";

export const createTheatre = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/add-theatre",
      payload
    );
    console.log(response);

    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error);

      throw new Error(error.response.data.error);
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

export const getAllTheatresForAdmin = async () => {
  try {
    const response = await axiosInstance.get("/api/theatres/get-all-theatre");
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error);

      throw new Error(error.response.data.error);
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

export const getOwnersTheatre = async (ownerId) => {
  try {
    const response = await axiosInstance.get(
      `/api/theatres/get-theatre/${ownerId}`
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error);

      throw new Error(error.response.data.error);
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

export const updateTheatre = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/api/theatres/update-theatre",
      payload
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error);

      throw new Error(error.response.data.error);
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

export const deleteTheatre = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/api/theatres/delete-theatre",
      payload
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error);

      throw new Error(error.response.data.error);
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};
