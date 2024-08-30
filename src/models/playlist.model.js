import mongoose from "mongoose";


const playlistSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    playlistName: {
      type: String,
      required: true
    },
    createdOn:{
        type:Date,
        default:Date.now,
        required:true
    },
    songs: []
});


export const PlaylistModel = mongoose.model("Playlist", playlistSchema);

