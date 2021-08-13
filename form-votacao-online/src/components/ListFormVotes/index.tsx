import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import useVoteData from "../../hooks/useVoteData";
import FormVotes from "../FormVotes";

import "./style.scss";

type VoteOptionsType = {
    option: string;
    count: number;
}

type VoteType = {
    statement: string,
    voteOptions: VoteOptionsType[],
}

export function ListFormVotes() {
    const [mode, setMode] = useState('view');
    const [current, setCurrent] = useState(0);

    const {
        votes,
        createVote,
        updateVote,
        deleteVote,
    } = useVoteData();

    const addVote = () => {
        createVote();
        setCurrent(votes.length);
        setMode('add');
    };

    const editVote = (index: number) => {
        setCurrent(index);
        setMode('edit');
    };

    const removeVote = (index: number) => {
        deleteVote(index);
    };

    const updateChanges = (vote: VoteType) => {
        updateVote(vote, current)
        setMode('view')
    }

    const cancelChanges = (): void => {
        if (mode === 'add') {
            removeVote(votes.length - 1)
        }
        setMode('view')
    }

    if (mode === 'view') {
        const vt = votes.map((v: VoteType, i: number) => (
            <>
                <p key={i}>
                    <b> Enunciado da votação:</b> {v.statement}{' - '}
                    <Button variant="warning" onClick={() => editVote(i)}>Editar</Button>{' '}
                    <Button variant="danger" onClick={() => removeVote(i)}>Remover</Button>
                    <br />
                    <b>Opções:</b> <br />
                    {v.voteOptions.map((vo: VoteOptionsType, i: number) => (
                        <span key={i}>{vo.option} {i < v.voteOptions.length - 1 && ' - '} </span>
                    ))}
                </p>

            </>
        ));

        return (
            <Container className="container">
                <h2>Votações</h2>
                <Button variant="primary" className="mr-1" onClick={() => addVote()}>Nova votação</Button>{' '}
                {vt}
            </Container>

        );
    } else {
        return (
            <Container className="container">
                <FormVotes
                    vote={votes[current]}
                    onCancel={cancelChanges}
                    onUpdate={(vote: VoteType) => updateChanges(vote)}
                ></FormVotes>
            </Container >
        );
    }
}