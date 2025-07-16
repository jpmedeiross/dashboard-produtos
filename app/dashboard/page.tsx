"use client";

import { ProductCard } from "@/components/ProductCard";
import { useAuth } from "@/context/AuthContext";
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
            <ProductCard
              key={produto.id}
              id={produto.id}
              title={produto.title}
              price={produto.price}
              image={produto.image}
            />
          ))}
        </ul>
      )}
    </main>
  );
}
