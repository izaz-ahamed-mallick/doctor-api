// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const isAuthenticated = localStorage.getItem("token") ? true : false;

const initialState = {
    isAuthenticated: isAuthenticated,
    userData: isAuthenticated
        ? {
              image: localStorage.getItem("image"),
              id: localStorage.getItem("userId"),
              name: localStorage.getItem("userName"),
          }
        : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            const { token, id, name, image } = action.payload;
            state.isAuthenticated = true;
            state.userData = { id, name, image };
            localStorage.setItem("token", token);
            localStorage.setItem("userName", name);
            localStorage.setItem("userId", id);
            localStorage.setItem("image", image);
        },
        logout(state) {
            state.isAuthenticated = false;
            state.userData = null;
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("userName");
            localStorage.removeItem("image");
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
