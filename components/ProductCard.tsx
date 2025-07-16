"use client";

import Link from "next/link";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
}

export function ProductCard({ id, title, price, image }: ProductCardProps) {
  return (
    <li
      style={{
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: 10,
        listStyle: "none",
      }}
    >
      <img
        src={image}
        alt={title}
        style={{ width: "100%", height: 150, objectFit: "contain" }}
      />
      <Link href={`/dashboard/${id}`}>
        <h3>{title}</h3>
      </Link>
      <p>R$ {price.toFixed(2)}</p>
    </li>
  );
}
