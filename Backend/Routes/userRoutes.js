import express from "express";
import signup from "../Controllers/User.js";
const router=express.Router();

router.post("/signup",signup)

export default router;