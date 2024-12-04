import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PropertyDetail = () => {
    const { id } = useParams(); 
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/properties/${id}`);
                setProperty(response.data);
            } catch (err) {
                if (err.response) {
                    setError(`Failed to fetch property: ${err.response.data.msg || err.message}`);
                } else {
                    setError('Failed to fetch property: An unexpected error occurred.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPropertyDetails();
    }, [id]);

    const handleDelete = async () => {
        try {
            if (window.confirm("Are you sure you want to delete this property?")) {
                await axios.delete(`http://localhost:8000/properties/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                navigate('/propertyList'); // Redirect after deletion
            }
        } catch (err) {
            console.error("Error deleting property:", err);
            setError("Failed to delete property.");
        }
    };

    if (loading) return <div className="text-center"><p>Loading property details...</p></div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    const currentUserId = localStorage.getItem('userId');
    const isOwner = currentUserId === String(property.userId);

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-header text-white bg-primary">
                    <h2 className="card-title mb-0">Property Details</h2>
                </div>
                <div className="card-body">
                    {property ? (
                        <>
                            <h3>{property.title}</h3>
                            <p><strong>Description:</strong> {property.description}</p>
                            <p><strong>Price per Hour:</strong> ${property.pricePerHour}</p>
                            <p><strong>Type of Service:</strong> {property.typeOfService}</p>
                            <p><strong>House Size:</strong> {property.houseSize} m²</p>
                            <p><strong>Posted by:</strong> {`${property.userId.firstName} ${property.userId.surname}`}</p>

                            {isOwner && (
                                <div className="mt-4 d-flex gap-3">
                                    <button 
                                        onClick={() => navigate(`/edit-property/${id}`)} 
                                        className="btn btn-warning"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={handleDelete} 
                                        className="btn btn-danger"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <p className="text-muted">No property details available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PropertyDetail;
