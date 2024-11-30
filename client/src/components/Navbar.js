import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const userRole = localStorage.getItem('userRole'); 
    const userId = localStorage.getItem('userId');

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        localStorage.removeItem('userRole'); 
        localStorage.removeItem('userId'); 
        navigate('/login'); 
    };

    return (
        <nav>
            <ul>
                {userRole ? ( 
                    <>
                        <li><button onClick={handleLogout}>Logout</button></li>
                        {userRole === 'Houseowner' && (
                            <>
                                <li><Link to="/cleanersList">Search for Cleaners</Link></li>
                                <li><Link to={`/settings/${userId}`}>Settings</Link></li> 
                                <li><Link to="/create-property">Create Property</Link></li> 
                                <li><Link to="/propertyList">All Property</Link></li> 
                                
                            </>
                        )}
                        {userRole === 'Cleaner' && (
                            <>
                                <li><Link to="/propertyList">Search Posts</Link></li>
                                <li><Link to={`/settings/${userId}`}>Settings</Link></li> 
                            </>
                        )}
                        {userRole === 'Admin' && (
                            <li><Link to="/admin-panel">Admin Panel</Link></li>
                        )}
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;