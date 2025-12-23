import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import useUser, { CreateUserResult } from "../../hooks/Authentication/useUser";

interface CreateUserProps {
  onUserCreated: () => void;
  onSwitchToLogin: () => void;
}

const CreateUser = ({ onUserCreated, onSwitchToLogin }: CreateUserProps) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user"); // Default role

  const { createUser } = useUser();

  const handleCreateUser = async () => {
    try {
      console.log("Creating user with", name, email, username, password, role);
      await createUser({
        variables: {
          name,
          email,
          username,
          password,
          role,
        },
      });
      console.log("User created successfully:");
      onUserCreated();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleCancel = () => {
    setName("");
    setUsername("");
    setPassword("");
    setEmail("");
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/10">
      <div className="login-container bg-gray-850 p-6 rounded-xl shadow-lg w-1/4">
        <h2 className="text-2xl text-white">New user</h2>
        <div className="login-form">
          <label className="block mb-2 text-white">
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full border rounded-md p-1 mt-1 bg-black"
            />
          </label>
          <label className="block mb-2 text-white">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full border rounded-md p-1 mt-1 bg-black"
            />
          </label>
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
          <label className="block mb-2 text-white">
            Role:
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="block w-full border rounded-md p-1 mt-1 bg-black"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <div className="login-buttons">
            <button
              onClick={handleCreateUser}
              className="hover:bg-gray-200 bg-green-500 w-full text-white p-1 rounded mt-3"
            >
              Create Account
            </button>
          </div>
          <div className="login-buttons">
            <button
              onClick={onSwitchToLogin}
              className="hover:bg-gray-600 bg-gray-700 w-full text-white p-1 rounded mt-3"
            >
              Back to Login
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

export default CreateUser;
