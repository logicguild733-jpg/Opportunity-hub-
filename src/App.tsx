import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Leads from "./pages/Leads";
import NotFound from "./pages/NotFound";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import InviteRegister from "./pages/InviteRegister";
import Admin from "./pages/Admin";
import Register from "./pages/Register";
import Reseller from "./pages/Reseller";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
import Referral from "./pages/Referral";
import InactiveSubscription from "./pages/InactiveSubscription";
import SubscriptionPolicy from "./pages/SubscriptionPolicy";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Invite */}
        <Route path="/invite/:token" element={<InviteRegister />} />

        {/* App */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/reseller" element={<Reseller />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/referral" element={<Referral />} />

        {/* Admin */}
        <Route path="/admin" element={<Admin />} />

        {/* Legal */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/inactive" element={<InactiveSubscription />} />
        <Route path="/subscription-policy" element={<SubscriptionPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
