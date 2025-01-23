import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isModalOpen: false,
    modalFor: "movie",
  },
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },

    closeModal: (state) => {
      state.isModalOpen = false;
    },

    setModal: (state, action) => {
      state.modalFor = action.payload;
    },
  },
});

export const { openModal, closeModal, setModal } = modalSlice.actions;
export default modalSlice.reducer;
