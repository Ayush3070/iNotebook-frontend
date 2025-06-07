import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-bg d-flex justify-content-center align-items-center min-vh-100">
      <div className="about-glass-card text-white p-5 text-center">
        <h1 className="mb-4">About iNotebook</h1>
        <p className="lead mb-4">
          <strong>iNotebook</strong> is a modern, cloud-based note-taking application built with the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to create, edit, and securely manage their notes with ease — anytime, anywhere.
        </p>
        <hr className="my-4" style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />
        <div className="text-start">
          <ul className="list-unstyled">
            <li>🗂️ <strong>Organize</strong> your thoughts effortlessly</li>
            <li>🔐 <strong>Secure</strong> login and note encryption</li>
            <li>📱 <strong>Responsive</strong> and mobile-friendly UI</li>
            <li>⚡ <strong>Fast</strong> and intuitive interface</li>
          </ul>
        </div>
        <p className="mt-4 fst-italic">Crafted with ❤️ by Ayush Mishra using React + Express</p>
      </div>
    </div>
  );
};

export default About;
