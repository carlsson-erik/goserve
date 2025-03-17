import { useState } from 'react';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    console.log('Logging in with', username, password);
  };

  const handleCancel = () => {
    // Handle cancel logic here
    setUsername('');
    setPassword('');
  };

  return (
    <div className="login-container">
      <h2 className="text-2xl">Login</h2>
      <div className="login-form">
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div className="login-buttons">
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;