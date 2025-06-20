import React, { createContext, useState, useContext, useEffect } from 'react'

const CarrinhoContext = createContext()
CarrinhoContext.displayName = 'CarrinhoContext'

// 👉 Cupons válidos
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

  // 👉 Sempre salvar no localStorage
  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(itens))
  }, [itens])

  // 👉 Adicionar item ao carrinho
  function adicionarItem(produto) {
    const existe = itens.find(item => item.id === produto.id)

    if (existe) {
      setItens(itens.map(item =>
        item.id === produto.id
          ? {
              ...item,
              quantidade: (Number(item.quantidade) || 1) + (Number(produto.quantidade) || 1)
            }
          : item
      ))
    } else {
      setItens([
        ...itens,
        {
          ...produto,
          price: Number(produto.price) || 0,
          quantidade: Number(produto.quantidade) || 1,
        }
      ])
    }
  }

  // 👉 Remover item do carrinho
  function removerItem(id) {
    setItens(itens.filter(item => item.id !== id))
  }

  // 👉 Alterar quantidade de um item
  function alterarQuantidade(id, novaQuantidade) {
    if (novaQuantidade < 1) {
      removerItem(id)
      return
    }

    setItens(itens.map(item =>
      item.id === id
        ? { ...item, quantidade: Number(novaQuantidade) || 1 }
        : item
    ))
  }

  // 👉 Limpar o carrinho
  function limparCarrinho() {
    setItens([])
    setCupom('')
    setDescontoPercentual(0)
  }

  // 👉 Calcular subtotal
  function calcularSubtotal() {
    return itens.reduce((total, item) => {
      const preco = Number(item.price) || 0
      const quantidade = Number(item.quantidade) || 1
      return total + preco * quantidade
    }, 0)
  }

  // 👉 Aplicar cupom de desconto
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

  // 👉 Calcular valor do desconto
  function calcularDesconto() {
    const subtotal = calcularSubtotal()
    return (subtotal * descontoPercentual) / 100
  }

  // 👉 Calcular total final
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

// 👉 Hook personalizado
export function useCarrinho() {
  return useContext(CarrinhoContext)
}