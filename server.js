const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('کاربر وصل شد:', socket.id);

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('کاربر خارج شد:', socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`💬 سرور اجرا شد: http://localhost:${PORT}`));