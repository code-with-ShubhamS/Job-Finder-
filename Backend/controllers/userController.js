// controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import dataUri from "../utils/Datauri.js";
import cloudinary from "../utils/Cloudnary.js";
import path from "path"
export const register = async (req, res) => {
  const { name, email, password, role, phoneNumber } = req.body;
  if (!name || !email || !password || !role || !phoneNumber) {
    return res.status(400).json({ msg: "Fill all the Feilds", success: false });
  }
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ msg: "User already exists", success: false });
    }
    const file = req.file;
    const fileUri = dataUri(file);
    
    // Upload an image
    const uploadResult = await cloudinary.uploader
      .upload(fileUri.content, {
        folder: "userLogo",
      })
      .catch((error) => {
        console.log(error);
        return res
          .status(400)
          .json({ msg: "Error in Uploading file", success: false });
      });

    user = new User({
      name,
      email,
      password,
      role,
      phoneNumber,
      profile: {
        profilePhoto: uploadResult.secure_url || "",
      },
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    return res
      .status(201)
      .json({ msg: "Sucessfully Created Account", success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error", success: false });
  }
};

export const login = async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ msg: "Fill all the feilds", success: false });
  }
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ msg: "Invalid credentials", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ msg: "Invalid credentials", success: false });
    }
    if (user.role !== role) {
      return res.status(400).json({
        msg: "Account Doesn't exist with current role",
        success: false,
      });
    }

    const tokenData = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(
      tokenData,
      process.env.JWT_SECRET,
      { expiresIn: "30 days" },
      (err, token) => {
        if (err) throw err;
        return res
          .status(200)
          .cookie("token", token, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
          })
          .json({ msg: `Welcome Back ${user.name}`, user, success: true });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error", success: false });
  }
};

export const logout = async (req, res) => {
  if (!req.id) {
    return res
      .status(400)
      .json({ msg: "First login with your accound", success: false });
  }
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ msg: "Logout Successfully", success: true });
  } catch (error) {
    return res.status(500).json({ msg: "Error in logout", success: false });
  }
};

export const updateProfile = async (req, res) => {
  const { name, email, phoneNumber, bio, skills } = req.body;

  try {
    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User Not found", success: false });
    }
    const file = req?.file;
    if (name) user.name = name;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(",");
    if (file) {
      const fileUri = dataUri(file);
      const uploadResult = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "raw", // 'raw' is used for PDFs and other non-image files
        public_id: file.originalname, // Ensures the original filename is used
        format: path.extname(file.originalname).substring(1),
        folder: "resume-uploads",
      });
      if (uploadResult) {
        user.profile.resume = uploadResult?.secure_url || "";
        user.profile.resumeOriginalName = file?.originalname || "";
      }
      // console.log(uploadResult);
    }
    await user.save();

    user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
      skills: user.skills,
    };
    return res
      .status(200)
      .json({ msg: "Profile Updated Sucessfully", user, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error", success: false });
  }
};
