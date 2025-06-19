import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingCart, User, MapPin, CreditCard } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useCarrinho } from '../../contexts/CarrinhoContext'
import { supabase } from '../../utils/supabase'
import styles from './FinalizarCompra.module.css'

function FinalizarCompra() {
  const { usuario } = useAuth()
  const { itens, limparCarrinho } = useCarrinho()
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

  const total = itens.reduce(
    (acc, item) => acc + Number(item.price) * (item.quantidade || 1),
    0
  )

  useEffect(() => {
    async function fetchUserData() {
      if (!usuario?.id) return

      const { data } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', usuario.id)
        .single()

      if (data) {
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
    const obrigatorios = ['nome', 'cpf', 'email', 'celular', 'endereco', 'bairro', 'cidade', 'cep']
    const faltando = obrigatorios.filter(field => !formData[field].trim())

    if (faltando.length > 0) {
      alert('Preencha todos os campos obrigatórios.')
      return
    }

    if (formData.paymentMethod === 'credit') {
      const cartaoCampos = ['cardName', 'cardNumber', 'cardExpiry', 'cvv']
      const faltandoCartao = cartaoCampos.filter(field => !formData[field].trim())

      if (faltandoCartao.length > 0) {
        alert('Preencha todos os dados do cartão.')
        return
      }
    }

    alert('Pedido finalizado com sucesso!')
    limparCarrinho()
    navigate('/compra-finalizada')
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.checkoutForm}>
          <h1>Finalizar Compra</h1>

          {/* 🧍 Dados Pessoais */}
          <section className={styles.section}>
            <h2><User size={20} /> Informações Pessoais</h2>
            <div className={styles.formGrid}>
              <input type="text" name="nome" placeholder="Nome Completo *" value={formData.nome} onChange={handleInputChange} />
              <input type="text" name="cpf" placeholder="CPF *" value={formData.cpf} onChange={handleInputChange} />
              <input type="email" name="email" placeholder="Email *" value={formData.email} onChange={handleInputChange} />
              <input type="tel" name="celular" placeholder="Celular *" value={formData.celular} onChange={handleInputChange} />
            </div>
          </section>

          {/* 🚚 Entrega */}
          <section className={styles.section}>
            <h2><MapPin size={20} /> Informações de Entrega</h2>
            <div className={styles.formGrid}>
              <input type="text" name="endereco" placeholder="Endereço *" value={formData.endereco} onChange={handleInputChange} />
              <input type="text" name="bairro" placeholder="Bairro *" value={formData.bairro} onChange={handleInputChange} />
              <input type="text" name="cidade" placeholder="Cidade *" value={formData.cidade} onChange={handleInputChange} />
              <input type="text" name="cep" placeholder="CEP *" value={formData.cep} onChange={handleInputChange} />
              <input type="text" name="complemento" placeholder="Complemento" value={formData.complemento} onChange={handleInputChange} />
            </div>
          </section>

          {/* 💳 Pagamento */}
          <section className={styles.section}>
            <h2><CreditCard size={20} /> Pagamento</h2>
            <div className={styles.radioGroup}>
              <label>
                <input type="radio" name="paymentMethod" value="credit" checked={formData.paymentMethod === 'credit'} onChange={handleInputChange} /> Cartão de Crédito
              </label>
              <label>
                <input type="radio" name="paymentMethod" value="pix" checked={formData.paymentMethod === 'pix'} onChange={handleInputChange} /> Pix
              </label>
              <label>
                <input type="radio" name="paymentMethod" value="boleto" checked={formData.paymentMethod === 'boleto'} onChange={handleInputChange} /> Boleto
              </label>
            </div>

            {formData.paymentMethod === 'credit' && (
              <div className={styles.formGrid}>
                <input type="text" name="cardName" placeholder="Nome no Cartão" value={formData.cardName} onChange={handleInputChange} />
                <input type="text" name="cardNumber" placeholder="Número do Cartão" value={formData.cardNumber} onChange={handleInputChange} />
                <input type="text" name="cardExpiry" placeholder="Validade (MM/AA)" value={formData.cardExpiry} onChange={handleInputChange} />
                <input type="password" name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleInputChange} />
              </div>
            )}
          </section>
        </div>

        {/* 🛒 Resumo do Pedido */}
        <div className={styles.orderSummary}>
          <h2><ShoppingCart size={20} /> Resumo do Pedido</h2>

          {itens.length === 0 ? (
            <p>Carrinho vazio.</p>
          ) : (
            <div className={styles.orderItems}>
              {itens.map(item => (
                <div key={item.id} className={styles.orderItem}>
                  <span>{item.name} x{item.quantidade || 1}</span>
                  <span>R$ {(item.price * (item.quantidade || 1)).toFixed(2).replace('.', ',')}</span>
                </div>
              ))}
            </div>
          )}

          <p className={styles.orderValue}>
            Total: <span>R$ {total.toFixed(2).replace('.', ',')}</span>
          </p>
          <p className={styles.installments}>
            ou 6x de R$ {(total / 6).toFixed(2).replace('.', ',')} sem juros
          </p>

          <button type="button" onClick={handleSubmit} className={styles.btnComplete}>
            Realizar Pagamento
          </button>
        </div>
      </main>
    </div>
  )
}

export default FinalizarCompra
