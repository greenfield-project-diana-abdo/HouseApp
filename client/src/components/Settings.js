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
            const response = await updateUser(id, userData);
            setUserData(response.data.updatedUser);
            setMessage("User information updated successfully!");
            navigate('/');
        } catch (error) {
            console.error("Error updating user:", error);
            setMessage("Error updating user information.");
        }
    };

    return (
        <div className="settings">
        <div className="container mt-5">
            <div className="card shadow-lg p-4">
                <h2 className="text-center mb-4">User Settings</h2>
                {loading ? (
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    name="firstName"
                                    value={userData.firstName}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="First Name"
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    name="surname"
                                    value={userData.surname}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Surname"
                                    required
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <input
                                    type="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Email"
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    name="location"
                                    value={userData.location}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Location"
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <input
                                    type="number"
                                    name="experiences"
                                    value={userData.experiences}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Years of Experience"
                                />
                            </div>
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    name="references"
                                    value={userData.references}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="References"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="form-label" htmlFor="role">Role</label>
                            <select
                                name="role"
                                value={userData.role}
                                onChange={handleChange}
                                required
                                className="form-select"
                            >
                                <option value="">Select Role</option>
                                <option value="Admin">Admin</option>
                                <option value="Cleaner">Cleaner</option>
                                <option value="Houseowner">Houseowner</option>
                            </select>
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary w-50">
                                Update User
                            </button>
                        </div>
                    </form>
                )}
                {message && (
                    <div className={`alert ${message.includes("successfully") ? 'alert-success' : 'alert-danger'} mt-4`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
        </div>
    );

};

export default Settings;
