"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  if (!user) return null;

  return (
    <div style={{ padding: 20 }}>
      <h1>Bem-vindo, {user}!</h1>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
