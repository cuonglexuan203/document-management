import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface User {
    info: UserInfo
}


export interface UserInfo {
    id: number,
    fullName: string,
    birthday: string,
    email: string,
    ministry: string,
    roles: string[],
}

const initialInfo = {
    id: 0,
    fullName: "",
    birthday: "",
    email: "",
    ministry: "",
    roles: []

}


const initialState: User = {
    info: initialInfo,
}



export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<UserInfo>) => {

            state.info = { ...action.payload }
        },
        removeUser: (state) => {
            state.info = initialInfo
        }
    }
})

export const { updateUser, removeUser } = userSlice.actions;
export default userSlice.reducer;