import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabase';  // import nomeado
import SeletorCores from '../../components/SeletorCores/SeletorCores';
import SeletorTamanhos from '../../components/SeletorTamanho/SeletorTamanho';
import styles from './ProdutoDetalhado.module.css';

export default function ProdutoDetalhado() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [corSelecionada, setCorSelecionada] = useState(null);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState(null);
  const [imagemPrincipal, setImagemPrincipal] = useState(null);

  useEffect(() => {
    async function carregarProduto() {
      setLoading(true);
      console.log('ID recebido da URL:', id); // Para debug

      if (!id) {
        console.error('ID inválido ou ausente');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Erro ao buscar produto:', error);
        setProduto(null);
      } else {
        setProduto(data);
        setCorSelecionada(data.cores?.[0] || null);
        setTamanhoSelecionado(data.tamanhos?.[0] || null);
        setImagemPrincipal(data.image || data.imagensThumb?.[0] || null);
      }
      setLoading(false);
    }

    carregarProduto();
  }, [id]);

  if (loading) {
    return <p>Carregando produto...</p>;
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

  const adicionarAoCarrinho = () => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const indexProduto = carrinho.findIndex(
      item =>
        item.id === produto.id &&
        item.cor === corSelecionada &&
        item.tamanho === tamanhoSelecionado
    );

    if (indexProduto >= 0) {
      carrinho[indexProduto].quantidade += 1;
    } else {
      carrinho.push({
        id: produto.id,
        nome: produto.name || produto.nome,
        preco: produto.price || produto.preco,
        imagem: imagemPrincipal,
        cor: corSelecionada,
        tamanho: tamanhoSelecionado,
        quantidade: 1,
      });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert(`"${produto.name || produto.nome}" adicionado ao carrinho!`);
    navigate('/carrinho');
  };

  // Funções para navegar entre imagens
  const handleNextImage = () => {
    if (!produto.imagensThumb || produto.imagensThumb.length === 0) return;
    const currentIndex = produto.imagensThumb.indexOf(imagemPrincipal);
    const nextIndex = (currentIndex + 1) % produto.imagensThumb.length;
    setImagemPrincipal(produto.imagensThumb[nextIndex]);
  };

  const handlePrevImage = () => {
    if (!produto.imagensThumb || produto.imagensThumb.length === 0) return;
    const currentIndex = produto.imagensThumb.indexOf(imagemPrincipal);
    const prevIndex = (currentIndex - 1 + produto.imagensThumb.length) % produto.imagensThumb.length;
    setImagemPrincipal(produto.imagensThumb[prevIndex]);
  };

  const renderStars = (rating) => {
    const filledStars = Math.floor(rating || 0);
    const totalStars = 5;
    const stars = [];

    for (let i = 0; i < totalStars; i++) {
      if (i < filledStars) {
        stars.push(<span key={i} className={styles.starIconFilled}>&#9733;</span>);
      } else {
        stars.push(<span key={i} className={styles.starIcon}>&#9733;</span>);
      }
    }
    return stars;
  };

  return (
    <div className={styles.produtoDetalhadoPage}>
      <div className={styles.contentWrapper}>
        <div className={styles.imageGallery}>
          <div className={styles.mainImageContainer}>
            <img src={imagemPrincipal} alt={produto.name || produto.nome} className={styles.mainImage} />
            {produto.imagensThumb && produto.imagensThumb.length > 1 && (
              <>
                <button className={`${styles.arrowButton} ${styles.left}`} onClick={handlePrevImage}>
                  <img src="/assets/arrow-left.svg" alt="Seta Esquerda" className={styles.arrowIcon} />
                </button>
                <button className={`${styles.arrowButton} ${styles.right}`} onClick={handleNextImage}>
                  <img src="/assets/arrow-right.svg" alt="Seta Direita" className={styles.arrowIcon} />
                </button>
              </>
            )}
          </div>
          {produto.imagensThumb && produto.imagensThumb.length > 0 && (
            <div className={styles.thumbnails}>
              {produto.imagensThumb.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Miniatura ${index + 1}`}
                  className={`${styles.thumbnail} ${img === imagemPrincipal ? styles.active : ''}`}
                  onClick={() => setImagemPrincipal(img)}
                />
              ))}
            </div>
          )}
        </div>

        <div className={styles.detailsSection}>
          <h1 className={styles.productName}>{produto.name || produto.nome}</h1>

          <div className={styles.reviewSection}>
            <div className={styles.stars}>{renderStars(produto.rating)}</div>
            <span className={styles.reviewsCount}>{produto.reviews || 0} avaliações</span>
          </div>

          <div className={styles.priceSection}>
            {(produto.precoOriginal || produto.original_price) && (
              <span className={styles.originalPrice}>
                R$ {(produto.precoOriginal || produto.original_price).toFixed(2)}
              </span>
            )}
            <span className={styles.currentPrice}>
              R$ {(produto.price || produto.preco).toFixed(2)}
            </span>
          </div>

          <p className={styles.description}>{produto.descricao || produto.description}</p>

          <SeletorCores
            cores={produto.cores || []}
            corSelecionada={corSelecionada}
            setCorSelecionada={setCorSelecionada}
          />

          <SeletorTamanhos
            tamanhos={produto.tamanhos || []}
            tamanhoSelecionado={tamanhoSelecionado}
            setTamanhoSelecionado={setTamanhoSelecionado}
          />

          <button onClick={adicionarAoCarrinho} className={styles.buyButton}>
            ADICIONAR AO CARRINHO
          </button>
        </div>
      </div>
    </div>
  );
}
