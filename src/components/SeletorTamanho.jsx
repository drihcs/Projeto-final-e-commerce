import React from 'react'

export default function SeletorTamanhos({ tamanhos, tamanhoSelecionado, setTamanhoSelecionado }) {
  return (
    <div>
      <h4>Tamanho:</h4>
      <div style={{ display: 'flex', gap: '10px' }}>
        {tamanhos.map((tamanho, index) => (
          <button
            key={index}
            style={{
              border: tamanho === tamanhoSelecionado ? '2px solid black' : '1px solid gray',
              padding: '5px 10px',
              cursor: 'pointer'
            }}
            onClick={() => setTamanhoSelecionado(tamanho)}
          >
            {tamanho}
          </button>
        ))}
      </div>
    </div>
  )
}
