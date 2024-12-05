import dbConnection from "@/config/dbConnection";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

dbConnection();

export async function POST(req: NextRequest) {
    const reqBody = await req.json();
    const {email,password}=reqBody;

    if (!email || !password) {
        return {
            status: 400,
            message: "Please fill all the fields"
        }
    }


    const user=await User.findOne({email}).select("+password");

    if (!user) {
        return {
            status: 400,
            message: "User does not exist"
        }
    }

    console.log('====================================');
    console.log("user",user);
    console.log('====================================');

    const isMatch=bcryptjs.compare(password,user.password);

    if (!isMatch) {
        return {
            status: 400,
            message: "Invalid credentials"
        }
    }

    const tokenData={
        id:user._id,
        email:user.email,
        userName:user.userName
    }

    const token= jwt.sign(tokenData,process.env.TOKEN_SECRET!,{
        expiresIn:"1h"
    })

    const response= NextResponse.json({
        status: 200,
        message: "User logged in successfully"
    })


    response.cookies.set("token",token,{
        httpOnly:true
    })

    return response;
}