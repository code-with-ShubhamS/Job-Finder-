import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import getSingleCompany from "../Custom Hooks/getSingleCompany";
import { useSelector } from "react-redux";
import { VITE_COMPANY_API_END_POINT } from "../../../URI.js";


export default function CompanySetup() {
  const [loading, setLoading] = useState(false);
  const {id} = useParams();
  const navigate = useNavigate();
  const {loading:l,error} =  getSingleCompany(id);
  const [formData, setFormData] = useState({
    companyName: "",
    description: "",
    website:  "",
    location:"",
    logo: null,
  });
  
  const {setSingleCompany:singleCompany} = useSelector(store=>store.company)
  
useEffect(()=>{
  setFormData({
    companyName: singleCompany?.name || "",
    description:singleCompany?.description || "",
    website: singleCompany?.website || "",
    location: singleCompany?.location || "",
    logo: null,
  })
},[singleCompany])


  const [errors, setErrors] = useState({
    companyName: "",
    description: "",
    website: "",
    location: "",
    logo: "",
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      companyName: "",
      description: "",
      website: "",
      location: "",
      logo: "",
    };

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }

    if (!formData.website.trim()) {
      newErrors.website = "Website is required";
      isValid = false;
    } else if (
      !/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(
        formData.website
      )
    ) {
      newErrors.website = "Invalid website URL";
      isValid = false;
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
      isValid = false;
    }

    if (!formData.logo) {
      newErrors.logo = "Logo is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

 async function handleSubmit(e){
    e.preventDefault();
    if (validateForm()) {
      try { 
        setLoading(true)
        const form = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          form.append(key, value);
        });
        const res = await fetch(`${VITE_COMPANY_API_END_POINT}/update/${id}`,{
          method:"PUT",
          credentials:"include",
          body:form
        })
        const data = await res.json();
        toast({
          title: data?.msg,
          status: "success",
          duration: 2000,
        })
        if(data.success){
          navigate("/admin/companies")
        }
      } catch (error) {
        console.log(error)
        toast({
          varient:"destructive",
          title:"Opps! Something went wrong",
            description: error?.msg,
          duration: 2000,
        })
      }finally{
        setLoading(false)
      }
    }
  };

  return (
    <div className="flex-grow text-gray-100 p-4 md:p-8 lg:p-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Company Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Name */}
          <div>
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              className="bg-gray-800 border-gray-700 text-gray-100 focus:ring-primary-500 mt-1"
              placeholder="Enter company name"
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="bg-gray-800 border-gray-700 text-gray-100 focus:ring-primary-500 h-32 mt-1"
              placeholder="Describe your company"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Website */}
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                type="url"
                value={formData.website}
                onChange={handleInputChange}
                className="bg-gray-800 border-gray-700 text-gray-100 focus:ring-primary-500 mt-1"
                placeholder="https://example.com"
              />
              {errors.website && (
                <p className="text-red-500 text-sm mt-1">{errors.website}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="bg-gray-800 border-gray-700 text-gray-100 focus:ring-primary-500 mt-1"
                placeholder="Company headquarters"
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location}</p>
              )}
            </div>
          </div>

          {/* Logo Upload */}
          <div>
            <Label>Company Logo</Label>
            <div className="flex items-center justify-center w-full mt-1">
              <label
                htmlFor="logo-upload"
                className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer ${
                  errors.logo
                    ? "border-red-500"
                    : "border-gray-700 hover:border-primary-500"
                } bg-gray-800 transition-colors`}
              >
                <div className="text-center">
                  <p className="text-sm text-gray-400">
                    {formData.logo
                      ? formData.logo.name
                      : "Click to upload logo"}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    PNG, JPG up to 2MB
                  </p>
                </div>
                <Input
                  id="logo-upload"
                  name="logo"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleInputChange}
                />
              </label>
            </div>
            {errors.logo && (
              <p className="text-red-500 text-sm mt-1">{errors.logo}</p>
            )}
          </div>

          {loading ? (
            <Button type="button" className="w-full bg-white text-black md:w-auto  hover:bg-white/80 transition-colors">
              <Loader2 className="animate-spin w-6 h-6 text-primary" />
              Please Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-white text-black md:w-auto  hover:bg-white/80 transition-colors"
            >
              Save Profile
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
