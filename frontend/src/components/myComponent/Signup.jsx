import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { VITE_USER_API_END_POINT } from "../../../URI.js";

export default function SignupPage() {
  const navigate = useNavigate()
  const user = useSelector(store=>store.userProfile)
  useEffect(()=>{
    if(user){
      toast({
        title: "User has already account",
        duration: 1000,
        status: "success",
      })
      navigate("/");
    }
  },[])
  // const dispatch = useDispatch();
  const [loading,setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "jobseeker",
    photo: null,
  });

  const handleChange = (e) => {
    if(e.target.role){
      setFormData({ ...formData, role : e.target.value });
    }else{
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files?.[0]});
  };

  const handleSubmit = async ()=>{
    const {name,email,phoneNumber,password,role,photo} = formData;
    if(!name|| !email || !phoneNumber || !password || !role || !photo){
      toast({
        variant: "destructive",
        title: "Please fill all fields.",
        status: "error",
        duration: 2000,
      });
      return;
    }else{
    const form = new FormData();
    form.append("name", name);
    form.append("email", email);
    form.append("phoneNumber", phoneNumber);
    form.append("password", password);
    form.append("role", role);
    form.append("photo", photo);
    
      try {
        setLoading(true)
        const res = await fetch(`${VITE_USER_API_END_POINT}/register`,{
          method:"POST",
          body:form,
          credentials:"include"
        });
        const data = await res.json();
        toast({
          title: data.msg,
          duration: 1000,
          status: "success",
        })
        if(data.success){
          setTimeout(()=>{
            navigate("/auth/login")
          },400);
        }
      }  catch (error) {
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
    
  }

  return (
    <div className="flex justify-center items-center flex-grow  px-4">
      <Card className="w-full max-w-2xl p-8  text-white rounded-2xl shadow-2xl border border-gray-700">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-blue-400">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-gray-300">Name</Label>
              <Input id="name" name="name" type="text" onChange={handleChange} className="mt-1 bg-gray-700 border-none text-white" />
            </div>
            <div>
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input id="email" name="email" type="email" onChange={handleChange} className="mt-1 bg-gray-700 border-none text-white" />
            </div>
            <div>
              <Label htmlFor="phoneNumber" className="text-gray-300">Phone Number</Label>
              <Input id="phoneNumber" name="phoneNumber" type="tel" onChange={handleChange} className="mt-1 bg-gray-700 border-none text-white" />
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
                  <Label htmlFor="jobseeker" className="text-gray-300">Jobseeker</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="recruiter" id="recruiter" name="role" onClick={handleChange} className="bg-gray-700" />
                  <Label htmlFor="recruiter" className="text-gray-300">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="photo" className="text-gray-300">Upload Photo</Label>
              <Input id="photo" accept="image/*" name="photo" type="file" onChange={handleFileChange} className="mt-1 bg-gray-700 border-none text-white" />
            </div>
            <div>
              {loading ?<Button className="w-full mt-4  text-lg py-3 "><Loader2 className="animate-spin w-6 h-6 text-primary" />Please Wait</Button>  : <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-lg py-3 rounded-lg shadow-lg transition-all duration-300" onClick={handleSubmit}>Sign Up</Button> }
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
