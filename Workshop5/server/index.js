const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');

// Database connection
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://127.0.0.1:27017/todo-api", { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

// Basic HTTP Authentication Middleware
const authMiddleware = basicAuth({
    users: { 'admin': 'password123' }, // Cambia estos valores en producción
    challenge: true, // Solicita autenticación al usuario
    unauthorizedResponse: (req) => {
        return req.auth ? 'Unauthorized' : { status: 401, message: 'Authentication required' };
    }
});

// Default route for home with authentication
app.get('/', authMiddleware, (req, res) => {
    res.send('Welcome to the API! Authentication successful.');
});

// Import controllers
const {
  taskPatch,
  taskPost,
  taskGet,
  taskDelete
} = require("./controllers/taskController.js");

const {
  studentPatch,
  studentPost,
  studentGet,
  studentDelete
} = require("./controllers/studentController.js");

const {
  teacherPatch,
  teacherPost,
  teacherGet,
  teacherDelete
} = require("./controllers/teacherController.js");

const {
  coursePatch,
  coursePost,
  courseGet,
  courseDelete
} = require("./controllers/courseController.js");

// Check for CORS
const cors = require("cors");
app.use(cors({
  domains: '*',
  methods: "*"
}));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
