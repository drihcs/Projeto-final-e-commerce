import React from 'react';
import styles from './SeletorTamanhos.module.css';

function SeletorTamanhos({ tamanhos, tamanhoSelecionado, setTamanhoSelecionado }) {
  return (
    <div className={styles.optionGroup}>
      <h3 className={styles.optionTitle}>Tamanhos:</h3>
      <div className={styles.sizeOptions}>
        {tamanhos.map((size, index) => (
          <button
            key={index}
            className={`${styles.sizeButton} ${
              tamanhoSelecionado === size ? styles.active : ''
            }`}
            onClick={() => setTamanhoSelecionado(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SeletorTamanhos;