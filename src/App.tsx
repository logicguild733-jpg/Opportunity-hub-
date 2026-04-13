import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Leads from "./pages/Leads";
import NotFound from "./pages/NotFound";

import Login from "./Login";
import Dashboard from "./Dashboard";
import InviteRegister from "./InviteRegister";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/invite/:token" element={<InviteRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
