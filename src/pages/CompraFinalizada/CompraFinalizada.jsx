import React from 'react'
import { Link } from 'react-router-dom'
import styles from './CompraFinalizada.module.css'
import { MapPin, CreditCard, Phone, Mail, User } from 'lucide-react'
import sucessoImg from '../../assets/party-popper.png'
import { useAuth } from '../../contexts/AuthContext'

const ConfirmacaoCompra = () => {
  const { usuario } = useAuth()

  // Para evitar erro caso usuario ou endereço estejam undefined
  const endereco = usuario?.endereco || {}

  // Funções simples para formatar CPF, telefone e CEP (adaptar se quiser)
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

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section className={styles.successSection}>
          <div className={styles.successIcon}>
            <img src={sucessoImg} alt="Sucesso" className={styles.successImage} />
          </div>
          <h1 className={styles.successTitle}>Compra Realizada</h1>
          <p className={styles.successSubtitle}>com sucesso!</p>
        </section>

        {/* Informações Pessoais */}
        <div className={styles.infoCard}>
          <h2 className={styles.sectionTitle}>Informações Pessoais</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <User size={16} color="#6b7280" />
              <span className={styles.infoLabel}>Nome:</span>
              <span className={styles.infoValue}>{usuario?.nome || '-'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>CPF:</span>
              <span className={styles.infoValue}>{formatCPF(usuario?.cpf)}</span>
            </div>
            <div className={styles.infoItem}>
              <Mail size={16} color="#6b7280" />
              <span className={styles.infoLabel}>Email:</span>
              <span className={styles.infoValue}>{usuario?.email || '-'}</span>
            </div>
            <div className={styles.infoItem}>
              <Phone size={16} color="#6b7280" />
              <span className={styles.infoLabel}>Celular:</span>
              <span className={styles.infoValue}>{formatPhone(usuario?.celular)}</span>
            </div>
          </div>
        </div>

        {/* Informações de Entrega */}
        <div className={styles.infoCard}>
          <h2 className={styles.sectionTitle}>Informações de Entrega</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <MapPin size={16} color="#6b7280" />
              <span className={styles.infoLabel}>Endereço:</span>
              <span className={styles.infoValue}>{endereco.rua || endereco.logradouro || '-'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Bairro:</span>
              <span className={styles.infoValue}>{endereco.bairro || '-'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Cidade:</span>
              <span className={styles.infoValue}>
                {endereco.cidade || endereco.localidade || '-'}, {endereco.estado || endereco.uf || '-'}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>CEP:</span>
              <span className={styles.infoValue}>{formatCEP(endereco.cep)}</span>
            </div>
          </div>
        </div>

        {/* Informações de Pagamento */}
        {/* Aqui você pode adaptar para puxar os dados de pagamento do contexto se tiver */}
        <div className={styles.infoCard}>
          <h2 className={styles.sectionTitle}>Informações de Pagamento</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <CreditCard size={16} color="#6b7280" />
              <span className={styles.infoLabel}>Titular do Cartão:</span>
              <span className={styles.infoValue}>FRANCISCO A P</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Final:</span>
              <span className={styles.infoValue}>************2020</span>
            </div>
          </div>
        </div>

        {/* Resumo da compra */}
        <div className={styles.infoCard}>
          <h2 className={styles.sectionTitle}>Resumo da compra</h2>

          <div className={styles.productSummary}>
            <div className={styles.productImage}>👟</div>
            <div className={styles.productInfo}>
              <div className={styles.productName}>
                Tênis Nike Revolution 6 Next Nature Masculino
              </div>
            </div>
          </div>

          <div className={styles.totalSection}>
            <span className={styles.totalLabel}>Total</span>
            <div>
              <div className={styles.totalValue}>R$ 219,00</div>
              <div className={styles.totalSubtext}>
                ou 10x de R$ 21,90 sem juros
              </div>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <button className={styles.printButton}>Imprimir Recibo</button>
            <Link to="/" className={styles.homeButton}>
              Voltar para Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ConfirmacaoCompra