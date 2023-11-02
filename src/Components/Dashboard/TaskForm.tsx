import React, { useState } from 'react';

interface Props{
  onClose: any,
  onAddTask: any
}

const TaskForm = ({ onClose, onAddTask }: Props) => {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: 'Not Started',
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (newTask.title.trim() === '') {
      alert('Please enter a title for the new task.');
      return;
    }

    onAddTask(newTask);
    setNewTask({ title: '', description: '', category: 'Not Started' });

    onClose();
  };

  return (
    <div className="form-modal">
      <div className="form-container">
        <h2 className="fw-semibold">Add a New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={newTask.category}
              onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Blocked">Blocked</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <button className="btn btn-primary" type="submit">
            Add Task
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
