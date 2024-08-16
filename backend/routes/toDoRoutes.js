/*this will define which paths your apps will use
*/ 

import express from 'express';
import { toDo } from '../models/todoModel.js';

const router = express.Router(); //a router object is created to handle the routes
//todosRoute.js new http route for saving book
router.post('/', async (request, response) => { //this is a POST request, which is used to send data to the server
    try {
            // Validate the request body
        if (
            !request.body.title //if the title field is missing from the request body
        ) {
            return response.status(400).send({ //return a 400 status code and send an error message
                message: 'send all rq fields: title',
            });
        }
         // Create a new todo instance
        const newToDo = { //create a new todo object with the title field from the request body
            title: request.body.title, //the title field is set to the title field from the request body
         
        };
        
        // Save the new todo to the database
        const todo = await toDo.create(newToDo); //save the new todo object to the database using the create method, the await keyword is used to wait for the create method to finish executing (pauses execution of the code until the create method is done)
        // Return status 201 and send the saved todo to the client
        return response.status(201).send(todo); //if the todo is saved successfully, return a 201 status code and send the saved todo object to the client

    } catch (error) { //if an error occurs
        console.log(error.message); //log the error message to the console
        response.status(500).send({ message: error.message }) //return a 500 status code and send an error message to the client
    }

});

router.get('/', async (request, response) => {
    try {
        const todo = await toDo.find({});

        return response.status(200).json(
            {
                data: todo
            });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const todo = await toDo.findByIdAndDelete(id);
        if (!todo) {
            return response.status(404).json({ message: 'Book not found' })
        }

        return response.status(200).send({ message: 'successfully deleted book' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});

//to import our methods into index.js
export default router;

