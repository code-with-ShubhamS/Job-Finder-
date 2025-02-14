import { Company } from "../models/company.js";

export const registerCompany = async (req,res)=>{
        const {companyName} = req.body;
        console.log("object",companyName)
        if(!companyName){
            return res.status(400).json({msg:"Provide Company Name",success:false})
        }
        try {
            let company = await Company.findOne({name:companyName});
            if(company){
                return res.status(400).json({msg:"Company Name already Exist",success:false})
            }
          company =  await Company.create({name:companyName});
           return res.status(201).json({msg:"Company Created SuccessFully",company,success:true})
        } catch (error) {
            console.log(error)
            return res.status(500).send("Server Error")
        }
}
export const getCompany = async (req,res)=>{
    try {
        // const userId = req.id;
        let company = await Company.find()
        if(!company){
            return res.status(400).json({msg:"There is no company",success:false})
        }
        return res.status(200).json({msg:"Got your company",company,success:true})
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
}
export const getCompanyById = async (req,res)=>{
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId)
        if(!company){
            return res.status(400).json({msg:"Company not found",success:false})
        }
        return res.status(200).json({msg:"found company",company,success:true})
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
}
export const updateCompany = async (req,res)=>{
    try{
        const {companyName,description,website,location} = req.body;
        const file = req.file;
        const updateData = {name:companyName,description,website,location}       
    
        const company = await Company.findByIdAndUpdate(req.params.id,updateData,{new:true})
        if(!company){
           return res.status(404).json({msg:"Not found your caompany",success:false})
        }
        return res.status(200).json({msg:"updated your Info",company,success:true})
        
    }catch(err){
        console.log(err)
        res.status(500).send("Server Error");
    }
}