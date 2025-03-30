const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3000", "https://chatty-frontend-eight.vercel.app"], // ✅ Allow multiple origins
    methods: ["GET", "POST"],
    credentials: true, // ✅ Allow credentials (if needed)
  },
});

io.on("connection", (socket) => { // ✅ Fixed "connection" typo
  console.log("New client connected:", socket.id);

  socket.on("chat", (payload) => {
    console.log("Received message:", payload);
    io.emit("chat", payload); // Broadcast message to all clients
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
