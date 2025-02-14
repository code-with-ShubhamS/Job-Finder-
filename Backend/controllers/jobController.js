import { Job } from "../models/job.js";

//admin
export const postJob = async(req,res)=>{
    try{
      const {title,description,requirements,salary,location,jobType,experience,position,companyId} = req.body;
      const reqruiterId = req.id;
      if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId){
        return res.status(400).json({
          msg:"something is missing",
          success:false
        })
      }
      const job = await Job.create({
        title,
        description,
        requirements:requirements.split(","),
        salary:Number(salary),
        location,
        jobType,
        experienceLevel:experience,
        position,
        company:companyId,
        created_by:reqruiterId
      }) 
      return res.status(201).json({
        msg:"New job created successfully",
        job,
        success:true
      })
    }catch(error){
       console.log(error);
       res.status(500).json({
        msg:"Unable to Create Job",
        success:false
      })
    }
} 
//student
export const getAllJobs=async(req,res)=>{
  try{
      const Keyword = req.query.keyword || "";
       const query = {
        $or:[
          {title:{$regex:Keyword,$options:"i"}}, //It searches for jobs where the title or description contains the Keyword, case-insensitively.
          {description:{$regex:Keyword,$options:"i"}},
               ]
       };
       const jobs = await Job.find(query).populate({ //If the Job model has a company field that references another document (via ref in Mongoose Schema), .populate() replaces the company field with the actual document from the Company collection.
        path:"company"
       }).sort({createdAt:-1})
     
       if(!jobs){
        return res.status(404).json({
          msg:"Job not found",
          success:false
        })
       }
       return res.status(200).json({
        jobs,
        success:true
       })
  }catch(error){
    console.log(error);
    return res.status(500).json({
      msg:"Server Error",
      success:false
    })
  }
}
//student
export const getJobById = async(req,res)=>{
  try{
     const jobId = req.params.id;
     const job = await Job.findById(jobId).populate({
      path:"applications"
     });
     if(!job){ 
      return res.status(404).json({
        msg:"Job not found",
        success:false
     })
    }
    return res.status(200).json({
      job,
      success:true
     })
  }catch(error){
    console.log(error);
    return res.status(500).json({
      msg:"Server Error",
      success:false
   })
  }
}
//admin kitne job create kra hai abhi tk
export const getAdminJobs = async(req,res)=>{
  try{
       const adminId = req.id;
       const jobs = await Job.find({created_by:adminId}).populate({
        path:'company',
        createdAt:-1
       });
       if(!jobs){
        return res.status(404).json({
          msg:"Job not found",
          success:false
       })
      };
      return res.status(200).json({
        jobs,
        success:true
      })
  }catch(error){
    console.log(error);
  }
}