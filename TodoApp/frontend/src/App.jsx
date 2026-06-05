import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo } from "../feature/todoSlice";
import axios from "axios"
import { useState } from "react";
import { useEffect } from "react";



function App() {
  const [data,setData]=useState([]);



  const getData=async () => {
  try {
    const res=await axios.get("http://localhost:5000/getTodo");
    setData(res.data);
  } catch (error) {
    console.log("error")
  }
}
useEffect(()=>{
  getData()
},[])

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

      {data.map((datas) => (
        <div key={datas.id}>
          {datas.Name}

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