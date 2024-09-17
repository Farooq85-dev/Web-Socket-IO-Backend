import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

// Creating Express App
const app = express();
const server = createServer(app);

// Use environment variable for port, default to 3000
const PORT = process.env.PORT || 3000;

// Socket.IO with CORS configuration
const io = new Server(server, {
  cors: {
    origin: "https://web-socket-io-frontend.vercel.app",
    credentials: true,
  },
});

// Using Cors To Allow Request From Specific Origin
app.use(
  cors({
    origin: "https://web-socket-io-frontend.vercel.app",
    credentials: true,
  })
);

// Using Express JSON To Parse Data
app.use(express.json({ limit: "15kb" }));

// Define a simple route
app.get("/hello", (req, res) => {
  res.send("--- Hello World ---");
});

// Using Express URL-Encoded Middleware
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Socket.IO Connection
io.on("connection", (socket) => {
  console.log("---- A User Connected ----", socket.id);

  socket.on("message", (msg) => {
    socket.broadcast.emit("recMsg", msg);
  });

  socket.on("disconnect", () => {
    console.log("---- A User Disconnected ----");
  });
});

// Listening App
server.listen(PORT, () => {
  console.log(`---- Server is running at PORT ${PORT} ----`);
});
