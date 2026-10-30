import { useState } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  // 1. Add a task
  const addTodo = () => {
    if (task.trim() === "") return; // Don't add empty tasks
    const newTodo = {
      id: Date.now(), // Unique ID for each task
      text: task,
      completed: false
    };
    setTodos([...todos, newTodo]);
    setTask(""); // Clear the input field
  };

  // 2. Delete a task
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  // 3. Mark as completed
  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className="app-container">
      <h1>My To-Do List</h1>
      
      <div className="input-container">
        <input 
          type="text" 
          placeholder="What needs to be done?" 
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()} // Add on Enter key
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.length === 0 ? (
          <p className="empty-msg">No tasks yet. Add one above!</p>
        ) : (
          todos.map((todo) => (
            <li key={todo.id} className={`todo-item ${todo.completed ? "completed" : ""}`}>
              <span onClick={() => toggleComplete(todo.id)}>
                {todo.text}
              </span>
              <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
                ✕
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;