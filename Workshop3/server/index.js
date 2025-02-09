const express = require('express');
const app = express();
const path = require('path');

// Database connection
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://127.0.0.1:27017/todo-api");

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

// Parser for the request body (required for POST and PUT methods)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Check for CORS
const cors = require("cors");
app.use(cors({
  domains: '*',
  methods: "*"
}));

// Routes for tasks
app.get("/api/tasks", taskGet);
app.post("/api/tasks", taskPost);
app.patch("/api/tasks", taskPatch);
app.put("/api/tasks", taskPatch);
app.delete("/api/tasks", taskDelete);

// Routes for students
app.get("/api/students", studentGet);
app.post("/api/students", studentPost);
app.patch("/api/students", studentPatch);
app.put("/api/students", studentPatch);
app.delete("/api/students", studentDelete);

// Routes for teachers
app.get("/api/teachers", teacherGet);
app.post("/api/teachers", teacherPost);
app.patch("/api/teachers", teacherPatch);
app.put("/api/teachers", teacherPatch);
app.delete("/api/teachers", teacherDelete);

app.use(express.static(path.join(__dirname, '../client')));


// Start the server
app.listen(3000, () => console.log(`Example app listening on port 3000!`));