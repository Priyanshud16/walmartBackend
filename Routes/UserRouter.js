const {Router}=require("express")
const bcrypt = require('bcrypt');
const userModel = require("../model/userModel");
const dotenv=require("dotenv").config()
const jwt=require("jsonwebtoken")
const userRouter=Router()

userRouter.post("/register",async(req,res)=>{
    const {username,email,password,firstname,lastname,phone}=req.body
    try {
        bcrypt.hash(password, 5, async(err, hash) =>{
            // Store hash in your password DB.
            if(err){
                res.status(500).json({message:"Error while Hasing the password"})
            }else{
              const user = new userModel({username,email,password:hash,firstname,lastname,phone})
                await user.save()
                res.status(201).json({message:"User Register Successfully"})
            }
        });
    } catch (error) {
        res.status(404).json({message:"Something wents Wrong",error})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await userModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, async(err, result)=> {
                // result == true
                if(result){
                const  token=jwt.sign({userID:user._id,user:user.username},process.env.jwt)
                res.status(201).json({message:"User Login Successfully",token})
                }else{
                    res.status(500).json({message:"Password is Incorrect"})
                }
            });
        }else{
            res.status(500).json({message:"Please Register First"})
        }
    } catch (error) {
        res.status(404).json({message:"Something Wents Wrong",error})
    }
})

module.exports=userRouter