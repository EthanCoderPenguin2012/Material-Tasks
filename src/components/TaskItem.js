import React from 'react';

const TaskItem = ({ task, onEdit, onDelete }) => {
    return (
        <div className="task-item glassmorphism">
            <h3 className="task-title">{task.title}</h3>
            <p className="task-description">{task.description}</p>
            <p className="task-priority">Priority: {task.priority}</p>
            <p className="task-due-date">Due Date: {task.dueDate || 'No due date'}</p>
            <p className="task-tags">Tags: {task.tags && task.tags.length > 0 ? task.tags.join(', ') : 'No tags'}</p>
            <div className="task-actions">
                <button className="edit-button" onClick={() => onEdit(task.id)}>Edit</button>
                <button className="delete-button" onClick={() => onDelete(task.id)}>Delete</button>
            </div>
        </div>
    );
};

export default TaskItem;