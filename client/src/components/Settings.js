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
        <div className=" form-floating mt-4 mb-2 p-3 container d-flex flex-column align-items-center justify-content-center">

            <h2 className="mb-3">User Settings</h2>
            {loading ? (
                <p class="spinner-border spinner-border-sm" aria-hidden="true">Loading user data...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input 
                            type="text" 
                            name="firstName" 
                            value={userData.firstName} 
                            onChange={handleChange} 
                            placeholder="First Name"
                            required 
                            className="m-3"
                        />
                        <input 
                            type="text" 
                            name="surname" 
                            value={userData.surname} 
                            onChange={handleChange} 
                            placeholder="Surname"
                            required 
                            className="m-3"
                        />
                    </div>

                    <div className="mb-3">
                      
                        <input 
                            type="email" 
                            name="email" 
                            value={userData.email} 
                            onChange={handleChange} 
                            placeholder="Email"
                            required 
                            className="m-3"
                        />
                            
                        <input 
                            type="text" 
                            name="location" 
                            value={userData.location} 
                            onChange={handleChange} 
                            placeholder="Location"
                            className="m-3"
                        />
                     </div>
                    

                    <div>
                        <input 
                            type="number" 
                            name="experiences" 
                            value={userData.experiences} 
                            onChange={handleChange} 
                            placeholder="Years of Experience"
                            className="m-3"
                        />
                        <input 
                            type="text" 
                            name="references" 
                            value={userData.references} 
                            onChange={handleChange} 
                            placeholder="References"
                            className="m-3"
                        />
                    </div>

                    <div className="d-flex justify-content-center">
                        <select 
                            name="role" 
                            value={userData.role} 
                            onChange={handleChange} 
                            required
                            className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"
                        >
                                <option value="">Select Role</option>
                                <option value="Cleaner">Cleaner</option>
                                <option value="Houseowner">Houseowner</option>

                        </select>

                        <button type="submit" className="btn btn-primary ms-4 ">Update User</button>
                    </div>
                </form>
            )}
            {message && <p>{message}</p>} 
        </div>
    );
};

export default Settings;