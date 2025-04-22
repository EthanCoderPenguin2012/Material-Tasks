import React, { useState } from 'react';

const AddTaskForm = ({ addTask }) => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!taskName) {
            setError('Task name is required');
            return;
        }
        addTask({ name: taskName, description: taskDescription });
        setTaskName('');
        setTaskDescription('');
        setError('');
    };

    return (
        <form onSubmit={handleSubmit} className="add-task-form">
            <h2>Add New Task</h2>
            {error && <p className="error">{error}</p>}
            <div className="form-group">
                <label htmlFor="taskName">Task Name</label>
                <input
                    type="text"
                    id="taskName"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="taskDescription">Task Description</label>
                <textarea
                    id="taskDescription"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                />
            </div>
            <button type="submit" className="btn">Add Task</button>
        </form>
    );
};

export default AddTaskForm;