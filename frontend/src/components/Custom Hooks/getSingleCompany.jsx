import { toast } from '@/hooks/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { CompanyAction } from '../../../redux/Company.js';
import { VITE_COMPANY_API_END_POINT } from '../../../URI.js';
const getSingleCompany = (id) => {
    const dispatch = useDispatch()
    const [error,setError] = useState(false);
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        async function getSingleCompanyInfo(){
            try {
                setLoading(true)
                const res = await fetch(`${VITE_COMPANY_API_END_POINT}/get/${id}`,{
                    method:"GET",
                    credentials:"include"
                })
                const data = await res.json();
                if(data.success){
                    dispatch(CompanyAction.setSingleCompany(data?.company))
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
                    description: error?.msg,
                })
                console.log(error)
            }finally{
                setLoading(false)
            }
        }
        getSingleCompanyInfo();
    },[id])
  return {loading,error};
}

export default getSingleCompany
