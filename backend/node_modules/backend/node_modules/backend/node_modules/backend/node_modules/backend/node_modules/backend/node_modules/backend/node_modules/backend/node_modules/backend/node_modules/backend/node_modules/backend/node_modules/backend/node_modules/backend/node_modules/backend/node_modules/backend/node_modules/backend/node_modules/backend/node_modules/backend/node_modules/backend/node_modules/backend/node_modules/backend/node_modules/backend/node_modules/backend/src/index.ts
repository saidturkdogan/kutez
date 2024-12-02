import express from 'express';
import { fetchGoldPrice } from './gold';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Node.js!')
});

app.get('/gold', async (req, res) => {
    try {
        const price = await fetchGoldPrice();

        if (price !== null) {
            res.send(`
                <h1>Current Gold Price</h1>
                <p>Gold Price: <strong>$${price}</strong></p>
            `);
        } else {
            res.status(500).send('<p>Unable to fetch gold price</p>');
        }
    } catch (error) {
        res.status(500).send('<p>Error fetching gold price</p>');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
