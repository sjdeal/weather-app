import { useEffect, useState } from 'react'
import './App.css'

function App() {
	const [message, setMessage] = useState('')
	
	useEffect(() => {
        fetch('/api/weather/ping')
            .then(response => response.json())
            .then(data => setMessage(data.message))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>React Application</h1>
            <p>Backend response: {message}</p>
        </div>
    );
}

export default App
