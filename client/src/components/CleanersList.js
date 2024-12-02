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
        <div className="container mt-5">
            <h2 className="mb-4 text-center">List of Cleaners</h2>
            {loading ? (
                <p className="text-center">Loading cleaners...</p>
            ) : (
                <div className="row g-4">
                    {cleaners.length > 0 ? (
                        cleaners.map(cleaner => (
                            <div className="col-md-4" key={cleaner._id}>
                                <div className="card shadow-lg">
                                    <img 
                                        src="https://via.placeholder.com/150" 
                                        alt={`${cleaner.firstName} ${cleaner.surname}`} 
                                        className="card-img-top"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{cleaner.firstName} {cleaner.surname}</h5>
                                        <p className="card-text">
                                            <strong>Email:</strong> {cleaner.email}<br />
                                            <strong>Location:</strong> {cleaner.location}<br />
                                            <strong>Years of Experience:</strong> {cleaner.experiences}<br />
                                            <strong>References:</strong> {cleaner.references}<br />
                                            <strong>Role:</strong> {cleaner.role}
                                        </p>
                                        <Link to={`/user/${cleaner._id}`} className="btn btn-primary">
                                            View Profile
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No cleaners found.</p>
                    )}
                </div>
            )}
            {message && <p className="alert alert-danger mt-3">{message}</p>} 
        </div>
    );
};

export default CleanersList;
