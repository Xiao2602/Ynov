import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Ynov from '../img/Ynov.png';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-content">
        {/* Left Section - Headline */}
        <div className="left-section">
          <img src={Ynov} alt="Ynov Campus" className="logo-image-login" />
        </div>
        
        {/* Right Section - Form */}
        <div className="right-section">
          <div className="login-form-container">
            <h2 className="login-title">Connexion</h2>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="input-with-icon">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Adresse e-mail"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-with-icon">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>
              
              <button type="submit" className="continue-button">
                Se connecter
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;