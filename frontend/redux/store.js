import { combineReducers, configureStore } from "@reduxjs/toolkit";
 // Import your slice reducer
import userReducer from "./UserProfile.js";
import JobsReducer from './Jobs.js'
import CompanyReducer from "./Company.js"
import AdminJobsReducer from "./AdminJobs.js"
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({
  userProfile: userReducer,
    Jobs: JobsReducer,
    company:CompanyReducer,
    adminJobs:AdminJobsReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// export const store = configureStore({
//   reducer: {
//     userProfile: userReducer,
//     Jobs: JobsReducer
//   },
// });

export default store;
