import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { produtos } from '../../services/produtos'
import SeletorCores from '../../components/SeletorCores'
import SeletorTamanhos from '../../components/SeletorTamanho'

export default function ProdutoDetalhado() {
  const { id } = useParams()
  const navigate = useNavigate()

  const produto = produtos.find(p => p.id === id)

  if (!produto) return <p>Produto não encontrado.</p>

  const [corSelecionada, setCorSelecionada] = useState(produto.cores[0])
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState(produto.tamanhos[0])

  const adicionarAoCarrinho = () => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || []
    carrinho.push({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      imagem: produto.imagem,
      cor: corSelecionada,
      tamanho: tamanhoSelecionado,
      quantidade: 1
    })
    localStorage.setItem('carrinho', JSON.stringify(carrinho))
    alert('Produto adicionado ao carrinho!')
    navigate('/carrinho')
  }

  return (
    <div style={{ display: 'flex', padding: '40px', gap: '40px' }}>
      <img src={produto.imagem} alt={produto.nome} style={{ width: '350px' }} />
      <div>
        <h2>{produto.nome}</h2>
        <p><strong>R$ {produto.preco.toFixed(2)}</strong></p>
        <p>{produto.descricao}</p>

        <SeletorCores
          cores={produto.cores}
          corSelecionada={corSelecionada}
          setCorSelecionada={setCorSelecionada}
        />

        <br />

        <SeletorTamanhos
          tamanhos={produto.tamanhos}
          tamanhoSelecionado={tamanhoSelecionado}
          setTamanhoSelecionado={setTamanhoSelecionado}
        />

        <br />

        <button onClick={adicionarAoCarrinho} style={{ marginTop: '20px', padding: '10px 20px' }}>
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  )
}
