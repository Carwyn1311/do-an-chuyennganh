import axios from 'axios';
import { IoMdLock } from 'react-icons/io';
import { BiUser } from 'react-icons/bi';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../.css/Login.css';
import TextField from '../../../components/TextField/TextField';
import PasswordField from '../../../components/PasswordField/PasswordField';

const Login = (): JSX.Element => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName') ?? '';
    const storedPassword = localStorage.getItem('password') ?? '';
    const storedRememberMe = localStorage.getItem('rememberMe') === 'true';

    if (storedUserName !== '' && storedPassword !== '') {
      setUserName(storedUserName);
      setPassword(storedPassword);
    }
    setRememberMe(storedRememberMe);
  }, []);

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserName(e.target.value);
    setError('');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
    setError('');
  };

  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (userName.trim() === '' || password.trim() === '') {
      setError('User name and Password are required');
      return;
    }

    try {
      const response = await axios.post('https://chat-api-backend-x4dl.onrender.com/auth/authenticate', {
        username: userName,
        password: password,
      });

      if (response.status === 200 && response.data.token) {
        const token = response.data.token;

        if (rememberMe) {
          localStorage.setItem('userName', userName);
          localStorage.setItem('password', password);
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('userName');
          localStorage.removeItem('password');
          localStorage.removeItem('rememberMe');
        }

        localStorage.setItem('token', token);
        console.log('Logged in successfully');
        navigate('/dashboard');
      } else {
        setError('Invalid username or password.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Failed to authenticate. Please try again.');
    }
  };

  const handleCreateAccount = (): void => {
    navigate('/create-account');
  };

  const handleForgotPassword = (): void => {
    navigate('/forgot-password');
  };

  const handleGoogleLoginClick = (): void => {
    console.log('Google Login clicked');
  };

  return (
    <div className="login-group">
      <div>
        <div className="form-group">
          <div className="login-container">
            <h3 className="text-top-label">AI CHAT</h3>
            <h2 className="login-title">Login</h2>
            <form
              className="login-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              <div className="input-group">
                <BiUser className="user-icon" />
                <TextField
                  value={userName}
                  onChange={handleUserNameChange}
                  label="User Name"
                  fullWidth={true}
                />
              </div>
              <div className="input-group">
                <IoMdLock className="user-icon" />
                <PasswordField
                  value={password}
                  onChange={handlePasswordChange}
                  label="Password"
                  fullWidth={true}
                />
              </div>
              <div className="input-group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
                <label>Remember me</label>
              </div>
              {error && <p className="error">{error}</p>}
              <button type="submit">Log in</button>
            </form>
            <button onClick={handleGoogleLoginClick} className="google-login-btn">
              Log In With Google
            </button>
            <div className="horizontal-buttons">
              <button onClick={handleCreateAccount} className="create-account-btn">
                Create Account
              </button>
              <button onClick={handleForgotPassword} className="forgot-password-btn">
                Forgot Password
              </button>
            </div>
          </div>
        </div>
      </div>
      <footer>
      <p style={{ textAlign: 'center', fontSize: '16px', marginTop: '20px', color: 'white' }}>© 2024 AI CHAT. <strong>Version 4.3.0.0 [20231608]</strong></p>
      </footer>
    </div>
  );
};

export default Login;
