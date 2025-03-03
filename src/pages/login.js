import { useState } from "react";
import { useRouter } from "next/router";
import { db } from "../services/db";

export default function Login() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState("morador"); // Tipo de usuário

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Buscar no banco de dados local (IndexedDB)
    const usuario = await db.moradores.get({ nome });

    if (usuario && usuario.senha === senha && usuario.tipo === tipo) {
      alert("Login bem-sucedido!");
      router.push("/dashboard"); // Redireciona para o painel
    } else {
      alert("Usuário ou senha incorretos!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <br />
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="morador">Morador</option>
          <option value="portaria">Portaria</option>
          <option value="admin">Administrador</option>
        </select>
        <br />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
