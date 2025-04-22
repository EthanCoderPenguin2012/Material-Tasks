import React, { useState } from 'react';
import TaskItem from './TaskItem';
import AddTaskForm from './AddTaskForm';
import './TaskList.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    const addTask = (task) => {
        setTasks([...tasks, task]);
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const toggleTaskCompletion = (taskId) => {
        setTasks(tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
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