import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./UserSlice";
import DoctorDetailsReducer from "./DoctorSlice";
import DoctorListReducer from "./DoctorListSlice";
import authReducer from "./AuthSlice";

const AppStore = configureStore({
    reducer: {
        auth: authReducer,
        userInfo: userReducer,
        doctorReducer: DoctorDetailsReducer,
        doctorList: DoctorListReducer,
    },
});

export default AppStore;
