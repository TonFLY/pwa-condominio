import Dexie from "dexie";

export const db = new Dexie("PWACondominioDB");

db.version(1).stores({
  moradores: "++id, nome, apartamento",
  visitantes: "++id, nome, data_visita",
  servicos: "++id, tipo, status"
});

// Criando um usuário de teste no IndexedDB
db.moradores.put({
  id: 1,
  nome: "admin",
  senha: "123456",
  tipo: "admin"
});



// Exemplo de adição de dados
export const adicionarVisitante = async (nome, data) => {
  await db.visitantes.add({ nome, data_visita: data });
};

// Exemplo de leitura de dados
export const listarVisitantes = async () => {
  return await db.visitantes.toArray();
};
