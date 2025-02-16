const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

// Database connection
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://127.0.0.1:27017/todo-api", { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());


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

// Parser for the request body (required for POST and PUT methods)



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

// Routes for courses
app.get("/api/courses", courseGet);
app.post("/api/courses", coursePost);
app.patch("/api/courses", coursePatch);
app.put("/api/courses", coursePatch);
app.delete("/api/courses", courseDelete);

app.use(express.static(path.join(__dirname, '../client')));


// Start the server
app.listen(3000, () => console.log(`Example app listening on port 3000!`));