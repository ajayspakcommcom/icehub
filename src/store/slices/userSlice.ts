// src/store/slices/userSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

// Define a type for the slice state
interface UserState {
    id: string | null;
    name: string | null;
    email: string | null;
}

// Define the initial state using that type
const initialState: UserState = {
    id: null,
    name: null,
    email: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
        clearUser: (state) => {
            state.id = null;
            state.name = null;
            state.email = null;
        },
        // Add other reducers here
    },
});

export const { setUser, clearUser } = userSlice.actions;
// Other selectors and operations can be defined here

// Selector
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
