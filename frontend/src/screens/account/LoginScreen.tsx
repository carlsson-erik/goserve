import { useState } from 'react';

const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(true);

  const handleLogin = () => {
    // Handle login logic here
    console.log('Logging in with', username, password);
    onLogin();
  };

  const handleCancel = () => {
    // Handle cancel logic here
    setUsername('');
    setPassword('');
    setShowLogin(false);
  };

  return (
    showLogin &&
    <div className='fixed inset-0 flex justify-center items-center bg-black/10'>
      <div className='login-container bg-gray-850 p-6 rounded-xl shadow-lg w-1/4'>
        <h2 className='text-2xl text-white'>Login</h2>
        <div className='login-form'>
          <label className='block mb-2 text-white'>
            Username:
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='block w-full border rounded-md p-1 mt-1 bg-black'
            />
          </label>
          <label className='block mb-2 text-white'>
            Password:
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='block w-full border rounded-md p-1 mt-1 bg-black'
            />
          </label>
          <div className='login-buttons'>
            <button 
              onClick={handleLogin}
              className='hover:bg-gray-200 bg-green-500 w-full text-white p-1 rounded mt-3'
            >Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;