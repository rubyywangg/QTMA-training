//ToDoForm.jsx
import Plus from "./assets/Plus.jsx"; //import the plus icon

const ToDoForm = ({newItem, setNewItem, addTodo}) => { //pass the newItem, setNewItem, and addTodo (function) props to the ToDoForm component
  return (
    //this is the form that will allow you to add a task to the list
    <div className="todo">{/*the form is wrapped in a div with the class name todo*/}
      <form onSubmit = {addTodo} className="new-task">
        <input type="text" value = {newItem} onChange = {(e) => setNewItem(e.target.value)} className="input" placeholder="todo" />
        <button className="button">
          <Plus /> {/*renders and adds the Plus component inside the button*/}
        </button>
      </form>
    </div>
  );
};

export default ToDoForm;
