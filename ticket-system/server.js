const express = require('express');
const redis = require('redis');

const app = express();
app.use(express.json());

const client = redis.createClient();
client.connect();

let totalSeats = 100;

// Booking API
app.post('/api/book', async (req, res) => {
    const lock = await client.set('lock', '1', {
        NX: true,
        EX: 5
    });

    if (!lock) {
        return res.status(429).json({ message: "Try again" });
    }

    if (totalSeats > 0) {
        totalSeats--;
        const bookingId = Date.now();

        await client.del('lock');

        return res.json({
            success: true,
            bookingId,
            remaining: totalSeats
        });
    } else {
        await client.del('lock');
        return res.json({ message: "Sold out" });
    }
});

app.listen(3000, () => console.log("Booking system running on port 3000"));