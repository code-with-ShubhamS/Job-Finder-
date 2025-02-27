import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Loader2, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "@/hooks/use-toast";
import {AdminJobsActions} from "../../../redux/AdminJobs.js"
import { useNavigate } from "react-router-dom";
import { VITE_JOB_API_END_POINT } from "../../../URI.js";


const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance"];
const experienceLevels = ["Entry", "Mid", "Senior", "Lead"];

export default function CreateJob() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { allCompany } = useSelector((store) => store.company);
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      requirements: "",
      salary: "",
      location: "",
      jobType: "",
      experienceLevel: "",
      positions: 1,
      companyId: "",
    },
  });

  const validateForm = (values) => {
    const newErrors = {};

    if (!values.title || values.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!values.description || values.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }

    if (!values.requirements || values.requirements.length < 20) {
      newErrors.requirements = "Requirements must be at least 20 characters";
    }

    if (!values.salary) {
      newErrors.salary = "Salary is required";
    }

    if (!values.location || values.location.length < 2) {
      newErrors.location = "Location must be at least 2 characters";
    }

    if (!values.jobType) {
      newErrors.jobType = "Please select a job type";
    }

    if (!values.experienceLevel) {
      newErrors.experienceLevel = "Please select experience level";
    }

    if (!values.positions || values.positions < 1) {
      newErrors.positions = "At least one position is required";
    }

    if (!values.companyId) {
      newErrors.companyId = "Please select a company";
    }

    return newErrors;
  };

  const onSubmit = async (values) => {
    const formErrors = validateForm(values);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setIsSubmitting(true);
    try {
  //  API call
      const res = await fetch(`${VITE_JOB_API_END_POINT}/post`,{
        method:"POST",
        credentials:"include",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(values)
      })
      const data = await res.json();
      // if(data.success){
      //   dispatch(AdminJobsActions.setAdminJobs(data?.job))
      // }
      // if(data?.msg){
      //   toast({
      //     title: data?.msg,
      //     duration: 2000,
      //   });
      // }
      form.reset();
      setErrors({});
      if(data?.success){
        navigate("/admin/jobs")
      }
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
        duration: 2000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-grow p-6">
      {
        allCompany.length <= 0 ?
        <div className="flex items-center justify-evenly">
          <div className="text-red-500 text-lg font-bold p-4 text-center animate-pulse">
          🚨 You don't have any company! 🚨
        </div>
        <div>
          <Button
            className="hover:bg-white/90 text-primary-foreground bg-white"
            onClick={() => {
              navigate("/admin/companies/create");
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Company
          </Button>
        </div>
        </div>
       
        :
      
      <div className="mx-auto max-w-2xl space-y-6">
      
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-white tracking-tighter">
            Create Job
          </h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Job Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Senior Software Engineer"
                      {...field}
                    />
                  </FormControl>
                  {errors.title && <FormMessage>{errors.title}</FormMessage>}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Job Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter detailed job description"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  {errors.description && (
                    <FormMessage>{errors.description}</FormMessage>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Requirements</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter job requirements"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  {errors.requirements && (
                    <FormMessage>{errors.requirements}</FormMessage>
                  )}
                </FormItem>
              )}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Salary</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. $80000" {...field} />
                    </FormControl>
                    {errors.salary && (
                      <FormMessage>{errors.salary}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. New York, NY" {...field} />
                    </FormControl>
                    {errors.location && (
                      <FormMessage>{errors.location}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="jobType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Job Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {jobTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.jobType && (
                      <FormMessage>{errors.jobType}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experienceLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Experience Level
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {experienceLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.experienceLevel && (
                      <FormMessage>{errors.experienceLevel}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="positions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Number of Positions
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    {errors.positions && (
                      <FormMessage>{errors.positions}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Company</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select company" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {allCompany.map((company) => (
                          <SelectItem
                            key={company._id}
                            value={company._id.toString()}
                          >
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.companyId && (
                      <FormMessage>{errors.companyId}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full text-white"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create Job Posting
            </Button>
          </form>
        </Form>
      </div>
      }
    </div>
  );
}
