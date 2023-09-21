// Import necessary packages and modules
import express from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import http from "http";
import { Socket, Server } from "socket.io";

import routes from "./routes";
import Model from "./models";
import { MessageItemType } from "./utils";

// Load environment variables from .env file
dotenv.config({
    path: process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev",
});

// Create an instance of the Express app
const app = express();

// Configure the public holder (draft)
app.use(express.static(__dirname + "/public"));

// Extract API URL and version from environment variables
const { API_URL, API_VER, PORT } = process.env;
console.log({ API_URL }, { API_VER });

// Configure CORS options to only allow requests from the specified origin
const corsOptions = {
    //origin: API_URL,
    origin: "*",
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "x-access-token",
        "Access-Control-Allow-Origin",
    ],
};

// Configure cookie-based user sessions
app.use(
    cookieSession({
        name: "cookie-session",
        keys: ["key1", "key2"],
        secret: "COOKIE_SECRET", // should use as secret environment variable
        httpOnly: true,
    }),
);

// Configure headers for requests and responses
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    );
    next();
});

app.use(cors(corsOptions));

// Configure the Express application to use the body-parser middleware for parsing JSON data
app.use(bodyParser.json({ limit: "50mb" }));
// Configure the Express application to use the body-parser middleware for parsing URL-encoded data
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Connecting mysql
Model.connect();

// Import and configure routes
routes.initializRoutes(app);

// socket.io
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "x-access-token",
            "Access-Control-Allow-Origin",
        ],
    },
});

io.on("connection", async (socket: Socket) => {
    // join
    socket.on("joinRoom", (room: string) => {
        socket.join(room);
    });

    // receive message
    socket.on("sendMessage", (room: string, message: MessageItemType) => {
        io.to(room).emit("sendMessage", message);
    });

    // discon
    socket.on("disconnect", (username: string) => {
        socket.leave(username);
    });
});

// Start the server listening on the specified port number
server.listen(PORT, () => {
    console.log(`Chat server is running on port ${PORT}.`);
});
