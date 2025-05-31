import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from '/src/utils/supabase';
import { useCarrinho } from "../../contexts/CarrinhoContext";
import styles from "./ProductGrid.module.css";

export default function ProductGrid() {
  const [produtos, setProdutos] = useState([]);
  const { adicionarItem } = useCarrinho();

  useEffect(() => {
    async function carregarProdutos() {
      const { data, error } = await supabase.from('produtosList').select('*').limit(8);

      if (error) {
        console.error("Erro ao buscar produtos:", error);
      } else {
        setProdutos(data);
      }
    }

    carregarProdutos();
  }, []);

  function adicionarAoCarrinho(produto) {
    adicionarItem(produto);
  }

  return (
    <section className={styles.gridContainer}>
      <h2 className={styles.titulo}>Destaques</h2>
      <div className={styles.grade}>
        {produtos.map((produto) => (
          <div className={styles.produto} key={produto.id}>
            <Link to={`/produto/${produto.slug}`} className={styles.cardLink}>
              <div className={styles.imagemContainer}>
                {produto.discount && (
                  <span className={styles.badgeDesconto}>{produto.discount}</span>
                )}
                <img src={produto.image} alt={produto.name} />
              </div>
              <h3>{produto.name}</h3>
              <p className={styles.preco}>
                <del>R${produto.original_price.toFixed(2)}</del>{" "}
                <strong>R${produto.price.toFixed(2)}</strong>
              </p>
            </Link>
            <button
              className={styles.botao}
              onClick={() => adicionarAoCarrinho(produto)}
            >
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}