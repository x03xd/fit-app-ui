import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import App from './components/App'; 
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Calculator from './components/Calculator';
import DietGenerator from './components/DietGenerator';
import Profile from './components/Profile';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Router>
        <AuthProvider>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/calculator" element={<ProtectedRoute element={<Calculator />} />} />
                <Route path="/diet-generator" element={<ProtectedRoute element={<DietGenerator />} />} />
                <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
            </Routes>
        </AuthProvider>
    </Router>
);
