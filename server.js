const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// مسیر پوشه‌ی public
app.use(express.static(path.join(__dirname, "public")));

// روت اصلی برای index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// سوکت‌ها
io.on("connection", (socket) => {
  console.log("✅ کاربر وصل شد:", socket.id);

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("❌ کاربر خارج شد:", socket.id);
  });
});

// پورت از Render یا 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 سرور آنلاین شد در پورت ${PORT}`);
});
