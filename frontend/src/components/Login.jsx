import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Login.css';

const Login = ({ setRoleVar }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('admin');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = () => {
        // Check if any field is empty
        if (!username || !password) {
            setError('Please enter both username and password.');
            return;
        }

        axios.post('http://localhost:3001/auth/login', { username, password, role })
            .then(res => {
                if (res.data.login) {
                    if (res.data.role === 'admin') {
                        setRoleVar('admin');
                        navigate('/dashboard');
                    } else if (res.data.role === 'student') {
                        setRoleVar('student');
                        navigate('/');
                    } else {
                        setError('Invalid Login. Please select a valid role (admin or student) and try again.');
                    }
                } else {
                    setError('Login failed. Please check your username, password, and as.');
                }
            })
            .catch(err => {
                console.log('Error:', err);
                setError('An error occurred during login. Please try again.');
            });
    };

    return (
        <div className='login-page'>
            <div className="login-container">
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        placeholder='Enter Username'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        placeholder='********'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="role">As:</label>
                    <select
                        name="role"
                        id="role"
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="admin">Admin</option>
                        <option value="student">Student</option>
                    </select>
                </div>
                <button className='btn-login' onClick={handleSubmit}>Login</button>
            </div>
        </div>
    );
};

export default Login;
