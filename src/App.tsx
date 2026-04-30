import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./Login";
import Dashboard from "./Dashboard";

import Leads from "./pages/Leads";
import Skills from "./Skills";
import Reseller from "./Reseller";
import Admin from "./Admin";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* PROTECTED */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />

        <Route
          path="/leads"
          element={<ProtectedRoute><Leads /></ProtectedRoute>}
        />

        <Route
          path="/skills"
          element={<ProtectedRoute><Skills /></ProtectedRoute>}
        />

        <Route
          path="/reseller"
          element={<ProtectedRoute><Reseller /></ProtectedRoute>}
        />

        <Route
          path="/admin"
          element={<ProtectedRoute><Admin /></ProtectedRoute>}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
