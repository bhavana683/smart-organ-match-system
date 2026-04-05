/*


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import axios from "axios";

const RecipientRegistration = () => {
  const navigate = useNavigate();

  const [organNeeded, setOrganNeeded] = useState("");
  const [organSpecificData, setOrganSpecificData] = useState<any>({});
  const [reports, setReports] = useState<File[]>([]);

  const [formData, setFormData] = useState<any>({
    fullName: "",
    age: "",
    gender: "",
    bloodGroup: "",
    height: "",
    weight: "",
    bmi: "",
    contactNumber: "",
    email: "",
    password: "",
    urgencyLevel: "",
    consent: false,
    hospital: {
      name: "",
      city: "",
      state: "",
      doctorName: "",
    },
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    if (name in formData.hospital) {
      setFormData({
        ...formData,
        hospital: { ...formData.hospital, [name]: value },
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleOrganSpecificChange = (e: any) => {
    const { name, value } = e.target;
    // store numbers where possible, keep empty as ""
    const num = value === "" ? "" : Number(value);
    setOrganSpecificData({
      ...organSpecificData,
      [name]: num,
    });
  };

  const handleReportsChange = (e: any) => {
    setReports([...reports, ...e.target.files]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const heightM = Number(formData.height) / 100;
    const bmi =
      heightM && formData.weight
        ? (Number(formData.weight) / (heightM * heightM)).toFixed(2)
        : "";

    const payload = {
      ...formData,
      bmi: Number(bmi),
      organNeeded,
      organSpecificData,
      reports: reports.map((file) => ({
        reportType: file.name,
        fileUrl: "UPLOAD_LATER",
        uploadedAt: new Date(),
      })),
    };

    await axios.post("http://localhost:5000/api/recipient/register", payload);

    alert("Recipient Registered Successfully");
    navigate("/recipient-login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <div className="text-center mb-8">
          <Heart className="h-12 w-12 text-red-500 mx-auto mb-3" />
          <h1 className="text-3xl font-bold">Recipient Registration</h1>

          <p className="text-center mt-3 text-gray-600">
            Already registered as a recipient?{" "}
            <span
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/recipient-login")}
            >
              Login here
            </span>
          </p>
        </div>

        <select
          className="input mb-6"
          value={organNeeded}
          onChange={(e) => {
            setOrganNeeded(e.target.value);
            setOrganSpecificData({});
          }}
          required
        >
          <option value="">Select Required Organ</option>
          <option value="kidney">Kidney</option>
          <option value="liver">Liver</option>
          <option value="heart">Heart</option>
          <option value="lung">Lung</option>
        </select>

        {organNeeded && (
          <form onSubmit={handleSubmit} className="space-y-6">
          
            <div className="grid md:grid-cols-2 gap-4">
              <input name="fullName" placeholder="Full Name" className="input" required onChange={handleChange} />
              <input name="age" type="number" placeholder="Age" className="input" required onChange={handleChange} />
              <select name="gender" className="input" required onChange={handleChange}>
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <select name="bloodGroup" className="input" required onChange={handleChange}>
                <option value="">Blood Group</option>
                <option>A+</option><option>A-</option>
                <option>B+</option><option>B-</option>
                <option>AB+</option><option>AB-</option>
                <option>O+</option><option>O-</option>
              </select>
            </div>

            
            <div className="grid md:grid-cols-2 gap-4">
              <input name="email" type="email" placeholder="Email" className="input" required onChange={handleChange} />
              <input name="password" type="password" placeholder="Password" className="input" required onChange={handleChange} />
              <input name="contactNumber" placeholder="Contact Number" className="input" required onChange={handleChange} />
            </div>

          
            <div className="grid md:grid-cols-3 gap-4">
              <input name="height" placeholder="Height (cm)" className="input" onChange={handleChange} />
              <input name="weight" placeholder="Weight (kg)" className="input" onChange={handleChange} />
              <input value={formData.bmi} placeholder="BMI (auto)" className="input bg-gray-100" readOnly />
            </div>

            
            <select name="urgencyLevel" className="input" required onChange={handleChange}>
              <option value="">Select Urgency Level</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>

            
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="font-bold mb-3">{organNeeded.toUpperCase()} Medical Details</h3>

             
              {organNeeded === "kidney" && (
                <>
                  <input
                    name="recipient_GFR"
                    placeholder="Recipient GFR (ml/min)"
                    type="number"
                    className="input"
                    required
                    onChange={handleOrganSpecificChange}
                  />
                </>
              )}

              
              {organNeeded === "liver" && (
                <>
                  <input
                    name="init_bilirubin"
                    placeholder="Initial Bilirubin (mg/dL)"
                    type="number"
                    className="input"
                    required
                    onChange={handleOrganSpecificChange}
                  />
                  <input
                    name="init_inr"
                    placeholder="Initial INR"
                    type="number"
                    className="input mt-2"
                    required
                    onChange={handleOrganSpecificChange}
                  />
                  <input
                    name="init_serum_creat"
                    placeholder="Initial Serum Creatinine (mg/dL)"
                    type="number"
                    className="input mt-2"
                    required
                    onChange={handleOrganSpecificChange}
                  />
                  <input
                    name="init_albumin"
                    placeholder="Initial Albumin (g/dL)"
                    type="number"
                    className="input mt-2"
                    onChange={handleOrganSpecificChange}
                  />
                  <input
                    name="meld_peld_lab_score"
                    placeholder="MELD/PELD Lab Score"
                    type="number"
                    className="input mt-2"
                    onChange={handleOrganSpecificChange}
                  />
                  <input
                    name="dis_sgot"
                    placeholder="Discharge SGOT/AST (optional)"
                    type="number"
                    className="input mt-2"
                    onChange={handleOrganSpecificChange}
                  />
                </>
              )}

             
            </div>

            
            <div className="grid md:grid-cols-2 gap-4">
              <input name="name" placeholder="Hospital Name" className="input" onChange={handleChange} />
              <input name="doctorName" placeholder="Doctor Name" className="input" onChange={handleChange} />
              <input name="city" placeholder="Hospital City" className="input" onChange={handleChange} />
              <input name="state" placeholder="Hospital State" className="input" onChange={handleChange} />
            </div>

            
            <input type="file" multiple className="input" onChange={handleReportsChange} />

            
            <label className="flex items-center gap-2">
              <input type="checkbox" name="consent" required onChange={handleChange} />
              I consent to share my medical data for organ matching
            </label>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
              Submit Registration
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RecipientRegistration;

*/


/*
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const organs = ["kidney", "liver", "heart", "lung"];

const RecipientRegistration = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<any>({
    fullName: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    bloodGroup: "",
    contactNumber: "",
    organNeeded: "",
    urgencyLevel: ""
  });

  const [organSpecificData, setOrganSpecificData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrganSpecificChange = (e: any) => {
    setOrganSpecificData({
      ...organSpecificData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/recipient/register",
        {
          ...form,
          organSpecificData
        }
      );

      alert("Recipient Registered Successfully");
      navigate("/recipient-login");

    } catch (error: any) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-bg">
      <div className="card">
        <h1 className="page-title">Recipient Registration</h1>

       
        <p className="text-center mt-3 text-gray-600">
          Already registered as a recipient?{" "}
          <span
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/recipient-login")}
          >
            Login here
          </span>
        </p>

        <form onSubmit={handleSubmit} className="mt-6">

          <input className="input" name="fullName" placeholder="Full Name" onChange={handleChange} required />
          <input className="input mt-2" name="email" placeholder="Email" onChange={handleChange} required />
          <input className="input mt-2" type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <input className="input mt-2" type="number" name="age" placeholder="Age" onChange={handleChange} required />
          <input className="input mt-2" name="gender" placeholder="Gender" onChange={handleChange} required />
          <input className="input mt-2" name="bloodGroup" placeholder="Blood Group" onChange={handleChange} required />
          <input className="input mt-2" name="contactNumber" placeholder="Contact Number" onChange={handleChange} required />

          <select className="input mt-2" name="organNeeded" onChange={handleChange} required>
            <option value="">Select Organ</option>
            {organs.map(org => (
              <option key={org} value={org}>{org.toUpperCase()}</option>
            ))}
          </select>

          <input className="input mt-2" name="urgencyLevel" placeholder="Urgency Level" onChange={handleChange} required />

         
          {form.organNeeded === "heart" && (
            <>
              <input
                name="func_stat_tcr"
                placeholder="Functional Status (1-4)"
                type="number"
                className="input mt-2"
                onChange={handleOrganSpecificChange}
                required
              />

              <input
                name="init_stat"
                placeholder="Initial Status (1-5)"
                type="number"
                className="input mt-2"
                onChange={handleOrganSpecificChange}
                required
              />

              <input
                name="bmi_calc"
                placeholder="BMI"
                type="number"
                className="input mt-2"
                onChange={handleOrganSpecificChange}
                required
              />
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="primary-btn mt-6"
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default RecipientRegistration;

*/


/*

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import axios from "axios";

const RecipientRegistration = () => {
  const navigate = useNavigate();

  const [organNeeded, setOrganNeeded] = useState("");
  const [organSpecificData, setOrganSpecificData] = useState<any>({});
  const [reports, setReports] = useState<File[]>([]);

  const [formData, setFormData] = useState<any>({
    fullName: "",
    age: "",
    gender: "",
    bloodGroup: "",
    height: "",
    weight: "",
    bmi: "",
    contactNumber: "",
    email: "",
    password: "",
    urgencyLevel: "",
    consent: false,
    hospital: {
      name: "",
      city: "",
      state: "",
      doctorName: "",
    },
  });

  
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    if (name in formData.hospital) {
      setFormData({
        ...formData,
        hospital: { ...formData.hospital, [name]: value },
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  
  const handleOrganSpecificChange = (e: any) => {
    const { name, value } = e.target;
    const num = value === "" ? "" : Number(value);

    setOrganSpecificData({
      ...organSpecificData,
      [name]: num,
    });
  };

  const handleReportsChange = (e: any) => {
    setReports([...reports, ...e.target.files]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const heightM = Number(formData.height) / 100;
    const bmi =
      heightM && formData.weight
        ? (Number(formData.weight) / (heightM * heightM)).toFixed(2)
        : "";

    const payload = {
      ...formData,
      bmi: Number(bmi),
      organNeeded,
      organSpecificData,
      reports: reports.map((file) => ({
        reportType: file.name,
        fileUrl: "UPLOAD_LATER",
        uploadedAt: new Date(),
      })),
    };

    await axios.post("http://localhost:5000/api/recipient/register", payload);

    alert("Recipient Registered Successfully");
    navigate("/recipient-login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <div className="text-center mb-8">
          <Heart className="h-12 w-12 text-red-500 mx-auto mb-3" />
          <h1 className="text-3xl font-bold">Recipient Registration</h1>

          <p className="text-center mt-3 text-gray-600">
            Already registered as a recipient?{" "}
            <span
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/recipient-login")}
            >
              Login here
            </span>
          </p>
        </div>

        <select
          className="input mb-6"
          value={organNeeded}
          onChange={(e) => {
            setOrganNeeded(e.target.value);
            setOrganSpecificData({});
          }}
          required
        >
          <option value="">Select Required Organ</option>
          <option value="kidney">Kidney</option>
          <option value="liver">Liver</option>
          <option value="heart">Heart</option>
          <option value="lung">Lung</option>
        </select>

        {organNeeded && (
          <form onSubmit={handleSubmit} className="space-y-6">

            
            <div className="grid md:grid-cols-2 gap-4">
              <input name="fullName" placeholder="Full Name" className="input" required onChange={handleChange} />
              <input name="age" type="number" placeholder="Age" className="input" required onChange={handleChange} />

              <select name="gender" className="input" required onChange={handleChange}>
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>

              <select name="bloodGroup" className="input" required onChange={handleChange}>
                <option value="">Blood Group</option>
                <option>A+</option><option>A-</option>
                <option>B+</option><option>B-</option>
                <option>AB+</option><option>AB-</option>
                <option>O+</option><option>O-</option>
              </select>
            </div>

            
            <div className="grid md:grid-cols-2 gap-4">
              <input name="email" type="email" placeholder="Email" className="input" required onChange={handleChange} />
              <input name="password" type="password" placeholder="Password" className="input" required onChange={handleChange} />
              <input name="contactNumber" placeholder="Contact Number" className="input" required onChange={handleChange} />
            </div>

            
            <div className="grid md:grid-cols-3 gap-4">
              <input name="height" placeholder="Height (cm)" className="input" onChange={handleChange} />
              <input name="weight" placeholder="Weight (kg)" className="input" onChange={handleChange} />
              <input value={formData.bmi} placeholder="BMI (auto)" className="input bg-gray-100" readOnly />
            </div>

            <select name="urgencyLevel" className="input" required onChange={handleChange}>
              <option value="">Select Urgency Level</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>

            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="font-bold mb-3">{organNeeded.toUpperCase()} Medical Details</h3>

              {organNeeded === "kidney" && (
                <input
                  name="recipient_GFR"
                  placeholder="Recipient GFR (ml/min)"
                  type="number"
                  className="input"
                  required
                  onChange={handleOrganSpecificChange}
                />
              )}

              {organNeeded === "liver" && (
                <>
                  <input name="init_bilirubin" placeholder="Initial Bilirubin" type="number" className="input" required onChange={handleOrganSpecificChange} />
                  <input name="init_inr" placeholder="Initial INR" type="number" className="input mt-2" required onChange={handleOrganSpecificChange} />
                  <input name="init_serum_creat" placeholder="Initial Serum Creatinine" type="number" className="input mt-2" required onChange={handleOrganSpecificChange} />
                  <input name="init_albumin" placeholder="Initial Albumin" type="number" className="input mt-2" onChange={handleOrganSpecificChange} />
                  <input name="meld_peld_lab_score" placeholder="MELD Score" type="number" className="input mt-2" onChange={handleOrganSpecificChange} />
                  <input name="dis_sgot" placeholder="Discharge SGOT" type="number" className="input mt-2" onChange={handleOrganSpecificChange} />
                </>
              )}

              {organNeeded === "heart" && (
                <>
                  <input name="func_stat_tcr" placeholder="Functional Status (1-4)" type="number" className="input" required onChange={handleOrganSpecificChange} />
                  <input name="init_stat" placeholder="Initial Status (1-5)" type="number" className="input mt-2" required onChange={handleOrganSpecificChange} />
                  <input name="bmi_calc" placeholder="BMI" type="number" className="input mt-2" required onChange={handleOrganSpecificChange} />
                </>
              )}
            </div>

            
            <div className="grid md:grid-cols-2 gap-4">
              <input name="name" placeholder="Hospital Name" className="input" onChange={handleChange} />
              <input name="doctorName" placeholder="Doctor Name" className="input" onChange={handleChange} />
              <input name="city" placeholder="Hospital City" className="input" onChange={handleChange} />
              <input name="state" placeholder="Hospital State" className="input" onChange={handleChange} />
            </div>

            <input type="file" multiple className="input" onChange={handleReportsChange} />

            <label className="flex items-center gap-2">
              <input type="checkbox" name="consent" required onChange={handleChange} />
              I consent to share my medical data for organ matching
            </label>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
              Submit Registration
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RecipientRegistration;

*/



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import axios from "axios";

const RecipientRegistration = () => {
  const navigate = useNavigate();

  const [organNeeded, setOrganNeeded] = useState("");
  const [organSpecificData, setOrganSpecificData] = useState<any>({});
  const [reports, setReports] = useState<File[]>([]);

  const [formData, setFormData] = useState<any>({
    fullName: "",
    age: "",
    gender: "",
    bloodGroup: "",
    contactNumber: "",
    email: "",
    password: "",
    urgencyLevel: "",
    consent: false,
    hospital: {
      name: "",
      city: "",
      state: "",
      doctorName: "",
    },
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    if (name in formData.hospital) {
      setFormData({
        ...formData,
        hospital: { ...formData.hospital, [name]: value },
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleOrganSpecificChange = (e: any) => {
    const { name, value } = e.target;
    const num = value === "" ? "" : Number(value);

    setOrganSpecificData({
      ...organSpecificData,
      [name]: num,
    });
  };

  const handleReportsChange = (e: any) => {
    setReports([...reports, ...e.target.files]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const computedRecipientBmi = organSpecificData?.bmi_calc || organSpecificData?.bmi || null;

    const payload = {
      ...formData,
      bmi: computedRecipientBmi,
      organNeeded,
      organSpecificData,
      reports: reports.map((file) => ({
        reportType: file.name,
        fileUrl: "UPLOAD_LATER",
        uploadedAt: new Date(),
      })),
    };

    await axios.post("http://localhost:5000/api/recipient/register", payload);

    alert("Recipient Registered Successfully");
    navigate("/recipient-login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <div className="text-center mb-8">
          <Heart className="h-12 w-12 text-red-500 mx-auto mb-3" />
          <h1 className="text-3xl font-bold">Recipient Registration</h1>

          <p className="text-center mt-3 text-gray-600">
            Already registered as a recipient?{" "}
            <span
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/recipient-login")}
            >
              Login here
            </span>
          </p>
        </div>
<p className="text-center mt-3 text-gray-600">
  ← 
  <span
    className="text-blue-600 font-semibold cursor-pointer hover:underline ml-1"
    onClick={() => navigate("/")}
  >
    Back to Home
  </span>
</p>
        <select
          className="input mb-6"
          value={organNeeded}
          onChange={(e) => {
            setOrganNeeded(e.target.value);
            setOrganSpecificData({});
          }}
          required
        >
          <option value="">Select Required Organ</option>
          <option value="kidney">Kidney</option>
          <option value="liver">Liver</option>
          <option value="heart">Heart</option>
          <option value="lung">Lung</option>
        </select>

        {organNeeded && (
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Basic Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <input name="fullName" placeholder="Full Name" className="input" required onChange={handleChange} />
              <input name="age" type="number" placeholder="Age" className="input" required onChange={handleChange} />

              <select name="gender" className="input" required onChange={handleChange}>
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>

              <select name="bloodGroup" className="input" required onChange={handleChange}>
                <option value="">Blood Group</option>
                <option>A+</option><option>A-</option>
                <option>B+</option><option>B-</option>
                <option>AB+</option><option>AB-</option>
                <option>O+</option><option>O-</option>
              </select>
            </div>

            {/* Account Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <input name="email" type="email" placeholder="Email" className="input" required onChange={handleChange} />
              <input name="password" type="password" placeholder="Password" className="input" required onChange={handleChange} />
              <input name="contactNumber" placeholder="Contact Number" className="input" required onChange={handleChange} />
            </div>

            {/* BMI */}
            <div className="grid md:grid-cols-3 gap-4">
              <input name="height" placeholder="Height (cm)" className="input" onChange={handleChange} />
              <input name="weight" placeholder="Weight (kg)" className="input" onChange={handleChange} />
              <input value={formData.bmi} placeholder="BMI (auto)" className="input bg-gray-100" readOnly />
            </div>

            <select name="urgencyLevel" className="input" required onChange={handleChange}>
              <option value="">Select Urgency Level</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>

            {/* Medical Block */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="font-bold mb-3">{organNeeded.toUpperCase()} Medical Details</h3>

              {organNeeded === "kidney" && (
                <input
                  name="recipient_GFR"
                  placeholder="Recipient GFR (ml/min)"
                  type="number"
                  className="input"
                  required
                  onChange={handleOrganSpecificChange}
                />
              )}

              {organNeeded === "liver" && (
                <>
                  <input name="init_bilirubin" placeholder="Initial Bilirubin" type="number" className="input" required onChange={handleOrganSpecificChange} />
                  <input name="init_inr" placeholder="Initial INR" type="number" className="input mt-2" required onChange={handleOrganSpecificChange} />
                  <input name="init_serum_creat" placeholder="Initial Serum Creatinine" type="number" className="input mt-2" required onChange={handleOrganSpecificChange} />
                  <input name="init_albumin" placeholder="Initial Albumin" type="number" className="input mt-2" onChange={handleOrganSpecificChange} />
                  <input name="meld_peld_lab_score" placeholder="MELD Score" type="number" className="input mt-2" onChange={handleOrganSpecificChange} />
                  <input name="dis_sgot" placeholder="Discharge SGOT" type="number" className="input mt-2" onChange={handleOrganSpecificChange} />
                </>
              )}

              {organNeeded === "heart" && (
                <>
                  <input name="func_stat_tcr" placeholder="Functional Status (1-4)" type="number" className="input" required onChange={handleOrganSpecificChange} />
                  <input name="init_stat" placeholder="Initial Status (1-5)" type="number" className="input mt-2" required onChange={handleOrganSpecificChange} />
                  <input name="bmi_calc" placeholder="BMI" type="number" className="input mt-2" required onChange={handleOrganSpecificChange} />
                </>
              )}

              {/* 🫁 LUNG ADDED WITHOUT TOUCHING UI */}
              {organNeeded === "lung" && (
                <>
                  <input name="INIT_CREAT" placeholder="Initial Creatinine" type="number" className="input" required onChange={handleOrganSpecificChange} />
                  <input name="HEMO_PA_MN_TCR" placeholder="Mean Pulmonary Artery Pressure" type="number" className="input mt-2" required onChange={handleOrganSpecificChange} />
                  <select name="DIAB" className="input mt-2" required onChange={handleOrganSpecificChange}>
                    <option value="">Diabetes</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                  <select name="ONVENT" className="input mt-2" required onChange={handleOrganSpecificChange}>
                    <option value="">On Ventilator</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                  <select name="ECMO_TCR" className="input mt-2" required onChange={handleOrganSpecificChange}>
                    <option value="">ECMO Support</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                  <input name="BIOPSY_DGN" placeholder="Biopsy Diagnosis" className="input mt-2" required onChange={handleOrganSpecificChange} />
                </>
              )}
            </div>

            {/* Hospital */}
            <div className="grid md:grid-cols-2 gap-4">
              <input name="name" placeholder="Hospital Name" className="input" onChange={handleChange} />
              <input name="doctorName" placeholder="Doctor Name" className="input" onChange={handleChange} />
              <input name="city" placeholder="Hospital City" className="input" onChange={handleChange} />
              <input name="state" placeholder="Hospital State" className="input" onChange={handleChange} />
            </div>

            <input type="file" multiple className="input" onChange={handleReportsChange} />

            <label className="flex items-center gap-2">
              <input type="checkbox" name="consent" required onChange={handleChange} />
              I consent to share my medical data for organ matching
            </label>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
              Submit Registration
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RecipientRegistration;