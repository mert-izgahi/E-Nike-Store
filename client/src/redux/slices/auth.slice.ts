import { IUser } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthSliceState {
  isAuthenticated: boolean;
  currentUser: IUser | null;
  isLoading: boolean;
}

const initialState: AuthSliceState = {
  isAuthenticated: false,
  currentUser: null,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
});


