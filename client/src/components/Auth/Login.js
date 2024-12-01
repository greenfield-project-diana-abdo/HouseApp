import React, { useState } from 'react';
import { login } from '../../api/api';
import { useNavigate } from 'react-router-dom';

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
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;