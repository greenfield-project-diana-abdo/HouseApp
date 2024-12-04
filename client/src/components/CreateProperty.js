import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ImageUpload from './Images/ImageUpload';

const CreateProperty = () => {
    const [title, setTitle] = useState('');
    const [typeOfService, setTypeOfService] = useState('');
    const [houseSize, setHouseSize] = useState('');
    const [message, setMessage] = useState('');
    const [typeOfHouse, setTypeOfHouse] = useState('');
    const [numberOfRooms, setNumberOfRooms] = useState ('');
    
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
                { title, typeOfHouse, numberOfRooms, typeOfService, houseSize },
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

        <div className="create-property align-items-center ms-7">

        <div className="text-register">
            <p>
                    Add your property to the list 
                <br/>of our app and unlock full 
                <br/>possibilities for your house services. 
                <br/>With premium subscription be always ahead of our news.        
            </p>
        </div>

    <div className="form">
        <h2>Register your property</h2>
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
                <select 
                    value={typeOfHouse} 
                    onChange={(e) => setTypeOfHouse(e.target.value)} 
                    required
                    className="btn btn-primary dropdown-toggle"
                    aria-expanded="false"
                >
                    <option value="">Select Type of House</option>
                    <option value="Apartment">Apartment</option> 
                    <option value="Detached House">Detached House</option>
                    <option value="Semi-detached House">Semi-detached House</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Bungalow">Bungalow</option>
                    <option value="Villa">Villa</option>
                    <option value="Cottage">Cottage</option>
                </select>
                </div>


            <div className="m-3">
                <input 
                    type="number" 
                    placeholder="House Size in m²" 
                    value={houseSize} 
                    onChange={(e) => setHouseSize(e.target.value)} 
                    required 
                />
            </div>

            <div className="m-3">                
                <input 
                    type="number" 
                    placeholder="Number of Rooms" 
                    value={numberOfRooms} 
                    onChange={(e) => setNumberOfRooms(e.target.value)} 
                    required 
                />
            </div>    

            <div className="m-3">
                <select 
                    value={typeOfService} 
                    onChange={(e) => setTypeOfService(e.target.value)} 
                    required
                    class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
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
            
                 <ImageUpload />

                <button 
                type="submit"
                className="btn btn-primary m-3"
                >Create Property
                </button>
            </form>

            </div>
            {message && <p>{message}</p>}
            
        </div>
    );
};

export default CreateProperty;