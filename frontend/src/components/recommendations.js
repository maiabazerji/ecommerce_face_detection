import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../pages/ProductList';


const Recommendations = ({ userId }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await axios.get(`/recommendations/${userId}`);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching recommendations:", error);
            }
        };

        fetchRecommendations();
    }, [userId]);

    return (
        <div>
            <h2>Recommended Products</h2>
            <div className="product-list">
                {products.map(product => (
                    <ProductList key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Recommendations;
