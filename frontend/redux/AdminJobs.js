import { createSlice } from "@reduxjs/toolkit";

const AdminJobsSlice = createSlice({
    name:"AdminJobs",
    initialState:{
        adminJobs:[]
    },
    reducers:{
        setAdminJobs:(state,action)=>{
             state.adminJobs = action.payload
        }
    }
})
export  const AdminJobsActions = AdminJobsSlice.actions;
export default AdminJobsSlice.reducer;