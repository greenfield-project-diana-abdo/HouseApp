import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyBookedList = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('http://localhost:8000/bookings', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                console.log("Fetched bookings:", response.data);
                setBookings(response.data);
            } catch (err) {
                console.error("Error fetching bookings:", err);
                setError("Failed to fetch bookings.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) return <p>Loading your bookings...</p>;
    if (error) return <p>{error}</p>;

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const todaysBookings = bookings.filter(booking => {
        const bookingDate = new Date(booking.date);
        return bookingDate.toDateString() === today.toDateString();
    });

    const tomorrowsBookings = bookings.filter(booking => {
        const bookingDate = new Date(booking.date);
        return bookingDate.toDateString() === tomorrow.toDateString();
    });

    return (
        <div>
            <h2>My Booked Appointments</h2>

            <h3>Today's Bookings</h3>
            {todaysBookings.length > 0 ? (
                <ul>
                    {todaysBookings.map((booking) => (
                        <li key={booking._id}>
                            <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
                            <p>Time: {booking.time}</p>
                            <p>Additional Info: {booking.additionalInfo}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No bookings for today.</p>
            )}


            <h3>Tomorrow's Bookings</h3>
            {tomorrowsBookings.length > 0 ? (
                <ul>
                    {tomorrowsBookings.map((booking) => (
                        <li key={booking._id}>
                            <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
                            <p>Time: {booking.time}</p>
                            <p>Additional Info: {booking.additionalInfo}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No bookings for tomorrow.</p>
            )}


            <h3>All Bookings</h3>
            {bookings.length > 0 ? (
                <ul>
                    {bookings.map((booking) => (
                        <li key={booking._id}>
                            <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
                            <p>Time: {booking.time}</p>
                            <p>Additional Info: {booking.additionalInfo}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No bookings found.</p>
            )}
        </div>
    );
};

export default MyBookedList;