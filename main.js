import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/styles/main.css';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Task Management
    const taskForm = document.querySelector('#add-task-form form');
    const taskList = document.querySelector('#task-list ul');

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskName = document.querySelector('#task-name').value;
        const taskDesc = document.querySelector('#task-desc').value;
        const taskPriority = document.querySelector('#task-priority').value;
        const taskDueDate = document.querySelector('#task-due-date').value;
        const taskTags = document.querySelector('#task-tags').value;

        const taskItem = document.createElement('li');
        taskItem.textContent = `${taskName} - ${taskPriority} - Due: ${taskDueDate}`;
        taskList.appendChild(taskItem);

        taskForm.reset();
    });

    // AI Assistant
    const aiForm = document.querySelector('#ai-assistant form');
    const aiInput = document.querySelector('#ai-input');
    const aiResponse = document.querySelector('#ai-response');

    aiForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userInput = aiInput.value;
        aiResponse.textContent = 'Thinking...';

        try {
            const res = await fetch('http://localhost:5000/api/ai-assistant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input: userInput }),
            });
            const data = await res.json();
            aiResponse.textContent = data.response || data.error;
        } catch (error) {
            aiResponse.textContent = 'Error communicating with the AI assistant.';
        }
    });

    // Settings Menu
    const themeSelect = document.querySelector('#theme');
    const fontSelect = document.querySelector('#font');

    themeSelect.addEventListener('change', (e) => {
        document.body.className = e.target.value;
    });

    fontSelect.addEventListener('change', (e) => {
        document.body.style.fontFamily = e.target.value;
    });
});

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);