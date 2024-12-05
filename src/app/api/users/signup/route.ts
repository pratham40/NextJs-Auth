import connect from "@/config/dbConnection";
import User from "@/models/user.model";
import {NextRequest,NextResponse} from "next/server"
import bcryptjs from "bcryptjs"
import { sendMail } from "@/helpers/mailer";

connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const { userName, email, password } = reqBody;

        if (!userName || !email || !password) {
            return NextResponse.json({
                status: 400,
                message: "Please fill all the fields"
            })
        }
        
        const userExist=await User.findOne({email})
        
        if(userExist){
            return NextResponse.json({
                status: 400,
                message: "User already exist"
            })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const user = new User({
            userName,
            email,
            password: hashedPassword
        });

        await user.save();

        await sendMail({ email, emailType: 'verify', userId: user._id });



        return NextResponse.json({
            status: 201,
            message: "User created successfully",
            data: user
        })
    } catch (error:any) {
        return NextResponse.json({
            status: 500,
            message: error.message
        })
    }
}



