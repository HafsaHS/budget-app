import React, { useState } from "react";
import { account, ID } from "../lib/appwrite";

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function login(email, password) {
    try {
      await account.createEmailPasswordSession(email, password);
      setLoggedInUser(await account.get());
    } catch (error) {
      console.error("Login failed", error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          {loggedInUser ? `Welcome, ${loggedInUser.name}` : "Login or Register"}
        </h1>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name (for registration)
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between space-x-4">
            <button
              type="button"
              onClick={() => login(email, password)}
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Login
            </button>

            <button
              type="button"
              onClick={async () => {
                try {
                  await account.create(ID.unique(), email, password, name);
                  login(email, password);
                } catch (error) {
                  console.error("Registration failed", error);
                }
              }}
              className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              Register
            </button>
          </div>

          {loggedInUser && (
            <button
              type="button"
              onClick={async () => {
                await account.deleteSession("current");
                setLoggedInUser(null);
              }}
              className="w-full px-4 py-2 mt-4 text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
