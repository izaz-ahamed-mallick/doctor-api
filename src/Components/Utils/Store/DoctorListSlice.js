// src/Utils/Store/DoctorListSlice.js
import { createSlice } from "@reduxjs/toolkit";

const doctorListSlice = createSlice({
    name: "doctorList",
    initialState: {
        doctorLists: null,
        cache: {
            allDoctors: null,
            allDept: null,
            departmentWise: {},
        },
    },
    reducers: {
        addDoctorList: (state, action) => {
            state.doctorLists = action.payload;
        },
        updateCache: (state, action) => {
            state.cache = { ...state.cache, ...action.payload };
        },
    },
});

export const { addDoctorList, updateCache } = doctorListSlice.actions;
export default doctorListSlice.reducer;
