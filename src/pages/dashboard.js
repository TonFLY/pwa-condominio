import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../services/db";

export default function Dashboard() {
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await db.moradores.get(1); // Simulando um usuário logado
      if (!userData) {
        router.push("/login");
      } else {
        setUsuario(userData);
      }
    };
    fetchUser();
  }, []);

  if (!usuario) return <p>Carregando...</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Bem-vindo, {usuario.nome}!</h2>
      <h3>Tipo: {usuario.tipo}</h3>

      {usuario.tipo === "morador" && (
        <button onClick={() => router.push("/agendar-visita")}>
          Agendar Visita
        </button>
      )}

      {usuario.tipo === "portaria" && (
        <div>
          <button onClick={() => router.push("/cadastrar-visitante")}>
            Cadastrar Visitante
          </button>
          <button onClick={() => router.push("/cadastrar-servico")}>
            Cadastrar Serviço
          </button>
        </div>
      )}

      {usuario.tipo === "admin" && (
        <button onClick={() => router.push("/estatisticas")}>
          Ver Estatísticas
        </button>
      )}

      <br />
      <button onClick={() => router.push("/login")}>Sair</button>
    </div>
  );
}
