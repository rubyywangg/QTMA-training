import Trash from "./assets/Trash.jsx";

const ToDoItem = ({ todo, deleteTodo }) => {
  return (
    <div className="tasks">
      <input className="check" type="checkbox" />{/* input is specified as checkbox*/}
      <div className="integer-urna"> {todo.title} </div>{/*inside the item, place the title of the item*/}
      <button onClick = {() => deleteTodo(todo._id)} className="trash"> {/*when the button is clicked, the deleteTodo function is called with the id of the todo item as an argument*/}
        <Trash /> {/*renders the trash icon*/}
      </button>
    </div>
  );
};

export default ToDoItem;
