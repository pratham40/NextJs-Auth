import dbConnection from "@/config/dbConnection";
import { NextRequest, NextResponse } from "next/server";

dbConnection();

export async function GET(req:NextRequest) {

    try {

        const res=NextResponse.json({
            status: 200,
            message: "User logged out successfully"
        })

        res.cookies.set("token","",{
            httpOnly:true,
            expires:new Date(0)
        })

        return res;

    } catch (error:any) {
        return NextResponse.json({
            status: 500,
            message: error.message
        })
    }
    
}