import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/admin",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const adminAPI = {
  getDonors: async () => (await API.get("/donors")).data,
  getRecipients: async () => (await API.get("/recipients")).data,
  getStats: async () => (await API.get("/stats")).data,

  approveDonor: async (id: string) =>
    API.put(`/donor/${id}/approve`),

  rejectDonor: async (id: string) =>
    API.put(`/donor/${id}/reject`),

  approveRecipient: async (id: string) =>
    API.put(`/recipient/${id}/approve`),

  rejectRecipient: async (id: string) =>
    API.put(`/recipient/${id}/reject`)
};
