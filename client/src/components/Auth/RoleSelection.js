import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateRole } from '../../api/api'; 

const RoleSelection = ({ user }) => {
    const [role, setRole] = useState(user.role || '');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateRole(user.id, { role }); 
            if (role === 'Houseowner') {
                navigate('/cleanersList'); 
            } else if (role === 'Cleaner') {
                navigate('/propertyList');
            }
        } catch (error) {
            console.error("Error updating role:", error);
        }
    };

    return (
        <div>
            <h2>Select Your Role</h2>
            <form onSubmit={handleSubmit}>
                <select value={role} onChange={(e) => setRole(e.target.value)} required>
                    <option value="">Select Role</option>
                    <option value="Cleaner">Cleaner</option>
                    <option value="Houseowner">Houseowner</option>
                </select>
                <button type="submit">Continue</button>
            </form>
        </div>
    );
};

export default RoleSelection;