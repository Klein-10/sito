const express = require("express");
const path = require("path");
const app = express();

// Dati delle carte
const cards = [
  {
    "id": 1,
    "name": "Pikachu",
    "set": "Base Set",
    "condition": "Near Mint",
    "price": 5.0,
    "image": "https://via.placeholder.com/150?text=Pikachu"
  },
  {
    "id": 2,
    "name": "Charizard",
    "set": "Base Set",
    "condition": "Good",
    "price": 250.0,
    "image": "https://via.placeholder.com/150?text=Charizard"
  }
];

// Middleware per servire file statici (frontend)
app.use(express.static(path.join(__dirname, "frontend")));
app.use(express.json());

// API: Ottieni carte filtrate
app.get("/api/cards", (req, res) => {
  const { query } = req.query;
  const filteredCards = query
    ? cards.filter(card => card.name.toLowerCase().includes(query.toLowerCase()))
    : cards;
  res.json(filteredCards);
});

// API: Ottieni dettagli di una carta
app.get("/api/cards/:id", (req, res) => {
  const card = cards.find(card => card.id === parseInt(req.params.id));
  if (card) {
    res.json(card);
  } else {
    res.status(404).json({ message: "Carta non trovata" });
  }
});

// Route principale per il frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Avvia il server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});
