import mongoose, { Schema } from "mongoose";

const userSchema = mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        default:new mongoose.Types.ObjectId
    },
    username:{
        type:String,
        required:true,
        unique:false
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    accountDate:{
        type:Date,
        default:Date.now,
        required:true
    },
    favorites:[]
})

const UserModel = mongoose.model("User", userSchema);
export default UserModel;

