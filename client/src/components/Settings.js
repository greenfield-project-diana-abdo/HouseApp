import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserById, updateUser } from '../api/api';

const Settings = () => {
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const [userData, setUserData] = useState({
        firstName: '',
        surname: '',
        email: '',
        location: '',
        experiences: '',
        references: '',
        role: ''
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    
    const loggedInUserId = localStorage.getItem('userId');

    
    useEffect(() => {
        if (id !== loggedInUserId) {
            setMessage("You are not authorized to view this page.");
            navigate('/'); 
            return;
        }
        
        const loadUserData = async () => {
            try {
                const response = await fetchUserById(id); 
                setUserData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setLoading(false);
                setMessage("Error loading user data.");
            }
        };

        loadUserData();
    }, [id, loggedInUserId, navigate]);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await updateUser(id, userData);
            console.log(response.data.updatedUser)
            setUserData(response.data.updatedUser);
        

            setMessage("User information updated successfully!");
            navigate('/'); 

        } catch (error) {
            console.error("Error updating user:", error);
            setMessage("Error updating user information.");
        }
    };
console.log(userData)
    return (
        <div>
            <h2>User Settings</h2>
            {loading ? (
                <p>Loading user data...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="firstName" 
                        value={userData.firstName} 
                        onChange={handleChange} 
                        placeholder="First Name"
                        required 
                    />
                    <input 
                        type="text" 
                        name="surname" 
                        value={userData.surname} 
                        onChange={handleChange} 
                        placeholder="Surname"
                        required 
                    />
                    <input 
                        type="email" 
                        name="email" 
                        value={userData.email} 
                        onChange={handleChange} 
                        placeholder="Email"
                        required 
                    />
                    <input 
                        type="text" 
                        name="location" 
                        value={userData.location} 
                        onChange={handleChange} 
                        placeholder="Location"
                    />
                    <input 
                        type="number" 
                        name="experiences" 
                        value={userData.experiences} 
                        onChange={handleChange} 
                        placeholder="Years of Experience"
                    />
                    <input 
                        type="text" 
                        name="references" 
                        value={userData.references} 
                        onChange={handleChange} 
                        placeholder="References"
                    />
                    <select name="role" value={userData.role} onChange={handleChange} required>
                        <option value="">Select Role</option>
                        <option value="Cleaner">Cleaner</option>
                        <option value="Houseowner">Houseowner</option>
                    </select>
                    <button type="submit">Update User</button>
                </form>
            )}
            {message && <p>{message}</p>} 
        </div>
    );
};

export default Settings;