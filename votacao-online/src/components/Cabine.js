import React from 'react'

import '../styles/Cabine.scss'

export default function Cabine(props) {
  const botoes = props.opcoes.map((option, index) => (
    <button key={index}
      onClick={() => props.onClick(index)}>
      {option.opcao}
    </button>
  ))
  return (
    <div className="options">
      {botoes}
    </div>
  )
}