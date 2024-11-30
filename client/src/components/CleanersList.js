import React, { useEffect, useState } from 'react';
import { fetchAllCleaners } from '../api/api'; 
import { Link } from 'react-router-dom'; 

const CleanersList = () => {
    const [cleaners, setCleaners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const loadCleaners = async () => {
            try {
                const response = await fetchAllCleaners(); 
                setCleaners(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching cleaners:", error);
                setLoading(false);
                setMessage("Error loading cleaners.");
            }
        };

        loadCleaners();
    }, []);

    return (
        <div>
            <h2>List of Cleaners</h2>
            {loading ? (
                <p>Loading cleaners...</p>
            ) : (
                <div className="cleaner-list">
                    {cleaners.length > 0 ? (
                        cleaners.map(cleaner => (
                            <Link to={`/user/${cleaner._id}`} key={cleaner._id} className="cleaner-card"> 
                                <h3>{cleaner.firstName} {cleaner.surname}</h3>
                                <p>Email: {cleaner.email}</p>
                                <p>Location: {cleaner.location}</p>
                                <p>Years of Experience: {cleaner.experiences}</p>
                                <p>References: {cleaner.references}</p>
                                <p>Role: {cleaner.role}</p>
                            </Link>
                        ))
                    ) : (
                        <p>No cleaners found.</p>
                    )}
                </div>
            )}
            {message && <p>{message}</p>} 
        </div>
    );
};

export default CleanersList;