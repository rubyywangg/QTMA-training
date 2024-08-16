/*
npm init-y : to start a new node project

express : is a framework for Node.js that helps with creating web applications and APIs
*/

import express, { response } from "express"; //import express
import mongoose from "mongoose"; //import mongoose, a library that helps us connect to MongoDB
import { mongoDbURL, PORT } from "./config.js";
import todosRoute from "./routes/toDoRoutes.js";
import cors from "cors"; // import cors package

//this will create our app's server
const app = express(); //initialize an instance of Express application using express() function

app.use(express.json()); //this is middleware, which is used to parse incoming JSON requests and make them available to read in the request body

/*this is to create an HTTP route 
- HTTP routes are a specific URL in the app that determines how a app should respond to HTTP requests with that URL
- HTTP requests are made by a client (like a web browser) to a server, the server asking for data or performing a method then sends a response back to the client
- get is a method that listens for GET requests to a specific URL, the first param is the string representing our route, the second param is a callback for handling the request
- the callback function has 2 parameters: request object and response object. The application listens for requests that match the specified route and method, and when a match is detected, it calls the callback function. */
app.get("/", (request, response) => {
  //this is a route handler, it listens for GET requests to the root URL of our app)
  console.log(request); //this will log the request object to the console
  return response.status(234).send("Hello world"); //sets the HTTP status code of the response to 234. Note that 234 is not a standard HTTP status code and is typically not used (404 is not found is a standard status code). when status is 234, the response will be "Hello world"
});

//tells our app to use the todosRoute router whenever a request's path starts with /api/todos.
app.use("/api/todos", todosRoute);

mongoose
  .connect(mongoDbURL) //this function establishes connection to mongodb database
  .then(() => {
    //if the connection is successful, this function will be called (which is the print statement)
    console.log("app connected to database");

    //this function will listen to our port and log a message to the console when the server is running
    app.listen(PORT, () => {
      //callback function will make sure our port is set up correctly
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    //if the connection is unsuccessful, this function will be called (which is the print statement)
    console.log(error);
  });

app.use(cors());
