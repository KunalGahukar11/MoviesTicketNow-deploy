import { axiosInstance } from ".";

export const userRegister = async (value) => {
  try {
    const user = await axiosInstance.post("/api/users/register", value);
    return user.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

export const userLogin = async (value) => {
  try {
    const userData = await axiosInstance.post("/api/users/login", value);
    return userData.data;
  } catch (error) {
    if (error.response) {
      // Handle HTTP errors explicitly
      // console.error("HTTP error:", error.response.status);
      // console.error("Error message:", error.response.data.message);
      throw new Error(error.response.data.message); // Re-throw for consistent error handling
    } else {
      // Handle other errors (network issues, etc.)
      // console.error("Unexpected error:", error.message || error);
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/api/users/get-current-user");
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};
