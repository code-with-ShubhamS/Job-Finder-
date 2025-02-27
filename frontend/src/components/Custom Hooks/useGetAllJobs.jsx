import { toast } from '@/hooks/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { JobsActions } from '../../../redux/Jobs.js';
import { VITE_JOB_API_END_POINT } from '../../../URI.js';
const useGetAllJobs = () => {
    const dispatch = useDispatch()
    const [error,setError] = useState(false);
    const [loading,setLoading] = useState(false);
    const [searchJob,setSearchJob] = useState("")
    useEffect(()=>{
        async function getJobs(){
            try {
                setLoading(true)
                const res = await fetch(`${VITE_JOB_API_END_POINT}/get`,{
                    method:"GET",
                    credentials:"include"
                })
                const data = await res.json();
                if(data.success){
                    dispatch(JobsActions.setAllJobs(data.jobs))
                }
                
                if(data?.msg){
                    // toast({
                    //     title: data?.msg,
                    //     status: "success",
                    // })
                }
            } catch (error) {
                setError(true);
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    // description: data?.msg,
                })
                console.log(error)
            }finally{
                setLoading(false)
            }
        }
        getJobs();
    },[searchJob])
  return {loading,error};
}

export default useGetAllJobs
