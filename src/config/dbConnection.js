import mongoose from "mongoose";

const dbConnection = async () => {
    try {
       const connect= await mongoose.connect(process.env.MONGO_URI)
       console.log(`MongoDB Connected: ${connect.connection.host}`);
       
    }
    catch(err){
        console.log(err.message)
    }
}

export default dbConnection;