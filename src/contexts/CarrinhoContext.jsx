import React, { createContext, useState, useContext, useEffect } from 'react'

const CarrinhoContext = createContext()
CarrinhoContext.displayName = 'CarrinhoContext'

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState(() => {
    const itensSalvos = localStorage.getItem('carrinho')
    return itensSalvos ? JSON.parse(itensSalvos) : []
  })

  // Salvar no localStorage sempre que itens mudar
  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(itens))
  }, [itens])

  // 👉 Adicionar item
  function adicionarItem(produto) {
    const existe = itens.find(item => item.id === produto.id)

    if (existe) {
      setItens(itens.map(item =>
        item.id === produto.id
          ? { ...item, quantidade: item.quantidade + (produto.quantidade || 1) }
          : item
      ))
    } else {
      setItens([...itens, { ...produto, quantidade: produto.quantidade || 1 }])
    }
  }

  // 👉 Remover item
  function removerItem(id) {
    setItens(itens.filter(item => item.id !== id))
  }

  // 👉 Alterar quantidade
  function alterarQuantidade(id, novaQuantidade) {
    if (novaQuantidade < 1) {
      removerItem(id)
      return
    }
    setItens(itens.map(item =>
      item.id === id ? { ...item, quantidade: novaQuantidade } : item
    ))
  }

  // 👉 Limpar carrinho
  function limparCarrinho() {
    setItens([])
  }

  // 👉 Calcular total
  function calcularTotal() {
    return itens.reduce((total, item) => total + item.preco * item.quantidade, 0)
  }

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        adicionarItem,
        removerItem,
        alterarQuantidade,
        limparCarrinho,
        calcularTotal,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  )
}

// Hook personalizado para usar mais fácil
export function useCarrinho() {
  return useContext(CarrinhoContext)
}