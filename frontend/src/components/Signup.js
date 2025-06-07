import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageWrapper from './pageWrapper';
const Signup = (props) => {
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (credentials.password !== credentials.cpassword) {
            props.showAlert("Passwords do not match.", "danger");
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/api/auth/createuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password
                }),
            });

            const json = await response.json();
            console.log("Signup Response:", json);

            if (json.authtoken) {
                localStorage.setItem('token', json.authToken);
                props.showAlert("Account created successfully!", "success");
                navigate('/');
            } else if (json.error) {
                props.showAlert(`Signup failed: ${json.error}`, "danger");
            } else {
                props.showAlert("Signup failed: Invalid input", "danger");
            }
        } catch (error) {
            console.error('Signup error:', error);
            props.showAlert("Something went wrong. Please try again.", "danger");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 ">
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="glass-card card text-light shadow-lg p-4"
            >
                <h2 style={{ color: 'rgb(221, 175, 239)' }}>Sign Up</h2>



                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label" style={{ color: 'rgb(221, 175, 239)' }}>Name</label>
                        <input
                            type="text"
                            className="form-control bg-dark text-light border-secondary"
                            id="name"
                            name="name"
                            value={credentials.name}
                            onChange={handleChange}
                            required
                            minLength={3}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label" style={{ color: 'rgb(221, 175, 239)' }}>Email address</label>
                        <input
                            type="email"
                            className="form-control bg-dark text-light border-secondary"
                            id="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label" style={{ color: 'rgb(221, 175, 239)' }}>Password</label>
                        <input
                            type="password"
                            className="form-control bg-dark text-light border-secondary"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                            minLength={5}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label" style={{ color: 'rgb(221, 175, 239)' }}>Confirm Password</label>
                        <input
                            type="password"
                            className="form-control bg-dark text-light border-secondary"
                            id="cpassword"
                            name="cpassword"
                            value={credentials.cpassword}
                            onChange={handleChange}
                            required
                            minLength={5}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn w-100 mt-3"
                        style={{
                            background: 'rgba(255, 255, 255, 0.15)',
                            border: '1px solid rgba(255, 255, 255, 0.25)',
                            color: '#ffffff',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '12px',
                            padding: '10px 16px',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Create Account
                    </button>
{/* 👇 Add this below the button */}
<div className="mt-3 text-center">
  <span className="text-light">
    Already have an account?{' '}
    <a href="/login" className="text-info fw-semibold text-decoration-none">
      Login
    </a>
  </span>
</div>
                </form>
            </motion.div>
        </div>
    );
};

export default Signup;
