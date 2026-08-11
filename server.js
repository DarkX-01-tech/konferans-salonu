const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

const DEFAULT_DATA = {
  broadcast: { konusmaci: '', sempozyum: '', konu: '', duyuru: '' },
  listeler: { konusmaci: [], sempozyum: [], konu: [], duyuru: [] }
};

function readData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (e) {
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function broadcast(data) {
  const msg = JSON.stringify(data);
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
}

wss.on('connection', ws => {
  const data = readData();
  ws.send(JSON.stringify(data.broadcast));
});

// GET /api/state
app.get('/api/state', (req, res) => {
  res.json(readData());
});

// POST /api/broadcast
app.post('/api/broadcast', (req, res) => {
  const { konusmaci = '', sempozyum = '', konu = '', duyuru = '' } = req.body;
  const data = readData();
  data.broadcast = { konusmaci, sempozyum, konu, duyuru };
  writeData(data);
  broadcast(data.broadcast);
  res.json({ ok: true });
});

// POST /api/clear
app.post('/api/clear', (req, res) => {
  const data = readData();
  data.broadcast = { konusmaci: '', sempozyum: '', konu: '', duyuru: '' };
  writeData(data);
  broadcast(data.broadcast);
  res.json({ ok: true });
});

// POST /api/list/add
app.post('/api/list/add', (req, res) => {
  const { tip, value } = req.body;
  if (!tip || !value) return res.status(400).json({ error: 'tip ve value zorunlu' });
  const data = readData();
  if (!data.listeler[tip]) return res.status(400).json({ error: 'Geçersiz tip' });
  if (!data.listeler[tip].includes(value)) {
    data.listeler[tip].push(value);
    writeData(data);
  }
  res.json({ ok: true });
});

// POST /api/list/remove
app.post('/api/list/remove', (req, res) => {
  const { tip, value } = req.body;
  if (!tip || !value) return res.status(400).json({ error: 'tip ve value zorunlu' });
  const data = readData();
  if (!data.listeler[tip]) return res.status(400).json({ error: 'Geçersiz tip' });
  data.listeler[tip] = data.listeler[tip].filter(v => v !== value);
  writeData(data);
  res.json({ ok: true });
});

server.listen(PORT, () => {
  console.log(`Konferans Salonu sunucusu http://localhost:${PORT} adresinde çalışıyor`);
});
