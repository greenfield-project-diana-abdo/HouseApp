import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProperty = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [pricePerHour, setPricePerHour] = useState('');
    const [typeOfService, setTypeOfService] = useState('');
    const [houseSize, setHouseSize] = useState('');
    const [message, setMessage] = useState('');
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); 
            if (!token) {
                throw new Error("No token found. User may not be authenticated.");
            }

            // Send POST request 
            await axios.post('http://localhost:8000/properties',
                { title, description, pricePerHour, typeOfService, houseSize },
                { headers: { 'Authorization': `Bearer ${token}` } } 
            );
            setMessage("Property posted successfully!");
            navigate('/propertyList'); // Redirect 
        } catch (error) {
            console.error("Error creating property:", error);
            setMessage("Error posting property: " + (error.response?.data.message || error.message));
        }
    };

    return (
        <div>
            <h2>Create Property</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                />
                <textarea 
                    placeholder="Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                />
                <input 
                    type="number" 
                    placeholder="Price per Hour" 
                    value={pricePerHour} 
                    onChange={(e) => setPricePerHour(e.target.value)} 
                    required 
                />
                <select value={typeOfService} onChange={(e) => setTypeOfService(e.target.value)} required>
                    <option value="">Select Type of Service</option>
                    <option value="Deep cleaning">Deep cleaning</option>
                    <option value="Laundry services">Laundry services</option>
                    <option value="Carpet cleaning">Carpet cleaning</option>
                    <option value="Floor cleaning">Floor cleaning</option>
                </select>
                <input 
                    type="number" 
                    placeholder="House Size (in meters)" 
                    value={houseSize} 
                    onChange={(e) => setHouseSize(e.target.value)} 
                    required 
                />
                <button type="submit">Create Property</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateProperty;