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
        <div 
        className="d-flex align-items-center justify-content-center"
        style={{ height: '100vh' }} 
        >
            <div className="card p-4 align-items-center shadow p-3 mb-5 bg-body-tertiary rounded" style={{ maxWidth: '400px', width: '100%', background: '#f8f9fa' }}>
            <h2 className="text-center mb-4">Register</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                <input 
                    type="text" 
                    placeholder="First Name" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    required 
                    class="form-control rounded-sm"
                />
                </div>

                <div className="mb-3">  
                <input 
                    type="text" 
                    placeholder="Surname" 
                    value={surname} 
                    onChange={(e) => setSurname(e.target.value)} 
                    required 
                    class="form-control rounded-sm"
                />
                </div>

                <div className="mb-3"> 
                <input 
                    type="text" 
                    placeholder="Location" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                    class="form-control rounded-sm"
                />
                </div>

                <div className="mb-3"> 
                <input 
                    type="number" 
                    placeholder="Years of Experience" 
                    value={experiences} 
                    onChange={(e) => setExperiences(e.target.value)} 
                    class="form-control rounded-sm"
                />
                </div>

                <div className="mb-3"> 
                <input 
                    type="text" 
                    placeholder="References" 
                    value={references} 
                    onChange={(e) => setReferences(e.target.value)} 
                    class="form-control rounded-sm"
                />
                </div>

                <div className="mb-3"> 
                <input 
                    type="email" 
                    placeholder="name@example.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    class="form-control rounded-sm"
                />
                </div>

                <div className="mb-3"> 
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    class="form-control rounded-sm"
                />
                </div>
             
                <div className="mb-3"> 
                    <select 
                    className= "form-select form-select-sm" aria-label="Small select example"
                    value={role} 
                    onChange={(e) => setRole(e.target.value)} 
                    required
                    class="form-control rounded-sm"
                    >

                    <option value="">Select Role</option>
                    <option value="Cleaner">Housekeeper</option>
                    <option value="Houseowner">House Owner</option>
                </select>
                </div>

                
                    <button 
                    type="submit" 
                    disabled={loading} 
                    className="btn btn-primary"
                    > 
                        {loading ? 'Registering...' : 'Register'}
                    </button> 
            </form>
            </div>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;