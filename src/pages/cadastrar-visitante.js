import { useState, useEffect } from "react";
import { db } from "../services/db";

export default function ConsultarAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    const fetchAgendamentos = async () => {
      const data = await db.agendamentos.toArray();
      setAgendamentos(data);
    };
    fetchAgendamentos();
  }, []);

  const handleLiberar = async (id) => {
    await db.agendamentos.update(id, { status: "Liberado" });
    setAgendamentos(await db.agendamentos.toArray());
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Lista de Agendamentos</h2>
      {agendamentos.length === 0 ? (
        <p>Nenhum agendamento encontrado.</p>
      ) : (
        agendamentos.map((agendamento) => (
          <div key={agendamento.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
            <p><strong>Visitante:</strong> {agendamento.visitante}</p>
            <p><strong>Data:</strong> {new Date(agendamento.data).toLocaleString()}</p>
            <p><strong>Status:</strong> {agendamento.status}</p>
            {agendamento.status === "Pendente" && (
              <button onClick={() => handleLiberar(agendamento.id)}>Liberar</button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
