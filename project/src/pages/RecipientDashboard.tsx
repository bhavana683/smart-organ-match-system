import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Search, LogOut, Heart, Phone, AlertCircle, CheckCircle, Clock } from "lucide-react";

const RecipientDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [recipient, setRecipient] = useState<any>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchingMatches, setSearchingMatches] = useState(false);
  const [totalMatches, setTotalMatches] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [selectedDonor, setSelectedDonor] = useState<any>(null);
  const [transactionId, setTransactionId] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<Array<{sender:string;message:string}>>([]);
  const [newChatMessage, setNewChatMessage] = useState("");
  const [recipientAccepted, setRecipientAccepted] = useState(false);
  const [donorApproved, setDonorApproved] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);

  useEffect(() => {
    const fetchRecipient = async () => {
      if (!token) {
        navigate("/recipient-login");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/ml/matches",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (response.data.recipient) {
          setRecipient(response.data.recipient);
        }

        setMatches(response.data.matches || []);
        setTotalMatches(response.data.totalMatches || 0);

        if (!response.data.recipient) {
          // fallback to dedicated recipient profile endpoint for older responses
          const profile = await axios.get("http://localhost:5000/api/recipient/dashboard", {
            headers: { Authorization: `Bearer ${token}` }
          });
          setRecipient(profile.data.recipient);
        }

        setError(null);
      } catch (err: any) {
        const status = err.response?.status;

        if (status === 401 || status === 403) {
          navigate("/recipient-login");
          return;
        }

        setError(
          err.response?.data?.message ||
            "Failed to load recipient data. Please try again."
        );

        // Attempt profile-only fallback in case /api/ml/matches is failing on matching logic
        try {
          const profile = await axios.get("http://localhost:5000/api/recipient/dashboard", {
            headers: { Authorization: `Bearer ${token}` }
          });
          setRecipient(profile.data.recipient);
        } catch (profileErr) {
          console.error("Profile fallback failed", profileErr);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecipient();
  }, [token, navigate]);

  const handleFindMatches = async () => {
    setSearchingMatches(true);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/ml/matches`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setMatches(response.data.matches || []);
      setTotalMatches(response.data.totalMatches || 0);
    } catch (error) {
      console.error("Error fetching matches:", error);
      alert("Failed to find matches. Please try again.");
    } finally {
      setSearchingMatches(false);
    }
  };

  const handleAccept = async (match: any) => {
    setChatLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/ml/start-chat",
        { donorId: match.donorId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSelectedDonor(match);
      setTransactionId(response.data.transactionId);
      setChatMessages([
        { sender: "recipient", message: "Hi, I would like to connect and confirm organ transplant details." },
        { sender: "donor", message: "Hello, I am ready to discuss and confirm if medically appropriate." }
      ]);
      setRecipientAccepted(false);
      setDonorApproved(false);
      setRecipient(prev => prev ? { ...prev, status: "donor_found", matchedDonorId: match.donorId } : prev);
      setMatches(matches.filter(m => m.donorId !== match.donorId));

      alert("Donor assigned. Chat started for confirmation.");
    } catch (error: any) {
      console.error("Error assigning/starting chat:", error);
      alert(error?.response?.data?.message || "Failed to assign donor. Please try again.");
    } finally {
      setChatLoading(false);
    }
  };

  const handleStartChat = async (match: any) => {
    await handleAccept(match);
  };

  const handleSendMessage = async (message: string, sender: "recipient" | "donor") => {
    if (!transactionId || !selectedDonor) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/ml/update-chat",
        {
          transactionId,
          sender,
          message
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setChatMessages(response.data.transaction.chatHistory);
    } catch (error) {
      console.error("Error updating chat:", error);
      alert("Unable to send chat message. Please try again.");
    }
  };

  const handleRecipientConfirm = async () => {
    if (!transactionId || !selectedDonor) return;

    await handleSendMessage("Recipient accepts and requests final donor approval.", "recipient");
    setRecipientAccepted(true);
    setMatches(curr => curr.filter((m:any) => m.donorId !== selectedDonor.donorId));
  };

  const handleChatSubmit = async () => {
    if (!newChatMessage.trim() || !transactionId) return;

    await handleSendMessage(newChatMessage.trim(), "recipient");
    setNewChatMessage("");
  };

  const handleDonorReply = async () => {
    if (!newChatMessage.trim() || !transactionId) return;

    await handleSendMessage(newChatMessage.trim(), "donor");
    setNewChatMessage("");
  };

  const handleDonorConfirm = async () => {
    if (!transactionId || !selectedDonor) return;

    try {
      await axios.post(
        "http://localhost:5000/api/ml/confirm-transplant",
        { donorId: selectedDonor.donorId, transactionId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDonorApproved(true);
      await handleSendMessage("Donor confirms transplant. Transaction complete.", "donor");
      alert("Transplant confirmed and donor withdrawn from pool.");
      setSelectedDonor(null);
      setTransactionId("");
      setRecipientAccepted(false);
      setDonorApproved(false);
    } catch (error) {
      console.error("Error confirming transplant:", error);
      alert("Failed to confirm transplant. Please try again.");
    }
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const getCompatibilityColor = (compatibility: string) => {
    switch (compatibility?.toLowerCase()) {
      case "highly compatible":
        return "bg-green-50 border-green-300";
      case "compatible":
        return "bg-yellow-50 border-yellow-300";
      default:
        return "bg-red-50 border-red-300";
    }
  };

  const getCompatibilityBadge = (compatibility: string) => {
    switch (compatibility?.toLowerCase()) {
      case "highly compatible":
        return (
          <div className="flex items-center gap-1 text-green-700 bg-green-100 px-3 py-1 rounded-full text-sm font-semibold">
            <CheckCircle size={16} /> Highly Compatible
          </div>
        );
      case "compatible":
        return (
          <div className="flex items-center gap-1 text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full text-sm font-semibold">
            <Clock size={16} /> Compatible
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1 text-red-700 bg-red-100 px-3 py-1 rounded-full text-sm font-semibold">
            <AlertCircle size={16} /> Low Compatible
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <div className="text-center">
          <Heart className="animate-bounce mx-auto mb-4 text-red-600" size={48} />
          <p className="text-xl font-semibold text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (!recipient) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-700">
            {error ? "Unable to load profile" : "Profile data not loaded yet."}
          </p>
          {error && <p className="text-red-600 mt-2">{error}</p>}
          {!error && (
            <p className="text-gray-600 mt-2">Please wait a moment or log out and log in again.</p>
          )}
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-2">
                <Heart className="text-red-600" size={40} />
                Welcome, {recipient.fullName}
              </h1>
              <p className="text-gray-600 mt-2">Organ Transplant Matching Platform</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition"
            >
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Recipient Info Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Profile</h2>
          <p className="mb-3 text-sm text-gray-700 font-medium">Recipient Status: <span className="text-blue-600 capitalize">{recipient.status || "waiting"}</span></p>
          {recipient.matchedDonorId && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-semibold text-green-800">Matched Donor Found</p>
              <p className="text-sm text-green-700">Donor ID: {recipient.matchedDonorId}</p>
              <p className="text-sm text-green-700">Need to confirm via chat panel</p>
            </div>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Age</p>
              <p className="text-2xl font-bold text-blue-600">{recipient.age} yrs</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Blood Group</p>
              <p className="text-2xl font-bold text-purple-600">{recipient.bloodGroup}</p>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Organ Needed</p>
              <p className="text-2xl font-bold text-pink-600 capitalize">{recipient.organNeeded}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Available Donors</p>
              <p className="text-2xl font-bold text-green-600">{totalMatches}</p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Find Matching Donors</h2>
          <p className="text-gray-600 mb-6">
            Search for compatible donors based on blood type, age, and medical compatibility scores.
          </p>
          <button
            onClick={handleFindMatches}
            disabled={searchingMatches}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition text-lg"
          >
            {searchingMatches ? (
              <>
                <div className="animate-spin">
                  <Search size={24} />
                </div>
                Searching Donors...
              </>
            ) : (
              <>
                <Search size={24} />
                Find Matches
              </>
            )}
          </button>
        </div>

        {/* Matches Section */}
        {matches.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Best {matches.length} Matching Donors
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {matches.map((match, index) => (
                <div
                  key={index}
                  className={`border-2 rounded-lg p-6 transition transform hover:scale-105 ${getCompatibilityColor(
                    match.compatibility
                  )}`}
                >
                  {/* Match Score Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {match.fullName}
                      </h3>
                      <p className="text-sm text-gray-600">Donor ID: {match.donorId}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-blue-600">
                        {(match.matchScore * 100).toFixed(0)}%
                      </div>
                      <p className="text-xs text-gray-600">Match Score</p>
                    </div>
                  </div>

                  {/* Compatibility Badge */}
                  <div className="mb-4">
                    {getCompatibilityBadge(match.compatibility)}
                  </div>

                  {/* Donor Details */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white bg-opacity-70 p-3 rounded">
                      <p className="text-xs text-gray-600">Age</p>
                      <p className="text-lg font-bold text-gray-800">
                        {match.age} years
                      </p>
                    </div>
                    <div className="bg-white bg-opacity-70 p-3 rounded">
                      <p className="text-xs text-gray-600">Blood Group</p>
                      <p className="text-lg font-bold text-gray-800">
                        {match.bloodGroup}
                      </p>
                    </div>
                    <div className="bg-white bg-opacity-70 p-3 rounded">
                      <p className="text-xs text-gray-600">Gender</p>
                      <p className="text-lg font-bold text-gray-800">
                        {match.gender || "N/A"}
                      </p>
                    </div>
                    <div className="bg-white bg-opacity-70 p-3 rounded">
                      <p className="text-xs text-gray-600">Location</p>
                      <p className="text-lg font-bold text-gray-800">
                        {typeof match.location === "object" && match.location !== null
                          ? `${match.location.city || ""}${match.location.city && match.location.state ? ", " : ""}${match.location.state || ""}` || "N/A"
                          : match.location || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div className="bg-white bg-opacity-70 p-3 rounded mb-4 flex items-center gap-2">
                    <Phone size={18} className="text-blue-600" />
                    <p className="text-gray-800 font-semibold">{match.phone || "N/A"}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleAccept(match)}
                      disabled={chatLoading || (selectedDonor && selectedDonor.donorId !== match.donorId)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-bold transition disabled:opacity-50"
                    >
                      {selectedDonor?.donorId === match.donorId ? "Chat Active" : "Accept & Start Chat"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedDonor && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Chat & Confirm with {selectedDonor.fullName}
            </h2>

            <div className="max-h-72 overflow-y-auto border rounded-lg p-3 mb-4 bg-gray-50">
              {chatMessages.map((msg, idx) => (
                <div
                  key={`${msg.sender}-${idx}`}
                  className={`mb-2 ${msg.sender === "recipient" ? "text-right" : "text-left"}`}
                >
                  <span
                    className={`inline-block px-3 py-2 rounded-lg ${msg.sender === "recipient" ? "bg-blue-200 text-blue-800" : msg.sender === "donor" ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-800"}`}
                  >
                    <strong>{msg.sender === "recipient" ? "You" : msg.sender === "donor" ? "Donor" : "System"}:</strong> {msg.message}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                className="flex-1 border rounded-lg px-3 py-2"
                placeholder="Type a message"
                value={newChatMessage}
                onChange={(e) => setNewChatMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleChatSubmit();
                  }
                }}
              />
              <button
                onClick={handleChatSubmit}
                disabled={!newChatMessage.trim() || !transactionId}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Send (Me)
              </button>
              <button
                onClick={handleDonorReply}
                disabled={!newChatMessage.trim() || !transactionId}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Send (Donor)
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={handleRecipientConfirm}
                disabled={recipientAccepted || !transactionId}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                {recipientAccepted ? "Recipient Accepted" : "Recipient: Accept"}
              </button>
              <button
                onClick={handleDonorConfirm}
                disabled={!recipientAccepted || donorApproved || !transactionId}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                {donorApproved ? "Donor Approved" : "Donor: Confirm"}
              </button>
              <button
                onClick={() => {
                  setSelectedDonor(null);
                  setTransactionId("");
                  setChatMessages([]);
                  setRecipientAccepted(false);
                  setDonorApproved(false);
                }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
              >
                Close Chat
              </button>
            </div>

            <p className="text-sm text-gray-600">After final confirmation, donor will be marked completed and removed from matching pool.</p>
          </div>
        )}

        {/* No Matches Message */}
        {!searchingMatches && matches.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <AlertCircle size={48} className="mx-auto text-yellow-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Matches Found</h3>
            <p className="text-gray-600">
              Currently, there are no compatible donors. Please try again later or contact support.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipientDashboard;