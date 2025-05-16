// src/contexts/CarrinhoContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react'

const CarrinhoContext = createContext()
CarrinhoContext.displayName = 'CarrinhoContext'

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState(() => {
    const itensSalvos = localStorage.getItem('carrinho')
    return itensSalvos ? JSON.parse(itensSalvos) : []
  })

  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(itens))
  }, [itens])

  function adicionarItem(produto) {
    setItens(prev => [...prev, produto])
  }

  function limparCarrinho() {
    setItens([])
  }

  return (
    <CarrinhoContext.Provider value={{ itens, adicionarItem, limparCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  )
}

export function useCarrinho() {
  return useContext(CarrinhoContext)
}
