import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { parsedCookies } from '../consts.js';

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authToken, setAuthToken] = useState(parsedCookies.access_token ? parsedCookies.access_token : null);
    const [refreshToken, setRefreshToken] = useState(parsedCookies.refresh_token ? parsedCookies.refresh_token : null);
    const fourMinutes = 1000 * 10;

    const setCookies = (data) => {
        document.cookie = `access_token=${data.access};`
        document.cookie = `refresh_token=${data.refresh};`
        document.cookie = `username=${data.username};`
        document.cookie = `email=${data.email};`
        document.cookie = `name=${data.name};`
    }

    const handleLogin = async (username, password) => {
        try {
            const response = await fetch(`http://${process.env.REACT_APP_API_URL || 'localhost:8000/api'}/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (response.ok) {
                setCookies(data);
                setAuthToken(data.access);
                setRefreshToken(data.refresh);
                setIsAuthenticated(true);       
                alert('Login successful!');
                navigate('/profile');
            } else {
                alert('Login failed: ' + data.msg);
            }
        } catch (error) {
            alert('An error occurred: ' + error.message);
        }
    };

    const updateToken = async () => {
        try {
            const response = await fetch(`http://${process.env.REACT_APP_API_URL || 'localhost:8000/api'}/refresh-token/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh: refreshToken }),
            });
    
            const data = await response.json();
    
            if (response.status === 200) {
                setAuthToken(data.access);
            } else {
                logout();
            }
        } catch (error) {
            alert('An error occurred. Please try again later.');
        }
    };

    const logout = () => {
        setAuthToken(null);
        console.log("LOGOUT");
        document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        navigate("/");
        window.location.reload();
    }

    useEffect(() => {
        const validateToken = async () => {
            if (authToken) {
                try {
                    const response = await fetch(`http://${process.env.REACT_APP_API_URL || 'localhost:8000/api'}/validate-token/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${authToken}`, 
                        },
                    });
                    if (response.ok) {
                        setIsAuthenticated(true);
                        navigate("/profile"); 
                    } else {
                        setIsAuthenticated(false);
                    }
                } catch (error) {
                    alert('Token validation error: ' + error);
                }
            }
        };
        validateToken(); 
        const interval = setInterval(() => {
            if (authToken) {
                updateToken();
            }
        }, fourMinutes);
        return () => clearInterval(interval);
    }, [authToken]); 

    return (
        <AuthContext.Provider value={{ isAuthenticated, handleLogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
