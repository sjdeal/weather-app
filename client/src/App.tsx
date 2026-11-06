import { useEffect, useState } from 'react'
import './App.css'
import CurrentConditions from './components/CurrentConditions';

export default function App() {
	const [message, setMessage] = useState<string>('');

    useEffect(() => {document.title = "Weather"});

    return (
        <div>
            <h1>Weather</h1>
            <p>Backend response: {message}</p>
            <CurrentConditions/>
        </div>
    );
}
