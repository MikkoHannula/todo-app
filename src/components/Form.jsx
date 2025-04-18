import React from "react";

function Form({ todos, setTodos }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const value = event.target.todo.value.trim();
    
    if (!value) return; // Prevent empty tasks
    
    const newTodo = {
      title: value,
      id: self.crypto.randomUUID(),
      is_completed: false,
    };
    
    // Ensure we have an array to work with
    const currentTodos = Array.isArray(todos) ? todos : [];
    const updatedTodos = [...currentTodos, newTodo];
    setTodos(updatedTodos);
    event.target.reset();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="todo">
        <input
          type="text"
          name="todo"
          id="todo"
          placeholder="Write your next task"
          onBlur={(e) => {
            // Allow the input to lose focus even if empty
            e.target.setCustomValidity('');
          }}
        />
      </label>
      <button type="submit">
        <span className="visually-hidden">Submit</span>
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="#fff"/>
        </svg>
      </button>
    </form>
  );
}

export default Form;