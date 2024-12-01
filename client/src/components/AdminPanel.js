import React, { useEffect, useState } from 'react';
import { fetchAllUsers, deleteUser, banUser, unbanUser } from '../api/api'; 
import { Link } from 'react-router-dom';

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
        <div>
            <h2>Admin Panel</h2>
            {loading ? (
                <p>Loading users...</p>
            ) : (
                <div className="user-cards">
                    {users.map(user => (
                        <div key={user._id} className="user-card">
                            <h3>{user.firstName} {user.surname}</h3>
                            <p>Email: {user.email}</p>
                            <p>Role: {user.role}</p>
                            <button onClick={() => handleDelete(user._id)}>Delete</button>
                            {user.banned ? (
                                <button onClick={() => handleUnban(user._id)}>Unban</button> 
                            ) : (
                                <button onClick={() => handleBan(user._id)}>Ban</button> 
                            )}
                            <Link to={`/modify-user/${user._id}`}>
                                <button>Modify</button>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminPanel;