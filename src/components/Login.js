import '../styles/Login.css';
import React, { useContext, useState } from 'react';
import AuthContext from "./AuthContext";

export default function Login() {
    const { handleLogin } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        handleLogin(username, password);
    };

    return (
        <div className="login-container">
            <h1 className="login-title">Login to FitLife App</h1>
            <form className="login-form" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="form-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
}
