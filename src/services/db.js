import Dexie from "dexie";

export const db = new Dexie("PWACondominioDB");

db.version(2).stores({
  moradores: "++id, nome, senha, tipo, apartamento",
  visitantes: "++id, nome, data_visita",
  servicos: "++id, tipo, status",
  agendamentos: "++id, morador, visitante, data, status"
});

// Criando um usuário de teste no IndexedDB
db.moradores.put({
  id: 1,
  nome: "admin",
  senha: "123456",
  tipo: "admin",
  apartamento: "000"
});

// ✅ Função para adicionar morador
export const adicionarMorador = async (nome, senha, tipo, apartamento) => {
  await db.moradores.add({ nome, senha, tipo, apartamento });
};

// ✅ Função para adicionar serviço
export const adicionarServico = async (tipo, status) => {
  await db.servicos.add({ tipo, status });
};

// ✅ Função para listar moradores
export const listarMoradores = async () => {
  return await db.moradores.toArray();
};

// ✅ Função para listar serviços
export const listarServicos = async () => {
  return await db.servicos.toArray();
};

// ✅ Função para adicionar visitante
export const adicionarVisitante = async (nome, data) => {
  await db.visitantes.add({ nome, data_visita: data });
};

// ✅ Função para listar visitantes
export const listarVisitantes = async () => {
  return await db.visitantes.toArray();
};
