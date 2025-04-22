import React, { useState } from 'react';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import './assets/styles/main.css';
import { SpeedInsights } from '@vercel/speed-insights/react';
import SettingsMenu from './components/SettingsMenu';

const App = () => {
    const [tasks, setTasks] = useState([]);

    const addTask = (task) => {
        setTasks([...tasks, task]);
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const editTask = (updatedTask) => {
        setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    };

    const handleThemeChange = (theme) => {
        document.body.className = theme;
    };

    const handleFontChange = (font) => {
        document.body.style.fontFamily = font;
    };

    return (
        <div className="app-container">
            <h1>Material Tasks</h1>
            <SpeedInsights />
            <SettingsMenu onThemeChange={handleThemeChange} onFontChange={handleFontChange} />
            <AddTaskForm addTask={addTask} />
            <TaskList tasks={tasks} deleteTask={deleteTask} editTask={editTask} />
        </div>
    );
};

export default App;