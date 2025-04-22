import React from 'react';

const TaskItem = ({ task, onEdit, onDelete }) => {
    return (
        <div className="task-item glassmorphism">
            <h3 className="task-title">{task.title}</h3>
            <p className="task-description">{task.description}</p>
            <div className="task-actions">
                <button className="edit-button" onClick={() => onEdit(task.id)}>Edit</button>
                <button className="delete-button" onClick={() => onDelete(task.id)}>Delete</button>
            </div>
        </div>
    );
};

export default TaskItem;