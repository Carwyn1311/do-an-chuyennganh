import React, { useState } from 'react';

const ForgotPassword: React.FC = () => {
  const [identifier, setIdentifier] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle password reset logic
    console.log('Password reset request for:', identifier);
  };

  return (
    <div className="forgot-password-group">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email or Phone:</label>
          <input type="text" value={identifier} onChange={(e) => setIdentifier(e.target.value)} required />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
