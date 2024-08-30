import mongoose, { Schema } from "mongoose";

const songSchema = mongoose.Schema({
    audio:{
        type:String,
        required:true,
        unique:true
    },
    title:{
        type:String,
        unique:true,
        required:true
    },
    addedOn:{
        type:Date,
        default:Date.now,
        required:true
    }
})

const SongModel = mongoose.model("Music", songSchema);
export default SongModel;

