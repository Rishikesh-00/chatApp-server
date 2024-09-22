import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { compare } from "bcrypt";

const maxAge=3*24*60*60*100;
const createToken=(email,userId)=>{
    return jwt.sign({email,userId},process.env.JWT_KEY,{expiresIn:maxAge})
}

export const signup=async (req,res,next)=>{
    try{
        const  {email,password}=req.body;
        if(!email || !password)
            return res.status(400).send("Email and Password is required")
        const user=await User.create({email,password})
        res.cookie("jwt",createToken(email,user.id),{
            maxAge,
            secure:true,
            sameSite:"None"
        });
        return res.status(201).json({user:{
            id:user.id,
            email:user.email,
            profileSetup:user.profileSetup,
        }})
    }catch(err){
        console.log({err})
        return res.status(500).send("Internal server error");
    }
}

export const login=async (req,res,next)=>{
    try{
        const  {email,password}=req.body;
        if(!email || !password)
            return res.status(400).send("Email and Password is required")
        const user=await User.findOne({email})
        if(!user){
            return res.status(404).send("User not found!")
        }
        const auth=await compare(password,user.password);
        if(!auth){
            return res.status(404).send("Incorrect password")
        }
        res.cookie("jwt",createToken(email,user.id),{
            maxAge,
            secure:true,
            sameSite:"None"
        });
        return res.status(200).json({user:{
            id:user.id,
            email:user.email,
            profileSetup:user.profileSetup,
            firstName:user.firstName,
            lastName:user.lastName,
            image:user.image,
            color:user.color,
        }})
    }catch(err){
        console.log({err})
        return res.status(500).send("Internal server error");
    }
}

export const getUserInfo=async (req,res,next)=>{
    try{
        const userData=await User.findById(req.userId);
        if(!userData){
            return res.status(404).send("user with given id not found.")
        }
        
        return res.status(200).json({
            id:userData.id,
            email:userData.email,
            profileSetup:userData.profileSetup,
            firstName:userData.firstName,
            lastName:userData.lastName,
            image:userData.image,
            color:userData.color,
    })
    }catch(err){
        console.log({err})
        return res.status(500).send("Internal server error");
    }
}

export const updateProfile=async (req,res,next)=>{
    try{
        console.log("hello")
        const {userId}=req;
        const {firstName,lastName,color}=req.body;
        if(!firstName || !lastName || color===undefined ){
            console.log(color,firstName,lastName)
            return res.status(400).send("Firstname, lastname,color is required.")
        }
        const userData=await User.findByIdAndUpdate(userId,{firstName,lastName,color,profileSetup:true},{new:true,runValidators:true});
        return res.status(200).json({
            id:userData.id,
            email:userData.email,
            profileSetup:userData.profileSetup,
            firstName:userData.firstName,
            lastName:userData.lastName,
            image:userData.image,
            color:userData.color,
    })
    }catch(err){
        console.log({err})
        return res.status(500).send("Internal server error");
    }
}


export const addProfileImage=async (req,res,next)=>{
    try{
        if(!req.file){
            return res.status(400).send("file is required")
        }
        const date=Date.now();
        let fielName="uploads/profiles"
    //     return res.status(200).json({
    //         id:userData.id,
    //         email:userData.email,
    //         profileSetup:userData.profileSetup,
    //         firstName:userData.firstName,
    //         lastName:userData.lastName,
    //         image:userData.image,
    //         color:userData.color,
    // })
    }catch(err){
        console.log({err})
        return res.status(500).send("Internal server error");
    }
}


export const removeProfileImage=async (req,res,next)=>{
    try{
        console.log("hello")
        const {userId}=req;
        const {firstName,lastName,color}=req.body;
        if(!firstName || !lastName || color===undefined ){
            console.log(color,firstName,lastName)
            return res.status(400).send("Firstname, lastname,color is required.")
        }
        const userData=await User.findByIdAndUpdate(userId,{firstName,lastName,color,profileSetup:true},{new:true,runValidators:true});
        return res.status(200).json({
            id:userData.id,
            email:userData.email,
            profileSetup:userData.profileSetup,
            firstName:userData.firstName,
            lastName:userData.lastName,
            image:userData.image,
            color:userData.color,
    })
    }catch(err){
        console.log({err})
        return res.status(500).send("Internal server error");
    }
}