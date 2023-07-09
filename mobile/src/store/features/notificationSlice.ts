import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TOAST_TYPES } from "../../constants/toastTypes";

export interface IToastNotificationProps{
    message: string;
    type: string;
    duration?: number;
    infinite?: boolean;
}
interface INotificationState {
    toast : IToastNotificationProps;
}
const initialState: INotificationState = {
    toast: {
        message: "",
        type: "",
        duration: 3000,
        infinite: false
    }
};


export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showSuccessNotification(state, action: PayloadAction<string>) {
        state.toast.message = action.payload;
        state.toast.type = TOAST_TYPES.SUCCESS;

 
    },
    showErrorNotification(state, action: PayloadAction<string>) {
        state.toast.message = action.payload;
        state.toast.type = TOAST_TYPES.ERROR;
   
    },
    showInfoNotification(state, action: PayloadAction<string>) {
        state.toast.message = action.payload;
        state.toast.type = TOAST_TYPES.INFO;
    
    }
  },
});
export const { showErrorNotification,showInfoNotification,showSuccessNotification } = notificationSlice.actions;
export default notificationSlice.reducer;