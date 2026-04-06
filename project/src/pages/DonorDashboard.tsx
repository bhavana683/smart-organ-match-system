import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DonorDashboard = () => {
  const navigate = useNavigate();
  const [donor, setDonor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDonor = async () => {
      try {
        const response = await axios.get(
          "https://smart-organ-match-system.onrender.com/api/donors/dashboard",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setDonor(response.data.donor);
      } catch (error) {
        console.error("Error fetching donor:", error);
        navigate("/donor-login");
      } finally {
        setLoading(false);
      }
    };

    fetchDonor();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const [openOrgan, setOpenOrgan] = useState<Record<string, boolean>>({});

  const toggleOrgan = (organKey: string) => {
    setOpenOrgan((prev) => ({ ...prev, [organKey]: !prev[organKey] }));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <span className="text-green-600 font-semibold">Active</span>;
      case "assigned":
        return <span className="text-yellow-600 font-semibold">Assigned</span>;
      case "completed":
        return <span className="text-blue-600 font-semibold">Completed</span>;
      case "removed":
        return <span className="text-red-600 font-semibold">Removed</span>;
      default:
        return <span className="text-gray-600 font-semibold">{status || "Unknown"}</span>;
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!donor) return <div>No donor profile found.</div>;

  const renderOrgans = () => {
    if (!donor.organs) return <p>No organ data available yet.</p>;

    const organKeys = Object.keys(donor.organs).filter((key) => donor.organs[key]);

    if (organKeys.length === 0) return <p>No organs selected yet.</p>;

    return organKeys.map((key) => {
      const organ = donor.organs[key];
      return (
        <div key={key} className="border rounded-lg p-4 my-2 bg-gray-50">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleOrgan(key)}
          >
            <h3 className="text-xl font-semibold capitalize">{key}</h3>
            <span className="text-sm text-blue-600">
              {openOrgan[key] ? "Hide" : "Show"} details
            </span>
          </div>
          {openOrgan[key] && (
            <div className="mt-3 space-y-1 text-sm text-gray-800">
              <p><strong>Consent Given:</strong> {organ.consentGiven ? "Yes" : "No"}</p>
              <p><strong>Donation Type:</strong> {organ.donationType || "-"}</p>
              {Object.entries(organ).map(([field, value]) => {
                if (field === "consentGiven" || field === "donationType") return null;
                return (
                  <p key={field}>
                    <strong>{field.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}:</strong> {value?.toString() || "-"}
                  </p>
                );
              })}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">Welcome, {donor.fullName}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="border rounded-lg p-4 bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
          <p><strong>Email:</strong> {donor.email}</p>
          <p><strong>Phone:</strong> {donor.phone}</p>
          <p><strong>Age:</strong> {donor.age}</p>
          <p><strong>Gender:</strong> {donor.gender}</p>
          <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
          <p><strong>Location:</strong> {donor.city || donor.location?.city || "-"}, {donor.state || donor.location?.state || "-"}</p>
          <p><strong>Status:</strong> {getStatusBadge(donor.status)}</p>
          <p><strong>AI Consent:</strong> {donor.aiConsent ? "Granted" : "Not Granted"}</p>
          <p><strong>Joined At:</strong> {new Date(donor.createdAt).toLocaleString()}</p>
        </div>

        <div className="border rounded-lg p-4 bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Match Info</h3>
          {donor.matchedRecipientId ? (
            <div className="space-y-1">
              <p><strong>Matched Recipient:</strong> {donor.matchedRecipientId.fullName || "-"}</p>
              <p><strong>Recipient ID:</strong> {donor.matchedRecipientId._id}</p>
              <p><strong>Age:</strong> {donor.matchedRecipientId.age || "-"}</p>
              <p><strong>Organ Needed:</strong> {donor.matchedRecipientId.organNeeded || "-"}</p>
              <p><strong>Recipient Status:</strong> {donor.matchedRecipientId.status || "-"}</p>
            </div>
          ) : (
            <p>Not matched</p>
          )}
          <p className="mt-2"><strong>Removed From Pool:</strong> {donor.removedFromPoolAt ? new Date(donor.removedFromPoolAt).toLocaleString() : "N/A"}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-3">Organ Details</h3>
        {renderOrgans()}
      </div>

      <button
        onClick={handleLogout}
        className="mt-2 bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default DonorDashboard;