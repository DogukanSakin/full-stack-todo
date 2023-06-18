import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IModalState {
  modals: {
    [key: string]: boolean;
  };
}
const initialState: IModalState = {
  modals: {
    add: false,

  },
};

type enabledModals = "add";
export const modalSlice = createSlice({
  name: "modalVisible",
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<enabledModals>) {
      state.modals[action.payload] = true;
    },
    closeModal(state, action: PayloadAction<enabledModals>) {
      state.modals[action.payload] = false;
    },

  },
});
export const { openModal, closeModal} = modalSlice.actions;
export default modalSlice.reducer;