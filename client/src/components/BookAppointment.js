import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BookAppointment = () => {
    const { cleanerId } = useParams(); 
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [message, setMessage] = useState('');
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
       
        const userId = localStorage.getItem('userId');

        try {
            await axios.post('http://localhost:8000/bookings', 
                { 
                    date, 
                    time, 
                    additionalInfo,
                    userId,      // house owner's ID
                    cleanerId,   // cleaner's ID
                }, 
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                }
            );
            setMessage('Appointment booked successfully!');
            navigate('/my-booked-list'); // Redirect 
        } catch (error) {
            console.error("Error booking appointment:", error); // Log 
            setMessage("Failed to book appointment.");
        }
    };

    return (
        <div>
            <h2>Book an Appointment</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                    required 
                />
                <input 
                    type="time" 
                    value={time} 
                    onChange={(e) => setTime(e.target.value)} 
                    required 
                />
                <textarea 
                    placeholder="Additional Information"
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                />
                <button type="submit">Book Appointment</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default BookAppointment;