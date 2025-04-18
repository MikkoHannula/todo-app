import React from "react";

function TaskCounter({ todos }) {
  const completedTasks = todos.filter(todo => todo.is_completed).length;
  const totalTasks = todos.length;
  const isAllCompleted = completedTasks === totalTasks && totalTasks > 0;

  return (
    <div className="task-counter">
      <div className="completion_circle" style={{ backgroundColor: isAllCompleted ? "#22C55E" : "#FACC15" }}>
        <p className="text_small">{completedTasks}/{totalTasks}</p>
      </div>
    </div>
  );
}

function TODOList({ todos, setTodos }) {
  // Ensure todos is always an array
  const todoList = Array.isArray(todos) ? todos : [];
  
  return (
    <>
      <TaskCounter todos={todoList} />
      <ol className="todo_list">
        {todoList.map((item, index) => (
          <Item key={item.id} item={item} todos={todoList} setTodos={setTodos} />
        ))}
      </ol>
    </>
  );
}

function Item({ item, todos, setTodos }) {
  const [editing, setEditing] = React.useState(false);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, [editing]);

  const completeTodo = () => {
    const updatedTodos = todos.map((todo) =>
      todo.id === item.id
        ? { ...todo, is_completed: !todo.is_completed }
        : todo
    );
    setTodos(updatedTodos);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleDelete = () => {
    const updatedTodos = todos.filter((todo) => todo.id !== item.id);
    setTodos(updatedTodos);
  };

  const handleInputChange = (e) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === item.id ? { ...todo, title: e.target.value } : todo
    );
    setTodos(updatedTodos);
  };

  const handleInputSubmit = (event) => {
    event.preventDefault();
    setEditing(false);
  };

  const handleInputBlur = () => {
    setEditing(false);
  };

  return (
    <li id={item?.id} className="todo_item">
      {editing ? (
        <form className="edit-form" onSubmit={handleInputSubmit}>
          <label htmlFor="edit-todo">
            <input
              ref={inputRef}
              type="text"
              name="edit-todo"
              id="edit-todo"
              defaultValue={item?.title}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
            />
          </label>
        </form>
      ) : (
        <>
          <button className="todo_items_left" onClick={completeTodo}>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fillRule="nonzero" fill={item.is_completed ? "#22C55E" : "#FACC15"} />
            </svg>
            <p style={item.is_completed ? { textDecoration: "line-through" } : {}}>
              {item?.title}
            </p>
          </button>
          <div className="todo_items_right">
            <button onClick={handleEdit}>
              <span className="visually-hidden">Edit</span>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="#c2b39a"/>
              </svg>
            </button>
            <button onClick={handleDelete}>
              <span className="visually-hidden">Delete</span>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="#c2b39a"/>
              </svg>
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TODOList;