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
        updateTask: (state, action) =>{
          const elementIndex = state.value.tasks.findIndex((el)=>{if (el.taskid === action.payload.taskid) return true})
          state.value.tasks[elementIndex] = action.payload
        },
        getSupabaseData: (state, action) =>{
          state.value.tasks = action.payload;
        },
        deleteTask:(state, action) =>{
          console.log(state.value.tasks)
          state.value.tasks = state.value.tasks.filter((el)=>{if(el.taskid === action.payload.taskid){return false} return true})
          //delete state.value.tasks[elementIndex];
        },
        unsetAll: (state, action) =>{
          state.value.tasks=[];
        }
    }
});

export const { addTask, updateTask,deleteTask, getSupabaseData, unsetAll } = tasksSlice.actions;

export default tasksSlice.reducer;