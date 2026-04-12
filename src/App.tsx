import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Leads from "./pages/Leads";
import NotFound from "./pages/NotFound";

import Login from "./components/Login";
import InviteRegister from "./components/InviteRegister";
import Dashboard from "./components/Dashboard";
import Admin from "./components/Admin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Invite */}
        <Route path="/invite/:token" element={<InviteRegister />} />

        {/* Protected */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/admin" element={<Admin />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
