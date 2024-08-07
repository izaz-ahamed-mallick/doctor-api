import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";

const AppStore = configureStore({
    reducer: {
        Auth: AuthSlice,
    },
});

export default AppStore;
