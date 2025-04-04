import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { useState } from "react";
import useUser, { CreateUserResult } from "../../hooks/Authentication/useUser";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user"); // Default role

  const { createUser } = useUser();
  const CreateUser = async () => {
    createUser({
      variables: {
        name,
        email,
        username,
        password,
        role,
      },
    })
      .then((response: CreateUserResult) => {
        console.log("User created");
      })
      .catch((error: any) => {
        console.error("Error creating user:", error);
      });
  };

  const handleCreateUser = () => {
    // Handle create user logic here
    console.log("Creating user with", name, email, username, password, role);
    CreateUser();
  };
  const handleCancel = () => {
    // Handle cancel logic here
    setName("");
    setUsername("");
    setPassword("");
    setEmail("");
    setRole("user");
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/10">
      <div className="login-container bg-gray-850 p-6 rounded-xl shadow-lg w-1/4">
        <h2 className="text-2xl text-white">New user</h2>
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
              onClick={handleCreateUser}
              className="hover:bg-gray-200 bg-green-500 w-full text-white p-1 rounded mt-3"
            >
              Login
            </button>
          </div>
          <div className="login-buttons">
            <button
              onClick={handleCancel}
              className="hover:bg-gray-200 bg-green-500 w-full text-white p-1 rounded mt-3"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
