// src/components/ProductListDesign.jsx

import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import styles from "./ProductListDesign.module.css";

export default function ProductListDesign({
  busca = "",
  filtros = {
    marcas: [],
    categorias: [],
    generos: [],
    estado: "",
    ordenacao: "mais relevantes",
  },
  mostrarControles = true,
}) {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function carregarProdutos() {
      const { data, error } = await supabase.from("productslist").select("*");
      if (error) {
        console.error("Erro ao buscar produtos:", error);
      } else {
        setProdutos(data);
      }
    }
    carregarProdutos();
  }, []);

  const produtosFiltrados = produtos.filter((prod) => {
    const termoBusca = busca.toLowerCase();
    const nomeDoProduto = prod.name?.toLowerCase() || "";

    if (termoBusca && !nomeDoProduto.includes(termoBusca)) return false;
    if (filtros.marcas.length > 0 && !filtros.marcas.includes(prod.brand))
      return false;
    if (
      filtros.categorias.length > 0 &&
      !filtros.categorias.includes(prod.category)
    )
      return false;
    if (filtros.generos.length > 0 && !filtros.generos.includes(prod.gender))
      return false;
    if (filtros.estado && prod.condition !== filtros.estado) return false;

    return true;
  });

  const produtosOrdenados = [...produtosFiltrados];
  if (filtros.ordenacao === "Menor preço") {
    produtosOrdenados.sort((a, b) => a.price - b.price);
  } else if (filtros.ordenacao === "Maior preço") {
    produtosOrdenados.sort((a, b) => b.price - a.price);
  }

  return (
    <section className={styles.produtos}>
      {mostrarControles && (
        <div className={styles.topBar}>
          <p>
            Resultados – {produtosOrdenados.length} produto
            {produtosOrdenados.length !== 1 && "s"}
          </p>
        </div>
      )}

      <div className={styles.gradeProdutos}>
        {produtosOrdenados.map((produto) => (
          <div className={styles.produto} key={produto.id}>
            <div className={styles.imagemContainer}>
              {produto.discount && (
                <span className={styles.badgeDesconto}>
                  {produto.discount}
                </span>
              )}
              <img src={produto.image} alt={`Imagem do ${produto.name}`} />
            </div>
            <h4>{produto.name}</h4>
            <p>
              <del>R${produto.original_price.toFixed(2)}</del>
              <strong>R${produto.price.toFixed(2)}</strong>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
