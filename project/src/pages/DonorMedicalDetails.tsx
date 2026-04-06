/*


import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDonor } from "../context/DonorContext";

const DonorMedicalDetails = () => {
  const navigate = useNavigate();
  const { donorDraft } = useDonor();
  const [medicalData, setMedicalData] = useState<any>({});

  const updateMedical = (organ: string, field: string, value: any) => {
    setMedicalData({
      ...medicalData,
      [organ]: {
        ...medicalData[organ],
        [field]: value
      }
    });
  };

  const handleSubmit = async () => {
    const payload = {
      ...donorDraft.basicDetails,
      aiConsent: donorDraft.consentDetails.aiConsent,
      organs: donorDraft.selectedOrgans.map((org) => ({
        organType: org,
        donationType: org === "heart" ? "post-death" : "living",
        consentGiven: true,
        medicalDetails: medicalData[org]
      }))
    };

    await axios.post("http://localhost:5000/api/donors/register", payload);

    alert("Donor Registered Successfully");
    navigate("/donor-login");
  };

  return (
    <div className="page-bg">
      <div className="card">
        <h1 className="page-title">Medical Details</h1>

        {donorDraft.selectedOrgans.map((org) => (
          <div key={org} className="section">
            <h3>{org.toUpperCase()} Medical Details</h3>

            <input
              className="input"
              placeholder="BMI"
              type="number"
              onChange={(e) => updateMedical(org, "bmi", Number(e.target.value))}
            />

            
            {org === "kidney" && (
              <>
                <input
                  className="input"
                  placeholder="Donor GFR (ml/min)"
                  type="number"
                  onChange={(e) =>
                    updateMedical(org, "donor_GFR", Number(e.target.value))
                  }
                />

                <input
                  className="input"
                  placeholder="Creatinine Level (mg/dL)"
                  type="number"
                  onChange={(e) =>
                    updateMedical(org, "creatinineLevel", Number(e.target.value))
                  }
                />

                <input
                  className="input"
                  placeholder="Dialysis History"
                  onChange={(e) =>
                    updateMedical(org, "dialysisHistory", e.target.value)
                  }
                />
              </>
            )}

            
            {org === "liver" && (
              <>
                <input
                  className="input"
                  placeholder="Total Bilirubin (mg/dL) (Donor)"
                  type="number"
                  onChange={(e) =>
                    updateMedical(org, "tbili", Number(e.target.value))
                  }
                />

                <input
                  className="input"
                  placeholder="Serum Creatinine (mg/dL) (Donor)"
                  type="number"
                  onChange={(e) =>
                    updateMedical(org, "creat", Number(e.target.value))
                  }
                />

                <input
                  className="input"
                  placeholder="SGOT (AST) (U/L) (Donor)"
                  type="number"
                  onChange={(e) =>
                    updateMedical(org, "sgot", Number(e.target.value))
                  }
                />

                <input
                  className="input"
                  placeholder="SGPT (ALT) (U/L) (Donor)"
                  type="number"
                  onChange={(e) =>
                    updateMedical(org, "sgpt", Number(e.target.value))
                  }
                />

                <select
                  className="input"
                  onChange={(e) =>
                    updateMedical(org, "alcoholHeavy", Number(e.target.value))
                  }
                  defaultValue="0"
                >
                  <option value="0">Alcohol Heavy (No)</option>
                  <option value="1">Alcohol Heavy (Yes)</option>
                </select>
              </>
            )}

            
            {org === "lung" && (
              <>
                <input
                  className="input"
                  placeholder="Pulmonary Disease"
                  onChange={(e) =>
                    updateMedical(org, "pulmonaryDisease", e.target.value)
                  }
                />

                <input
                  className="input"
                  placeholder="Smoking History"
                  onChange={(e) =>
                    updateMedical(org, "smokingHistory", e.target.value)
                  }
                />
              </>
            )}

            
            {org === "heart" && (
              <>
                <input
                  className="input"
                  placeholder="Cardiac Conditions"
                  onChange={(e) =>
                    updateMedical(org, "cardiacConditions", e.target.value)
                  }
                />

                <input
                  className="input"
                  placeholder="Last Medical Checkup Date"
                  type="date"
                  onChange={(e) =>
                    updateMedical(org, "lastMedicalCheckup", e.target.value)
                  }
                />
              </>
            )}
          </div>
        ))}

        <button className="primary-btn" onClick={handleSubmit}>
          Register as Donor
        </button>
      </div>
    </div>
  );
};

export default DonorMedicalDetails;
*/

/*
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDonor } from "../context/DonorContext";

const DonorMedicalDetails = () => {
  const navigate = useNavigate();
  const { donorDraft } = useDonor();

  const [medicalDetails, setMedicalDetails] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const updateMedical = (organ: string, field: string, value: any) => {
    setMedicalDetails((prev: any) => ({
      ...prev,
      [organ]: {
        ...prev[organ],
        [field]: value
      }
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const organsArray = donorDraft.selectedOrgans.map((org: string) => ({
        organType: org,
        donationType: org === "heart" ? "post-death" : "living",
        consentGiven: true,
        medicalDetails: medicalDetails[org] || {}
      }));

      const payload = {
        ...donorDraft.basicDetails,
        organs: organsArray,
        aiConsent: donorDraft.consentDetails.aiConsent
      };

      await axios.post("http://localhost:5000/api/donors/register", payload);

      alert("Donor Registered Successfully");
      navigate("/donor-login");

    } catch (error: any) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-bg">
      <div className="card">
        <h1 className="page-title">Medical Details</h1>

        {donorDraft.selectedOrgans.map((org: string) => (
          <div key={org} className="section">
            <h2 className="section-title">{org.toUpperCase()}</h2>

            
            {org === "kidney" && (
              <>
                <input
                  className="input"
                  placeholder="BMI"
                  type="number"
                  onChange={(e) =>
                    updateMedical(org, "bmi", Number(e.target.value))
                  }
                />
                <input
                  className="input mt-2"
                  placeholder="Creatinine Level"
                  type="number"
                  onChange={(e) =>
                    updateMedical(org, "creatinineLevel", Number(e.target.value))
                  }
                />
                <select
                  className="input mt-2"
                  onChange={(e) =>
                    updateMedical(org, "dialysisHistory", Number(e.target.value))
                  }
                >
                  <option value="0">No Dialysis History</option>
                  <option value="1">Dialysis History Present</option>
                </select>
              </>
            )}

            {org === "liver" && (
              <>
                <input
                  className="input"
                  placeholder="BMI"
                  type="number"
                  onChange={(e) =>
                    updateMedical(org, "bmi", Number(e.target.value))
                  }
                />
                <input
                  className="input mt-2"
                  placeholder="Total Bilirubin"
                  type="number"
                  onChange={(e) =>
                    updateMedical(org, "totalBilirubin", Number(e.target.value))
                  }
                />
                <input
                  className="input mt-2"
                  placeholder="Serum Creatinine"
                  type="number"
                  onChange={(e) =>
                    updateMedical(org, "serumCreatinine", Number(e.target.value))
                  }
                />
                <input
                  className="input mt-2"
                  placeholder="SGOT"
                  type="number"
                  onChange={(e) =>
                    updateMedical(org, "sgot", Number(e.target.value))
                  }
                />
                <input
                  className="input mt-2"
                  placeholder="SGPT"
                  type="number"
                  onChange={(e) =>
                    updateMedical(org, "sgpt", Number(e.target.value))
                  }
                />
                <select
                  className="input mt-2"
                  onChange={(e) =>
                    updateMedical(org, "alcoholHeavy", Number(e.target.value))
                  }
                >
                  <option value="0">Alcohol Heavy: No</option>
                  <option value="1">Alcohol Heavy: Yes</option>
                </select>
              </>
            )}

            
            {org === "heart" && (
              <>
                <input
                  className="input"
                  placeholder="BMI"
                  type="number"
                  onChange={(e) =>
                    updateMedical(org, "bmi", Number(e.target.value))
                  }
                />

                <select
                  className="input mt-2"
                  onChange={(e) =>
                    updateMedical(org, "antihype_don", Number(e.target.value))
                  }
                >
                  <option value="0">No Hypertension</option>
                  <option value="1">Hypertension Present</option>
                </select>

                <select
                  className="input mt-2"
                  onChange={(e) =>
                    updateMedical(org, "alcohol_heavy_don", Number(e.target.value))
                  }
                >
                  <option value="0">Alcohol Heavy: No</option>
                  <option value="1">Alcohol Heavy: Yes</option>
                </select>

                <input
                  className="input mt-2"
                  placeholder="Cardiac Conditions"
                  onChange={(e) =>
                    updateMedical(org, "cardiacConditions", e.target.value)
                  }
                />
              </>
            )}

            {org === "lung" && (
              <>
                <input
                  className="input"
                  placeholder="BMI"
                  type="number"
                  onChange={(e) =>
                    updateMedical(org, "bmi", Number(e.target.value))
                  }
                />
              </>
            )}
          </div>
        ))}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="primary-btn mt-6"
        >
          {loading ? "Submitting..." : "Submit Registration"}
        </button>
      </div>
    </div>
  );
};

export default DonorMedicalDetails;

*/


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDonor } from "../context/DonorContext";

const DonorMedicalDetails = () => {
  const navigate = useNavigate();
  const { donorDraft } = useDonor();

  const [medicalDetails, setMedicalDetails] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const updateMedical = (organ: string, field: string, value: any) => {
    setMedicalDetails((prev: any) => ({
      ...prev,
      [organ]: {
        ...prev[organ],
        [field]: value
      }
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const organsArray = donorDraft.selectedOrgans.map((org: string) => ({
        organType: org,
        donationType: org === "heart" ? "post-death" : "living",
        consentGiven: true,
        medicalDetails: medicalDetails[org] || {}
      }));

      const payload = {
        ...donorDraft.basicDetails,
        organs: organsArray,
        aiConsent: donorDraft.consentDetails.aiConsent
      };

      await axios.post("https://smart-organ-match-system.onrender.com/api/donors/register", payload);

      alert("Donor Registered Successfully");
      navigate("/donor-login");

    } catch (error: any) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-bg">
      <div className="card">
        <h1 className="page-title">Medical Details</h1>

        {donorDraft.selectedOrgans.map((org: string) => (
          <div key={org} className="section">
            <h2 className="section-title">{org.toUpperCase()}</h2>

            {/* ================= KIDNEY ================= */}
            {org === "kidney" && (
              <>
                <input className="input" placeholder="BMI" type="number"
                  onChange={(e)=>updateMedical(org,"bmi",Number(e.target.value))}/>
                <input className="input mt-2" placeholder="Creatinine Level" type="number"
                  onChange={(e)=>updateMedical(org,"creatinineLevel",Number(e.target.value))}/>
                <select className="input mt-2"
                  onChange={(e)=>updateMedical(org,"dialysisHistory",Number(e.target.value))}>
                  <option value="0">No Dialysis History</option>
                  <option value="1">Dialysis History Present</option>
                </select>
              </>
            )}

            {/* ================= LIVER ================= */}
            {org === "liver" && (
              <>
                <input className="input" placeholder="BMI" type="number"
                  onChange={(e)=>updateMedical(org,"bmi",Number(e.target.value))}/>
                <input className="input mt-2" placeholder="Total Bilirubin" type="number"
                  onChange={(e)=>updateMedical(org,"totalBilirubin",Number(e.target.value))}/>
                <input className="input mt-2" placeholder="Serum Creatinine" type="number"
                  onChange={(e)=>updateMedical(org,"serumCreatinine",Number(e.target.value))}/>
                <input className="input mt-2" placeholder="SGOT" type="number"
                  onChange={(e)=>updateMedical(org,"sgot",Number(e.target.value))}/>
                <input className="input mt-2" placeholder="SGPT" type="number"
                  onChange={(e)=>updateMedical(org,"sgpt",Number(e.target.value))}/>
                <select className="input mt-2"
                  onChange={(e)=>updateMedical(org,"alcoholHeavy",Number(e.target.value))}>
                  <option value="0">Alcohol Heavy: No</option>
                  <option value="1">Alcohol Heavy: Yes</option>
                </select>
              </>
            )}

            {/* ================= HEART ================= */}
            {org === "heart" && (
              <>
                <input className="input" placeholder="BMI" type="number"
                  onChange={(e)=>updateMedical(org,"bmi",Number(e.target.value))}/>
                <select className="input mt-2"
                  onChange={(e)=>updateMedical(org,"antihype_don",Number(e.target.value))}>
                  <option value="0">No Hypertension</option>
                  <option value="1">Hypertension Present</option>
                </select>
                <select className="input mt-2"
                  onChange={(e)=>updateMedical(org,"alcohol_heavy_don",Number(e.target.value))}>
                  <option value="0">Alcohol Heavy: No</option>
                  <option value="1">Alcohol Heavy: Yes</option>
                </select>
                <input className="input mt-2" placeholder="Cardiac Conditions"
                  onChange={(e)=>updateMedical(org,"cardiacConditions",e.target.value)}/>
              </>
            )}

            {/* ================= LUNG ================= */}
            {org === "lung" && (
              <>
                <input className="input" placeholder="BMI" type="number"
                  onChange={(e)=>updateMedical(org,"bmi",Number(e.target.value))}/>
                <select className="input mt-2"
                  onChange={(e)=>updateMedical(org,"alcoholHeavyDon",Number(e.target.value))}>
                  <option value="0">Alcohol Heavy: No</option>
                  <option value="1">Alcohol Heavy: Yes</option>
                </select>
                <select className="input mt-2"
                  onChange={(e)=>updateMedical(org,"bloodInfectionDon",Number(e.target.value))}>
                  <option value="0">No Blood Infection</option>
                  <option value="1">Blood Infection Present</option>
                </select>
                <input className="input mt-2" placeholder="Cardiac Index" type="number"
                  onChange={(e)=>updateMedical(org,"cardiacIndexDon",Number(e.target.value))}/>
                <input className="input mt-2" placeholder="Creatinine (Donor)" type="number"
                  onChange={(e)=>updateMedical(org,"creatinineDon",Number(e.target.value))}/>
                <input className="input mt-2" placeholder="Cancer Site"
                  onChange={(e)=>updateMedical(org,"cancerSiteDon",e.target.value)}/>
              </>
            )}

          </div>
        ))}

        <button onClick={handleSubmit} disabled={loading} className="primary-btn mt-6">
          {loading ? "Submitting..." : "Submit Registration"}
        </button>
      </div>
    </div>
  );
};

export default DonorMedicalDetails;