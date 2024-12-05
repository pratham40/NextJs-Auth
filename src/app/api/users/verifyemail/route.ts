import dbConnection from "@/config/dbConnection"
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";


dbConnection();
export async function POST(req: NextRequest) {
    try {
        const reqBody=await req.json()

        const {token}=reqBody

        console.log('====================================');
        console.log(token);
        console.log('====================================');

    const user=await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}})

    if (!user) {
        return NextResponse.json({
            status: 400,
            message: "Invalid or expired token"
        })
    }

    console.log('====================================');
    console.log(user);
    console.log('================================')

    user.isVerified=true
    user.verifyToken=undefined
    user.verifyTokenExpiry=undefined
    await user.save()
    console.log('====================================');
    console.log(user);
    console.log('====================================');

    return NextResponse.json({
        status: 200,
        message: "Email verified successfully"
    })
        
    } catch (error: any) {
        return NextResponse.json({
            status: 500,
            message: error.message
        })
    }
}