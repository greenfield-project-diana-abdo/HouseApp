import React, { useEffect, useState } from 'react';
import { fetchAllUsers, deleteUser, banUser, unbanUser } from '../api/api'; 
import { Link } from 'react-router-dom';
import './AdminPanel.css';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const response = await fetchAllUsers();
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching users:", error);
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    const handleDelete = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteUser(userId);
                setUsers(users.filter(user => user._id !== userId));
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };

    const handleBan = async (userId) => {
        if (window.confirm("Are you sure you want to ban this user?")) {
            try {
                await banUser(userId);
                setUsers(users.map(user => 
                    user._id === userId ? { ...user, banned: true } : user
                ));
            } catch (error) {
                console.error("Error banning user:", error);
            }
        }
    };

    const handleUnban = async (userId) => {
        if (window.confirm("Are you sure you want to unban this user?")) {
            try {
                await unbanUser(userId); 
                setUsers(users.map(user => 
                    user._id === userId ? { ...user, banned: false } : user
                ));
            } catch (error) {
                console.error("Error unbanning user:", error);
            }
        }
    };

    return (
        <div className="admin-panel">
            <h2 className="admin-panel-title">Admin Panel</h2>
            {loading ? (
                <p className="loading-message">Loading users...</p>
            ) : (
                <div className="user-cards">
                    {users.map(user => (
                        <div key={user._id} className="user-card">
                            <h3 className="user-name">{user.firstName} {user.surname}</h3>
                            <p className="user-email">Email: {user.email}</p>
                            <p className="user-role">Role: {user.role}</p>
                            <div className="action-buttons">
                                <button className="delete-button" onClick={() => handleDelete(user._id)}>Delete</button>
                                {user.banned ? (
                                    <button className="unban-button" onClick={() => handleUnban(user._id)}>Unban</button> 
                                ) : (
                                    <button className="ban-button" onClick={() => handleBan(user._id)}>Ban</button> 
                                )}
                                <Link to={`/modify-user/${user._id}`}>
                                    <button className="modify-button">Modify</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
