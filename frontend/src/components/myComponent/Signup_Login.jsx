import React from 'react'
import DarkGradientBackground from '../ui/DarkGradientBackground'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const Signup_Login = () => {
  return (
    <DarkGradientBackground>
        <div className="">
          <Header></Header>
         <Outlet></Outlet>
        </div>
      </DarkGradientBackground>
  )
}

export default Signup_Login
