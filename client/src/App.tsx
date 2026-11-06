import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
// import './App.css';
import CurrentConditions from './components/CurrentConditions';

export default function App() {
    useEffect(() => {document.title = "Weather"});

    return (
        <Container>
            <h1>Weather</h1>
            <CurrentConditions/>
        </Container>
    );
}
