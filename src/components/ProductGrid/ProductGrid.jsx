import React, { useEffect, useState } from 'react'
import CardProduto from './CardProduto'
import { supabase } from '../../utils/supabase'
import styles from './ProductGrid.module.css'

export default function ProductGrid() {
  const [produtos, setProdutos] = useState([])

  useEffect(() => {
    async function fetchProdutos() {
      const { data, error } = await supabase.from('produtos').select('*')

      if (error) {
        console.error('Erro ao buscar produtos:', error)
      } else {
        setProdutos(data)
      }
    }

    fetchProdutos()
  }, [])

  return (
    <section className={styles.grid}>
      <h2>Destaques da Coleção</h2>
      <div className={styles.lista}>
        {produtos.map(produto => (
          <CardProduto key={produto.id} produto={produto} />
        ))}
      </div>
    </section>
  )
}
