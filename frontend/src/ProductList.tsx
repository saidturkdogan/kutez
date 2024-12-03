import React, { useState, useRef } from 'react';
import './ProductList.css';

// Ürün verisi için tip tanımlaması
interface Product {
    id: number;
    title: string;
    price: number;
    rating: number;
    images: {
        yellow: string;
        gray: string;
        pink: string;
    };
}

// Örnek ürün verisi
const products: Product[] = [
    {
        id: 1,
        title: 'Product Title',
        price: 101,
        rating: 4.5,
        images: {
            yellow: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG085-100P-Y.jpg?v=1696588368',
            gray: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG085-100P-W.jpg?v=1696588402',
            pink: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG085-100P-R.jpg?v=1696588406',
        },
    },
    {
        id: 2,
        title: 'Product Title',
        price: 101,
        rating: 2.5,
        images: {
            yellow: 'https://example.com/image-yellow2.jpg',
            gray: 'https://example.com/image-gray2.jpg',
            pink: 'https://example.com/image-pink2.jpg',
        },
    },
    {
        id: 3,
        title: 'Product Title',
        price: 101,
        rating: 2.5,
        images: {
            yellow: 'https://example.com/image-yellow2.jpg',
            gray: 'https://example.com/image-gray2.jpg',
            pink: 'https://example.com/image-pink2.jpg',
        },
    },
    {
        id: 3,
        title: 'Product Title',
        price: 101,
        rating: 2.5,
        images: {
            yellow: 'https://example.com/image-yellow2.jpg',
            gray: 'https://example.com/image-gray2.jpg',
            pink: 'https://example.com/image-pink2.jpg',
        },
    },
    {
        id: 3,
        title: 'Product Title',
        price: 101,
        rating: 2.5,
        images: {
            yellow: 'https://example.com/image-yellow2.jpg',
            gray: 'https://example.com/image-gray2.jpg',
            pink: 'https://example.com/image-pink2.jpg',
        },
    },
    {
        id: 3,
        title: 'Product Title',
        price: 101,
        rating: 2.5,
        images: {
            yellow: 'https://example.com/image-yellow2.jpg',
            gray: 'https://example.com/image-gray2.jpg',
            pink: 'https://example.com/image-pink2.jpg',
        },
    },
    {
        id: 3,
        title: 'Product Title',
        price: 101,
        rating: 2.5,
        images: {
            yellow: 'https://example.com/image-yellow2.jpg',
            gray: 'https://example.com/image-gray2.jpg',
            pink: 'https://example.com/image-pink2.jpg',
        },
    },
    {
        id: 3,
        title: 'Product Title',
        price: 101,
        rating: 2.5,
        images: {
            yellow: 'https://example.com/image-yellow2.jpg',
            gray: 'https://example.com/image-gray2.jpg',
            pink: 'https://example.com/image-pink2.jpg',
        },
    },
    // Diğer ürünler...
];

const ProductList: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedColors, setSelectedColors] = useState<{ [key: number]: keyof Product['images'] }>({});

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
                        const selectedColor = selectedColors[product.id] || 'yellow'; // Varsayılan renk
                        return (
                            <div key={product.id} className="product-card">
                                <img
                                    src={product.images[selectedColor]}
                                    alt={product.title}
                                    className="product-image"
                                />
                                <h2 className="product-title">{product.title}</h2>
                                <p className="product-price">${product.price.toFixed(2)} USD</p>
                                <div className="product-colors">
                                    <span
                                        className={`color-circle yellow ${selectedColor === 'yellow' ? 'selected' : ''}`}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => handleColorClick(product.id, 'yellow')}
                                    />
                                    <span
                                        className={`color-circle gray ${selectedColor === 'gray' ? 'selected' : ''}`}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => handleColorClick(product.id, 'gray')}
                                    />
                                    <span
                                        className={`color-circle pink ${selectedColor === 'pink' ? 'selected' : ''}`}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => handleColorClick(product.id, 'pink')}
                                    />
                                </div>
                                <p className="product-metal">{selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)} Gold</p>
                                <div className="product-rating">
                                    {'★'.repeat(Math.floor(product.rating))}
                                    {'☆'.repeat(5 - Math.floor(product.rating))} {product.rating}/5
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
