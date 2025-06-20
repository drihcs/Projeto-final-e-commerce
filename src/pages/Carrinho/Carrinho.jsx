import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCarrinho } from '../../contexts/CarrinhoContext'
import { supabase } from '../../utils/supabase'
import styles from './Carrinho.module.css'

const formatarPreco = (valor) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor)

const Carrinho = () => {
  const navigate = useNavigate()
  const { itens, alterarQuantidade, removerItem, calcularTotal } = useCarrinho()

  const [cupom, setCupom] = useState('')
  const [desconto, setDesconto] = useState(0)
  const [frete, setFrete] = useState(0)
  const [cep, setCep] = useState('')
  const [produtosSugeridos, setProdutosSugeridos] = useState([])
  const [carregandoSugestoes, setCarregandoSugestoes] = useState(true)

  // 🎯 Buscar produtos do Supabase para sugestão
  useEffect(() => {
    async function fetchProdutos() {
      setCarregandoSugestoes(true)
      const { data, error } = await supabase
        .from('produtosList') // ⚠️ Confere se é esse o nome correto da tabela
        .select('*')
        .limit(4)

      if (error) {
        console.error('Erro ao buscar produtos sugeridos:', error)
      } else {
        setProdutosSugeridos(data)
      }
      setCarregandoSugestoes(false)
    }

    fetchProdutos()
  }, [])

  // 🎟️ Aplicar cupom de desconto
  const aplicarCupom = () => {
    if (cupom.trim().toUpperCase() === 'NAMORADOS12') {
      const descontoCalculado = calcularTotal() * 0.12
      setDesconto(descontoCalculado)
      alert('Cupom aplicado com sucesso!')
    } else {
      setDesconto(0)
      alert('Cupom inválido!')
    }
  }

  // 🚚 Calcular frete (simulado)
  const calcularFrete = () => {
    const cepLimpo = cep.replace(/\D/g, '')
    if (cepLimpo.length === 8) {
      setFrete(25) // valor fixo simulado
      alert('Frete calculado com sucesso!')
    } else {
      alert('Digite um CEP válido (8 dígitos)')
    }
  }

  const subtotal = calcularTotal()
  const total = subtotal + frete - desconto

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* 🛒 Carrinho */}
        <div className={styles.carrinho}>
          <h2>MEU CARRINHO</h2>

          {itens.length === 0 ? (
            <p>Seu carrinho está vazio.</p>
          ) : (
            itens.map(item => (
              <div key={item.id} className={styles.item}>
                <img src={item.imagem} alt={item.nome} className={styles.imagem} />

                <div className={styles.info}>
                  <h3>{item.nome}</h3>
                  <p>Cor: {item.cor || 'Única'}</p>
                  <p>Tamanho: {item.tamanho || 'Único'}</p>
                </div>

                <div className={styles.quantidade}>
                  <button
                    onClick={() =>
                      alterarQuantidade(item.id, Math.max(item.quantidade - 1, 1))
                    }
                  >
                    -
                  </button>
                  <span>{item.quantidade}</span>
                  <button
                    onClick={() => alterarQuantidade(item.id, item.quantidade + 1)}
                  >
                    +
                  </button>
                </div>

                <div className={styles.preco}>
                  <p>{formatarPreco(item.preco)}</p>
                  <p>{formatarPreco(item.preco * item.quantidade)}</p>
                </div>

                <button
                  className={styles.remover}
                  onClick={() => removerItem(item.id)}
                >
                  Remover
                </button>
              </div>
            ))
          )}

          {/* 🎟️ Cupom e 🚚 Frete */}
          <div className={styles.cupomFrete}>
            <div>
              <h3>Cupom de desconto</h3>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  placeholder="Digite o cupom"
                  value={cupom}
                  onChange={e => setCupom(e.target.value)}
                />
                <button onClick={aplicarCupom}>OK</button>
              </div>
            </div>

            <div>
              <h3>Calcular Frete</h3>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  placeholder="Digite seu CEP"
                  value={cep}
                  onChange={e => setCep(e.target.value)}
                />
                <button onClick={calcularFrete}>OK</button>
              </div>
            </div>
          </div>
        </div>

        {/* 🧾 Resumo */}
        <div className={styles.resumo}>
          <h2>RESUMO</h2>

          <div className={styles.linha}>
            <span>Subtotal:</span>
            <span>{formatarPreco(subtotal)}</span>
          </div>

          <div className={styles.linha}>
            <span>Frete:</span>
            <span>{frete > 0 ? formatarPreco(frete) : 'R$ 0,00'}</span>
          </div>

          {desconto > 0 && (
            <div className={styles.linha}>
              <span>Desconto:</span>
              <span>-{formatarPreco(desconto)}</span>
            </div>
          )}

          <hr />

          <div className={styles.total}>
            <span>Total</span>
            <span>{formatarPreco(total)}</span>
          </div>

          <p className={styles.parcelas}>
            ou 10x de {formatarPreco(total / 10)} sem juros
          </p>

          <button
            className={styles.botao}
            onClick={() => navigate('/finalizar')}
            disabled={itens.length === 0}
          >
            Continuar
          </button>
        </div>
      </main>

      {/* ⭐ Produtos Sugeridos */}
      <section className={styles.sugestoes}>
        <h2>VOCÊ TAMBÉM PODE GOSTAR</h2>

        {carregandoSugestoes ? (
          <p>Carregando sugestões...</p>
        ) : (
          <div className={styles.grid}>
            {produtosSugeridos.map(prod => (
              <div key={prod.id} className={styles.card}>
                <img src={prod.image} alt={prod.name} />
                <h3>{prod.name}</h3>
                <p>{formatarPreco(prod.price)}</p>
                <button onClick={() => navigate(`/produto/${prod.slug}`)}>
                  Ver Produto
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Carrinho