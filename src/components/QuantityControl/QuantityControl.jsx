import React from 'react'
import styles from './QuantityControl.module.css' // Vou sugerir um CSS separado para o componente

export default function QuantityControl({ quantidade, onChange, min = 1 }) {
  // Função para diminuir a quantidade
  const handleDecrease = () => {
    if (quantidade > min) {
      onChange(quantidade - 1)
    }
  }

  // Função para aumentar a quantidade
  const handleIncrease = () => {
    onChange(quantidade + 1)
  }

  // Função para input direto
  const handleInputChange = (e) => {
    let value = Number(e.target.value)
    if (isNaN(value) || value < min) {
      value = min
    }
    onChange(value)
  }

  return (
    <div className={styles.quantityControl}>
      <button
        type="button"
        onClick={handleDecrease}
        disabled={quantidade <= min}
        aria-label="Diminuir quantidade"
      >
        -
      </button>
      <input
        type="number"
        min={min}
        value={quantidade}
        onChange={handleInputChange}
        aria-label="Quantidade do produto"
      />
      <button
        type="button"
        onClick={handleIncrease}
        aria-label="Aumentar quantidade"
      >
        +
      </button>
    </div>
  )
}
