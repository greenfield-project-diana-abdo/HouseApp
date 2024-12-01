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
    const [submitting, setSubmitting] = useState(false); // State 

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
        setSubmitting(true); 
        try {
            await updateUser(id, userData); 
            setMessage("User information updated successfully!");

            // Update local storage 
            if (loggedInUserId === id) {
                localStorage.setItem('fullName', `${userData.firstName} ${userData.surname}`);
              
            }

            navigate('/'); 
        } catch (error) {
            console.error("Error updating user:", error);
            if (error.response && error.response.data) {
                setMessage(`Error updating user information: ${error.response.data.msg}`);
            } else {
                setMessage("Error updating user information.");
            }
        } finally {
            setSubmitting(false); 
        }
    };

    return (
        <div>
            <h2>User Settings</h2>
            {loading ? (
                <p>Loading user data...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label>
                        First Name:
                        <input 
                            type="text" 
                            name="firstName" 
                            value={userData.firstName} 
                            onChange={handleChange} 
                            placeholder="First Name"
                            required 
                        />
                    </label>
                    <label>
                        Surname:
                        <input 
                            type="text" 
                            name="surname" 
                            value={userData.surname} 
                            onChange={handleChange} 
                            placeholder="Surname"
                            required 
                        />
                    </label>
                    <label>
                        Email:
                        <input 
                            type="email" 
                            name="email" 
                            value={userData.email} 
                            onChange={handleChange} 
                            placeholder="Email"
                            required 
                        />
                    </label>
                    <label>
                        Location:
                        <input 
                            type="text" 
                            name="location" 
                            value={userData.location} 
                            onChange={handleChange} 
                            placeholder="Location"
                        />
                    </label>
                    <label>
                        Years of Experience:
                        <input 
                            type="number" 
                            name="experiences" 
                            value={userData.experiences} 
                            onChange={handleChange} 
                            placeholder="Years of Experience"
                        />
                    </label>
                    <label>
                        References:
                        <input 
                            type="text" 
                            name="references" 
                            value={userData.references} 
                            onChange={handleChange} 
                            placeholder="References"
                        />
                    </label>
                    <label>
                        Role:
                        <select name="role" value={userData.role} onChange={handleChange} required>
                            <option value="">Select Role</option>
                            <option value="Cleaner">Cleaner</option>
                            <option value="Houseowner">Houseowner</option>
                        </select>
                    </label>
                    <button type="submit" disabled={submitting}>
                      {submitting ? 'Updating...' : 'Update User'}
                    </button>
                </form>
            )}
            {message && <p>{message}</p>} 
        </div>
    );
};

export default Settings;