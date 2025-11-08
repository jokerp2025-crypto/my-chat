const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// مسیر فایل‌های استاتیک (public)
app.use(express.static(path.join(__dirname, 'public')));

// مسیر اصلی برای index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ارتباط با Socket.io
io.on('connection', (socket) => {
  console.log('کاربر وصل شد:', socket.id);

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('کاربر خارج شد:', socket.id);
  });
});

// پورت مورد استفاده در Render
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 سرور آنلاین شد روی پورت ${PORT}`);
});
