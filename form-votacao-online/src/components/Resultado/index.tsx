import React from "react";
import './style.scss'

type VoteOptionsType = {
    option: string;
    count: number;
}

type Props = {
    voteOptions: VoteOptionsType[];
}

const Resultado = ({ voteOptions }: Props) => {
    const totalVotos = () => {
        let total = 0
        voteOptions.forEach(option => {
            total += option.count
        })
        return total
    }

    const total = totalVotos();

    const resultado = voteOptions.map((option, index) => (
        <p key={index}>
            {index + 1}. {option.option} - {option.count} ({(option.count / total) * 100}%)
        </p>
    ))
    return (
        <div>
            {resultado}
        </div>
    )
}

export default Resultado;