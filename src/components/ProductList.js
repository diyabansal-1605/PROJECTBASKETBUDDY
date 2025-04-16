import React, { useContext, useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import { itemContext } from '../context/ItemContext';
import Header from './Header';

const ProductList = () => {
    const { products } = useContext(itemContext);
    const [sortedProducts, setSortedProducts] = useState([...products]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(3000);
    const [selectedType, setSelectedType] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');  // New state for search term

    useEffect(() => {
        setSortedProducts([...products]);
    }, [products]);

    const handleSortByPrice = () => {
        const sorted = [...sortedProducts].sort((a, b) => a.price - b.price);
        setSortedProducts(sorted);
    };

    const handleFilterByPriceRange = () => {
        const filtered = products.filter(
            (product) => product.price >= minPrice && product.price <= maxPrice
        );
        setSortedProducts(filtered);
    };

    const handleFilterByType = () => {
        if (selectedType === 'all') {
            setSortedProducts([...products]);
        } else {
            const filtered = products.filter(
                (product) => product.type.toLowerCase() === selectedType.toLowerCase()
            );
            console.log(filtered); // Debugging: Check what products are filtered
            setSortedProducts(filtered);
        }
    };

    // New search handler
    const handleSearch = () => {
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSortedProducts(filtered);
    };

    return (
        <div className="prdt-list">
            <Header />
            <div className="filter-btn">
                <button onClick={handleSortByPrice}>Sort by Price</button>
                <label>
                    Min Price:
                    <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                    />
                </label>
                <label>
                    Max Price:
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                    />
                </label>
                <button onClick={handleFilterByPriceRange}>Filter by Price Range</button>
                <label>
                    Filter by Type:
                    <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                        <option value="all">All</option>
                        <option value="Fruit">Fruit</option>
                        <option value="Vegetable">Vegetable</option>
                        <option value="Dairy">Dairy</option>
                    </select>
                </label>
                <button onClick={handleFilterByType}>Filter by Type</button>
                {/* Search input field */}
                <label>
                    Search by Name:
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search products..."
                    />
                </label>
                <button onClick={handleSearch}>Search</button>
            </div>

            <ul className="item-card">
                {sortedProducts.map((product) => (
                    <ProductItem key={product._id} product={product} />
                ))}
            </ul>

            <div className="buy-now-btn">Buy Now</div>
        </div>
    );
};

export default ProductList;
