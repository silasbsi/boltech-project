import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../../services/userService';

import { useToasts } from 'react-toast-notifications';

import "./index.css"

const Register = () => {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const { addToast, removeAllToasts } = useToasts();

    const handleSubmit = (e) => {      
        e.preventDefault();
        
        if (email || password || name) {
            const payload = {
                email,
                password,
                name,
            }
            
            const response = UserService.register(payload);

            if (response.user) {
                addToast('Registred Successfully', { appearance: 'success' });
            }
            else {
                addToast(response?.error, { appearance: 'error' });
            }
            
            setTimeout(() => window.location.href = "/", 3500);
        }
        else {
            addToast('All fields is required', { appearance: 'error' });
            setTimeout(() => removeAllToasts(), 3000);
        }
    }
    
    const validations = {
        name: (e) => {
            const name = e.target.value;
            
            if (name === "") {
                setNameError('The name field is required');
                return;
            }

            setNameError('');
        },

        email: (e) => {
            const email = e.target.value;
    
            const emailValidate = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
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
        <div className="register-container">
            <form className="register" onSubmit={handleSubmit}>
                <h1>Register</h1>
                <div className="register-group">
                    <input
                        type="text"
                        value={name}
                        id="name" 
                        className={`register-field ${nameError ? 'error' : ''}`}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={(e) => validations.name(e)}
                        title={nameError ?? ''}
                        placeholder="Name"
                    />
                </div>
                <div className="register-group">
                    <input
                        type="text"
                        value={email}
                        id="email" 
                        className={`register-field ${emailError ? 'error' : ''}`}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={(e) => validations.email(e)}
                        title={emailError ?? ''}
                        placeholder="Email"
                    />
                </div>
                <div className="register-group">
                    <input
                        type="password"
                        id="password"
                        value={password}
                        className={`register-field ${passwordError ? 'error' : ''}`}
                        onChange={(e) => setPassword(e.target.value) }
                        onBlur={(e) => validations.password(e)}
                        title={passwordError ?? ''}
                        placeholder="Password"
                    />
                </div>
                <div className="register-group">
                    <Link to="/register" />
                </div>
                <button 
                    type="submit"
                    className={`register-btn 
                        ${(emailError || passwordError) ? 'disabled': ''}`
                    }
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;