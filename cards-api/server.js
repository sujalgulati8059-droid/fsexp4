const express = require('express');
const app = express();
app.use(express.json());

let cards = [];

// GET all cards
app.get('/api/cards', (req, res) => {
    res.json(cards);
});

// POST new card
app.post('/api/cards', (req, res) => {
    const card = {
        id: Date.now(),
        suit: req.body.suit,
        value: req.body.value,
        collection: req.body.collection
    };
    cards.push(card);
    res.json(card);
});

// PUT update card
app.put('/api/cards/:id', (req, res) => {
    const card = cards.find(c => c.id == req.params.id);
    if (!card) return res.status(404).send("Not found");

    card.suit = req.body.suit || card.suit;
    card.value = req.body.value || card.value;
    card.collection = req.body.collection || card.collection;

    res.json(card);
});

// DELETE
app.delete('/api/cards/:id', (req, res) => {
    cards = cards.filter(c => c.id != req.params.id);
    res.send("Deleted");
});

app.listen(3000, () => console.log("Server running on port 3000"));