import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import styles from "./ProductListDesign.module.css";

export default function Busca() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState(""); // 🆕 Campo de busca do usuário
  const [filtros, setFiltros] = useState({
    marcas: [],
    categorias: [],
    generos: [],
    estado: "",
    ordenacao: "mais relevantes",
  });

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

  function toggleFiltroArray(chave, valor) {
    setFiltros((prev) => {
      const valoresAtuais = prev[chave];
      let novosValores;
      if (valoresAtuais.includes(valor)) {
        novosValores = valoresAtuais.filter((v) => v !== valor);
      } else {
        novosValores = [...valoresAtuais, valor];
      }
      return { ...prev, [chave]: novosValores };
    });
  }

  function setFiltroEstado(valor) {
    setFiltros((prev) => ({ ...prev, estado: valor }));
  }

  function setOrdenacao(event) {
    setFiltros((prev) => ({ ...prev, ordenacao: event.target.value }));
  }

  // 🧠 Filtrar produtos por campos selecionados e texto digitado
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

  // 🧠 Ordenar produtos
  const produtosOrdenados = [...produtosFiltrados];
  if (filtros.ordenacao === "Menor preço") {
    produtosOrdenados.sort((a, b) => a.price - b.price);
  } else if (filtros.ordenacao === "Maior preço") {
    produtosOrdenados.sort((a, b) => b.price - a.price);
  }

  return (
    <div className={styles.paginaBusca}>
      <aside className={styles.filtros}>
        <h3>Filtrar por</h3>

        <div className={styles.filtro}>
          <strong>Marca</strong>
          {["Adidas", "K-Swiss", "Nike", "Vans"].map((marca) => (
            <label key={marca}>
              <input
                type="checkbox"
                checked={filtros.marcas.includes(marca)}
                onChange={() => toggleFiltroArray("marcas", marca)}
              />
              {marca}
            </label>
          ))}
        </div>

        <div className={styles.filtro}>
          <strong>Categoria</strong>
          {["Esporte e lazer", "Casual", "Utilitária", "Corrida"].map((cat) => (
            <label key={cat}>
              <input
                type="checkbox"
                checked={filtros.categorias.includes(cat)}
                onChange={() => toggleFiltroArray("categorias", cat)}
              />
              {cat}
            </label>
          ))}
        </div>

        <div className={styles.filtro}>
          <strong>Gênero</strong>
          {["Masculino", "Feminino", "Unissex"].map((gen) => (
            <label key={gen}>
              <input
                type="checkbox"
                checked={filtros.generos.includes(gen)}
                onChange={() => toggleFiltroArray("generos", gen)}
              />
              {gen}
            </label>
          ))}
        </div>

        <div className={`${styles.filtro} ${styles.filtroEstado}`}>
          <strong>Estado</strong>
          {["Novo", "Usado"].map((estado) => (
            <label key={estado}>
              <input
                type="radio"
                name="estado"
                checked={filtros.estado === estado}
                onChange={() => setFiltroEstado(estado)}
              />
              {estado}
            </label>
          ))}
        </div>
      </aside>

      <section className={styles.produtos}>
        <div className={styles.topBar}>
          <input
            type="text"
            placeholder="Buscar por nome do produto..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className={styles.inputBusca}
          />
          <p>
            Resultados – {produtosOrdenados.length} produto
            {produtosOrdenados.length !== 1 && "s"}
          </p>
          <select value={filtros.ordenacao} onChange={setOrdenacao}>
            <option value="mais relevantes">
              Ordenar por: mais relevantes
            </option>
            <option value="Menor preço">Menor preço</option>
            <option value="Maior preço">Maior preço</option>
          </select>
        </div>

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
    </div>
  );
}
