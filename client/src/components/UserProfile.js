import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { fetchUserById } from '../api/api'; 

const UserProfile = () => {
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await fetchUserById(id); 
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user:", error);
                setLoading(false);
                setMessage("Error loading user data.");
            }
        };

        loadUser();
    }, [id]);

    // Get the current user's role from local storage
    const currentUserRole = localStorage.getItem('userRole');

    return (
        <div>
            <h2>User Profile</h2>
            {loading ? (
                <p>Loading user data...</p>
            ) : user ? (
                <div className="user-profile">
                    <h3>{user.firstName} {user.surname}</h3>
                    <p>Email: {user.email}</p>
                    <p>Location: {user.location}</p>
                    <p>Years of Experience: {user.experiences}</p>
                    <p>References: {user.references}</p>
                    <p>Role: {user.role}</p>

                    {/* Conditionally render the "Book an Appointment" button */}
                    {currentUserRole === 'Houseowner' && (
                        <button onClick={() => navigate(`/book-appointment/${id}`)}>
                            Book an Appointment
                        </button>
                    )}
                </div>
            ) : (
                <p>No user found.</p>
            )}
            {message && <p>{message}</p>} 
        </div>
    );
};

export default UserProfile;