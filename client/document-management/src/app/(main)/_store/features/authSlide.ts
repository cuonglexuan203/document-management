import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Auth {
    id: number,
    isLogging: boolean,
    isAccount: boolean,
    isSecretary: boolean,
    isAdmin: boolean,
}

const initialState: Auth = {
    id: 0,
    isLogging: false,
    isAccount: false,
    isSecretary: false,
    isAdmin: false,
}

export const ROLE = {
    Admin: "ROLE_ADMIN",
    Secrectary: "ROLE_SECRETARY",
    User: "ROLE_USER",
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn: (state, action: PayloadAction<Auth>) => {
            state.id = action.payload.id;
            state.isLogging = action.payload.isLogging;
            state.isAccount = action.payload.isAccount;
            state.isSecretary = action.payload.isSecretary
            state.isAdmin = action.payload.isAdmin;
        },
        signOut: (state) => {
            state.id = initialState.id;
            state.isLogging = initialState.isLogging;
            state.isAccount = initialState.isAccount;
            state.isSecretary = initialState.isSecretary;
            state.isAdmin = initialState.isAdmin;
        }
    }
})

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;