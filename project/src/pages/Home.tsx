/*
import { useNavigate } from "react-router-dom";
import { Heart, UserPlus, UserCheck, ShieldCheck } from "lucide-react";


const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      
      <section className="text-center px-6 py-20">
        <Heart className="h-20 w-20 text-red-500 mx-auto mb-6" />

        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Smart Organ Matching System
        </h1>

        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A centralized web platform that connects organ donors and recipients
          using medical compatibility rules and future machine learning-based
          matching.
        </p>

        <p className="text-md text-gray-500 mt-4 max-w-3xl mx-auto">
          The system ensures transparent verification, efficient matching, and
          secure management of organ donation processes.
        </p>
      </section>

      
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Select Your Role
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:scale-105 transition">
            <UserPlus className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Donor</h3>
            <p className="text-gray-600 mb-6">
              Register as an organ donor by providing medical details. Your
              profile will be verified by the admin before matching.
            </p>
            <button
              onClick={() => navigate("/donor-register")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
               Donor 
            </button>
          </div>

         
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:scale-105 transition">
            <UserCheck className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Recipient</h3>
            <p className="text-gray-600 mb-6">
              Register as a recipient and submit organ requirements. The system
              helps identify compatible donors after approval.
            </p>
            <button
              onClick={() => navigate("/recipient-register")}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
            >
               Recipient 
            </button>
          </div>

         
        </div>
      </section>

      
      <footer className="bg-white text-center py-6 text-gray-500">
        © 2025 Smart Organ Matching System | Academic Project
      </footer>
    </div>
  );
};

export default Home;
*/
import { useNavigate } from "react-router-dom";
import { Heart, UserPlus, UserCheck, Info } from "lucide-react";

/**
 * Home Page – Smart Organ Matching System
 * Acts as role-selection screen
 * About section added without changing structure
 */

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      
      {/* HERO SECTION */}
      <section className="text-center px-6 py-20">
        <Heart className="h-20 w-20 text-red-500 mx-auto mb-6" />

        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Smart Organ Matching System
        </h1>

        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A centralized web platform that connects organ donors and recipients
          using medical compatibility rules and AI-based matching.
        </p>

        <p className="text-md text-gray-500 mt-4 max-w-3xl mx-auto">
          The system ensures transparent verification, intelligent matching,
          and secure management of organ donation processes.
        </p>
      </section>

      {/* ROLE SELECTION */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Select Your Role
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {/* DONOR */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:scale-105 transition">
            <UserPlus className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Donor</h3>
            <p className="text-gray-600 mb-6">
              Register as an organ donor by providing medical details.
              Your profile will be verified before matching.
            </p>
            <button
              onClick={() => navigate("/donor-register")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Donor
            </button>
          </div>

          {/* RECIPIENT */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:scale-105 transition">
            <UserCheck className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Recipient</h3>
            <p className="text-gray-600 mb-6">
              Register as a recipient and submit organ requirements.
              The system identifies compatible donors using ML models.
            </p>
            <button
              onClick={() => navigate("/recipient-register")}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
            >
              Recipient
            </button>
          </div>

        </div>
      </section>

      {/* ABOUT SMART ORGAN MATCH SECTION */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <Info className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-6">
            About Smart Organ Match
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Smart Organ Match is an AI-powered organ compatibility system
            designed to improve transplant success rates by analyzing
            organ-specific medical parameters rather than relying only
            on blood group compatibility.
          </p>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div>
              <h3 className="font-semibold text-lg mb-3 text-blue-700">
                Kidney Matching
              </h3>
              <p className="text-gray-600">
                Considers Blood Group, GFR, BMI, and Dialysis history to
                evaluate kidney function and transplant readiness.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3 text-green-700">
                Liver Matching
              </h3>
              <p className="text-gray-600">
                Uses MELD score, Bilirubin, Creatinine, and liver enzymes
                to predict transplant survival probability.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3 text-red-700">
                Heart Matching
              </h3>
              <p className="text-gray-600">
                Evaluates functional status, hypertension, BMI,
                and urgency level for cardiac compatibility.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3 text-purple-700">
                Lung Matching
              </h3>
              <p className="text-gray-600">
                Analyzes pulmonary pressure, ECMO/ventilator status,
                infection risk, and donor cardiac index.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/about")}
            className="mt-10 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Learn More About Our System
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white text-center py-6 text-gray-500">
        © 2025 Smart Organ Matching System | Academic Project
      </footer>
    </div>
  );
};

export default Home;
