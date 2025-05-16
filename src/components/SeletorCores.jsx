import React from 'react'

export default function SeletorCores({ cores, corSelecionada, setCorSelecionada }) {
  return (
    <div>
      <h4>Cor:</h4>
      <div style={{ display: 'flex', gap: '10px' }}>
        {cores.map((cor, index) => (
          <button
            key={index}
            style={{
              border: cor === corSelecionada ? '2px solid black' : '1px solid gray',
              padding: '5px 10px',
              cursor: 'pointer',
              backgroundColor: cor.toLowerCase()
            }}
            onClick={() => setCorSelecionada(cor)}
          >
            {cor}
          </button>
        ))}
      </div>
    </div>
  )
}
