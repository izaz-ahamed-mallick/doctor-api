import { createSlice } from "@reduxjs/toolkit";

const DoctorSlice = createSlice({
    name: "doctorDetails",
    initialState: {
        doctorDetails: null,
    },
    reducers: {
        addDoctorDetails: (state, action) => {
            state.doctorDetails = action.payload;
        },
    },
});

export const { addDoctorDetails } = DoctorSlice.actions;
export default DoctorSlice.reducer;
