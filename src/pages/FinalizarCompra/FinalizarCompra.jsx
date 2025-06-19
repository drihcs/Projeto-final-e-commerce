import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingCart, User, MapPin, CreditCard } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useCarrinho } from '../../contexts/CarrinhoContext'
import { supabase } from '../../utils/supabase' // ajuste o caminho conforme seu projeto
import styles from './FinalizarCompra.module.css'

function FinalizarCompra() {
  const { usuario } = useAuth()
  const { carrinho, limparCarrinho } = useCarrinho()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    celular: '',
    endereco: '',
    bairro: '',
    cidade: '',
    cep: '',
    complemento: '',
    paymentMethod: 'credit',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cvv: ''
  })

  const [loadingUserData, setLoadingUserData] = useState(false)
  const [errorUserData, setErrorUserData] = useState(null)

  useEffect(() => {
    async function fetchUserData() {
      if (!usuario?.id) return

      setLoadingUserData(true)
      setErrorUserData(null)

      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', usuario.id)
        .single()

      if (error) {
        console.error('Erro ao buscar dados do usuário:', error)
        setErrorUserData('Não foi possível carregar seus dados.')
      } else if (data) {
        setFormData(prev => ({
          ...prev,
          nome: data.nome || '',
          cpf: data.cpf || '',
          email: data.email || '',
          celular: data.celular || '',
          endereco: data.endereco || '',
          bairro: data.bairro || '',
          cidade: data.cidade || '',
          cep: data.cep || '',
          complemento: data.complemento || ''
        }))
      }

      setLoadingUserData(false)
    }

    fetchUserData()
  }, [usuario])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = () => {
    const requiredFields = ['nome', 'cpf', 'email', 'celular', 'endereco', 'bairro', 'cidade', 'cep']
    const missingFields = requiredFields.filter(field => !formData[field].trim())

    if (missingFields.length > 0) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    if (formData.paymentMethod === 'credit') {
      const cardFields = ['cardName', 'cardNumber', 'cardExpiry', 'cvv']
      const missingCardFields = cardFields.filter(field => !formData[field].trim())

      if (missingCardFields.length > 0) {
        alert('Por favor, preencha todos os dados do cartão.')
        return
      }
    }

    alert('Pedido finalizado com sucesso!')
    console.log('Dados do pedido:', formData)

    limparCarrinho()
    navigate('/compra-finalizada')
  }

  // Formatação dos campos (CPF, telefone, CEP, cartão)
  const formatCPF = (value) => {
    const numbers = value.replace(/\D/g, '')
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '')
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }

  const formatCEP = (value) => {
    const numbers = value.replace(/\D/g, '')
    return numbers.replace(/(\d{5})(\d{3})/, '$1-$2')
  }

  const formatCardNumber = (value) => {
    const numbers = value.replace(/\D/g, '')
    return numbers.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4')
  }

  const formatCardExpiry = (value) => {
    const numbers = value.replace(/\D/g, '')
    return numbers.replace(/(\d{2})(\d{2})/, '$1/$2')
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.checkoutForm}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: '#333' }}>
            Finalizar Compra
          </h1>

          {loadingUserData && <p>Carregando seus dados...</p>}
          {errorUserData && <p style={{ color: 'red' }}>{errorUserData}</p>}

          <div>
            {/* Informações Pessoais */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <User size={20} />
                Informações Pessoais
              </h2>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Nome Completo <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="nome"
                    placeholder="Insira seu nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    CPF <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="cpf"
                    placeholder="Insira seu CPF"
                    value={formData.cpf}
                    onChange={(e) => {
                      const formatted = formatCPF(e.target.value)
                      if (formatted.length <= 14) {
                        setFormData(prev => ({ ...prev, cpf: formatted }))
                      }
                    }}
                    className={styles.input}
                    maxLength="14"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    E-mail <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Insira seu email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Celular <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="tel"
                    name="celular"
                    placeholder="Insira seu celular"
                    value={formData.celular}
                    onChange={(e) => {
                      const formatted = formatPhone(e.target.value)
                      if (formatted.length <= 15) {
                        setFormData(prev => ({ ...prev, celular: formatted }))
                      }
                    }}
                    className={styles.input}
                    maxLength="15"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Informações de Entrega */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <MapPin size={20} />
                Informações de Entrega
              </h2>

              <div className={styles.formGrid}>
                <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                  <label className={styles.label}>
                    Endereço <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="endereco"
                    placeholder="Insira seu endereço"
                    value={formData.endereco}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Bairro <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="bairro"
                    placeholder="Insira seu bairro"
                    value={formData.bairro}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Cidade <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="cidade"
                    placeholder="Insira sua cidade"
                    value={formData.cidade}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    CEP <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="cep"
                    placeholder="Insira seu CEP"
                    value={formData.cep}
                    onChange={(e) => {
                      const formatted = formatCEP(e.target.value)
                      if (formatted.length <= 9) {
                        setFormData(prev => ({ ...prev, cep: formatted }))
                      }
                    }}
                    className={styles.input}
                    maxLength="9"
                    required
                  />
                </div>

                <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                  <label className={styles.label}>Complemento</label>
                  <input
                    type="text"
                    name="complemento"
                    placeholder="Insira complemento"
                    value={formData.complemento}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>
              </div>
            </section>

            {/* Informações de Pagamento */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <CreditCard size={20} />
                Informações de Pagamento
              </h2>

              <div className={styles.formGroup}>
                <label className={styles.label}>Forma de Pagamento</label>
                <div className={styles.radioGroup}>
                  <div className={styles.radioOption}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit"
                      checked={formData.paymentMethod === 'credit'}
                      onChange={handleInputChange}
                      id="credit"
                    />
                    <label htmlFor="credit">Cartão de Crédito</label>
                  </div>
                  <div className={styles.radioOption}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="pix"
                      checked={formData.paymentMethod === 'pix'}
                      onChange={handleInputChange}
                      id="pix"
                    />
                    <label htmlFor="pix">Pix</label>
                  </div>
                  <div className={styles.radioOption}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="boleto"
                      checked={formData.paymentMethod === 'boleto'}
                      onChange={handleInputChange}
                      id="boleto"
                    />
                    <label htmlFor="boleto">Boleto</label>
                  </div>
                </div>
              </div>

              {formData.paymentMethod === 'credit' && (
                <>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Nome no Cartão</label>
                    <input
                      type="text"
                      name="cardName"
                      placeholder="Nome impresso no cartão"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Número do Cartão</label>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="0000 0000 0000 0000"
                      value={formData.cardNumber}
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value)
                        if (formatted.length <= 19) {
                          setFormData(prev => ({ ...prev, cardNumber: formatted }))
                        }
                      }}
                      className={styles.input}
                      maxLength="19"
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={`${styles.formGroup} ${styles.formGroupHalf}`}>
                      <label className={styles.label}>Validade</label>
                      <input
                        type="text"
                        name="cardExpiry"
                        placeholder="MM/AA"
                        value={formData.cardExpiry}
                        onChange={(e) => {
                          const formatted = formatCardExpiry(e.target.value)
                          if (formatted.length <= 5) {
                            setFormData(prev => ({ ...prev, cardExpiry: formatted }))
                          }
                        }}
                        className={styles.input}
                        maxLength="5"
                      />
                    </div>

                    <div className={`${styles.formGroup} ${styles.formGroupHalf}`}>
                      <label className={styles.label}>CVV</label>
                      <input
                        type="password"
                        name="cvv"
                        placeholder="000"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className={styles.input}
                        maxLength="3"
                      />
                    </div>
                  </div>
                </>
              )}
            </section>
          </div>
        </div>

        {/* Resumo do Pedido */}
        <div className={styles.orderSummary}>
          <h2 className={styles.sectionTitle}>
            <ShoppingCart size={20} />
            Resumo do Pedido
          </h2>
          <p className={styles.orderValue}>
            Valor total: <span>R$ 219,00</span>
          </p>
          <p className={styles.installments}>6x de R$ 36,50 sem juros</p>
          <button
            type="button"
            onClick={handleSubmit}
            className={styles.submitButton}
          >
            Realizar Pagamento
          </button>
        </div>
      </main>
    </div>
  )
}

export default FinalizarCompra