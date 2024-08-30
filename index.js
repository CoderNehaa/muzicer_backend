import dotenv from "dotenv";
dotenv.config();

import express from "express";
import userRouter from "./src/routes/user.routes.js";
import { connectDb } from "./src/config/db.connect.js";
import { errorHandler } from "./src/middlewares/error.handler.js";

import cors from "cors";
import musicRouter from "./src/routes/music.routes.js";

const server = express();
const port = process.env.PORT;

server.use(express.json());
server.use(cors({
    origin: ['https://muzicer.netlify.app', 'http://localhost:5173'],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}));

server.use('/users', userRouter);
server.use('/music', musicRouter);

server.use(errorHandler);

server.get('/', (req, res) => {
    res.send(`Confidential API`);
});

server.listen(port, async () => {
    console.log("Server is listening on port", port);

    const url = process.env.DB_CONNECTION;
    await connectDb(url);
})

