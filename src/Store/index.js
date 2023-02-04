import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialAuthState = { loggedIn: false };

const authSlice = createSlice({
  name: "authantication",
  initialState: initialAuthState,
  reducers: {
    logIn(state) {
      state.loggedIn = true;
      // console.log(state.loggedIn)
    },
    logOut(state) {
      state.loggedIn = false;
    },
  },
});

const store = configureStore({
  reducer: { auth: authSlice.reducer },
});

export const authActions = authSlice.actions;
export default store;