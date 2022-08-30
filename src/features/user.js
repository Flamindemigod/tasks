import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: "user",
    initialState: {
        value: {
            user: {}
        }
    },
    reducers: {
        setUser: (state, action) => {
            //action -> userObject
            state.value = action.payload;
        },
    }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;