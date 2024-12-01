import axios from 'axios';
// FrontEnd URL 
const API_URL = 'http://localhost:8000'; 


export const register = async (userData) => {
    return await axios.post(`${API_URL}/cleaners/register`, userData);
};


export const login = async (userData) => {
    return await axios.post(`${API_URL}/cleaners/login`, userData);
};



export const createProperty = async (propertyData) => {
    const token = localStorage.getItem('token'); 

    if (!token) {
        throw new Error("No token found. User may not be authenticated.");
    }

    try {
        const response = await axios.post(`${API_URL}/properties`, propertyData, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });

        return response.data; 
    } catch (error) {
        if (error.response) {
            console.error("Error creating property:", error.response.data);
            throw new Error(error.response.data.msg || "Error creating property.");
        } else if (error.request) {
            console.error("No response received:", error.request);
            throw new Error("No response received from the server.");
        } else {
            console.error("Error:", error.message);
            throw new Error("An unexpected error occurred.");
        }
    }
};

// Update user role
export const updateRole = async (userId, roleData) => {
    return await axios.patch(`${API_URL}/cleaners/${userId}/role`, roleData);
};

// Fetch all users
export const fetchAllUsers = async () => {
    return await axios.get(`${API_URL}/cleaners`); 
};

// Delete a user by ID
export const deleteUser = async (userId) => {
    return await axios.delete(`${API_URL}/cleaners/${userId}`); 
};

// Ban a user by ID
export const banUser = async (userId) => {
    return await axios.patch(`${API_URL}/cleaners/${userId}/ban`); 
};

// Unban a user by ID
export const unbanUser = async (userId) => {
    return await axios.patch(`${API_URL}/cleaners/${userId}/unban`); 
};

// Fetch a user by ID
export const fetchUserById = async (userId) => {
    return await axios.get(`${API_URL}/cleaners/${userId}`); 
};

// Fetch all users with the role "Cleaner"
export const fetchAllCleaners = async () => {
    return await axios.get(`${API_URL}/cleaners/cleaners`); 
};

// Update a user by ID
export const updateUser = async (userId, userData) => {
    return await axios.put(`${API_URL}/cleaners/${userId}`, userData); 
};

