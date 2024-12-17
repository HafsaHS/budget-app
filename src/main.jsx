import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from "./components/Homepage.jsx";
import Login from "./pages/Login.jsx";
import Budgets from "./components/Budgets.jsx";
import CreateBudget from "./components/CreateBudget.jsx";
import Add from "./pages/expense/Add.jsx";
import Expenses from "./pages/expense/Index.jsx";
import { UserProvider } from "./lib/context/user.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/create-budget" element={<CreateBudget />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/expenses/add" element={<Add />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
