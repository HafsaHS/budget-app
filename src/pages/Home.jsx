import React from "react";
import { Link } from "react-router";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Budget Expense Management System
        </h1>

        {/* Navigation List */}
        <ul className="space-y-4">
          <li>
            <Link
              to="/budgets"
              className="block text-blue-600 hover:text-blue-800 text-center transition duration-300"
            >
              ➤ Go to Budgets List
            </Link>
          </li>
          <li>
            <Link
              to="/create-budget"
              className="block text-blue-600 hover:text-blue-800 text-center transition duration-300"
            >
              ➤ Create Budgets
            </Link>
          </li>
          <li>
            <Link
              to="/expenses"
              className="block text-blue-600 hover:text-blue-800 text-center transition duration-300"
            >
              ➤ See Expenses
            </Link>
          </li>
          <li>
            <Link
              to="/expenses/add"
              className="block text-blue-600 hover:text-blue-800 text-center transition duration-300"
            >
              ➤ Add Expense
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
