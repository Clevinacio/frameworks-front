import React, { useState } from 'react'
import Cabine from '../Cabine'
import Resultado from '../Resultado'

import './style.scss'

type VoteOptionsType = {
    option: string;
    count: number;
}

type VoteType = {
    statement: string,
    voteOptions: VoteOptionsType[],
}

type Props = {
    vote: VoteType;
}

const CardVotacao = ({ vote }: Props) => {
    const pergunta = vote.statement;
    const opcoes = vote.voteOptions;

    const [mode, setMode] = useState('open');

    let panel;

    function votar(index: number) {
        opcoes[index].count += 1
        setMode('closed');
    }

    if (mode === 'open') {
        panel = (
            <div>
                <Cabine voteOptions={opcoes} onVote={votar} />
            </div >
        )
    } else {
        panel = (
            <Resultado voteOptions={opcoes} />
        )
    }

    return (
        <div className="containerCard">
            <div className="question">
                <h2>{pergunta}</h2>
            </div>
            {panel}
        </div >
    )
}

export default CardVotacao;