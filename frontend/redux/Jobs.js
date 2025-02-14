import { createSlice } from "@reduxjs/toolkit";

const JobsSlice = createSlice({
    name:"Jobs",
    initialState:{
        jobs:[],
        singleJobs:null
    },
    reducers:{
        setAllJobs:(state,action)=>{
             state.jobs = action.payload
        },
        setSingleJob:(state,action)=>{
            state.singleJobs = action.payload
        }
    }
})
export  const JobsActions = JobsSlice.actions;
export default JobsSlice.reducer;