import React from 'react';
import { Container } from 'react-bootstrap';
import './App.scss';
import { ListFormVotes } from './components/ListFormVotes';

function App() {
    return (
        <div className="App">
            <Container>
                <h1>React</h1>
                <ListFormVotes />
            </Container>
        </div>
    );
}

export default App;
