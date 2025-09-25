// client/src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import './style.css'; // Import CSS for styling
import { Link } from 'react-router-dom';
import greenBg from '../login-bg.png'

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('https://eco-together-main1-2.onrender.com/api/auth/register', {
                username,
                password
            });
            setMessage('Registered successfully'); // Set success message
        } catch (err) {
            console.error(err.response.data);
            setMessage('Failed to register, User already exists'); // Set error message
        }
    };

    return (
        <>
            <div className='login-div'>
                <div className="auth-form">
                        <h2>Register</h2>
                        <form onSubmit={onSubmit}>
                            <input type="text" placeholder="Username" name="username" value={username} onChange={onChange} required />
                            <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required />
                            <Link to={'/'}>Already have an account?</Link>
                            <button type="submit">Register</button>
                        </form>
                        <p className="message">{message}</p>
                </div>
            </div>
             <img className='login-div-img' src={greenBg} />
        </>
    );
};

export default Register;