import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminAPI } from "../services/adminAPI";
import {
  Heart,
  LogOut,
  CheckCircle,
  XCircle,
  BarChart,
} from "lucide-react";

type TabType = "donors" | "recipients" | "stats";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [donors, setDonors] = useState<any[]>([]);
  const [recipients, setRecipients] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("donors");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [donorsData, recipientsData, statsData] = await Promise.all([
        adminAPI.getDonors(),
        adminAPI.getRecipients(),
        adminAPI.getStats(),
      ]);

      setDonors(donorsData);
      setRecipients(recipientsData);
      setStats(statsData);
    } catch (error) {
      console.error("Admin access error:", error);
      alert("Unauthorized or session expired");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleApproveDonor = async (id: string) => {
    try {
      await adminAPI.approveDonor(id);
      loadData();
      alert("Donor approved successfully");
    } catch (error) {
      alert("Failed to approve donor");
    }
  };

  const handleRejectDonor = async (id: string) => {
    try {
      await adminAPI.rejectDonor(id);
      loadData();
      alert("Donor rejected");
    } catch (error) {
      alert("Failed to reject donor");
    }
  };

  const handleApproveRecipient = async (id: string) => {
    try {
      await adminAPI.approveRecipient(id);
      loadData();
      alert("Recipient approved successfully");
    } catch (error) {
      alert("Failed to approve recipient");
    }
  };

  const handleRejectRecipient = async (id: string) => {
    try {
      await adminAPI.rejectRecipient(id);
      loadData();
      alert("Recipient rejected");
    } catch (error) {
      alert("Failed to reject recipient");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-600">Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      {/* Navbar */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="h-7 w-7 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-700 hover:text-red-600"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome, Admin
        </h2>
        <p className="text-gray-600 mb-8">
          Manage donor and recipient approvals
        </p>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          {["donors", "recipients", "stats"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as TabType)}
              className={`px-6 py-2 rounded-lg font-semibold ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab === "stats" ? (
                <>
                  <BarChart className="inline h-4 w-4 mr-2" />
                  Stats
                </>
              ) : (
                tab.charAt(0).toUpperCase() + tab.slice(1)
              )}
            </button>
          ))}
        </div>

        {/* Donors */}
        {activeTab === "donors" && (
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold mb-4">Donors</h3>
            {donors.length === 0 ? (
              <p>No donors found</p>
            ) : (
              donors.map((donor) => (
                <div
                  key={donor._id}
                  className="border rounded-lg p-4 mb-4 flex justify-between"
                >
                  <div>
                    <p className="font-semibold">{donor.fullName}</p>
                    <p>Email: {donor.email}</p>
                    <p>Organ: {donor.organType}</p>
                    <p>Status: {donor.status}</p>
                  </div>

                  {donor.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApproveDonor(donor._id)}
                        className="bg-green-600 text-white px-4 py-2 rounded"
                      >
                        <CheckCircle className="inline h-4 w-4 mr-1" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectDonor(donor._id)}
                        className="bg-red-600 text-white px-4 py-2 rounded"
                      >
                        <XCircle className="inline h-4 w-4 mr-1" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Recipients */}
        {activeTab === "recipients" && (
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold mb-4">Recipients</h3>
            {recipients.length === 0 ? (
              <p>No recipients found</p>
            ) : (
              recipients.map((recipient) => (
                <div
                  key={recipient._id}
                  className="border rounded-lg p-4 mb-4 flex justify-between"
                >
                  <div>
                    <p className="font-semibold">{recipient.fullName}</p>
                    <p>Email: {recipient.email}</p>
                    <p>Organ Needed: {recipient.organNeeded}</p>
                    <p>Urgency: {recipient.urgency}</p>
                    <p>Status: {recipient.status}</p>
                  </div>

                  {recipient.status === "waiting" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleApproveRecipient(recipient._id)
                        }
                        className="bg-green-600 text-white px-4 py-2 rounded"
                      >
                        <CheckCircle className="inline h-4 w-4 mr-1" />
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          handleRejectRecipient(recipient._id)
                        }
                        className="bg-red-600 text-white px-4 py-2 rounded"
                      >
                        <XCircle className="inline h-4 w-4 mr-1" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Stats */}
        {activeTab === "stats" && stats && (
          <div className="bg-white rounded-xl shadow p-6 grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded">
              <p className="text-gray-600">Total Donors</p>
              <h3 className="text-3xl font-bold text-blue-600">
                {stats.totalDonors}
              </h3>
            </div>
            <div className="bg-green-50 p-4 rounded">
              <p className="text-gray-600">Total Recipients</p>
              <h3 className="text-3xl font-bold text-green-600">
                {stats.totalRecipients}
              </h3>
            </div>
            <div className="bg-teal-50 p-4 rounded">
              <p className="text-gray-600">Total Users</p>
              <h3 className="text-3xl font-bold text-teal-600">
                {stats.totalDonors + stats.totalRecipients}
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
