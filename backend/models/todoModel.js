import mongoose from "mongoose"; //import mongoose, a library that helps us connect to MongoDB

//creating our ToDo data model
//Each object created when you define a Mongoose scheme will be auto created with an id value, which is used to identify the object.
const toDoSchema = mongoose.Schema( //this is a schema, which is a blueprint for how our data should be structured
    {   //this is an object (called title) that defines the fields of our schema
        title: {
            type: String, //the title will be of type String
            required: true //makes the title field mandatory
        },
    }
);

export const toDo = mongoose.model('toDo', toDoSchema); //exports the mongoose model based on toDoSchema, model name is toDo and is used to interact with the toDos collection in MongoDB
