"use client";
import React from "react";
import Form from "../components/Form";
import Header from "../components/Header";
import TODOList from "../components/TODOList";

function Home() {
  const [lists, setLists] = React.useState(() => {
    const storedLists = localStorage.getItem("todo-lists");
    if (storedLists) {
      return JSON.parse(storedLists);
    }
    // Create three default lists
    return [
      { id: "list1", name: "Personal", todos: [] },
      { id: "list2", name: "Work", todos: [] },
      { id: "list3", name: "Shopping", todos: [] }
    ];
  });

  React.useEffect(() => {
    localStorage.setItem("todo-lists", JSON.stringify(lists));
  }, [lists]);

  const handleNameChange = (listId, newName) => {
    setLists(lists.map(list => 
      list.id === listId ? { ...list, name: newName } : list
    ));
  };

  const updateTodos = (listId, newTodos) => {
    setLists(lists.map(list => 
      list.id === listId ? { ...list, todos: newTodos } : list
    ));
  };

  return (
    <div className="wrapper">
      <Header />
      <div className="lists-grid">
        {lists.map(list => (
          <div key={list.id} className="list-column">
            <input
              type="text"
              className="list-name"
              value={list.name}
              onChange={(e) => handleNameChange(list.id, e.target.value)}
            />
            <Form 
              todos={list.todos} 
              setTodos={(newTodos) => updateTodos(list.id, newTodos)} 
            />
            <TODOList 
              todos={list.todos} 
              setTodos={(newTodos) => updateTodos(list.id, newTodos)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;