import { createSlice } from "@reduxjs/toolkit";

const CompanySlice = createSlice({
    name:"Company",
    initialState:{
       setSingleCompany:null,
       allCompany:[]
    },
    reducers:{
      setSingleCompany:(state,action)=>{
        state.setSingleCompany = action.payload;
      },
      setCompanies:(state,action)=>{
        state.allCompany = action.payload;
      } 
    }
})
export  const CompanyAction = CompanySlice.actions;
export default CompanySlice.reducer;