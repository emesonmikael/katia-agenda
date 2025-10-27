import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getAgendamentos = async () => {
  const res = await api.get("/");
  return res.data;
};

export const createAgendamento = async (dados) => {
  const res = await api.post("/", dados);
  return res.data;
};

export default api;