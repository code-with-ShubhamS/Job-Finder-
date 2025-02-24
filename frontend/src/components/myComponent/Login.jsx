import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {userActions} from "../../../redux/UserProfile.js"
import { VITE_USER_API_END_POINT } from "URI.js";

const Login = () => {
  const navigate = useNavigate();
  const user = useSelector(store=>store.userProfile)
  useEffect(()=>{
    if(user){
      navigate("/");
      toast({
        title: "User is already login",
        duration: 1000,
        status: "success",
      })
    }
  },[])
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false);
 
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "jobseeker",
      });
    
      const handleChange = (e) => {
        if(e.target.role){
          setFormData({ ...formData, role : e.target.value });
        }else{
          setFormData({ ...formData, [e.target.name]: e.target.value });
        }
      };
     
      async function handleLogin() {
        try {
          setLoading(true)
          const res = await fetch(`${VITE_USER_API_END_POINT}/login`,{
            method:"POST",
            headers:{
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
            credentials:"include"
          });
          const data = await res.json();
          
          if(data.user){
            dispatch(userActions.setProfile(data.user))
          }
          toast({
            title: data.msg,
            duration: 1000,
            status: "success",
          })
          if(data.success){
            navigate("/")
          }
        } catch (error) {
          console.log(error)
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
     <div className="flex justify-center items-center flex-grow   px-4">
       <Card className="w-full max-w-2xl p-8  text-white rounded-2xl shadow-2xl border border-gray-700">
         <CardHeader>
           <CardTitle className="text-center text-2xl font-bold text-blue-400">Login</CardTitle>
         </CardHeader>
         <CardContent>
           <div className="space-y-6">
             <div>
               <Label htmlFor="email" className="text-gray-300">Email</Label>
               <Input id="email" name="email" type="email" onChange={handleChange} className="mt-1 bg-gray-700 border-none text-white" />
             </div>
             <div>
               <Label htmlFor="password" className="text-gray-300">Password</Label>
               <Input id="password" name="password" type="password" onChange={handleChange} className="mt-1 bg-gray-700 border-none text-white" />
             </div>
             <div>
               <Label className="text-gray-300">Role</Label>
               <RadioGroup defaultValue="jobseeker" className="flex space-x-6 mt-2">
                 <div className="flex items-center space-x-2">
                   <RadioGroupItem value="jobseeker" id="jobseeker" name="role" onClick={handleChange} className="bg-gray-700" />
                   <Label htmlFor="jobseeker" className="text-gray-300">jobseeker</Label>
                 </div>
                 <div className="flex items-center space-x-2">
                   <RadioGroupItem value="recruiter" id="recruiter" name="role" onClick={handleChange} className="bg-gray-700" />
                   <Label htmlFor="recruiter" className="text-gray-300">Recruiter</Label>
                 </div>
               </RadioGroup>
             </div>
            
             <div>
              {loading ?<Button className="w-full mt-4  text-lg py-3 "><Loader2 className="animate-spin w-6 h-6 text-primary" />Please Wait</Button>  : <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-lg py-3 rounded-lg shadow-lg transition-all duration-300" onClick={handleLogin}>Login</Button> }
            </div>

             {/* <Button  className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-lg py-3 rounded-lg shadow-lg transition-all duration-300" onClick={handleLogin} >Login</Button> */}
           </div>
         </CardContent>
       </Card>
     </div>
   );
}

export default Login
