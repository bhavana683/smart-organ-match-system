import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DonorRegister from "./pages/DonorDashboard"; import RecipientRegister from "./pages/RecipientDashboard";
import AdminLogin from "./pages/AdminDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import RecipientRegistration from "./pages/RecipentRegistration";
import DonorRegistration from "./pages/DonorRegistration";
import DonorMedicalDetails from "./pages/DonorMedicalDetails";
import DonorLogin from "./pages/DonorLogin";
import RecipientLogin from "./pages/RecipientLogin"; 
import AboutSmartOrganMatch from "./pages/AboutSmartOrganMtch"; 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donor-dashboard" element={<DonorRegister />} />
        <Route path="/about" element={<AboutSmartOrganMatch />} />
        <Route path="recipient-register" element={<RecipientRegistration />} />
        <Route path="/donor-medical-details" element={<DonorMedicalDetails />} />
        <Route path="/donor-register" element={<DonorRegistration />} />
        <Route path="/recipient-dashboard" element={<RecipientRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/donor-login" element={<DonorLogin />} />
        <Route path="/recipient-login" element={<RecipientLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
