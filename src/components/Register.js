import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        first_name: '',
        email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://${process.env.REACT_APP_API_URL || 'localhost:8000/api'}/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.ok) {
                navigate('/login');
            } else {
                const errorMessage = data.msg.username ? data.msg.username[0] : 'Registration failed.';
                alert(errorMessage);
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <h1 className="login-title">Register for FitLife App</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="form-input"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-input"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        className="form-input"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-input"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="login-button">Register</button>
            </form>
        </div>
    );
}
