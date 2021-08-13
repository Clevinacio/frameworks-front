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

type Props = {
    vote: VoteType,
    onCancel: () => void;
}

const FormVotes = ({ vote, onCancel }: Props) => {
    const [currentVote, setCurrentVote] = useState<VoteType>();

    const [validated, setValidated] = useState(false);

    useEffect(() => {
        setCurrentVote(vote);
    }, [vote]);

    const handleSubmit = (event: FormEvent) => {
        console.log("aqui");
        const form = event.currentTarget as HTMLFormElement;
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    return (
        <Row className="mb-3">

            <Form noValidate validated={validated} onSubmit={(event) => handleSubmit(event)}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Enunciado *</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Digite o enunciado Enunciado..."
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Esse campo é obrigatorio!
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>1ª opção *</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="1ª opção da votação..."
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
                            placeholder="2ª opção da votação..."
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
                            placeholder="3ª opção da votação..."
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