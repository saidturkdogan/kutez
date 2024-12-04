import express from 'express';
import { calculateGoldPrices, fetchGoldPrice } from './gold';
const path = require('path');
const fs = require('fs')
const cors = require('cors');


const app = express();
const port = 3000;

app.use(cors());

const getProducts = () => {
    const filePath = path.join(__dirname, 'products.json')
    const data = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(data)
}


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

app.get('/api/calculateprice', async (req, res) => {
    try {
        const products = getProducts();
        const calculatedPrices = await calculateGoldPrices(products);

        if (calculatedPrices === null) {
            return res.status(500).json({ error: 'Failed to calculate gold prices.' });
        }


        const prices = calculatedPrices.map(item => ({
            name: item.name,
            calculatedPrice: item.calculatedPrice,
        }));
        res.json({ prices });
    } catch (error) {
        console.error('Error calculating prices:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});



app.get('/api/products', (req, res) => {
    try {
        const products = getProducts();
        res.json(products);
    } catch (error) {
        console.error('Error reading products.json:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
