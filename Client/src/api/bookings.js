import { axiosInstance } from ".";

export const makePaymentForShow = async (token, amount) => {
  try {
    const response = await axiosInstance.post("/api/bookings/make-payment", {
      token,
      amount,
    });
    return response.data;
  } catch (error) {
    console.log(error);

    if (error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

export const bookShow = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/bookings/book-show",
      payload
    );
    return response.data;
  } catch (error) {
    console.log(error);

    if (error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};
