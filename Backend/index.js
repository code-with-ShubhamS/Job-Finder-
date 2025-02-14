import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoute from "./routes/userRoute.js"
import companyRoute from "./routes/companyRoute.js"
import jobRoute from "./routes/jobsRoute.js"
import applicationRoute from "./routes/applicationRoute.js"
dotenv.config();
const app = express();

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


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// http://localhost:5000//api/v1/application/apply/:id