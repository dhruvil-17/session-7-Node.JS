# Simple Todo App

A simple todo application built with Node.js, Express, and MongoDB using Mongoose.

## Features

- Add new todos
- Mark todos as completed
- Edit existing todos
- Delete todos
- Responsive web interface

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)

## Installation

1. Navigate to the project directory:
   ```bash
   cd todos
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Make sure MongoDB is running locally, or update the `MONGODB_URI` in `.env` file for a remote database.

4. Start the application:
   ```bash
   npm start
   ```
   
   For development with auto-restart:
   ```bash
   npm run dev
   ```

5. Open your browser and go to `http://localhost:3000`

## API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Project Structure

```
todos/
├── models/
│   └── Todo.js          # MongoDB schema
├── routes/
│   └── todos.js         # API routes
├── public/
│   ├── index.html       # Frontend HTML
│   ├── script.js        # Frontend JavaScript
│   └── style.css        # Frontend CSS
├── server.js            # Main server file
├── package.json         # Dependencies
└── .env                 # Environment variables
```