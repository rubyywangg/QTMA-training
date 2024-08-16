/*this will define which paths your apps will use
 */

import express from "express";
import { toDo } from "../models/todoModel.js";

const router = express.Router(); //a router object is created to handle the routes
//todosRoute.js new http route for saving book
router.post("/", async (request, response) => {
  //this is a POST request, which is used to send data to the server
  try {
    // Validate the request body
    if (
      !request.body.title //if the title field is missing from the request body
    ) {
      return response.status(400).send({
        //return a 400 status code and send an error message
        message: "send all rq fields: title",
      });
    }
    // Create a new todo instance
    const newToDo = {
      //create a new todo object with the title field from the request body
      title: request.body.title, //the title field is set to the title field from the request body
    };

    // Save the new todo to the database
    const todo = await toDo.create(newToDo); //save the new todo object to the database using the create method, the await keyword is used to wait for the create method to finish executing (pauses execution of the code until the create method is done)
    // Return status 201 and send the saved todo to the client
    return response.status(201).send(todo); //if the todo is saved successfully, return a 201 status code and send the saved todo object to the client
  } catch (error) {
    //if an error occurs
    console.log(error.message); //log the error message to the console
    response.status(500).send({ message: error.message }); //return a 500 status code and send an error message to the client
  }
});

router.get("/", async (request, response) => {
  //this is a GET request, which is used to retrieve data from the server
  try {
    const todo = await toDo.find({}); //find all todos in the database using the find method

    return response.status(200).json(
      //return a 200 status code and send the todos to the client
      {
        data: todo, //the data field is set to the todos array
      }
    );
  } catch (error) {
    //if an error occurs
    console.log(error.message); //log the error message to the console
    response.status(500).send({ message: error.message }); //return a 500 status code and send an error message to the client
  }
});

router.delete("/:id", async (request, response) => {
  //this is a DELETE request, which is used to delete data from the server
  try {
    const { id } = request.params; //get the id parameter from the request

    const todo = await toDo.findByIdAndDelete(id); //find the todo with the specified id and delete it using the findByIdAndDelete method
    if (!todo) {
      //if the todo is not found
      return response.status(404).json({ message: "Book not found" }); // return a 404 status code and send an error message
    }

    return response.status(200).send({ message: "successfully deleted book" }); //return a 200 status code and send a success message
  } catch (error) {
    //if an error occurs
    console.log(error.message); //log the error message to the console
    response.status(500).send({ message: error.message }); //return a 500 status code and send an error message to the client
  }
});

//to import our methods into index.js
export default router;
