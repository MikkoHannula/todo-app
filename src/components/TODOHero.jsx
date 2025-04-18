import React from "react";

function TODOHero({ todos_completed, total_todos, activeList, onListChange, lists }) {
  const isAllCompleted = todos_completed === total_todos && total_todos > 0;
  
  return (
    <section className="todohero_section">
      <div className="tasks_info">
        <select 
          className="list_selector" 
          value={activeList} 
          onChange={(e) => onListChange(e.target.value)}
        >
          {lists.map(list => (
            <option key={list.id} value={list.id}>{list.name}</option>
          ))}
          <option value="new">+ New List</option>
        </select>
        <div className="completion_circle" style={{ backgroundColor: isAllCompleted ? "#22C55E" : "#FACC15" }}>
          <p className="text_small">{todos_completed}/{total_todos}</p>
        </div>
      </div>
    </section>
  );
}

export default TODOHero;