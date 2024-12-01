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
        <nav class="navbar bg-primary sticky-top d-flex justify-content-end">
            <ul>
                {userRole ? ( 
                    <>
                        {userRole === 'Houseowner' && (
                            <>
                            <div class=" d-flex">
                                <li class="list-unstyled p-2"><Link to="/cleanersList" className="nav-link text-dark">Find your Housekeeper</Link></li>
                                <li class="list-unstyled p-2"><Link to={`/settings/${userId}`} className="nav-link text-dark">Settings</Link></li> 
                                <li class="list-unstyled p-2"><Link to="/create-property" className="nav-link text-dark">Create Property</Link></li> 
                                <li class="list-unstyled p-2"> <Link to="/propertyList" className="nav-link text-dark">All Property</Link></li> 
                             </div> 
                            </>
                        )}
                        {userRole === 'Cleaner' && (
                            <>
                                <li class="list-unstyled"><Link to="/propertyList" className="nav-link text-dark">Search Posts</Link></li>
                                <li class="list-unstyled"><Link to={`/settings/${userId}`} className="nav-link text-dark">Settings</Link></li> 
                            </>
                        )}
                        {userRole === 'Admin' && (
                            <li class="list-unstyled"><Link to="/admin-panel" className="nav-link text-dark">Admin Panel</Link></li>
                        )}
                        <div class=" d-flex justify-content-end me-3">
                         <li class="list-unstyled">
                            <button onClick={handleLogout} class="btn btn-light">Logout</button> 
                        </li>
                        </div>
                    </>
                ) : (
                    <>
                    <div class=" d-flex">
                        <li class="list-unstyled p-2"><Link to="/login" className="nav-link text-dark">Login</Link></li>
                        <li class="list-unstyled p-2"><Link to="/register" className="nav-link text-dark">Register</Link></li>
                    </div>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;