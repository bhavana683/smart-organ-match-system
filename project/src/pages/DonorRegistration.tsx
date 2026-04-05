/*
import { useState } from "react";
import { Heart, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const organs = ["kidney", "liver", "lung", "heart"];

const DonorRegistration = () => {
  const navigate = useNavigate();

  const [selectedOrgans, setSelectedOrgans] = useState<string[]>([]);
  const [heartConsent, setHeartConsent] = useState(false);
  const [finalConsent, setFinalConsent] = useState(false);

  const toggleOrgan = (organ: string) => {
    setSelectedOrgans(prev =>
      prev.includes(organ)
        ? prev.filter(o => o !== organ)
        : [...prev, organ]
    );
  };

  const canProceed =
    selectedOrgans.length > 0 &&
    (!selectedOrgans.includes("heart") || heartConsent) &&
    finalConsent;

  const handleProceed = () => {
    navigate("/donor-medical-details", {
      state: { selectedOrgans }
    });
  };

  return (
    <div className="page-bg">
      <div className="card">

        <h1 className="page-title">Donor Registration</h1>
        <p className="page-subtitle">
          Select organs and provide consent before proceeding
        </p>

        //BASIC DETAILS 
        <section className="section">
          <h2 className="section-title">Basic Details</h2>
          <div className="grid-2">
            <input className="input" placeholder="Full Name" />
            <input className="input" type="number" placeholder="Age" />

            <select className="input">
              <option>Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <select className="input">
              <option>Blood Group</option>
              {bloodGroups.map(bg => (
                <option key={bg}>{bg}</option>
              ))}
            </select>

            <input className="input" placeholder="Phone Number" />
            <input className="input" placeholder="Email" />
          </div>
        </section>

        // ORGAN SELECTION 
        <section className="section">
          <h2 className="section-title">Organs Willing to Donate</h2>
          <div className="organ-grid">
            {organs.map(org => (
              <button
                key={org}
                onClick={() => toggleOrgan(org)}
                className={`organ-btn ${
                  selectedOrgans.includes(org) ? "organ-active" : ""
                }`}
              >
                {org.toUpperCase()}
              </button>
            ))}
          </div>
        </section>

        // KIDNEY / LIVER CONSENT 
        {(selectedOrgans.includes("kidney") ||
          selectedOrgans.includes("liver")) && (
          <section className="consent-box green">
            <h3 className="consent-title">Living Donation Consent</h3>
            <label className="checkbox">
              <input type="checkbox" />
              <span>I consent for living organ donation</span>
            </label>
          </section>
        )}

        // LUNG CONSENT 
        {selectedOrgans.includes("lung") && (
          <section className="consent-box blue">
            <h3 className="consent-title">Lung Donation Type</h3>
            <select className="input">
              <option>Select Donation Type</option>
              <option>Living</option>
              <option>Post-death</option>
            </select>
          </section>
        )}

      // HEART CONSENT 
        {selectedOrgans.includes("heart") && (
          <section className="consent-box red">
            <h3 className="consent-title text-red-700">
              Heart Donation (Post-Death Only)
            </h3>

            <input className="input" placeholder="Guardian / Family Contact Name" />
            <input className="input mt-2" placeholder="Relation" />
            <input className="input mt-2" placeholder="Contact Number" />

            <label className="checkbox mt-3">
              <input
                type="checkbox"
                onChange={e => setHeartConsent(e.target.checked)}
              />
              <span>I consent for post-death heart donation</span>
            </label>
          </section>
        )}

        // FINAL CONSENT 
        <section className="final-consent">
          <AlertTriangle className="icon-warning" />
          <label className="checkbox">
            <input
              type="checkbox"
              onChange={e => setFinalConsent(e.target.checked)}
            />
            <span>
              I agree to AI-based matching and legal organ donation terms
            </span>
          </label>
        </section>

        // PROCEED BUTTON
        <button
          disabled={!canProceed}
          onClick={handleProceed}
          className={`primary-btn ${
            !canProceed ? "btn-disabled" : ""
          }`}
        >
          Proceed to Medical Details →
        </button>

      </div>
    </div>
  );
};

export default DonorRegistration;
*/


/*
import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDonor } from "../context/DonorContext";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const organs = ["kidney", "liver", "lung", "heart"];

const DonorRegistration = () => {
  const navigate = useNavigate();
  const { setDonorDraft } = useDonor();

  const [basicDetails, setBasicDetails] = useState<any>({});
  const [selectedOrgans, setSelectedOrgans] = useState<string[]>([]);
  const [heartConsent, setHeartConsent] = useState(false);
  const [finalConsent, setFinalConsent] = useState(false);

  const toggleOrgan = (organ: string) => {
    setSelectedOrgans(prev =>
      prev.includes(organ) ? prev.filter(o => o !== organ) : [...prev, organ]
    );
  };

  const canProceed =
    selectedOrgans.length > 0 &&
    (!selectedOrgans.includes("heart") || heartConsent) &&
    finalConsent;

  const handleProceed = () => {
    setDonorDraft({
      basicDetails,
      selectedOrgans,
      consentDetails: {
        heartConsent,
        aiConsent: finalConsent
      }
    });

    navigate("/donor-medical-details");
  };

  return (
    <div className="page-bg">
      <div className="card">

        <h1 className="page-title">Donor Registration</h1>

        // BASIC DETAILS 
        <div className="grid-2">
          <input className="input" placeholder="Full Name"
            onChange={e => setBasicDetails({ ...basicDetails, fullName: e.target.value })} />
          <input className="input" type="number" placeholder="Age"
            onChange={e => setBasicDetails({ ...basicDetails, age: e.target.value })} />

          <select className="input"
            onChange={e => setBasicDetails({ ...basicDetails, gender: e.target.value })}>
            <option>Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <select className="input"
            onChange={e => setBasicDetails({ ...basicDetails, bloodGroup: e.target.value })}>
            <option>Blood Group</option>
            {bloodGroups.map(bg => <option key={bg}>{bg}</option>)}
          </select>
        </div>

        // ORGAN SELECTION 
        <div className="organ-grid">
          {organs.map(org => (
            <button key={org}
              className={`organ-btn ${selectedOrgans.includes(org) ? "organ-active" : ""}`}
              onClick={() => toggleOrgan(org)}>
              {org.toUpperCase()}
            </button>
          ))}
        </div>

        // HEART CONSENT 
        {selectedOrgans.includes("heart") && (
          <label className="checkbox">
            <input type="checkbox" onChange={e => setHeartConsent(e.target.checked)} />
            I consent for post-death heart donation
          </label>
        )}

        // FINAL CONSENT 
        <div className="final-consent">
          <AlertTriangle />
          <label className="checkbox">
            <input type="checkbox" onChange={e => setFinalConsent(e.target.checked)} />
            I agree to AI-based matching & legal terms
          </label>
        </div>

        <button disabled={!canProceed} onClick={handleProceed} className="primary-btn">
          Proceed to Medical Details →
        </button>

      </div>
    </div>
  );
};

export default DonorRegistration;
*/
import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDonor } from "../context/DonorContext";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const organs = ["kidney", "liver", "lung", "heart"];

const DonorRegistration = () => {
  const navigate = useNavigate();
  const { setDonorDraft } = useDonor();

  const [form, setForm] = useState<any>({
    fullName: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    bloodGroup: "",
    phone: ""
  });

  const [selectedOrgans, setSelectedOrgans] = useState<string[]>([]);
  const [heartConsent, setHeartConsent] = useState(false);
  const [aiConsent, setAiConsent] = useState(false);

  const toggleOrgan = (organ: string) => {
    setSelectedOrgans(prev =>
      prev.includes(organ)
        ? prev.filter(o => o !== organ)
        : [...prev, organ]
    );
  };

  const canProceed =
    selectedOrgans.length > 0 &&
    (!selectedOrgans.includes("heart") || heartConsent) &&
    aiConsent;

  const handleProceed = () => {
    setDonorDraft({
      basicDetails: form,
      selectedOrgans,
      consentDetails: {
        aiConsent,
        heartConsent
      }
    });

    navigate("/donor-medical-details");
  };

  return (
    <div className="page-bg">
      <div className="card">
        <h1 className="page-title">Donor Registration</h1>

        {/* 🔥 LOGIN LINK */}
        <p className="text-center mt-3 text-gray-600">
          Already registered as a donor?{" "}
          <span
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/donor-login")}
          >
            Login here
          </span>
          <p className="text-center mt-3 text-gray-600">
  ← 
  <span
    className="text-blue-600 font-semibold cursor-pointer hover:underline ml-1"
    onClick={() => navigate("/")}
  >
    Back to Home
  </span>
</p>
        </p>

        {/* BASIC DETAILS */}
        <div className="grid-2 mt-6">
          <input className="input" placeholder="Full Name"
            onChange={e => setForm({ ...form, fullName: e.target.value })} />

          <input className="input" placeholder="Email"
            onChange={e => setForm({ ...form, email: e.target.value })} />

          <input className="input" type="password" placeholder="Password"
            onChange={e => setForm({ ...form, password: e.target.value })} />

          <input className="input" type="number" placeholder="Age"
            onChange={e => setForm({ ...form, age: e.target.value })} />

          <select className="input"
            onChange={e => setForm({ ...form, gender: e.target.value })}>
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <select className="input"
            onChange={e => setForm({ ...form, bloodGroup: e.target.value })}>
            <option value="">Blood Group</option>
            {bloodGroups.map(bg => <option key={bg}>{bg}</option>)}
          </select>

          <input className="input" placeholder="Phone Number"
            onChange={e => setForm({ ...form, phone: e.target.value })} />
        </div>

        {/* ORGAN SELECTION */}
        <div className="organ-grid mt-6">
          {organs.map(org => (
            <button
              key={org}
              onClick={() => toggleOrgan(org)}
              className={`organ-btn ${selectedOrgans.includes(org) ? "organ-active" : ""}`}
            >
              {org.toUpperCase()}
            </button>
          ))}
        </div>

        {selectedOrgans.includes("heart") && (
          <label className="checkbox mt-4">
            <input type="checkbox"
              onChange={e => setHeartConsent(e.target.checked)} />
            I consent for post-death heart donation
          </label>
        )}

        <div className="final-consent mt-4">
          <AlertTriangle />
          <label className="checkbox">
            <input type="checkbox"
              onChange={e => setAiConsent(e.target.checked)} />
            I agree to AI-based matching and legal terms
          </label>
        </div>

        <button
          disabled={!canProceed}
          onClick={handleProceed}
          className="primary-btn mt-6"
        >
          Proceed to Medical Details →
        </button>
      </div>
    </div>
  );
};

export default DonorRegistration;



