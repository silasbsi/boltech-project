import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../../services/userService';

import "./index.css"

const Login = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = (e) => {  
        e.preventDefault();
        const payload = {
            email,
            password
        }

        const response = UserService.login(payload);
        
        if (response?.user) {
            console.log(response)
            localStorage.setItem('userId', response.user._id);
            localStorage.setItem('userName', response.user.name);
            window.location.href = "/dashboard";
        }
    }
    
    const validations = {
        email: (e) => {
            const email = e.target.value;
    
            const emailValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
            if (!emailValidate.test(email)) {
                setEmailError('Invalid email');
                return;
            }
    
            setEmailError('');
        },

        password: (e) => {
            const password = e.target.value;
            
            if (password.length < 4) {
                setPasswordError('The password, should have more than 3 characters');
                return;
            }
    
            setPasswordError('');
        }
    }

    return (
        <div className="login-container">
            <form className="login" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="login-group">
                    <input
                        type="text"
                        value={email}
                        id="email" 
                        className={`login-field ${emailError ? 'error' : ''}`}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={(e) => validations.email(e)}
                        title={emailError ?? ''}
                        placeholder="Email"
                    />
                </div>
                <div className="login-group">
                    <input
                        type="password"
                        id="password"
                        value={password}
                        className={`login-field ${passwordError ? 'error' : ''}`}
                        onChange={(e) => setPassword(e.target.value) }
                        onBlur={(e) => validations.password(e)}
                        title={passwordError ?? ''}
                        placeholder="Password"
                    />
                </div>
                <div className="login-footer">
                    <Link to="/register" >Register</Link>
                    <button 
                        type="submit"
                        className={`login-btn 
                            ${(emailError || passwordError) ? 'disabled': ''}`
                        }
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;