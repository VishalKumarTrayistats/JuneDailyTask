import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo } from "../feature/todoSlice";

function App() {
  const todos = useSelector((state) => state.todo.todos);

  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(
      addTodo({
        id: Date.now(),
        text: "Learn Redux Toolkit",
      })
    );
  };

  return (
    <>
    <input></input>
      <button onClick={handleAdd}>Add Todo</button>

      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}

          <button
            onClick={() => dispatch(deleteTodo(todo.id))}
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
}

export default App;