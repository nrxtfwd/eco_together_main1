// client/src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './style.css'; // Import CSS for styling
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import greenBg from '../login-bg.png'

const Login = ({ setLoggedInUser }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, 
                                      [e.target.name]: e.target.value });

    const navigate = useNavigate()
    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = 
                await axios.post('http://localhost:5000/api/auth/login', 
            {
                username,
                password
            });
            localStorage.setItem('userid', username)
            localStorage.setItem('token', res.data.token);
            setLoggedInUser(username);
            
            // Set success message
            setMessage('Logged in successfully');
            navigate('/home')
            toast.success("Logged in!")
        } catch (err) {
            console.error(err.response.data);
            // Set error message
            setMessage('Failed to login - wrong credentials');         
        }
    };

    return (
        <>
            <div className='login-div'>
                <div className='center'>
                    <button className='about-button' onClick={e => navigate("/about")}>What is Eco Together?</button>
                    <div className="auth-form">
                        <h2>Login</h2>
                        <form onSubmit={onSubmit}>
                            <input type="text" 
                                placeholder="Username" 
                                name="username" 
                                value={username} 
                                onChange={onChange} 
                                required />
                            <input type="password" 
                                placeholder="Password" 
                                name="password" 
                                value={password} 
                                onChange={onChange} 
                                required />
                            <Link to={'/register'}>New here? Register a new account</Link>
                            <button type="submit">Login</button>
                        </form>
                        <p className="message">{message}</p>
                    </div>
                    <p>Connecting the world through Change</p>
                </div>
            </div>
            <img className='login-div-img' src={greenBg} />
        </>
    );
};

export default Login;