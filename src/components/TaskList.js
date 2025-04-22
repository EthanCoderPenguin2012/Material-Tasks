import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import AddTaskForm from './AddTaskForm';
import './TaskList.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [ws, setWs] = useState(null);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');

        socket.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'sync') {
                setTasks(data.tasks);
            }
        };

        socket.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        setWs(socket);

        return () => {
            socket.close();
        };
    }, []);

    const addTask = (task) => {
        const newTask = { ...task, id: Date.now() };
        setTasks([...tasks, newTask]);
        ws.send(JSON.stringify({ type: 'add', task: newTask }));
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
        ws.send(JSON.stringify({ type: 'delete', taskId }));
    };

    const toggleTaskCompletion = (taskId) => {
        const updatedTasks = tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
        const updatedTask = updatedTasks.find(task => task.id === taskId);
        ws.send(JSON.stringify({ type: 'update', task: updatedTask }));
    };

    return (
        <div className="task-list">
            <h2>My Tasks</h2>
            <AddTaskForm addTask={addTask} />
            <ul>
                {tasks.map(task => (
                    <TaskItem 
                        key={task.id} 
                        task={task} 
                        deleteTask={deleteTask} 
                        toggleTaskCompletion={toggleTaskCompletion} 
                    />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;