import React from "react";

function Form({ setTodos }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const value = event.target.todo.value.trim();
    
    if (!value) return; // Prevent empty tasks
    
    const newTodo = {
      title: value,
      id: self.crypto.randomUUID(),
      is_completed: false,
    };
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
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
          required
        />
      </label>
      <button>
        <span className="visually-hidden">Submit</span>
        <svg>
          <path d="" />
        </svg>
      </button>
    </form>
  );
}

export default Form;