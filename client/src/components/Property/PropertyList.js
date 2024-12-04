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

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Property Listings</h2>
            {properties.length === 0 ? (
                <p className="text-center">No properties available.</p>
            ) : (
                <div className="row">
                    {properties.map(property => (
                        <div className="col-md-4 mb-4" key={property._id}>
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title text-primary">
                                        {property.title}
                                    </h5>
                                    <p className="card-text">
                                        <strong>Owner:</strong>{' '}
                                        {property.userId 
                                            ? `${property.userId.firstName} ${property.userId.surname}` 
                                            : 'Unknown'}
                                    </p>
                                    <p className="card-text">
                                        <strong>Type:</strong> {property.typeOfHouse || 'Not specified'}
                                    </p>
                                    <Link 
                                        to={`/properties/${property._id}`} 
                                        className="btn btn-primary btn-sm mt-2"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PropertyList;
