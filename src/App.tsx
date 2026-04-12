import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import InviteRegister from "./InviteRegister";
import Dashboard from "./Dashboard";
import Leads from "./Leads";
import NotFound from "./NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Invite signup */}
        <Route path="/invite/:token" element={<InviteRegister />} />

        {/* Protected */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
