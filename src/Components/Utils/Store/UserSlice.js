import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userDetails: null,
    },
    reducers: {
        addUserInfo: (state, action) => {
            state.userDetails = action.payload;
        },
    },
});

export const { addUserInfo } = userSlice.actions;
export default userSlice.reducer;
