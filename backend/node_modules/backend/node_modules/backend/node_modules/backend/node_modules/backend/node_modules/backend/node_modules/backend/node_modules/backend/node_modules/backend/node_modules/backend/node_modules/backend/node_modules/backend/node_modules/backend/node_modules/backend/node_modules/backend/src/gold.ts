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
