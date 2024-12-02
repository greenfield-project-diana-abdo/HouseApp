import React, { useState } from 'react';
import { login } from '../../api/api';
import { useNavigate } from 'react-router-dom';

import '../../index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBroom } from '@fortawesome/free-solid-svg-icons';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ email, password });
            
            console.log("Login response:", response.data); // Log the response
    
            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token); 
                localStorage.setItem('userRole', response.data.role); 
                localStorage.setItem('userId', response.data.userId); 
                localStorage.setItem('fullName', response.data.fullName); 
    
                const userRole = response.data.role; 
                if (userRole === 'Admin') {
                    navigate('/admin-panel'); 
                } else if (userRole === 'Houseowner') {
                    navigate('/cleanersList'); 
                } else if (userRole === 'Cleaner') {
                    navigate('/propertyList'); 
                }
                
                setMessage('Login successful!');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage('Login failed: ' + error.response.data.msg);
            } else {
                setMessage('Login failed: An unexpected error occurred.');
            }
        }
    };

    return (
        <div className="homepage form-floating mt-4 mb-2 p-3 container d-flex flex-column align-items-center justify-content-center">
            <p className="slogan">The Key to Clean Living Starts Here <FontAwesomeIcon icon={faBroom} /></p>
            
            <p className="text-registered">Already registered?</p>
            <h2 className="login mb-3">Log in</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                <input
                    type="email" 
                    placeholder="name@example.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    class="form-control"
                />
                </div>
                <div className="mb-3">
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    class="form-control" 
                />
                </div>

                <button type="submit" class="btn btn-primary">Login</button>
               
            </form>
          
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;