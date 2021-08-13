import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import useVoteData from "../../hooks/useVoteData";
import FormVotes from "../FormVotes";

import "./style.scss";

export function ListFormVotes() {
    const [mode, setMode] = useState('view');
    const [current, setCurrent] = useState(0);

    const {
        votes,
        createVote,
        //updateVote,
        deleteVote,
    } = useVoteData();

    const addVote = () => {
        createVote();
        setCurrent(votes.length);
        setMode('add');
        console.log(votes.length);
    };

    const editVote = (index: number) => {
        setCurrent(index);
        setMode('edit');
    };

    const removeVote = (index: number) => {
        deleteVote(index);
    };

    const cancelChanges = (): void => {
        if (mode === 'add') {
            removeVote(votes.length - 1)
        }
        setMode('view')
    }

    if (mode === 'view') {
        const vt = votes.map((v: any, i: number) => (
            <>
                <p key={i}>
                    Enunciado da votação: {v.statement}
                </p>
                <Button variant="warning" onClick={() => editVote(i)}>Editar</Button>
                <Button variant="warning" onClick={() => removeVote(i)}>Remover</Button>
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
                <FormVotes vote={votes[current]} onCancel={cancelChanges}></FormVotes>
            </Container >
        );
    }
}