import React, { useState, useEffect } from "react";
import { databases } from "../lib/appwrite";
import conf from "../conf";
import { ID } from "appwrite";
import { use } from "react";

const AddExpense = () => {
  const [budgets, setBudgets] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState();
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [date, setDate] = useState("");

  const fetchBudgets = async () => {
    try {
      const response = await databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteBudgetsCollectionId
      );
      setBudgets(response.documents);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  const addBudget = () => {
    if (description && targetAmount && date) {
      const newBudget = {
        id: Date.now(),
        description,
        targetAmount: parseFloat(targetAmount),
        date,
      };
      setExpenses([...expenses, newBudget]);
      setDescription("");
      setTargetAmount("");
      setDate("");
    } else {
      alert("Please fill in all fields.");
    }
  };

  const addExpenseToDb = async () => {
    const response = await databases.createDocument(
      conf.appwriteDatabaseId,
      conf.appwriteExpensesCollectionId,
      ID.unique(),
      {
        budgetId: selectedBudget,
        description: description,
        amount: parseFloat(targetAmount),
        createdAt: date,
      }
    );
    console.log(response);
    if (description && targetAmount && date) {
      const newBudget = {
        id: Date.now(),
        description,
        targetAmount: parseFloat(targetAmount),
        date,
      };
      setExpenses([...expenses, newBudget]);
      setDescription("");
      setTargetAmount("");
      setDate("");
    } else {
      alert("Please fill in all fields.");
    }
    try {
    } catch (error) {
      console.error(error);
    }
  };

  const getAllExpenses = async () => {
    try {
      const response = await databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteExpensesCollectionId
      );
      console.log(response);
      setExpenses(response.documents);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchBudgets();
    getAllExpenses();
  }, []);

  return (
    <div classDescription="min-h-screen bg-gray-100 p-6">
      <div classDescription="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 classDescription="text-2xl font-bold mb-4 text-gray-800">
          Create Your Budget(s)
        </h1>

        {/* Budget Creation Form */}
        <div classDescription="mb-6">
          {/* <h2 classDescription="text-xl font-semibold mb-2">Create a Budget</h2> */}
          <div classDescription="mb-4">
            <label
              htmlFor="budget-select"
              classDescription="block text-gray-700 font-medium mb-2"
            >
              Select a Budget:
            </label>
            <select
              id="budget-select"
              value={selectedBudget?.description}
              onChange={(e) => {
                setSelectedBudget(e.target.value);
                console.log(e.target.value);
              }}
              classDescription="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="">-- Select a Budget --</option>
              {budgets.map((budget) => (
                <option key={budget.$id} value={budget.$id}>
                  {budget.description}
                </option>
              ))}
            </select>
          </div>
          <input
            type="number"
            placeholder="Target Amount"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            classDescription="w-full mb-2 p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            classDescription="w-full mb-2 p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
          <button
            onClick={addExpenseToDb}
            classDescription="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Add Expense
          </button>
        </div>

        {/* List of Expenses */}
        <div>
          <h2 classDescription="text-xl font-semibold mb-2">Your Expenses</h2>
          {expenses.length > 0 ? (
            <ul classDescription="space-y-4">
              {expenses.map((budget) => (
                <li
                  key={budget.id}
                  classDescription="p-4 border rounded-lg bg-gray-50 shadow-sm"
                >
                  <p classDescription="font-bold text-lg">
                    {budget.description}
                  </p>
                  <p classDescription="text-gray-700">
                    Amount: ${budget.targetAmount?.toFixed(2)}
                  </p>
                  <p classDescription="text-gray-500">Date: {budget.date}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p classDescription="text-gray-500">No expenses created yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
