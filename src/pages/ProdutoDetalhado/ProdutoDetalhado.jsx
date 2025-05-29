import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { produtos } from '../../services/produtos'; // Seus dados de produtos
import SeletorCores from '../SeletorCores/SeletorCores';
import SeletorTamanhos from '../SeletorTamanhos/SeletorTamanhos';
import styles from './ProdutoDetalhado.module.css'; // Importa o CSS Module
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Para estrelas e navegação de imagem

export default function ProdutoDetalhado() {
  const { id } = useParams();
  const navigate = useNavigate();

  const produto = produtos.find(p => p.id === id);

  // Lida com produto não encontrado
  if (!produto) {
    return (
      <div className={styles.notFoundContainer}>
        <p>Produto não encontrado.</p>
        <button onClick={() => navigate('/')} className={styles.backButton}>Voltar para a Home</button>
      </div>
    );
  }

  // Estados para as seleções
  const [corSelecionada, setCorSelecionada] = useState(produto.cores[0]);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState(produto.tamanhos[0]);
  const [imagemPrincipal, setImagemPrincipal] = useState(produto.imagem); // Imagem principal exibida

  // Lógica para adicionar ao carrinho
  const adicionarAoCarrinho = () => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      imagem: produto.imagem, // Ou imagemPrincipal se quiser a miniatura selecionada
      cor: corSelecionada,
      tamanho: tamanhoSelecionado,
      quantidade: 1
    });
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    // Substitua o alert por uma notificação mais amigável em produção
    alert(`"${produto.nome}" adicionado ao carrinho!`);
    navigate('/carrinho');
  };

  // Lógica para navegação entre imagens (se houver mais de uma)
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

  return (
    <div className={styles.produtoDetalhadoPage}>
      <div className={styles.contentWrapper}>
        {/* Seção de Imagens do Produto */}
        <div className={styles.imageGallery}>
          <div className={styles.mainImageContainer}>
            <img src={imagemPrincipal} alt={produto.nome} className={styles.mainImage} />
            {produto.imagensThumb && produto.imagensThumb.length > 1 && (
              <>
                <button className={`${styles.arrowButton} ${styles.left}`} onClick={handlePrevImage}>
                  <FaChevronLeft />
                </button>
                <button className={`${styles.arrowButton} ${styles.right}`} onClick={handleNextImage}>
                  <FaChevronRight />
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
                  className={`${styles.thumbnail} ${
                    img === imagemPrincipal ? styles.active : ''
                  }`}
                  onClick={() => setImagemPrincipal(img)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Seção de Detalhes do Produto */}
        <div className={styles.detailsSection}>
          <h1 className={styles.productName}>{produto.nome}</h1>

          <div className={styles.reviewSection}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < Math.floor(produto.rating || 0) ? styles.starIconFilled : styles.starIcon} />
              ))}
            </div>
            <span className={styles.reviewsCount}>
              {produto.reviews} avaliações
            </span>
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

          <SeletorTamanhos
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