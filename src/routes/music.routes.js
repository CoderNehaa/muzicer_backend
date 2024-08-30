import express from "express";
import { MusicController } from "../controllers/music.controller.js";

const musicRouter = express.Router();
const musicController = new MusicController();

musicRouter.get("/all", musicController.getMusic);
musicRouter.post("/songs/add", musicController.addSong);

//favorites
musicRouter.post("/favorites/:userId/add/", musicController.addToFavorite);
musicRouter.delete("/favorites/:userId/remove/:songId", musicController.removeFromFavorite);

//playlists
musicRouter.get("/playlist/:userId", musicController.getUserPlaylists);
musicRouter.post("/playlist/add/:userId", musicController.createPlaylist);
musicRouter.delete("/playlist/remove/:playlistId", musicController.deletePlaylist)

//songs in playlists
musicRouter.post("/playlist/:playlistId/songs/add", musicController.addSongToPlaylist);
musicRouter.delete("/playlist/:playlistId/songs/:songId/remove/", musicController.removeSongFromPlaylist);

export default musicRouter;

