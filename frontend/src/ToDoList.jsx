//ToDoList.jsx
//in this file, we want to pass each todo through this todos prop, which is an array of todo objects
//the ToDoList component uses the map function to iteratate over the todos array and generate a toDoItem component for each todo object
import ToDoItem from "./ToDoItem";
const ToDoList = ({ todos, deleteTodo }) => {
  //pass the todos prop to the ToDoList component
  return (
    <div>
      {todos.map((todo) => (
        <ToDoItem
          key={todo._id}
          todo={todo}
          deleteTodo={deleteTodo}
        /> /*renders the ToDoItem component with unique id and title properties passed from the App component*/
      ))}
    </div>
  );
};

export default ToDoList;
