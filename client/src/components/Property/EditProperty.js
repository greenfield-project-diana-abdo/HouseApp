import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProperty = () => {
    const { id } = useParams(); // Get the ID from URL parameters
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
                    setError(`Failed to fetch property details: ${err.response.data.msg}`);
                } else {
                    setError('Failed to fetch property details.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPropertyDetails();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await axios.put(`http://localhost:8000/properties/${id}`, { ...property }, { 
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            navigate(`/properties/${id}`); // Redirect back
        } catch (err) {
            console.error("Error updating property:", err);
            setError("Failed to update the property.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Property</h2>
            <input 
                type="text" 
                value={property.title} 
                onChange={(e) => setProperty({ ...property, title: e.target.value })} 
                required 
            />
            <textarea 
                value={property.description} 
                onChange={(e) => setProperty({ ...property, description: e.target.value })} 
                required 
            />
            <input 
                type="number" 
                value={property.pricePerHour} 
                onChange={(e) => setProperty({ ...property, pricePerHour: e.target.value })} 
                required 
            />
            <select value={property.typeOfService} onChange={(e) => setProperty({ ...property, typeOfService: e.target.value })} required>
                <option value="Deep cleaning">Deep cleaning</option>
                <option value="Laundry services">Laundry services</option>
                <option value="Carpet cleaning">Carpet cleaning</option>
                <option value="Floor cleaning">Floor cleaning</option>
            </select>
            <input 
                type="number" 
                value={property.houseSize} 
                onChange={(e) => setProperty({ ...property, houseSize: e.target.value })} 
                required 
            />
            <button type="submit">Update Property</button>
        </form>
    );
};

export default EditProperty;