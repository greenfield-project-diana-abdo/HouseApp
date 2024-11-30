import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const ModifyUser = () => {
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

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/cleaners/${id}`); 
                setUserData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setLoading(false);
                setMessage("Error loading user data.");
            }
        };

        fetchUserData();
    }, [id]);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/cleaners/${id}`, userData); 
            setMessage("User information updated successfully!");
            navigate('/admin-panel'); 
        } catch (error) {
            console.error("Error updating user:", error);
            setMessage("Error updating user information.");
        }
    };

    return (
        <div>
            <h2>Modify User</h2>
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

export default ModifyUser;