import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: 'emailAuth',
    initialState: {
        isLoggedIn: false,
        email: undefined,
        name: undefined,
        role: undefined,
        chekcing: true,
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.role = action.payload.role;
            state.checking = false;
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.email = undefined;
            state.name = undefined;
            state.role = undefined;
            state.chekcing = false;
        },
        startChecking: (state) => { state.checking = true; },
        updateRole: (state, action) => { state.role = action.payload.role; }
    }
});


export const { login, logout, startChecking, updateRole } = userSlice.actions;
export default userSlice.reducer;