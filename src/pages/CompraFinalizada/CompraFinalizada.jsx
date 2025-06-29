import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './CompraFinalizada.module.css'
import sucessoImg from '../../assets/party-popper.png'

const CompraFinalizada = () => {
  const location = useLocation()
  const pedido = location.state?.pedido

  const formatCPF = (value) => {
    if (!value) return '-'
    const numbers = value.replace(/\D/g, '')
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  const formatPhone = (value) => {
    if (!value) return '-'
    const numbers = value.replace(/\D/g, '')
    return numbers.length === 11
      ? numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
      : value
  }

  const formatCEP = (value) => {
    if (!value) return '-'
    const numbers = value.replace(/\D/g, '')
    return numbers.replace(/(\d{5})(\d{3})/, '$1-$2')
  }

  if (!pedido) {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <p>Nenhum pedido encontrado.</p>
          <Link to="/" className={styles.homeButton}>
            Voltar para Home
          </Link>
        </main>
      </div>
    )
  }

  const dadosCliente = pedido.dadosCliente || {}
  const endereco = {
    rua: dadosCliente.endereco,
    bairro: dadosCliente.bairro,
    cidade: dadosCliente.cidade,
    estado: dadosCliente.estado || '',
    cep: dadosCliente.cep,
    complemento: dadosCliente.complemento
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.infoCard}>
          {/* Título e Número do Pedido */}
          <section className={styles.successSection}>
            <img src={sucessoImg} alt="Sucesso" className={styles.successImage} />
            <h1 className={styles.successTitle}>Compra Realizada com Sucesso!</h1>
            <p className={styles.orderNumber}>
              Número do Pedido: <strong>{pedido.numero_pedido || '-'}</strong>
            </p>
          </section>

          {/* Informações Pessoais */}
          <section>
            <h2 className={styles.sectionTitle}>Informações Pessoais</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Nome:</span>
                <span className={styles.infoValue}>{dadosCliente.nome || '-'}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>CPF:</span>
                <span className={styles.infoValue}>{formatCPF(dadosCliente.cpf)}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Email:</span>
                <span className={styles.infoValue}>{dadosCliente.email || '-'}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Celular:</span>
                <span className={styles.infoValue}>{formatPhone(dadosCliente.celular)}</span>
              </div>
            </div>
          </section>

          {/* Informações de Entrega */}
          <section>
            <h2 className={styles.sectionTitle}>Informações de Entrega</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Endereço:</span>
                <span className={styles.infoValue}>{endereco.rua || '-'}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Bairro:</span>
                <span className={styles.infoValue}>{endereco.bairro || '-'}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Cidade:</span>
                <span className={styles.infoValue}>
                  {endereco.cidade || '-'}{endereco.estado ? `, ${endereco.estado}` : ''}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>CEP:</span>
                <span className={styles.infoValue}>{formatCEP(endereco.cep)}</span>
              </div>
            </div>
          </section>

          {/* Informações de Pagamento */}
          <section>
            <h2 className={styles.sectionTitle}>Informações de Pagamento</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Forma de Pagamento:</span>
                <span className={styles.infoValue}>
                  {dadosCliente.paymentMethod === 'credit' ? 'Cartão de Crédito' :
                   dadosCliente.paymentMethod === 'pix' ? 'Pix' :
                   dadosCliente.paymentMethod === 'boleto' ? 'Boleto' : '-'}
                </span>
              </div>
            </div>
          </section>

          {/* Resumo da Compra */}
          <section>
            <h2 className={styles.sectionTitle}>Resumo da Compra</h2>

            {pedido.itens.map((item) => (
              <div key={item.id} className={styles.productSummary}>
                <div className={styles.productImage}>
                  {item.image ? (
                    <img src={item.image} alt={item.nome} />
                  ) : (
                    <div>Sem imagem</div>
                  )}
                </div>
                <div className={styles.productInfo}>
                  <div className={styles.productName}>{item.nome}</div>
                  <div>Quantidade: {item.quantidade}</div>
                  <div>Preço unitário: R$ {item.preco.toFixed(2).replace('.', ',')}</div>
                  <div>Subtotal: R$ {(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</div>
                </div>
              </div>
            ))}

            <div className={styles.totalSection}>
              <span className={styles.totalLabel}>Total</span>
              <div>
                <div className={styles.totalValue}>R$ {pedido.total.toFixed(2).replace('.', ',')}</div>
                <div className={styles.totalSubtext}>
                  ou 10x de R$ {(pedido.total / 10).toFixed(2).replace('.', ',')} sem juros
                </div>
              </div>
            </div>
          </section>

          {/* Botões */}
          <div className={styles.actionButtons}>
            <button className={styles.printButton} onClick={() => window.print()}>
              Imprimir Recibo
            </button>
            <Link to="/" className={styles.homeButton}>
              Voltar para Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default CompraFinalizada