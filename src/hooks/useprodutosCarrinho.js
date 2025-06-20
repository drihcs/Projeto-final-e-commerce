import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'  // Ajuste o caminho se necessário
import { useCarrinho } from '../contexts/CarrinhoContext'

export function useProdutosCarrinho() {
  const { itens } = useCarrinho()  // itens do carrinho com id e quantidade
  const [produtosDetalhados, setProdutosDetalhados] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProdutosDetalhados() {
      if (itens.length === 0) {
        setProdutosDetalhados([])
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      try {
        // Buscar os produtos cujos ids estão no carrinho
        const { data, error } = await supabase
          .from('produtos')  // ajuste o nome da tabela dos produtos
          .select('*')
          .in('id', itens.map(item => item.id))

        if (error) throw error

        // Combinar dados do produto com quantidade do carrinho
        const produtosComQuantidade = data.map(produto => {
        const itemCarrinho = itens.find(i => i.id === produto.id)
        return {
            id: produto.id,
            name: produto.name,
            price: produto.price,
            discount: produto.discount,
            image: produto.image,
            quantidade: itemCarrinho?.quantidade || 1
        }
    })

        setProdutosDetalhados(produtosComQuantidade)
      } catch (err) {
        setError(err.message || 'Erro ao buscar produtos')
        setProdutosDetalhados([])
      } finally {
        setLoading(false)
      }
    }

    fetchProdutosDetalhados()
  }, [itens])

  return { produtosDetalhados, loading, error }
}