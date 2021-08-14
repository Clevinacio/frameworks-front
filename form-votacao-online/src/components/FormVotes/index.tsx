import React, { FormEvent, useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';

type VoteOptionsType = {
    option: string,
    count: number
}

type VoteType = {
    statement: string,
    voteOptions: VoteOptionsType[]
}

type DataVoteType = {
    statement: string,
    voteOption1: string,
    voteOption2: string,
    voteOption3: string,
}

type Props = {
    vote: VoteType,
    onCancel: () => void;
    onUpdate: (vote: VoteType) => void;
}

const FormVotes = ({ vote, onCancel, onUpdate }: Props) => {
    const [dataVote, setDataVote] = useState<DataVoteType>({} as DataVoteType);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        setDataVote({
            statement: vote.statement || '',
            voteOption1: vote.voteOptions[0].option || '',
            voteOption2: vote.voteOptions[1].option || '',
            voteOption3: vote.voteOptions[2].option || '',
        });
    }, [vote]);

    const handleChange = (event: FormEvent) => {
        const target = event.target as HTMLInputElement;
        const name = target.name;
        const value = target.value;
        setDataVote({ ...dataVote, [name]: value });
    };

    const handleSubmit = (event: FormEvent) => {
        const form = event.currentTarget as HTMLFormElement;

        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            const options = [
                { option: dataVote.voteOption1, count: 0 },
                { option: dataVote.voteOption2, count: 0 },
                { option: dataVote.voteOption3, count: 0 }
            ].filter(option => option.option !== '');
            onUpdate({
                statement: dataVote.statement,
                voteOptions: options
            });
        }
        setValidated(true);
    };

    return (
        <Row className="mb-3">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Enunciado *</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="statement"
                            rows={3}
                            placeholder="Digite o enunciado Enunciado..."
                            defaultValue={dataVote.statement}
                            minLength={3}
                            onChange={handleChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Esse campo é obrigatorio e deve possuir pelo menos 3 caracteres!
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>1ª opção *</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="voteOption1"
                            placeholder="1ª opção da votação..."
                            defaultValue={dataVote.voteOption1}
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Esse campo é obrigatorio!
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom03">
                        <Form.Label>2ª opção *</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="voteOption2"
                            placeholder="2ª opção da votação..."
                            defaultValue={dataVote.voteOption2}
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Esse campo é obrigatorio!
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom04">
                        <Form.Label>3ª opção</Form.Label>
                        <Form.Control
                            type="text"
                            name="voteOption3"
                            placeholder="3ª opção da votação..."
                            defaultValue={dataVote.voteOption3}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Text className="text-muted">
                        (*) Campos obrigatórios
                    </Form.Text>
                </Row>
                <Button type="submit">Salvar</Button>{' '}
                <Button variant="secondary" onClick={() => onCancel()}>Cancelar</Button>
            </Form>

        </Row>
    )
}

export default FormVotes;