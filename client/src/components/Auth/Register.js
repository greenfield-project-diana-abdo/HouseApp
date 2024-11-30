import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { register } from '../../api/api';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [location, setLocation] = useState(''); 
    const [experiences, setExperiences] = useState(''); 
    const [references, setReferences] = useState(''); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); 

    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await register({ 
                firstName, 
                surname, 
                location, 
                experiences: experiences ? Number(experiences) : undefined,
                references, 
                email, 
                password,
                role 
            });
            setMessage('Registration successful! You can now log in.');
            navigate('/login'); 
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage('Registration failed: ' + error.response.data.msg);
            } else {
                setMessage('Registration failed: An unexpected error occurred.');
            }
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="First Name" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Surname" 
                    value={surname} 
                    onChange={(e) => setSurname(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Location" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                />
                <input 
                    type="number" 
                    placeholder="Years of Experience" 
                    value={experiences} 
                    onChange={(e) => setExperiences(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="References" 
                    value={references} 
                    onChange={(e) => setReferences(e.target.value)} 
                />
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
                
             
                <select value={role} onChange={(e) => setRole(e.target.value)} required>
                    <option value="">Select Role</option>
                    <option value="Cleaner">Cleaner</option>
                    <option value="Houseowner">Houseowner</option>
                </select>

                <button type="submit" disabled={loading}> 
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;