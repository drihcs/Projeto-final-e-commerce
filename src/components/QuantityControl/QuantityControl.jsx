import styles from './QuantityControl.module.css'

export default function QuantityControl({ quantidade, onChange, onRemove, min = 1 }) {
  const handleDecrease = () => {
    if (quantidade <= min) {
      // Se chegou no mínimo (ex: 1) e diminuir, dispara remoção
      if (onRemove) onRemove()
    } else {
      onChange(quantidade - 1)
    }
  }

  const handleIncrease = () => {
    onChange(quantidade + 1)
  }

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