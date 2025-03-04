import { useState, useEffect } from "react";
import { listarMoradores, listarVisitantes, listarServicos, adicionarMorador, adicionarVisitante, adicionarServico } from "../services/db";

export default function Dashboard() {
  const [moradores, setMoradores] = useState([]);
  const [visitantes, setVisitantes] = useState([]);
  const [servicos, setServicos] = useState([]);

  const [novoMorador, setNovoMorador] = useState({ nome: "", senha: "", tipo: "morador", apartamento: "" });
  const [novoVisitante, setNovoVisitante] = useState({ nome: "", data: "" });
  const [novoServico, setNovoServico] = useState({ tipo: "", status: "pendente" });

  // Carregar dados do IndexedDB
  useEffect(() => {
    async function carregarDados() {
      setMoradores(await listarMoradores());
      setVisitantes(await listarVisitantes());
      setServicos(await listarServicos());
    }
    carregarDados();
  }, []);

  // Adicionar novo morador
  const handleAdicionarMorador = async () => {
    await adicionarMorador(novoMorador.nome, novoMorador.senha, novoMorador.tipo, novoMorador.apartamento);
    setMoradores(await listarMoradores());
  };

  // Adicionar novo visitante
  const handleAdicionarVisitante = async () => {
    await adicionarVisitante(novoVisitante.nome, novoVisitante.data);
    setVisitantes(await listarVisitantes());
  };

  // Adicionar novo serviço
  const handleAdicionarServico = async () => {
    await adicionarServico(novoServico.tipo, novoServico.status);
    setServicos(await listarServicos());
  };

  return (
    <div>
      <h1>Bem-vindo, admin!</h1>
      <h3>Tipo: admin</h3>

      <h2>Gerenciar Moradores</h2>
      <input type="text" placeholder="Nome" onChange={(e) => setNovoMorador({ ...novoMorador, nome: e.target.value })} />
      <input type="password" placeholder="Senha" onChange={(e) => setNovoMorador({ ...novoMorador, senha: e.target.value })} />
      <input type="text" placeholder="Apartamento" onChange={(e) => setNovoMorador({ ...novoMorador, apartamento: e.target.value })} />
      <button onClick={handleAdicionarMorador}>Adicionar Morador</button>
      <ul>
        {moradores.map((m) => (
          <li key={m.id}>{m.nome} - Apto: {m.apartamento}</li>
        ))}
      </ul>

      <h2>Gerenciar Visitantes</h2>
      <input type="text" placeholder="Nome" onChange={(e) => setNovoVisitante({ ...novoVisitante, nome: e.target.value })} />
      <input type="date" onChange={(e) => setNovoVisitante({ ...novoVisitante, data: e.target.value })} />
      <button onClick={handleAdicionarVisitante}>Adicionar Visitante</button>
      <ul>
        {visitantes.map((v) => (
          <li key={v.id}>{v.nome} - Data: {v.data_visita}</li>
        ))}
      </ul>

      <h2>Gerenciar Serviços</h2>
      <input type="text" placeholder="Tipo" onChange={(e) => setNovoServico({ ...novoServico, tipo: e.target.value })} />
      <button onClick={handleAdicionarServico}>Adicionar Serviço</button>
      <ul>
        {servicos.map((s) => (
          <li key={s.id}>{s.tipo} - Status: {s.status}</li>
        ))}
      </ul>

      <button onClick={() => alert("Mostrando estatísticas!")}>Ver Estatísticas</button>
      <button onClick={() => alert("Saindo...")}>Sair</button>
    </div>
  );
}
