import React, { useState } from 'react'
import Cabine from './Cabine'
import Resultado from './Resultado'

import '../styles/CardVotacao.scss'

let pergunta = "Uma pergunta";
const opcoes = [
  {
    opcao: "Sim",
    count: 5,
  },
  {
    opcao: "Não",
    count: 7,
  },
  {
    opcao: "Talvez",
    count: 8,
  }
]

export default function CardVotacao(props) {
  const [mode, setMode] = useState('open')
  const [voteCount, setVoteCount] = useState(0);
  let panel;

  function votar(index) {
    this.opcoes[index].count += 1
    let somaVotos = 0;
    this.opcoes.forEach(opcao => {
      somaVotos += opcao.count
    });
    setVoteCount(somaVotos);
    setMode('closed');
  }

  if (mode === 'open') {
    panel = (
      <div>
        <Cabine opcoes={opcoes}
          onClick={votar}>
        </Cabine>
      </div >
    )
  } else {
    panel = (
      <Resultado opcoes={opcoes} totalVotos={voteCount}></Resultado>
    )
  }


  return (
    <div className="container">
      <div className="question">
        <h2>{pergunta}</h2>
      </div>
      {panel}
    </div >
  )
}