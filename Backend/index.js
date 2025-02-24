import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoute from "./routes/userRoute.js"
import companyRoute from "./routes/companyRoute.js"
import jobRoute from "./routes/jobsRoute.js"
import applicationRoute from "./routes/applicationRoute.js"
import path from "path"
dotenv.config();
const app = express();
const _dirname = path.resolve() //
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

// Database connection
await mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));
// Middleware
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.json());

// Routes
app.use("/api/v1/user",userRoute)
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);

app.use(express.static(path.join(_dirname,'/frontend/dist'))) //
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html")); //
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
