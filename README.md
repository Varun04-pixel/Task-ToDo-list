# Task list with MongoDB
A simple To-Do list with ADD, UPDATE, READ and DELETE operations on tasks, this tasks are stored in mongoose DataBase

### `npm i`
to install the dependencies
### `Create a mongodb account and create a cluster`
[MongoDB.com](https://www.mongodb.com)
### `Connect the DB and copy the connection string`
create a .env file and assign the connection string to MongoDB_key

example :  MongoDB_key = mongodb+srv://User Name:<db_password>@User.idpgx43.mongodb.net/?retryWrites=true&w=majority&appName=Name
### `nodemon server.js`
in your terminal run `nodemon server.js`
runs the app on [localhost:3000](http://localhost:3000)
The server will auto reload when you make changes.

now your mongodb collection updates when you add, delete, or update a task
