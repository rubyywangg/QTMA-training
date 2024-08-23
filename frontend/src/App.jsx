//App.jsx
import { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import ToDoForm from "./ToDoForm";
import ToDoList from "./ToDoList";

const App = () => {
  const [todos, setTodos] = useState([]); //initialize the todos state variable to an empty array, the second parameter is to set the value of the state variable (if it were to change)
  const [newItem, setNewItem] = useState(""); //initialize the newItem state variable to an empty string, the second parameter is to set the value of the state variable (if it were to change)

  useEffect(() => {
    //useEffect is a hook that allows you to perform side effects in function components
    axios
      .get("http://localhost:5555/api/todos") //make a get request to the backend API to fetch a list of todos
      .then((response) => {
        //if the request is successful
        setTodos(response.data.data); //set the todos state variable to the data received from the server
      });
  }, []); //the second parameter is an array of dependencies, if the array is empty, the effect will only run once after the initial render

  //function for adding todos
  const addTodo = async (e) => {
    //async function to handle the form submission
    e.preventDefault(); //prevent the default form submission behavior
    const data = { title: newItem }; //create an object with the title property set to the value of the newItem state variable
    axios
      .post("http://localhost:5555/api/todos", data) //the new todo object is created with the title set to the value of newItem and then sent to the backend API via POST request
      .then(response => {
        setTodos([...todos, response.data]); //updates the todos state with the new todo item included
        setNewItem(""); //clears the input field
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
      });
  };

  //function for deleting todos
  const deleteTodo = async (id) => {
    //async function to handle the deletion of a todo item (the function receives the id of the todo to be deleted)
    try {
      await axios.delete(`http://localhost:5555/api/todos/${id}`); //sends a DELETE request to the backend API with the id of the todo item to be deleted
      setTodos(todos.filter((todo) => todo._id !== id)); //updates the todos array and rerenders the App component after the deletion of the todo (creates a new array that includes all the todo items except the one with the matching _id)
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="frame">
      <h1 className="text-wrapper">todo list</h1> {/*display the title*/}
      <ToDoForm newItem={newItem} setNewItem={setNewItem} addTodo={addTodo}/>{" "}
      {/*render the ToDoForm component*/}
      <ToDoList todos={todos} deleteTodo={deleteTodo} /> {/*render the ToDoList component*/}
    </div>
  );
};

export default App;
