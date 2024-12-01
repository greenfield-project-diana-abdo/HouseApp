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
                console.log(response.data)
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
            if(window.confirm("Are you sure, that you want to delete this property?")){
                await axios.delete(`http://localhost:8000/properties/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                navigate('/propertyList'); // Redirect 
            } 
        } catch (err) {
            console.error("Error deleting property:", err);
            setError("Failed to delete property.");
        }
    };

    if (loading) return <p>Loading property details...</p>;
    if (error) return <p>{error}</p>;

    const currentUserId = localStorage.getItem('userId'); 
    const isOwner = currentUserId === String(property.userId); 
   console.log(property)
    return (
        <div>
            <h2>Property Details</h2>
            {property ? (
                <div>
                    <h3>{property.title}</h3>
                    <p><strong>Description:</strong> {property.description}</p>
                    <p><strong>Price per Hour:</strong> ${property.pricePerHour}</p>
                    <p><strong>Type of Service:</strong> {property.typeOfService}</p>
                    <p><strong>House Size:</strong> {property.houseSize} m²</p>
                    <p><strong>Posted by:</strong> {`${property.userId.firstName} ${property.userId.surname}`}</p>

                 
                    {isOwner && (
                    <div>
                        <button onClick={() => navigate(`/edit-property/${id}`)}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                )}
            </div>
        ) : (
            <p>No property details available.</p>
        )}
    </div>
    );
};

export default PropertyDetail;