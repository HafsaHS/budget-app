import React, { useState } from "react";
import { useUser } from "../lib/context/user";

const Login = () => {
  const user = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Login or Register
        </h1>
        <form className="space-y-4">
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Buttons */}
          <div className="flex justify-between items-center mt-4">
            <button
              type="button"
              onClick={() => user.login(email, password)}
              className="w-1/2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all mr-2"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => user.register(email, password)}
              className="w-1/2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all ml-2"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
