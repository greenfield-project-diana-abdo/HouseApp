import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ImageUpload from './Images/ImageUpload';

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

        <div className="d-flex flex-column align-items-center ms-7">

            <div>
                <h2>Create property</h2>
            </div>

            <p>Add your property to the list 
                <br/>of our app and unlock full 
                <br/>possibilities for your house services. 
                <br/>With premium subscription be always ahead of our news.        
            </p>

            <form onSubmit={handleSubmit}>
            
            <div className="m-3">
                <input 
                    type="text" 
                    placeholder="Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                />
            </div>
            
            <div className="m-3">
                <textarea 
                    placeholder="Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                />
            </div>

            <div className="m-3">                
                <input 
                    type="number" 
                    placeholder="Price per Hour" 
                    value={pricePerHour} 
                    onChange={(e) => setPricePerHour(e.target.value)} 
                    required 
                />
            </div>    

            <div className="m-3">
                <select value={typeOfService} onChange={(e) => setTypeOfService(e.target.value)} required>
                    <option value="">Select Type of Service</option>
                    <option value="Deep cleaning">Deep cleaning</option>
                    <option value="Laundry services">Laundry services</option>
                    <option value="Carpet cleaning">Carpet cleaning</option>
                    <option value="Floor cleaning">Floor cleaning</option>
                    <option value="Floor cleaning">Garden maintenance</option>
                    <option value="Floor cleaning">Offices</option>
                    <option value="Floor cleaning">Cleaning of exteriors</option>
                </select>
            </div>
            
            <div className="m-3">
                <input 
                    type="number" 
                    placeholder="House Size (in meters)" 
                    value={houseSize} 
                    onChange={(e) => setHouseSize(e.target.value)} 
                    required 
                />
            </div>
                 <ImageUpload />

                <button 
                type="submit"
                className="btn btn-primary m-3"
                >Create Property
                </button>
            </form>
            {message && <p>{message}</p>}
            
        </div>
    );
};

export default CreateProperty;