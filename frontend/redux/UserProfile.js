import { createSlice } from "@reduxjs/toolkit"

const userProfileSlice = createSlice({
    name:"Profile",
    initialState:null,
    reducers:{
        setProfile:(state,actions)=>{
           return state = actions.payload;
        }
    }
})

export const userActions = userProfileSlice.actions
export default userProfileSlice.reducer;