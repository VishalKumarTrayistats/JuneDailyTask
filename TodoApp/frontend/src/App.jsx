import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  const addOrUpdateTodo = () => {
    if (!name || !age) return;

    if (editId !== null) {
      // Update
      setTodos(
        todos.map((todo) =>
          todo.id === editId
            ? { ...todo, name, age }
            : todo
        )
      );

      setEditId(null);
    } else {
      // Add
      const newTodo = {
        id: Date.now(),
        name,
        age,
      };

      setTodos((prev) => [...prev, newTodo]);
    }

    setName("");
    setAge("");
  };

  const handleEdit = (todo) => {
    setName(todo.name);
    setAge(todo.age);
    setEditId(todo.id);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));

    if (editId === id) {
      setEditId(null);
      setName("");
      setAge("");
    }
  };

  return (
    <div>
      <h1>Todo App</h1>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Enter Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <button onClick={addOrUpdateTodo}>
        {editId !== null ? "Update" : "Add"}
      </button>

      <hr />

      {todos.map((todo) => (
        <div
          key={todo.id}
          style={{
            border: "1px solid black",
            padding: "10px",
            margin: "10px 0",
          }}
        >
          <h3>Name: {todo.name}</h3>
          <p>Age: {todo.age}</p>

          <button onClick={() => handleEdit(todo)}>
            Edit
          </button>

          <button
            onClick={() => handleDelete(todo.id)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;