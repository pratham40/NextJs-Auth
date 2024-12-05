import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName:{
        required: [true, 'Username is required'],
        type:String
    },
    email:{
        required: [true, 'Email is required'],
        type:String,
        unique: true
    },
    password:{
        required: [true, 'Password is required'],
        type:String,
        select: false
    },
    isVerified:{
        type:Boolean,
        default: false
    },
    isAdmin:{
        type:Boolean,
        default: false
    },
    forgotPasswordToken:{
        type:String
    },
    forgotPasswordExpiry:{
        type:Date
    },
    verifyToken:{
        type:String
    },
    verifyTokenExpiry:{
        type:Date
    },
})

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;