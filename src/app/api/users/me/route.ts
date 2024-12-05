import dbConnection from "@/config/dbConnection";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

dbConnection();

export async function GET(req:NextRequest) {

    try {

        const userId=await getDataFromToken(req)

        const user=await User.findById(userId).select("-password");

        if(!user){
            return NextResponse.json({
                status: 404,
                message: "User not found"
            })
        }

        return NextResponse.json({
            status: 200,
            message: "User found",
            data: user
        })

        
    } catch (error:any) {
        return NextResponse.json({
            status: 500,
            body: error.message
        })
    }

}