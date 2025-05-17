import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser:null 
}

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        signInSuccess:(state, action)=>{
            state.currentUser = action.payload
        }
    }
})


export const  {signInSuccess} = userSlice.actions

export default userSlice.reducer