import { Request,Response } from "express";
import User from "../models/User";
import { comparePassword } from "../utils/hash"
import { generateToken } from "../utils/jwt";
import Invite from "../models/Invite";
import {hashPassword} from "../utils/hash";


export const login = async (req: Request, res:Response)=>{
    try{
        const { email,password} = req.body;
        const user =await User.findOne({email})
       
        // Find the user
        if(!user){
            return res.status(401).json({message: 'Invalid Credentials'})
        }

        // Check status
         if (user.status === "INACTIVE") {
      return res.status(403).json({ message: "User is inactive" });
    }

        // compare password
        const isMatch = await comparePassword(password,user.password) 

        if(!isMatch){
             return res.status(401).json({message: 'Invalid Credentials'})
        }

        const token = generateToken(user._id.toString(), user.role);
        res.json({
       token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  }catch(error){
        res.status(500).json({message: 'Login failed'})
  }
    }
