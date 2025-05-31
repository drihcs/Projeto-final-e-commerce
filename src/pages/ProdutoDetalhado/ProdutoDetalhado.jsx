import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabase';
import SeletorCores from '../../components/SeletorCores/SeletorCores';
import SeletorTamanho from '../../components/SeletorTamanho/SeletorTamanho';
import styles from './ProdutoDetalhado.module.css';

export default function ProdutoDetalhado() {
  const { slug } = useParams(); // ou useParams().id se for por ID
  const navigate = useNavigate();

  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [corSelecionada, setCorSelecionada] = useState(null);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState(null);
  const [imagemPrincipal, setImagemPrincipal] = useState(null);

  useEffect(() => {
    async function buscarProduto() {
      setCarregando(true);
      const { data, error } = await supabase
        .from('productslist')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        console.error("Erro ao buscar produto:", error);
        setProduto(null);
      } else {
        setProduto(data);
        setCorSelecionada(data.cores?.[0] || null);
        setTamanhoSelecionado(data.tamanhos?.[0] || null);
        setImagemPrincipal(data.imagem || null);
      }
      setCarregando(false);
    }

    buscarProduto();
  }, [slug]);

  const adicionarAoCarrinho = () => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      imagem: imagemPrincipal,
      cor: corSelecionada,
      tamanho: tamanhoSelecionado,
      quantidade: 1
    });
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert(`"${produto.nome}" adicionado ao carrinho!`);
    navigate('/carrinho');
  };

  const handleNextImage = () => {
    if (!produto?.imagensThumb?.length) return;
    const currentIndex = produto.imagensThumb.indexOf(imagemPrincipal);
    const nextIndex = (currentIndex + 1) % produto.imagensThumb.length;
    setImagemPrincipal(produto.imagensThumb[nextIndex]);
  };

  const handlePrevImage = () => {
    if (!produto?.imagensThumb?.length) return;
    const currentIndex = produto.imagensThumb.indexOf(imagemPrincipal);
    const prevIndex = (currentIndex - 1 + produto.imagensThumb.length) % produto.imagensThumb.length;
    setImagemPrincipal(produto.imagensThumb[prevIndex]);
  };

  const renderStars = (rating) => {
    const filledStars = Math.floor(rating || 0);
    const totalStars = 5;
    return Array.from({ length: totalStars }, (_, i) => (
      <span key={i} className={i < filledStars ? styles.starIconFilled : styles.starIcon}>
        &#9733;
      </span>
    ));
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

  return (
    <div className={styles.produtoDetalhadoPage}>
      <div className={styles.contentWrapper}>
        {/* Galeria de imagens */}
        <div className={styles.imageGallery}>
          <div className={styles.mainImageContainer}>
            <img src={imagemPrincipal} alt={produto.nome} className={styles.mainImage} />
            {produto.imagensThumb?.length > 1 && (
              <>
                <button className={`${styles.arrowButton} ${styles.left}`} onClick={handlePrevImage}>
                  <img src="/images/arrow-left.svg" alt="Anterior" className={styles.arrowIcon} />
                </button>
                <button className={`${styles.arrowButton} ${styles.right}`} onClick={handleNextImage}>
                  <img src="/images/arrow-right.svg" alt="Próxima" className={styles.arrowIcon} />
                </button>
              </>
            )}
          </div>

          {produto.imagensThumb?.length > 0 && (
            <div className={styles.thumbnails}>
              {produto.imagensThumb.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumb ${index + 1}`}
                  className={`${styles.thumbnail} ${img === imagemPrincipal ? styles.active : ''}`}
                  onClick={() => setImagemPrincipal(img)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Detalhes */}
        <div className={styles.detailsSection}>
          <h1 className={styles.productName}>{produto.nome}</h1>

          <div className={styles.reviewSection}>
            <div className={styles.stars}>{renderStars(produto.rating)}</div>
            <span className={styles.reviewsCount}>{produto.reviews} avaliações</span>
          </div>

          <div className={styles.priceSection}>
            {produto.precoOriginal && (
              <span className={styles.originalPrice}>R$ {produto.precoOriginal.toFixed(2)}</span>
            )}
            <span className={styles.currentPrice}>R$ {produto.preco.toFixed(2)}</span>
          </div>

          <p className={styles.description}>{produto.descricao}</p>

          <SeletorCores
            cores={produto.cores}
            corSelecionada={corSelecionada}
            setCorSelecionada={setCorSelecionada}
          />

          <SeletorTamanho
            tamanhos={produto.tamanhos}
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
