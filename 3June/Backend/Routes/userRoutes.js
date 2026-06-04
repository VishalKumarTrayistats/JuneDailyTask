import express from "express";
import {signup,login, changePassword} from "../Controllers/authController.js";
import { isAuth } from "../Middleware/isAuth.js";
const router=express.Router();

router.post("/signup",signup)
router.post('/login',login)
router.post("/changepassword",isAuth, changePassword)

export default router;