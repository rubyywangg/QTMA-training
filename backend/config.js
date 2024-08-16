/*stores configuration settings, which can include things like database connections (info abt how to connect to a database), API keys, app settings, et.c
Configuration settings typically include values that determine how your application behaves and interacts with external services


bc i confused package.json w config.js:
- package.json manages dependencies and scripts, these are all the libraries and packages your app needs to run
- config.js is used to manage application specific settings,it usually deals with connecting your app to external services that you are using
*/ 


//define the port on which this server will listen for requests, port number tells the server which application should handle that particular request
export const PORT = 5555; //port 555 is a common port for development servers

export const mongoDbURL = 'mongodb+srv://rubyywangg:qtma2024@todolist.aubit.mongodb.net/?retryWrites=true&w=majority&appName=todolist'; //this is the URL to connect to the MongoDB database