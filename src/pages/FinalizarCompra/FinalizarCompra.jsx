import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingCart, User, MapPin, CreditCard } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useCarrinho } from '../../contexts/CarrinhoContext'
import { supabase } from '../../utils/supabase'
import QuantityControl from '../../components/QuantityControl/QuantityControl'
import styles from './FinalizarCompra.module.css'

function FinalizarCompra() {
  const { usuario } = useAuth()
  const { itens, alterarQuantidade, limparCarrinho, removerItem } = useCarrinho()
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

  const handleQuantidadeChange = (itemId, novaQuantidade) => {
    alterarQuantidade(itemId, novaQuantidade)
  }

  // Calcular subtotal
  const subtotal = itens.reduce(
    (acc, item) => acc + Number(item.price) * (item.quantidade || 1),
    0
  )

  // Exemplo fixo de frete e desconto
  const frete = 15.0
  const desconto = 10.0

  // Total final
  const totalFinal = subtotal + frete - desconto

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

  // Função para gerar número de pedido AAAAMMDD + 4 dígitos aleatórios
  const gerarNumeroPedido = () => {
    const now = new Date()
    const dataStr = now.toISOString().slice(0, 10).replace(/-/g, '') // AAAAMMDD
    const randomSeq = Math.floor(1000 + Math.random() * 9000) // 4 dígitos aleatórios
    return `${dataStr}${randomSeq}`
  }

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()

    const obrigatorios = ['nome', 'cpf', 'email', 'celular', 'endereco', 'bairro', 'cidade', 'cep']
    const faltando = obrigatorios.filter(field => !formData[field]?.trim())

    if (faltando.length > 0) {
      alert('Preencha todos os campos obrigatórios.')
      return
    }

    if (formData.paymentMethod === 'credit') {
      const cartaoCampos = ['cardName', 'cardNumber', 'cardExpiry', 'cvv']
      const faltandoCartao = cartaoCampos.filter(field => !formData[field]?.trim())

      if (faltandoCartao.length > 0) {
        alert('Preencha todos os dados do cartão.')
        return
      }
    }

    if (itens.length === 0) {
      alert('Seu carrinho está vazio.')
      return
    }

    const numeroPedido = gerarNumeroPedido()

    try {
      // Inserir cada item como um registro na tabela pedidos
      for (const item of itens) {
        const { data, error } = await supabase
          .from('pedidos')
          .insert({
            numero_pedido: numeroPedido,
            usuario_id: usuario.id,
            produto_id: item.id,
            quantidade: item.quantidade || 1,
            preco_total: totalFinal,
            status: 'Em processamento',
            data_pedido: new Date().toISOString(),
          })

        if (error) throw error
      }

      alert('Pedido finalizado com sucesso!')

      limparCarrinho()
      navigate('/compra-finalizada', {
        state: {
          numeroPedido,
          itens,
          totalFinal,
          dadosCliente: formData
        }
      })
    } catch (error) {
      console.error('Erro ao salvar pedido:', error.message)
      alert('Ocorreu um erro ao processar seu pedido. Tente novamente mais tarde.')
    }
  }

  // Formatação inputs especiais
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
        <form onSubmit={handleSubmit} className={styles.checkoutForm} noValidate>
          <h1 className={styles.pageTitle}>Finalizar Compra</h1>

          {loadingUserData && <p>Carregando seus dados...</p>}
          {errorUserData && <p className={styles.error}>{errorUserData}</p>}

          {/* Dados Pessoais */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}><User size={20} /> Dados Pessoais</h2>
            <input
              type="text"
              name="nome"
              placeholder="Nome Completo *"
              value={formData.nome}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
            <input
              type="text"
              name="cpf"
              placeholder="CPF *"
              value={formData.cpf}
              onChange={(e) => setFormData(prev => ({ ...prev, cpf: formatCPF(e.target.value) }))}
              maxLength="14"
              className={styles.input}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
            <input
              type="tel"
              name="celular"
              placeholder="Celular *"
              value={formData.celular}
              onChange={(e) => setFormData(prev => ({ ...prev, celular: formatPhone(e.target.value) }))}
              maxLength="15"
              className={styles.input}
              required
            />
          </section>

          {/* Informações de Entrega */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}><MapPin size={20} /> Informações de Entrega</h2>
            <input
              type="text"
              name="endereco"
              placeholder="Endereço *"
              value={formData.endereco}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
            <input
              type="text"
              name="bairro"
              placeholder="Bairro *"
              value={formData.bairro}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
            <input
              type="text"
              name="cidade"
              placeholder="Cidade *"
              value={formData.cidade}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
            <input
              type="text"
              name="cep"
              placeholder="CEP *"
              value={formData.cep}
              onChange={(e) => setFormData(prev => ({ ...prev, cep: formatCEP(e.target.value) }))}
              maxLength="9"
              className={styles.input}
              required
            />
            <input
              type="text"
              name="complemento"
              placeholder="Complemento"
              value={formData.complemento}
              onChange={handleInputChange}
              className={styles.input}
            />
          </section>

          {/* Formas de Pagamento */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}><CreditCard size={20} /> Informações de Pagamento</h2>
            <div className={styles.radioGroup}>
              <p className={styles.radioLabel}>Formas de pagamento:</p>
              <label className={styles.radioOption}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit"
                  checked={formData.paymentMethod === 'credit'}
                  onChange={handleInputChange}
                /> Cartão de Crédito
              </label>
              <label className={styles.radioOption}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="pix"
                  checked={formData.paymentMethod === 'pix'}
                  onChange={handleInputChange}
                /> Pix
              </label>
              <label className={styles.radioOption}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="boleto"
                  checked={formData.paymentMethod === 'boleto'}
                  onChange={handleInputChange}
                /> Boleto
              </label>
            </div>

            {formData.paymentMethod === 'credit' && (
              <>
                <input
                  type="text"
                  name="cardName"
                  placeholder="Nome no Cartão"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  className={styles.input}
                />
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Número do Cartão"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, cardNumber: formatCardNumber(e.target.value) }))}
                  maxLength="19"
                  className={styles.input}
                />
                <div className={styles.formGrid}>
                  <input
                    type="text"
                    name="cardExpiry"
                    placeholder="Validade (MM/AA)"
                    value={formData.cardExpiry}
                    onChange={(e) => setFormData(prev => ({ ...prev, cardExpiry: formatCardExpiry(e.target.value) }))}
                    maxLength="5"
                    className={styles.input}
                  />
                  <input
                    type="password"
                    name="cvv"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    maxLength="3"
                    className={styles.input}
                  />
                </div>
              </>
            )}
          </section>

          {/* Finalizar Compra */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Finalizar pagamento</h2>
            <div className={styles.finalizarCompra}>
              <div className={styles.summaryTotal}>
                <span>Total</span>
                <span className={styles.totalHighlight}>
                  R$ {totalFinal.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <p className={styles.installments}>
                ou 6x de R$ {(totalFinal / 6).toFixed(2).replace('.', ',')} sem juros
              </p>
              <button type="submit" className={styles.btnComplete}>
                Realizar Pagamento
              </button>
            </div>
          </section>
        </form>

        <aside className={styles.orderSummary}>
          <h2 className={styles.summaryTitle}><ShoppingCart size={20} /> RESUMO</h2>

          {itens.length === 0 ? (
            <p>Carrinho vazio.</p>
          ) : (
            <>
              {itens.map(item => (
                <div key={item.id} className={styles.productItem}>
                  <div className={styles.productImage}>
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <div>Sem imagem</div>
                    )}
                  </div>

                  <div className={styles.productInfo}>
                    <p className={styles.productName}>{item.name}</p>

                    <div className={styles.infoBottom}>
                      <div className={styles.quantityControl}>
                        <span className={styles.qtdLabel}>Qtd:</span>
                        <QuantityControl
                          quantidade={item.quantidade}
                          onChange={novaQtd => handleQuantidadeChange(item.id, novaQtd)}
                          onRemove={() => removerItem(item.id)}
                          min={1}
                        />
                      </div>

                      <span className={styles.price}>
                        R$ {(item.price * (item.quantidade || 1)).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <div className={styles.summaryLine}>
                <span>Subtotal:</span>
                <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className={styles.summaryLine}>
                <span>Frete:</span>
                <span>R$ {frete.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className={styles.summaryLine}>
                <span>Desconto:</span>
                <span>- R$ {desconto.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className={styles.summaryTotal}>
                <span>Total:</span>
                <span className={styles.totalHighlight}>
                  R$ {totalFinal.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <p className={styles.installments}>
                ou 6x de R$ {(totalFinal / 6).toFixed(2).replace('.', ',')} sem juros
              </p>
              <button type="button" className={styles.btnComplete} onClick={handleSubmit}>
                Realizar Pagamento
              </button>
            </>
          )}
        </aside>
      </main>
    </div>
  )
}

export default FinalizarCompra