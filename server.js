const WebSocket = require('ws');

// Membuat server WebSocket yang berjalan di port 8080
const server = new WebSocket.Server({ port: 8080 });

const clients = new Set();

// Ketika ada klien yang terhubung
server.on('connection', socket => {
  console.log('New client connected');
  clients.add(socket);

  // Ketika server menerima pesan dari klien
  socket.on('message', message => {
    console.log(`Received: ${message}`);

    // Menyebarkan pesan ke semua klien yang terhubung
    for (let client of clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  });

  // Ketika klien terputus
  socket.on('close', () => {
    console.log('Client disconnected');
    clients.delete(socket);
  });
});
