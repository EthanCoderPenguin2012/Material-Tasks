import React, { useState } from 'react';
import './AiAssistant.css';

const AiAssistant = () => {
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/ai-assistant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input: userInput }),
            });
            const data = await res.json();
            setResponse(data.response || data.error);
        } catch (error) {
            setResponse('Error communicating with the AI assistant.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ai-assistant">
            <h2>AI Assistant</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={userInput}
                    onChange={handleInputChange}
                    placeholder="Ask the AI assistant..."
                    rows="4"
                ></textarea>
                <button type="submit" disabled={loading}>
                    {loading ? 'Thinking...' : 'Ask'}
                </button>
            </form>
            {response && <div className="response">{response}</div>}
        </div>
    );
};

export default AiAssistant;