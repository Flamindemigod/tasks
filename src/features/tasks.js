import { createSlice } from "@reduxjs/toolkit";


export const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        value: {
            tasks: []
        }
    },
    reducers: {
        addTask: (state, action) => {
            //action -> userObject
            state.value.tasks = [...state.value.tasks, action.payload];
        },
        getSupabaseData: (state, action) =>{
          state.value.tasks = action.payload;
        },
        unsetAll: (state, action) =>{
          state.value.tasks=[];
        }
    }
});

export const { addTask, getSupabaseData, unsetAll } = tasksSlice.actions;

export default tasksSlice.reducer;