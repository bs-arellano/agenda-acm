import { createSlice } from "@reduxjs/toolkit";

const storedAuthState = sessionStorage.getItem('authState');
const initialState = storedAuthState ? JSON.parse(storedAuthState) : {
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        signin: (state, action) => {
            state.user = action.payload
            state.isAuthenticated = true
            sessionStorage.setItem('authState', JSON.stringify(state));
        },
        signout: (state) => {
            state.user = null
            state.isAuthenticated = false
            sessionStorage.removeItem('authState');
        }
    }
})

export const { signin, signout } = authSlice.actions
export default authSlice.reducer