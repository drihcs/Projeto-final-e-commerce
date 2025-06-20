import React, { createContext, useState, useContext, useEffect } from 'react'

const CarrinhoContext = createContext()
CarrinhoContext.displayName = 'CarrinhoContext'

// Cupons válidos com desconto percentual
const cuponsValidos = {
  'NAMORADOS12': 12, // 12% de desconto
}

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState(() => {
    const itensSalvos = localStorage.getItem('carrinho')
    return itensSalvos ? JSON.parse(itensSalvos) : []
  })

  const [cupom, setCupom] = useState('')
  const [descontoPercentual, setDescontoPercentual] = useState(0)

  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(itens))
  }, [itens])

  function adicionarItem(produto) {
    const existe = itens.find(item => item.id === produto.id)

    if (existe) {
      setItens(itens.map(item =>
        item.id === produto.id
          ? { ...item, quantidade: item.quantidade + (produto.quantidade || 1) }
          : item
      ))
    } else {
      setItens([...itens, { 
        ...produto, 
        quantidade: produto.quantidade || 1,
        price: produto.price ?? produto.preco // suporte temporário
      }])
    }
  }

  function removerItem(id) {
    setItens(itens.filter(item => item.id !== id))
  }

  function alterarQuantidade(id, novaQuantidade) {
    if (novaQuantidade < 1) {
      removerItem(id)
      return
    }
    setItens(itens.map(item =>
      item.id === id ? { ...item, quantidade: novaQuantidade } : item
    ))
  }

  function limparCarrinho() {
    setItens([])
    setCupom('')
    setDescontoPercentual(0)
  }

  function calcularSubtotal() {
    return itens.reduce((total, item) => total + item.price * item.quantidade, 0)
  }

  function aplicarCupom(codigo) {
    const desconto = cuponsValidos[codigo.toUpperCase()]
    if (desconto) {
      setCupom(codigo.toUpperCase())
      setDescontoPercentual(desconto)
      return { valido: true, percentual: desconto }
    } else {
      setCupom('')
      setDescontoPercentual(0)
      return { valido: false }
    }
  }

  function calcularDesconto() {
    const subtotal = calcularSubtotal()
    return (subtotal * descontoPercentual) / 100
  }

  function calcularTotal() {
    const subtotal = calcularSubtotal()
    const desconto = calcularDesconto()
    return Math.max(subtotal - desconto, 0)
  }

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        adicionarItem,
        removerItem,
        alterarQuantidade,
        limparCarrinho,
        calcularSubtotal,
        calcularDesconto,
        calcularTotal,
        cupom,
        descontoPercentual,
        aplicarCupom,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  )
}

export function useCarrinho() {
  return useContext(CarrinhoContext)
}