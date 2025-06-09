import React from 'react'
import { Link } from 'react-router-dom'
import styles from './CompraFinalizada.module.css'
import { MapPin, CreditCard, Phone, Mail, User } from 'lucide-react'
import sucessoImg from '../../assets/party-popper.png'

const ConfirmacaoCompra = () => {
  return (
    <div className={styles.container}>
      {/* Main Content */}
      <main className={styles.main}>
        {/* Success Section */}
        <section className={styles.successSection}>
          <div className={styles.successIcon}>
            <img src={sucessoImg} alt="Sucesso" className={styles.successImage} />
          </div>
          <h1 className={styles.successTitle}>Compra Realizada</h1>
          <p className={styles.successSubtitle}>com sucesso!</p>
        </section>

        {/* Personal Information */}
        <div className={styles.infoCard}>
          <h2 className={styles.sectionTitle}>Informações Pessoais</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <User size={16} color="#6b7280" />
              <span className={styles.infoLabel}>Nome:</span>
              <span className={styles.infoValue}>Francisco Antonio Pereira</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>CPF:</span>
              <span className={styles.infoValue}>123485913-35</span>
            </div>
            <div className={styles.infoItem}>
              <Mail size={16} color="#6b7280" />
              <span className={styles.infoLabel}>Email:</span>
              <span className={styles.infoValue}>francisco@gmail.com</span>
            </div>
            <div className={styles.infoItem}>
              <Phone size={16} color="#6b7280" />
              <span className={styles.infoLabel}>Celular:</span>
              <span className={styles.infoValue}>(85) 5555-5555</span>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className={styles.infoCard}>
          <h2 className={styles.sectionTitle}>Informações de Entrega</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <MapPin size={16} color="#6b7280" />
              <span className={styles.infoLabel}>Endereço:</span>
              <span className={styles.infoValue}>Rua João Pessoa, 333</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Bairro:</span>
              <span className={styles.infoValue}>Centro</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Cidade:</span>
              <span className={styles.infoValue}>Fortaleza, Ceará</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>CEP:</span>
              <span className={styles.infoValue}>433-8800</span>
            </div>
          </div>
        </div>

        {/* Payment Information */}
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

        {/* Order Summary */}
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
