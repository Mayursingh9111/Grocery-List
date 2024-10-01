import React, { useState, useEffect } from 'react';
import './App.css'; // Import your CSS file for styles

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  // Load tasks from local storage on component mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Handle adding a new task
  const addTask = () => {
    if (task.trim() === '') return;
    setTasks([...tasks, task.trim()]);
    setTask('');
    showAlert('Task added!', 'success');
  };

  // Handle deleting a task
  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    showAlert('Task deleted!', 'error');
  };

  // Handle clearing all tasks
  const clearTasks = () => {
    setTasks([]);
    localStorage.removeItem('tasks'); // Clear tasks from local storage
    showAlert('All tasks cleared!', 'error');
  };

  // Alert function
  const showAlert = (message, type) => {
    const alert = document.createElement('div');
    alert.textContent = message;
    alert.className = `alert ${type}`;
    document.body.appendChild(alert);
    setTimeout(() => {
      alert.remove();
    }, 2000);
  };

  return (
    <div className="app-container">
      <h1 className="heading">Grocery List</h1>
      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task..."
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map((t, index) => (
          <li key={index} className="task-item">
            <span>{t}</span>
            <button className="delete-button" onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <button className="clear-button" onClick={clearTasks}>
        Clear All Tasks
      </button>
    </div>
  );
}

export default App;
