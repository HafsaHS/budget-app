import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from "./components/Homepage.jsx";
import Login from "./components/Login.jsx";
import Budgets from "./components/Budgets.jsx";
import CreateBudget from "./components/CreateBudget.jsx";
import AddExpense from "./components/AddExpense.jsx";
import Expenses from "./components/Expenses.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/budgets" element={<Budgets />} />
        <Route path="/create-budget" element={<CreateBudget />} />
        <Route path="/expenses" element={<Expenses />}>
          <Route path="add" element={<AddExpense />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
