import { toast } from '@/hooks/use-toast';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserProtectedRoute = ({children}) => {
  const user = useSelector((store) => store.userProfile);
  const navigate = useNavigate()
  useEffect(()=>{
    if(user===null || user.role!="jobseeker"){
        navigate("/");
        toast({
          title:"You are not allowed because you are not recruiter",
          duration:3000
        })
        return;
    }
  },[])
  return (
    <>
      {children}
    </>
  )
}

export default UserProtectedRoute;
