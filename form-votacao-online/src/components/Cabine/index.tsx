import React from 'react'

import './style.scss'

type VoteOptionsType = {
    option: string;
    count: number;
}

type Props = {
    voteOptions: VoteOptionsType[];
    onVote: (index: number) => void;
}

const Cabine = ({ voteOptions, onVote }: Props) => {

    const botoes = voteOptions.map((option, index) => (
        <button key={index}
            onClick={() => onVote(index)}>
            {option.option}
        </button>
    ))
    return (
        <div className="options">
            {botoes}
        </div>
    )
}

export default Cabine;