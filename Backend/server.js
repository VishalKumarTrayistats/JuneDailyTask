import express from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors";
import { DBConnection } from "./db/db.js";
import userRoutes from "./Routes/userRoutes.js"
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


DBConnection(process.env.MONGO_URL);

app.get("/",(req,res)=>{
    res.send("server is running")
})
app.use("/api",userRoutes);

const PORT =5000;
app.listen(PORT,(req,res)=>{
    console.log("hey server is running")
}

)
