import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./Login"; // ✅ FIXED PATH
import InviteRegister from "./pages/InviteRegister";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Invite signup */}
        <Route path="/invite/:token" element={<InviteRegister />} />

        {/* Protected pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
