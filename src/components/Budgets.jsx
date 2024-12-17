import React, { useState, useEffect } from "react";
import { databases } from "../lib/appwrite";
import conf from "../conf";

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);

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

  useEffect(() => {
    fetchBudgets();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Budgets</h1>

        {budgets.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left py-2 px-4 border-b">Name</th>
                <th className="text-left py-2 px-4 border-b">Target Amount</th>
                <th className="text-left py-2 px-4 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {budgets.map((budget) => (
                <tr key={budget.$id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{budget.name}</td>
                  <td className="py-2 px-4 border-b">
                    ${budget.targetAmount.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b">{budget.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No budgets available.</p>
        )}
      </div>
    </div>
  );
};

export default Budgets;
