import { Router } from "express";
import { signup,login,getUserInfo,updateProfile,addProfileImage,removeProfileImage, logout } from "../controllers/AuthControllers.js";
import { varifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";



const authRoutes=Router();
const upload=multer({dest:"uploads/profiles/"})
authRoutes.post("/signup",signup)
authRoutes.post("/login",login)
authRoutes.get("/user-info",varifyToken,getUserInfo)
authRoutes.post("/update-profile",varifyToken,updateProfile)
authRoutes.post("/add-profile-image",varifyToken,upload.single("profile-image") ,addProfileImage)
authRoutes.delete("/remove-profile-image",varifyToken,removeProfileImage)
authRoutes.post("/logout",logout)
export default authRoutes;