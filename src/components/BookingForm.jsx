import { useState } from "react";
import { createAgendamento } from "../services/api";

export default function BookingForm() {
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    data: "",
    horario: "",
    servico: "",
  });
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAgendamento(form);
      setMsg("✅ Agendamento enviado com sucesso!");
      setForm({ nome: "", telefone: "", data: "", horario: "", servico: "" });
    } catch {
      setMsg("❌ Erro ao enviar, tente novamente.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 mt-6">
      <h2 className="text-xl font-semibold text-center text-pink-500 mb-4">Agende seu horário</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input className="p-2 border rounded" placeholder="Seu nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} required />
        <input className="p-2 border rounded" placeholder="Telefone" value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} required />
        <input type="date" className="p-2 border rounded" value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} required />
        <input type="time" className="p-2 border rounded" value={form.horario} onChange={(e) => setForm({ ...form, horario: e.target.value })} required />
        <select className="p-2 border rounded" value={form.servico} onChange={(e) => setForm({ ...form, servico: e.target.value })}>
          <option value="">Selecione o serviço</option>
          <option value="Manicure">Manicure</option>
          <option value="Pedicure">Pedicure</option>
          <option value="Manicure e Pedicure">Manicure e Pedicure</option>
        </select>
        <button className="bg-pink-500 text-white py-2 rounded mt-2 hover:bg-pink-600">Agendar</button>
      </form>
      {msg && <p className="text-center mt-4">{msg}</p>}
    </div>
  );
}