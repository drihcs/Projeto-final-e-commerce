import React from 'react'
import { useProdutosCarrinho } from '../../hooks/useProdutosCarrinho'
import styles from './CarrinhoResumo.module.css'

export default function CarrinhoResumo() {
  const { produtosDetalhados, loading, error } = useProdutosCarrinho()

  if (loading) return <p>Carregando itens do carrinho...</p>
  if (error) return <p className={styles.error}>Erro: {error}</p>
  if (produtosDetalhados.length === 0) return <p>Carrinho vazio.</p>

  return (
    <div className={styles.container}>
      {produtosDetalhados.map(produto => (
        <div key={produto.id} className={styles.produtoItem}>
          <div className={styles.imagemProduto}>
            {produto.image ? (
              <img src={produto.image} alt={produto.name} />
            ) : (
              <div className={styles.semImagem}>Sem imagem</div>
            )}
          </div>
          <div className={styles.infoProduto}>
            <p className={styles.nomeProduto}>{produto.name}</p>
            <p>Quantidade: {produto.quantidade}</p>
            <p>Preço unitário: R$ {produto.price.toFixed(2).replace('.', ',')}</p>
            <p>
              Total: R$ {(produto.price * produto.quantidade).toFixed(2).replace('.', ',')}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
