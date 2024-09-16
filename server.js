import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

// Creating Express App
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// Using Cors To Allow Request From Any Origin
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Using Express JSON To Parse Data
app.use(express.json({ limit: "15kb" }));

// Using Express URL-Encoded Middleware
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Socket.IO Connection
io.on("connection", (socket) => {
  console.log("---- A User Connected ----", socket.id);

  socket.on("message", (msg) => {
    socket.broadcast.emit("recMsg", msg);
  });
  // Handle socket events here
  socket.on("disconnect", () => {
    console.log("---- A User Disconnected ----");
  });
});

// Listening App
server.listen(3000, () => {
  console.log(`---- Server is running at PORT ----`);
});
