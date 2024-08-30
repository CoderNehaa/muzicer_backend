import { CustomError } from "../utils/custom.error.js";
import UserModel from "../models/user.model.js";
import SongModel from "../models/song.model.js";
import { PlaylistModel } from "../models/Playlist.model.js";
import mongoose from "mongoose";

export class MusicController {
  async getMusic(req, res, next) {
    try {
      const songs = await SongModel.find();
      return res.status(200).send({
        success: true,
        data: songs,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async addSong(req, res, next) {
    try {
      const { title, audio } = req.body;
      let songExist = await SongModel.findOne({ title });
      if (songExist) {
        throw new CustomError(200, "Title already exists");
      }

      const song = new SongModel({ title, audio });
      const newSong = await song.save();
      return res.status(201).send({
        success: true,
        message: "Song added successfully",
        data: newSong,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async getUserPlaylists(req, res, next) {
    try {
      const { userId } = req.params;
      const userIdObj = new mongoose.Types.ObjectId(userId);
      const playlists = await PlaylistModel.find().where('userId').equals(userId);
      return res.status(200).send({
        success: true,
        data: playlists,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async createPlaylist(req, res, next) {
    try {
      const { userId } = req.params;
      const { playlistName } = req.body;

      const playlist = new PlaylistModel({userId, playlistName});
      const newPlaylist = await playlist.save();

      return res.status(200).send({
        success: true,
        message: `PLaylist ${playlistName} created successfully`,
        data: newPlaylist,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async addSongToPlaylist(req, res, next) {
    try {
      const { playlistId } = req.params;
      const { song } = req.body;
      
      const playlistFound = await PlaylistModel.findOne({ _id:playlistId });
      if (!playlistFound) {
        throw new CustomError(200, "Playlist not found");
      }
      
      const result = await PlaylistModel.updateOne(
        { _id:playlistId },
        { $addToSet: { songs: song } }
      );
      
      if (!result.acknowledged) {
        throw new CustomError(200, "Failed to add song! Try later");
      }
  
      return res.status(200).send({
        success: true,
        message: "Song added to playlist",
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async removeSongFromPlaylist(req, res, next) {
    try {
      const { playlistId, songId } = req.params;
      const playlistFound = await PlaylistModel.findOne({_id: playlistId });
  
      if (!playlistFound) {
        throw new CustomError(404, "Playlist not found");
      }
  
      const result = await PlaylistModel.updateOne(
        { _id:playlistId },
        { $pull: { songs: {_id:songId} } } 
      );
  
      if (!result.acknowledged || result.modifiedCount === 0) {
        throw new CustomError(200, "Failed to remove from playlist!");
      }
      
      return res.status(200).send({
        success: true,
        message: "Song removed from playlist",
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async deletePlaylist(req, res, next){
      try{
        const {playlistId} = req.params;        
        const result = await PlaylistModel.deleteOne({_id: playlistId});
        if(!result.acknowledged || result.deletedCount === 0){
          throw new CustomError(200, "Failed to delete playlist!");
        }

        return res.status(200).send({
          success:true,
          message:"Playlist deleted successfully"
        })
      } catch (e){
        console.log(e);
        next(e);
      }
  }

  async addToFavorite(req, res, next) {
    try {
      const { song } = req.body;
      const { userId } = req.params;
      
      const userFound = await UserModel.findOne({ userId });
  
      if (!userFound) {
        throw new CustomError(200, "User not found");
      }
      
      const result = await UserModel.updateOne(
        { userId },
        { $addToSet: { favorites: song } }
      );
      
      if (!result.acknowledged) {
        throw new CustomError(200, "No updates applied");
      }
  
      return res.status(200).send({
        success: true,
        message: "Song added to favorites",
      });
    } catch (e) {
      console.error(e);
      next(e);
    }
  }

  async removeFromFavorite(req, res, next) {
    try {
      const { userId, songId } = req.params;
      const userFound = await UserModel.findOne({ userId });
  
      if (!userFound) {
        throw new CustomError(404, "User not found");
      }
  
      const result = await UserModel.updateOne(
        { userId },
        { $pull: { favorites: {_id:songId} } } 
      );
  
      if (!result.acknowledged || result.modifiedCount === 0) {
        throw new CustomError(200, "No updates applied");
      }
  
      return res.status(200).send({
        success: true,
        message: "Song removed from favorites list",
      });
    } catch (e) {
      console.error(e);
      next(e);
    }
  }
}
