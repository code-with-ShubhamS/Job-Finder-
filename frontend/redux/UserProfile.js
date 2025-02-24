import { createSlice } from "@reduxjs/toolkit";
import { persistStore } from 'redux-persist'
// import store from "./store";

// let persistor = persistStore(store);
const userProfileSlice = createSlice({
  name: "Profile",
  initialState: null,
  reducers: {
    setProfile: (state, actions) => {
    //   localStorage.clear(); // Clears all localStorage data
    //   persistor.purge(); // Clears persisted Redux state
    //   window.location.reload(); // Optional
      return (state = actions.payload);
    },
  },
});

export const userActions = userProfileSlice.actions;
export default userProfileSlice.reducer;
