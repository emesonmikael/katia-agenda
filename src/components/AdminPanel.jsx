import { useEffect, useState } from "react";
import { getAgendamentos } from "../services/api";

export default function AdminPanel() {
  const [senha, setSenha] = useState("");
  const [agendamentos, setAgendamentos] = useState([]);
  const [autenticado, setAutenticado] = useState(false);

  const handleLogin = () => {
    if (senha === import.meta.env.VITE_ADMIN_PASSWORD) setAutenticado(true);
    else alert("Senha incorreta!");
  };

  useEffect(() => {
    if (autenticado) {
      getAgendamentos().then(setAgendamentos);
    }
  }, [autenticado]);

  const enviarWhatsApp = (telefone, nome) => {
    const msg = `Olá ${nome}! Seu horário foi confirmado por Kátia 💅`;
    window.open(`https://wa.me/${telefone.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  if (!autenticado) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-bold mb-2">Painel da Administradora</h2>
        <input className="border p-2 rounded" placeholder="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        <button className="ml-2 bg-pink-500 text-white px-4 py-2 rounded" onClick={handleLogin}>Entrar</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-6 bg-white shadow p-4 rounded-2xl">
      <h2 className="text-center text-pink-500 font-bold mb-4">📅 Agendamentos</h2>
      {agendamentos.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum agendamento encontrado.</p>
      ) : (
        agendamentos.map((a, i) => (
          <div key={i} className="border-b py-3 flex justify-between items-center">
            <div>
              <p><strong>{a.nome}</strong> - {a.servico}</p>
              <p className="text-sm text-gray-600">{a.data} às {a.horario}</p>
            </div>
            <button onClick={() => enviarWhatsApp(a.telefone, a.nome)} className="bg-green-500 text-white px-3 py-1 rounded">WhatsApp</button>
          </div>
        ))
      )}
    </div>
  );
}