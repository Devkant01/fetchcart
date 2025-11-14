import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value : 0
    },
    reducers: {
        increment: state => {
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
        incrementByAmout: (state, action) => {
            state.value += action.value
        }
    }
})

//here increment, decrement, incrementByAmout are called actions
export const { increment, decrement, incrementByAmout } = counterSlice.actions;
export default counterSlice.reducer;