import React from 'react';
import styles from './SeletorCores.module.css';

function SeletorCores({ cores = [], corSelecionada, setCorSelecionada }) {
  if (!Array.isArray(cores) || cores.length === 0) {
    return null; // ou exibir uma mensagem tipo "Nenhuma cor disponível"
  }

  return (
    <div className={styles.optionGroup}>
      <h3 className={styles.optionTitle}>Cores:</h3>
      <div className={styles.colorOptions}>
        {cores.map((color, index) => (
          <button
            key={index}
            className={`${styles.colorSwatch} ${
              corSelecionada === color ? styles.active : ''
            }`}
            style={{ backgroundColor: color }}
            onClick={() => setCorSelecionada(color)}
            aria-label={`Cor: ${color}`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default SeletorCores;
