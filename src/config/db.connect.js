import mongoose from "mongoose";

export const connectDb = async (url) => {
    try {
        await mongoose.connect(url);
        console.log("Connected to DB using Mongoose");
    } catch (e) {
        console.error("Error occurred while connecting to MongoDB:", e);
        process.exit(1); 
    }
}
