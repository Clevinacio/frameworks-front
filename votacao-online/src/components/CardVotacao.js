import React, { useState } from 'react'
import Cabine from './Cabine'
import Resultado from './Resultado'

import '../styles/CardVotacao.scss'
export default function CardVotacao(props) {
  const pergunta = props.pergunta;
  const opcoes = props.opcoes;
  const [mode, setMode] = useState(props.mode);
  let somaVotos = 0;
  opcoes.forEach(opcao => {
    somaVotos += opcao.count
  });
  const [voteCount, setVoteCount] = useState(somaVotos);
  let panel;

  function votar(index) {
    this.opcoes[index].count += 1
    somaVotos = 0;
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

CardVotacao.defaultProps = {
  pergunta: "Uma pergunta",
  opcoes: [
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
  ],
  mode: 'open'
}