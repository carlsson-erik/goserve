import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS } from '../../hooks/Authentication/useUsersQuery';
import authService from '../../Services/authservice';

interface LoginScreenProps {
  onLogin: () => void;
  onSwitchToSignup: () => void;
}

const LoginScreen = ({ onLogin, onSwitchToSignup }: LoginScreenProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Handle login logic here
    console.log("Logging in with", username, password);
    const { data: users } = useQuery(GET_USERS, { variables: { username } });
    const response = authService.login(username, password);

    onLogin();
  };

  const handleCancel = () => {
    // Handle cancel logic here
    setUsername("");
    setPassword("");
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/10">
      <div className="login-container bg-gray-850 p-6 rounded-xl shadow-lg w-1/4">
        <h2 className="text-2xl text-white">Login</h2>
        <div className="login-form">
          <label className="block mb-2 text-white">
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full border rounded-md p-1 mt-1 bg-black"
            />
          </label>
          <label className="block mb-2 text-white">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full border rounded-md p-1 mt-1 bg-black"
            />
          </label>
          <div className="login-buttons">
            <button
              onClick={handleLogin}
              className="hover:bg-gray-200 bg-green-500 w-full text-white p-1 rounded mt-3"
            >
              Login
            </button>
          </div>
          <div className="login-buttons">
            <button
              onClick={onSwitchToSignup}
              className="hover:bg-gray-600 bg-gray-700 w-full text-white p-1 rounded mt-3"
            >
              Create Account
            </button>
          </div>
          <div className="login-buttons">
            <button
              onClick={handleCancel}
              className="hover:bg-gray-200 bg-red-500 w-full text-white p-1 rounded mt-3"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;

