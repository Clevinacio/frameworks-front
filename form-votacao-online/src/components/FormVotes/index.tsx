import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';


export default class FormVotes extends React.Component {

    constructor(props: any) {
        super(props);
        this.state = {
            vote: {
                statement: props.question.statement || '',
                option1: props.question.options[0] || '',
                option2: props.question.options[1] || '',
                option3: props.question.options[2] || '',
            }
        }
    };

    render() {
        return (
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }
}