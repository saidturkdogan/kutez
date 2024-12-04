import axios from 'axios';

const GOLD_API_URL = 'https://api.gold-api.com/price/XAU';

export const fetchGoldPrice = async (): Promise<number | null> => {
    try {
        const response = await axios.get(GOLD_API_URL);
        const price = response.data.price;

        return price ? price : null;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching gold price:', error.message);
        } else {
            console.error('Error fetching gold price:', error);
        }
        return null;
    }
};


interface Product {
    name: string;
    popularityScore: number;
    weight: number;
    images: {
        yellow: string;
        rose: string;
        white: string;
    };
}

export const calculateGoldPrices = async (products: Product[]): Promise<{ name: string; calculatedPrice: number }[] | null> => {
    const goldPrice = await fetchGoldPrice();
    const ons = 28.3495231
    if (goldPrice === null) {
        console.error('Unable to fetch gold price.');
        return null;
    }

    const calculatedPrices = products.map((product) => {
        const calculatedPrice = (product.popularityScore + 1) * product.weight * (goldPrice / ons);
        return {
            name: product.name,
            calculatedPrice,
        };
    });

    return calculatedPrices;
};
