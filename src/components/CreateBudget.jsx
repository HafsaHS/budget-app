import React, { useState, useEffect } from "react";
import { databases } from "../lib/appwrite";
import conf from "../conf";
import { ID } from "appwrite";
import { use } from "react";

const CreateBudget = () => {
  const [budgets, setBudgets] = useState([]);
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [date, setDate] = useState("");

  const addBudget = () => {
    if (name && targetAmount && date) {
      const newBudget = {
        id: Date.now(),
        name,
        targetAmount: parseFloat(targetAmount),
        date,
      };
      setBudgets([...budgets, newBudget]);
      setName("");
      setTargetAmount("");
      setDate("");
    } else {
      alert("Please fill in all fields.");
    }
  };

  const addBudgetToDB = async () => {
    const response = await databases.createDocument(
      conf.appwriteDatabaseId,
      conf.appwriteBudgetsCollectionId,
      ID.unique(),
      {
        name: name,
        targetAmount: parseFloat(targetAmount),
        date: date,
      }
    );
    console.log(response);
    if (name && targetAmount && date) {
      const newBudget = {
        id: Date.now(),
        name,
        targetAmount: parseFloat(targetAmount),
        date,
      };
      setBudgets([...budgets, newBudget]);
      setName("");
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

  const getAllBudgets = async () => {
    try {
      const response = await databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteBudgetsCollectionId
      );
      console.log(response);
      setBudgets(response.documents);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllBudgets();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Create Your Budget(s)
        </h1>

        {/* Budget Creation Form */}
        <div className="mb-6">
          {/* <h2 className="text-xl font-semibold mb-2">Create a Budget</h2> */}
          <input
            type="text"
            placeholder="Budget Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-2 p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
          <input
            type="number"
            placeholder="Target Amount"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            className="w-full mb-2 p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full mb-2 p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
          <button
            onClick={addBudgetToDB}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Add Budget
          </button>
        </div>

        {/* List of Budgets */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Your Budgets</h2>
          {budgets.length > 0 ? (
            <ul className="space-y-4">
              {budgets.map((budget) => (
                <li
                  key={budget.id}
                  className="p-4 border rounded-lg bg-gray-50 shadow-sm"
                >
                  <p className="font-bold text-lg">{budget.name}</p>
                  <p className="text-gray-700">
                    Target Amount: ${budget.targetAmount.toFixed(2)}
                  </p>
                  <p className="text-gray-500">Date: {budget.date}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No budgets created yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateBudget;
