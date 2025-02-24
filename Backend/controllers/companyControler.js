import { Company } from "../models/company.js";
import dataUri from "../utils/Datauri.js";
import cloudinary from "../utils/Cloudnary.js";
export const registerCompany = async (req, res) => {
  const { companyName } = req.body;
  if (!companyName) {
    return res
      .status(400)
      .json({ msg: "Provide Company Name", success: false });
  }
  try {
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res
        .status(400)
        .json({ msg: "Company Name already Exist", success: false });
    }
    company = await Company.create({ name: companyName ,userId: req.id});
    return res
      .status(201)
      .json({ msg: "Company Registerd SuccessFully", company, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error", success: false });
  }
};
export const getCompany = async (req, res) => {
  try {
    // const userId = req.id;
    let company = await Company.find({userId:req.id});
    if (!company) {
      return res
        .status(400)
        .json({ msg: "There is no company", success: false });
    }
    return res
      .status(200)
      .json({ msg: "Got your company", company, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id
    console.log(companyId)
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(400).json({ msg: "Company not found", success: false });
    }
    return res
      .status(200)
      .json({ msg: "found company", company, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error", success: false });;
  }
};
export const updateCompany = async (req, res) => {
  try {
    const { companyName, description, website, location } = req.body;
    const file = req.file;
    const fileUri = dataUri(file);

    // Upload an image
    const uploadResult = await cloudinary.uploader
      .upload(fileUri.content, {
        folder: "Company Logo",
      })
      .catch((error) => {
        console.log(error);
        return res
          .status(400)
          .json({ msg: "Error in Uploading file", success: false });
      });
    const updateData = {
      name: companyName,
      description,
      website,
      location,
      logo: uploadResult?.secure_url || "",
    };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!company) {
      return res
        .status(404)
        .json({ msg: "Not found your caompany", success: false });
    }
    return res
      .status(200)
      .json({ msg: "updated your Info", company, success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server Error", success: false });
  }
};
