"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Produto {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

export default function ProdutoPage() {
  const { id } = useParams();
  const router = useRouter();
  const [produto, setProduto] = useState<Produto | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduto(data);
        setCarregando(false);
      })
      .catch(() => {
        router.push("/dashboard");
      });
  }, [id]);

  if (carregando) return <p style={{ padding: 20 }}>Carregando...</p>;
  if (!produto) return <p style={{ padding: 20 }}>Produto não encontrado.</p>;

  return (
    <main style={{ padding: 20 }}>
      <button onClick={() => router.back()} style={{ marginBottom: 20 }}>
        ← Voltar
      </button>

      <h1>{produto.title}</h1>
      <img src={produto.image} alt={produto.title} style={{ maxWidth: 200 }} />
      <p>
        <strong>Preço:</strong> R$ {produto.price.toFixed(2)}
      </p>
      <p>{produto.description}</p>
    </main>
  );
}
