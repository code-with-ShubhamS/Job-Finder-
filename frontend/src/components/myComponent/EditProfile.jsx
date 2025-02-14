import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from "../../../redux/UserProfile";
import { Loader2 } from 'lucide-react'
import { toast } from '@/hooks/use-toast'


const EditProfile = ({open,setOpen}) => {

const user = useSelector(store=>store.userProfile);
const [loading,setLoading] = useState(false);
const dispatch = useDispatch();

const [input,setInput] = useState({
  name: user?.name || "",
  email: user?.email || "",
  phoneNumber: user?.phoneNumber || "",
  bio : user?.bio || "",
  skills : user?.skills || "",
  file:user?.profile?.resume || ""
})

const onChangeHandler =(e)=>{
  setInput({...input,[e.target.name]:e.target.value})
}

const onFileChange = (e)=>{
  const file = e.target?.files[0];
  if (file.size > 2 * 1024 * 1024) {
    toast({
      variant: "destructive",
      title: "File size must be 2MB or less.",
      status: "error",
      duration: 2000,
    });
    return;
  }
  if(file){
    setInput({...input,file})
  }
}

async function onSubmitData(){
  const formData = new FormData();
  Object.entries(input).forEach(([key, value]) => {
    formData.append(key, value);
  });

  try {
    setLoading(true)
    const res = await fetch("http://localhost:5000/api/v1/user/profile/update",{
      method:"PUT",
      credentials:"include",
      body:formData
    })
    const data = await res.json();
    if(data.success){
      dispatch(userActions.setProfile(data.user))
    }
      toast({
        title: data?.msg,
        status: "success",
      })
    
  } catch (error) {
    console.log(error);
    // toast.error(error.data.msg)
  } finally{
    setLoading(false)
  }
}
      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]" onInteractOutside={()=>{setOpen(false)}} >
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={(event) => {
							event.preventDefault();
							onSubmitData().then(() => setOpen(false));
						}}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue={input.name}
                  className="col-span-3"
                  onChange={onChangeHandler}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input id="email" name="email" type="email" className="col-span-3"  defaultValue={input.email}  onChange={onChangeHandler}/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phoneNumber" className="text-right">
                  Phone no
                </Label>
                <Input
                  id="phoneNumber"
                  defaultValue={input.phoneNumber}
                  className="col-span-3"
                  type="tel"
                  name="phoneNumber"
                  onChange={onChangeHandler}
                />
              </div>
             
              <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">Bio</Label>
              <Input id="bio" name="bio" type="text" className="col-span-3"  defaultValue={input.bio}  onChange={onChangeHandler}/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills" className="text-right">skills</Label>
              <Input id="skills" name="skills" type="text" className="col-span-3"  defaultValue={input.skills}  onChange={onChangeHandler}/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="resume" className="text-right">Resume</Label>
              <Input id="resume" name="resume" type="file" accept="application/pdf" className="col-span-3" onChange={onFileChange}/>
            </div>
            </div>
            <DialogFooter>
              {loading ? <Button><Loader2 className="animate-spin w-6 h-6 text-primary" />Please Wait</Button> : <Button type="submit">Save changes</Button>}
              
            </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )
    }

export default EditProfile
