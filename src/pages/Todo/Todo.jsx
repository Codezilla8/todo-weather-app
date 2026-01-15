import { useEffect, useState } from "react";
import "./Todo.css";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo(e) {
    e.preventDefault();
    if (!input.trim()) return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: input.trim(),
        completed: false,
      },
    ]);

    setInput("");
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <div className="todo-page">

      <div className="todo-container">

        {/* Header */}
        <header className="todo-header">
          <h1>My Tasks</h1>
          <p>Stay organised. Stay sharp.</p>
        </header>

        {/* Input */}
        <form className="todo-form" onSubmit={addTodo}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What needs to be done?"
          />
          <button>Add</button>
        </form>

        {/* Todo List */}
        <div className="todo-list">

          {todos.length === 0 && (
            <div className="empty-state">
              No tasks yet. Add one!
            </div>
          )}

          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`todo-card ${
                todo.completed ? "completed" : ""
              }`}
            >
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span>{todo.text}</span>
              </label>

              <button
                className="delete-btn"
                onClick={() => deleteTodo(todo.id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
