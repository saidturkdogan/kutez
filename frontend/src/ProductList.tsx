import React, { useState, useEffect, useRef } from 'react';
import './ProductList.css';

interface Product {
    id: number;
    name: string;
    popularityScore: number;
    weight: number;
    images: {
        yellow: string;
        rose: string;
        white: string;
    };
    calculatedPrice?: number;
}

interface PriceResponse {
    prices: {
        name: string;
        calculatedPrice: number;
    }[];
}

const ProductList: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedColors, setSelectedColors] = useState<{ [key: number]: keyof Product['images'] }>({});

    // Backend'den veri çekme
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsResponse, pricesResponse] = await Promise.all([
                    fetch('http://localhost:3000/api/products'),
                    fetch('http://localhost:3000/api/calculateprice')
                ]);

                const productsData = await productsResponse.json();
                const pricesData: PriceResponse = await pricesResponse.json();

                const productsWithIdAndPrice = productsData.map((product: Omit<Product, 'id'>, index: number) => {
                    const matchingPrice = pricesData.prices.find(price => price.name === product.name);
                    return {
                        ...product,
                        id: index + 1,
                        calculatedPrice: matchingPrice?.calculatedPrice
                    };
                });

                setProducts(productsWithIdAndPrice);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleColorClick = (productId: number, color: keyof Product['images']) => {
        setSelectedColors((prev) => ({ ...prev, [productId]: color }));
    };

    const scrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    return (
        <div className="product-list">
            <h1 className="product-list-title">Product List</h1>
            <div className="navigation">
                <button className="nav-button left" onClick={scrollLeft}>
                    ◀
                </button>
                <div ref={containerRef} className="product-container">
                    {products.map((product) => {
                        const selectedColor = selectedColors[product.id] || 'yellow';
                        const rating = Math.round((product.popularityScore / 20) * 2) / 2;
                        return (
                            <div key={product.id} className="product-card">
                                <img
                                    src={product.images[selectedColor]}
                                    alt={product.name}
                                    className="product-image"
                                />
                                <h2 className="product-title">{product.name}</h2>
                                {product.calculatedPrice && (
                                    <p className="product-price">
                                        ${product.calculatedPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </p>
                                )}
                                <div className="product-colors">
                                    <span
                                        className={`color-circle yellow ${selectedColor === 'yellow' ? 'selected' : ''}`}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => handleColorClick(product.id, 'yellow')}
                                    />
                                    <span
                                        className={`color-circle gray ${selectedColor === 'white' ? 'selected' : ''}`}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => handleColorClick(product.id, 'white')}
                                    />
                                    <span
                                        className={`color-circle pink ${selectedColor === 'rose' ? 'selected' : ''}`}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => handleColorClick(product.id, 'rose')}
                                    />
                                </div>
                                <p className="product-metal">{selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)} Gold</p>
                                <div className="product-rating">
                                    {'★'.repeat(Math.floor(rating))}
                                    {'☆'.repeat(5 - Math.floor(rating))} {rating}/5
                                </div>
                            </div>
                        );
                    })}
                </div>
                <button className="nav-button right" onClick={scrollRight}>
                    ▶
                </button>
            </div>
        </div>
    );
};

export default ProductList;