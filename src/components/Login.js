import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageWrapper from './pageWrapper';

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const json = await response.json();
            console.log("Login Response:", json);
            if (json.success) {
                localStorage.setItem('token', json.authToken);
                props.showAlert("Logged in successfully", "success");
                navigate("/");
            } else {
                props.showAlert("Invalid email or password", "danger");
            }
        } catch (error) {
            console.error('Login error:', error);
            props.showAlert("Server error. Please try again later.", "danger");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="glass-card card text-light shadow-lg p-4"
            >
                <h3 className="text-center mb-4" style={{ color: 'lightcoral' }}>
                    Login
                </h3>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control bg-dark text-light border-secondary"
                            id="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            aria-describedby="emailHelp"
                            required
                        />
                        <div id="emailHelp" className="form-text text-light">
                            We'll never share your email.
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control bg-dark text-light border-secondary"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-info w-100 fw-bold">Login</button>

                    {/* 👇 New Sign-up prompt */}
                    <div className="mt-3 text-center">
                        <span className="text-light">
                            Don't have an account?{' '}
                            <a href="/signup" className="text-info fw-semibold text-decoration-none">
                                Sign up
                            </a>
                        </span>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
