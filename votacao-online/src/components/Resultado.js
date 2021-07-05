import React from "react";
import '../styles/Resultado.scss'
export default function Resultado(props) {
  const totalVotos = props.totalVotos;
  const resultado = props.opcoes.map((option, index) => (
    <p key={index}>
      {index + 1}. {option.opcao} - {option.count} ({parseInt((option.count / totalVotos) * 100)}%)
    </p>
  ))
  return (
    <div>
      {resultado}
    </div>
  )
}