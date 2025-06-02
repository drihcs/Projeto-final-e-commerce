import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabase';
import SeletorCores from '../../components/SeletorCores/SeletorCores';
import SeletorTamanho from '../../components/SeletorTamanho/SeletorTamanho';
import styles from './ProdutoDetalhado.module.css';

export default function ProdutoDetalhado() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [corSelecionada, setCorSelecionada] = useState(null);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState(null);
  const [imagemPrincipal, setImagemPrincipal] = useState(null);
  const [produtosRelacionados, setProdutosRelacionados] = useState([]);

  useEffect(() => {
    async function buscarProduto() {
      setCarregando(true);
      const { data, error } = await supabase
        .from('produtosList')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error || !data) {
        console.error("Erro ao buscar produto:", error);
        setProduto(null);
      } else {
        const coresArray = data.colors ? data.colors.split(',') : [];
        const tamanhosArray = data.sizes ? data.sizes.split(',') : [];

        const produtoFormatado = { ...data, colors: coresArray, sizes: tamanhosArray };

        setProduto(produtoFormatado);
        setCorSelecionada(coresArray[0] || null);
        setTamanhoSelecionado(tamanhosArray[0] || null);
        setImagemPrincipal(data.image || null);
      }
      setCarregando(false);
    }

    buscarProduto();
  }, [slug]);

  useEffect(() => {
    async function buscarProdutosRelacionados() {
      if (!produto) return;

      const { data, error } = await supabase
        .from('produtosList')
        .select('*')
        .neq('id', produto.id)
        .limit(4);

      if (error) {
        console.error('Erro ao buscar produtos relacionados:', error);
      } else {
        setProdutosRelacionados(data);
      }
    }

    buscarProdutosRelacionados();
  }, [produto]);

  const adicionarAoCarrinho = () => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push({
      id: produto.id,
      nome: produto.name,
      preco: produto.price,
      imagem: imagemPrincipal,
      cor: corSelecionada,
      tamanho: tamanhoSelecionado,
      quantidade: 1,
    });
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert(`"${produto.name}" adicionado ao carrinho!`);
    navigate('/carrinho');
  };

  if (carregando) {
    return <div className={styles.loading}>Carregando produto...</div>;
  }

  if (!produto) {
    return (
      <div className={styles.notFoundContainer}>
        <p>Produto não encontrado.</p>
        <button onClick={() => navigate('/')} className={styles.backButton}>
          Voltar para a Home
        </button>
      </div>
    );
  }

  // Função para renderizar estrelas preenchidas e vazias conforme avaliação
  function renderStars(rating) {
    const stars = [];
    const roundedRating = Math.round(rating);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= roundedRating ? styles.starFilled : styles.starEmpty}
          aria-label={i <= roundedRating ? 'Estrela preenchida' : 'Estrela vazia'}
        >
          &#9733;
        </span>
      );
    }
    return stars;
  }

  return (
    <>
      <div className={styles.produtoDetalhadoPage}>
        <div className={styles.contentWrapper}>
          <div className={styles.imageGallery}>
            <div
              className={styles.mainImageContainer}
              style={{ backgroundColor: corSelecionada || 'transparent' }}
            >
              <img src={imagemPrincipal} alt={produto.name} className={styles.mainImage} />
            </div>
          </div>

          <div className={styles.detailsSection}>
            <h1 className={styles.productName}>{produto.name}</h1>

            <div className={styles.reviews}>
              {typeof produto.rating === 'number'
                ? renderStars(produto.rating)
                : <p>Sem avaliações</p>}
              <span className={styles.reviewCount}>
                ({produto.reviewCount || 34} avaliações)
              </span>
            </div>

            <p className={styles.priceSection}>
              {produto.original_price && (
                <span className={styles.originalPrice}>R$ {produto.original_price.toFixed(2)}</span>
              )}
              <strong>R$ {produto.price.toFixed(2)}</strong>
            </p>

            <p className={styles.description}>Descrição do produto: {produto.description}</p>

            <SeletorCores
              cores={produto.colors}
              corSelecionada={corSelecionada}
              setCorSelecionada={setCorSelecionada}
            />

            <SeletorTamanho
              tamanhos={produto.sizes}
              tamanhoSelecionado={tamanhoSelecionado}
              setTamanhoSelecionado={setTamanhoSelecionado}
            />

            <button onClick={adicionarAoCarrinho} className={styles.buyButton}>
              ADICIONAR AO CARRINHO
            </button>
          </div>
        </div>
      </div>

      <section className={styles.produtosRelacionadosSection}>
        <h3>Produtos Relacionados</h3>
        <div className={styles.produtosRelacionadosGrid}>
          {produtosRelacionados.map((produtoRelacionado) => (
            <div
              key={produtoRelacionado.id}
              className={styles.produtoRelacionadoCard}
              onClick={() => navigate(`/produto/${produtoRelacionado.slug}`)}
            >
              <div className={styles.produtoRelacionadoImagemContainer}>
                {produtoRelacionado.desconto && (
                  <div className={styles.badgeDesconto}>
                    {produtoRelacionado.desconto}% OFF
                  </div>
                )}
                <img src={produtoRelacionado.image} alt={produtoRelacionado.name} />
              </div>

              <p className={styles.produtoRelacionadoNome}>{produtoRelacionado.name}</p>

              <p className={styles.produtoRelacionadoPreco}>
                {produtoRelacionado.original_price && (
                  <del>R$ {produtoRelacionado.original_price.toFixed(2)}</del>
                )}
                <strong>R$ {produtoRelacionado.price.toFixed(2)}</strong>
              </p>

              <button
                className={styles.produtoRelacionadoBotao}
                onClick={(e) => {
                  e.stopPropagation();
                  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
                  carrinho.push({
                    id: produtoRelacionado.id,
                    nome: produtoRelacionado.name,
                    preco: produtoRelacionado.price,
                    imagem: produtoRelacionado.image,
                    quantidade: 1,
                  });
                  localStorage.setItem('carrinho', JSON.stringify(carrinho));
                  alert(`"${produtoRelacionado.name}" adicionado ao carrinho!`);
                  navigate('/carrinho');
                }}
              >
                Comprar
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
