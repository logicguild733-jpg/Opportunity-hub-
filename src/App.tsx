import { BrowserRouter, Routes, Route } from "react-router-dom";

/* PAGES */
import Home from "./pages/Home";
import Leads from "./pages/Leads";
import NotFound from "./pages/NotFound";

/* ROOT COMPONENTS (IMPORTANT: NOT /pages) */
import Login from "./Login";
import Dashboard from "./Dashboard";
import InviteRegister from "./InviteRegister";
import Admin from "./Admin";
import Register from "./Register";
import Reseller from "./Reseller";
import Skills from "./Skills";
import Referral from "./Referral";
import Contact from "./Contact";
import InactiveSubscription from "./InactiveSubscription";
import SubscriptionPolicy from "./SubscriptionPolicy";
import TermsOfService from "./TermsOfService";
import PrivacyPolicy from "./PrivacyPolicy";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* INVITE */}
        <Route path="/invite/:token" element={<InviteRegister />} />

        {/* APP */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/reseller" element={<Reseller />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/referral" element={<Referral />} />

        {/* ADMIN */}
        <Route path="/admin" element={<Admin />} />

        {/* LEGAL */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/subscription-policy" element={<SubscriptionPolicy />} />

        {/* FALLBACK */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
