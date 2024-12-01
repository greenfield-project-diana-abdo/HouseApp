import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PropertyList = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('http://localhost:8000/properties'); 
                setProperties(response.data);
            } catch (err) {
                if (err.response) {
                    setError(`Failed to fetch properties: ${err.response.data.msg || err.message}`);
                } else {
                    setError('Failed to fetch properties: An unexpected error occurred.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    if (loading) return <p>Loading properties...</p>;
    if (error) return <p>{error}</p>;
console.log(properties)
    return (
        <div>
            <h2>Property Listings</h2>
            {properties.length === 0 ? (
                <p>No properties available.</p>
            ) : (
                <ul>
                    {properties.map(property => (
                        <li key={property._id}>
                            <Link to={`/properties/${property._id}`}>
                                {property.userId && `${property.userId.firstName} ${property.userId.surname}`} - {property.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PropertyList;