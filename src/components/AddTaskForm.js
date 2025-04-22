import React, { useState } from 'react';

const AddTaskForm = ({ addTask }) => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [dueDate, setDueDate] = useState('');
    const [tags, setTags] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!taskName) {
            setError('Task name is required');
            return;
        }
        addTask({ 
            name: taskName, 
            description: taskDescription, 
            priority, 
            dueDate, 
            tags: tags.split(',').map(tag => tag.trim()) 
        });
        setTaskName('');
        setTaskDescription('');
        setPriority('Medium');
        setDueDate('');
        setTags('');
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
            <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="dueDate">Due Date</label>
                <input
                    type="date"
                    id="dueDate"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="tags">Tags (comma-separated)</label>
                <input
                    type="text"
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />
            </div>
            <button type="submit" className="btn">Add Task</button>
        </form>
    );
};

export default AddTaskForm;