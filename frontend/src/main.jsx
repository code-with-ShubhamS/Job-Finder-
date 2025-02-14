import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router'
import Signup from './components/myComponent/Signup'
import HeroSection from './components/myComponent/HeroSection'
import Login from './components/myComponent/Login'
import Signup_Login from './components/myComponent/Signup_Login'
import { Toaster } from './components/ui/toaster'
import { Provider } from 'react-redux'
import store from '../redux/store.js'
import JobsSection from './components/myComponent/JobsSection'
import UserProfile from './components/myComponent/UserProfile'
import JobDescription from './components/myComponent/JobDescription'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import CreateJobs from './components/Recruiters/CreateCompany'
import Companies from './components/Recruiters/Companies'
import CreateCompany from './components/Recruiters/CreateCompany'

let persistor = persistStore(store);
const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>,
    children:[
      {
        path:"/",
        element: <HeroSection/>
      },
      {
        path:"/jobs",
        element:<JobsSection/>
      },
      {
        path:"/profile",
        element:<UserProfile/>
      },
      {
        path:"/description/:id",
        element:<JobDescription/>
      },
      {
        path:"/admin/companies",
        element: <Companies/>
      },
      {
        path:"/admin/companies/create",
        element: <CreateCompany/>
      }
    ]
  },
  {
    path: "/auth",
    element: <Signup_Login />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <RouterProvider router={router}/>
    <Toaster />
    </PersistGate>
    </Provider>
  </StrictMode>,
)
