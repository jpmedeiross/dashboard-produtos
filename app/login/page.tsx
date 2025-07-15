"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    login(username);
    router.push("dashboard");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Login</h1>
      <input
        placeholder="Digite seu nome"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: 8, marginRight: 8 }}
      />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}
