import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '../../utils/supabase'

import './ProductListDesign.module.css';

export default function Busca() {
  const [produtos, setProdutos] = useState([]);
  const [filtros, setFiltros] = useState({
    marcas: ['Adidas', 'K-Swiss', 'Nike'], // default checked
    categorias: [],
    generos: ['Masculino', 'Feminino'],
    estado: 'Novo',
    ordenacao: 'mais relevantes',
  });

  // Carregar produtos do Supabase
  useEffect(() => {
    async function carregarProdutos() {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('Erro ao buscar produtos:', error);
      } else {
        setProdutos(data);
      }
    }
    carregarProdutos();
  }, []);

  // Função para atualizar filtros
  function toggleFiltroArray(chave, valor) {
    setFiltros(prev => {
      const valoresAtuais = prev[chave];
      let novosValores;
      if (valoresAtuais.includes(valor)) {
        novosValores = valoresAtuais.filter(v => v !== valor);
      } else {
        novosValores = [...valoresAtuais, valor];
      }
      return { ...prev, [chave]: novosValores };
    });
  }

  // Função para atualizar filtro radio
  function setFiltroEstado(valor) {
    setFiltros(prev => ({ ...prev, estado: valor }));
  }

  // Função para atualizar ordenação
  function setOrdenacao(event) {
    setFiltros(prev => ({ ...prev, ordenacao: event.target.value }));
  }

  // Filtrar produtos
  const produtosFiltrados = produtos.filter(prod => {
    // Marca
    if (filtros.marcas.length > 0 && !filtros.marcas.includes(prod.brand)) return false;
    // Categoria
    if (filtros.categorias.length > 0 && !filtros.categorias.includes(prod.category)) return false;
    // Gênero
    if (filtros.generos.length > 0 && !filtros.generos.includes(prod.gender)) return false;
    // Estado
    if (filtros.estado && prod.condition !== filtros.estado) return false;

    return true;
  });

  // Ordenar produtos
  const produtosOrdenados = [...produtosFiltrados];
  if (filtros.ordenacao === 'Menor preço') {
    produtosOrdenados.sort((a, b) => a.price - b.price);
  } else if (filtros.ordenacao === 'Maior preço') {
    produtosOrdenados.sort((a, b) => b.price - a.price);
  }
  // "mais relevantes" pode ser ordem padrão, sem alteração

  return (
    <div className="pagina-busca">
      <aside className="filtros">
        <h3>Filtrar por</h3>

        <div className="filtro">
          <strong>Marca</strong>
          {['Adidas', 'Calçados', 'K-Swiss', 'Nike', 'Puma'].map(marca => (
            <label key={marca}>
              <input
                type="checkbox"
                checked={filtros.marcas.includes(marca)}
                onChange={() => toggleFiltroArray('marcas', marca)}
              />
              {marca}
            </label>
          ))}
        </div>

        <div className="filtro">
          <strong>Categoria</strong>
          {['Esporte e lazer', 'Casual', 'Utilitária', 'Corrida'].map(cat => (
            <label key={cat}>
              <input
                type="checkbox"
                checked={filtros.categorias.includes(cat)}
                onChange={() => toggleFiltroArray('categorias', cat)}
              />
              {cat}
            </label>
          ))}
        </div>

        <div className="filtro">
          <strong>Gênero</strong>
          {['Masculino', 'Feminino', 'Unissex'].map(gen => (
            <label key={gen}>
              <input
                type="checkbox"
                checked={filtros.generos.includes(gen)}
                onChange={() => toggleFiltroArray('generos', gen)}
              />
              {gen}
            </label>
          ))}
        </div>

        <div className="filtro filtro-estado">
          <strong>Estado</strong>
          {['Novo', 'Usado'].map(estado => (
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

      <section className="produtos">
        <div className="top-bar">
          <p>Resultados para “Tênis” – {produtosOrdenados.length} produtos</p>
          <select value={filtros.ordenacao} onChange={setOrdenacao}>
            <option value="mais relevantes">Ordenar por: mais relevantes</option>
            <option value="Menor preço">Menor preço</option>
            <option value="Maior preço">Maior preço</option>
          </select>
        </div>

        <div className="grade-produtos">
          {produtosOrdenados.map(produto => (
            <div className="produto" key={produto.id}>
              <span className="desconto">{produto.discount}</span>
              <img src={produto.image} alt={`Imagem do ${produto.name}`} />
              <h4>{produto.name}</h4>
              <p>
                <del>R${produto.original_price.toFixed(2)}</del>{' '}
                <strong>R${produto.price.toFixed(2)}</strong>
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
