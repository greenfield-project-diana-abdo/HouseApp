import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import RoleSelection from './components/Auth/RoleSelection'; 
import CleanersList from './components/CleanersList'; 
import PropertyList from './components/Property/PropertyList';
import PropertyDetail from './components/Property/PropertyDetail';
import AdminPanel from './components/AdminPanel'; 
import Navbar from './components/Navbar';
import ModifyUser from './components/ModifyUser'; 
import UserProfile from './components/UserProfile'; 
import Settings from './components/Settings'; 
import CreateProperty from './components/CreateProperty'; 
import EditProperty from './components/Property/EditProperty'; 
import BookAppointment from './components/BookAppointment';
import MyBookedList from './components/MyBookedList';

const App = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/role-selection" element={<RoleSelection />} />
                <Route path="/cleanersList" element={<CleanersList />} />
                <Route path="/propertyList" element={<PropertyList />} />
                <Route path="/properties/:id" element={<PropertyDetail />} />
                <Route path="/admin-panel" element={<AdminPanel />} /> {/* Admin Panel */}
                <Route path="/modify-user/:id" element={<ModifyUser />} /> {/* modifying user */}
                <Route path="/cleaners" element={<CleanersList />} />
                <Route path="/user/:id" element={<UserProfile />} /> {/* User profile  */}
                <Route path="/settings/:id" element={<Settings />} /> {/* settings */}
                <Route path="/create-property" element={<CreateProperty />} /> {/* creating properties */}
                <Route path="/edit-property/:id" element={<EditProperty />} /> {/* Route for editing a property's details */}
                <Route path="/book-appointment/:cleanerId" element={<BookAppointment />} />
                <Route path="/my-booked-list" element={<MyBookedList />} />
                <Route path="/" element={<h1>Welcome to the Property Management App</h1>} />
            </Routes>
        </>
    );
};

export default App;