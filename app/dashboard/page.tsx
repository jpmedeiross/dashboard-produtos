"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface Produto {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => {
          setProdutos(data);
          setCarregando(false);
        })
        .catch((err) => {
          console.error("Erro ao buscar produtos:", err);
          setCarregando(false);
        });
    }
  }, [user]);

  if (!user) return null;

  return (
    <main style={{ padding: 20 }}>
      <h1>Bem-vindo, {user}!</h1>
      <button onClick={logout} style={{ marginBottom: 20 }}>
        Sair
      </button>

      {carregando ? (
        <p>Carregando produtos...</p>
      ) : (
        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 20,
          }}
        >
          {produtos.map((produto) => (
            <li
              key={produto.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: 8,
                padding: 10,
                listStyle: "none",
              }}
            >
              <Link href={`/dashboard/${produto.id}`}>
                <img
                  src={produto.image}
                  alt={produto.title}
                  style={{ width: "100%", height: 150, objectFit: "contain" }}
                />
                <h3>{produto.title}</h3>
              </Link>
              <p>R$ {produto.price.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
