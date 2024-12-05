import User from '@/models/user.model';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

export const sendMail = async ({email, emailType,userId}:any) => {
    try {

        const hashToken=await bcryptjs.hash(userId.toString(),10)

        if (emailType==="verify") {
            await User.findByIdAndUpdate(userId,{
                verifyToken:hashToken,
                verifyTokenExpiry:Date.now()+3600000
            })
        }

        if (emailType==="reset") {
            await User.findByIdAndUpdate(userId,{
                forgotPasswordToken:hashToken,
                forgotPasswordExpiry:Date.now()+3600000
            })
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "93632f7b60fc7d",
              pass: "7158f2fbe3b7f2"
            }
          });

        const mailOptions = {
            from: "pratham25736@gmail.com",
            to: email,
            subject: emailType === 'verify' ? 'Verify your email' : 'Reset your password',
            html: emailType === 'verify' ? `<a href="${process.env.DOMAIN}/verify?token=${hashToken}">Click here to verify your email</a>` : `<a href="${process.env.DOMAIN}/reset/${hashToken}">Click here to reset your password</a>`,
        };

        const info = await transport.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
    } catch (error: any) {
        throw new Error(error.message);
    }
}