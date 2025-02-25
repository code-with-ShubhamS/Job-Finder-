import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { CompanyAction } from '../../../redux/Company.js';
import { VITE_COMPANY_API_END_POINT } from "../../../URI.js";

const CreateCompany = () => {
    const [companyName, setCompanyName] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [isTouched, setIsTouched] = useState(false);
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch()
    useEffect(() => {
      setIsValid(companyName.trim().length >= 2);
    }, [companyName]);
  
    async function handleSubmit(e) {
      e.preventDefault();
      setLoading(true)
      try {  
        const res = await fetch(`${VITE_COMPANY_API_END_POINT}/register`,{
          method:"POST",
          credentials:"include",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({companyName})
        })
        const data = await res.json();
        toast({
          title: data?.msg,
          status: "success",
          duration: 2000,
        })
        
        if(data.company && data.success){
          dispatch(CompanyAction.setSingleCompany(data?.company))
          navigate(`/admin/companies/${data?.company?._id}`)
        }
      } catch (error) {
        console.log(error);
        toast({
          variant:"destructive",
          title:"Opps! Something went wrong",
          description: error?.msg,
          duration: 2000,
        })
      } finally{
        setLoading(false)
      }
    }
  return (
    <div className="flex-grow">
    <Card className="w-[100vw] border-none transition-all duration-300">
      <form onSubmit={handleSubmit} className="">
        <CardHeader className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-100">
            Your Company Name
          </h2>
          <p className="text-slate-400">
            What would you like to name your company? You can change this later
          </p>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <Input
              autoFocus
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
                setIsTouched(true);
              }}
              placeholder="JobHunt, Microsoft, etc."
              className="bg-slate-700 border-slate-600 text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            
            {isTouched && !isValid && (
              <p className="text-red-400 text-sm animate-pulse">
                Company name must be at least 2 characters
              </p>
            )}
            
            <div className="flex items-center justify-between text-slate-400 text-sm">
              <span>{companyName.length}/50</span>
              <span className="transition-opacity duration-200">
                {isValid ? "✓ Valid" : "✗ Invalid"}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            className="w-full bg-transparent text-slate-300 border-slate-600 hover:bg-slate-700 hover:text-slate-100 transition-colors"
          >{loading && <Loader2 className="animate-spin w-6 h-6 text-primary" />}
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!isValid || loading}
            className="w-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >{loading && <Loader2 className="animate-spin w-6 h-6 text-primary" />}
            Continue
          </Button>
        </CardFooter>
      </form>
    </Card>
  </div>
  )
}

export default CreateCompany
