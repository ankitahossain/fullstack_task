import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./Database/db";


dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
connectDB();


app.get("/",(req,res)=>{
    res.send("Server is running 🚀")
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})