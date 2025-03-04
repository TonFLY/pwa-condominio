import { useState } from "react";
import { useRouter } from "next/router";
import { db } from "../services/db";

export default function AgendarVisita() {
  const router = useRouter();
  const [visitante, setVisitante] = useState("");
  const [data, setData] = useState("");

  const handleAgendar = async (e) => {
    e.preventDefault();

    if (!visitante || !data) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    await db.agendamentos.add({
      morador: "admin", // Pegaremos do login futuramente
      visitante,
      data,
      status: "Pendente"
    });

    alert("Visita agendada com sucesso!");
    router.push("/dashboard");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Agendar Visita</h2>
      <form onSubmit={handleAgendar}>
        <input
          type="text"
          placeholder="Nome do Visitante"
          value={visitante}
          onChange={(e) => setVisitante(e.target.value)}
          required
        />
        <br />
        <input
          type="datetime-local"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
        />
        <br />
        <button type="submit">Agendar</button>
      </form>
      <br />
      <button onClick={() => router.push("/dashboard")}>Voltar</button>
    </div>
  );
}
