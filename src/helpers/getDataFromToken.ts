import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export async function getDataFromToken(req:NextRequest) {
    try {
        
        const token=req.cookies.get("token")?.value || "";

        if(!token){
            return NextResponse.json({
                status: 401,
                body: "Unauthorized"
            })
        }

        const decodedToken:any=jwt.verify(token, process.env.TOKEN_SECRET!);


        console.log('====================================');
        console.log("decodedToken",decodedToken);
        console.log('====================================');

        return decodedToken.id;




    } catch (error:any) {
        return NextResponse.json({
            status: 500,
            body: error.message
        })
    }
}


