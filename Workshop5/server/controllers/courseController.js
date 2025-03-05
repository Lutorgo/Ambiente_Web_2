const mongoose = require('mongoose');
const Course = require('../models/courseModel');

// Crear un curso
const coursePost = (req, res) => {
  const course = new Course();

  course.name = req.body.name;
  course.credits = req.body.credits;
  course.teacher = req.body.teacher; // Este debe ser un ObjectId válido de Teacher

  // Verificar si el ID del profesor es válido
  if (!mongoose.Types.ObjectId.isValid(course.teacher)) {
    return res.status(400).json({ error: "Invalid teacher ID" });
  }

  if (course.name && course.credits && course.teacher) {
    course.save(function (err) {
      if (err) {
        res.status(422);
        console.log('Error while saving the course', err);
        res.json({
          error: 'There was an error saving the course'
        });
      }
      res.status(201); // CREATED
      res.header({
        'location': `http://localhost:3000/api/courses/?id=${course.id}`
      });
      res.json(course);
    });
  } else {
    res.status(422);
    console.log('Error while saving the course');
    res.json({
      error: 'No valid data provided for course'
    });
  }
};

// Obtener todos los cursos o un curso específico por ID
const courseGet = (req, res) => {
  // Si se requiere un curso específico
  if (req.query && req.query.id) {
    Course.findById(req.query.id)
      .populate('teacher') // Esto obtendrá los datos completos del profesor
      .exec(function (err, course) {
        if (err) {
          res.status(404);
          console.log('Error while querying the course', err);
          res.json({ error: "Course doesn't exist" });
        }
        res.json(course);
      });
  } else {
    // Obtener todos los cursos
    Course.find()
      .populate('teacher') // Esto completará los datos de todos los profesores
      .exec(function (err, courses) {
        if (err) {
          res.status(422);
          res.json({ error: err });
        }
        res.json(courses);
      });
  }
};

// Eliminar un curso
const courseDelete = (req, res) => {
  if (req.query && req.query.id) {
    Course.findById(req.query.id, function (err, course) {
      if (err) {
        res.status(500);
        console.log('Error while querying the course', err);
        res.json({ error: "Course doesn't exist" });
      }

      // Si el curso existe, lo eliminamos
      if (course) {
        course.remove(function (err) {
          if (err) {
            res.status(500).json({ message: "There was an error deleting the course" });
          }
          res.status(204).json({});
        });
      } else {
        res.status(404);
        console.log('Error while querying the course', err);
        res.json({ error: "Course doesn't exist" });
      }
    });
  } else {
    res.status(404).json({ error: "You must provide a course ID" });
  }
};

// Actualizar un curso
const coursePatch = (req, res) => {
  if (req.query && req.query.id) {
    Course.findById(req.query.id, function (err, course) {
      if (err) {
        res.status(404);
        console.log('Error while querying the course', err);
        res.json({ error: "Course doesn't exist" });
      }

      // Actualizar los campos del curso (patch)
      course.name = req.body.name ? req.body.name : course.name;
      course.subject = req.body.subject ? req.body.subject : course.subject;

      course.save(function (err) {
        if (err) {
          res.status(422);
          console.log('Error while saving the course', err);
          res.json({
            error: 'There was an error saving the course'
          });
        }
        res.status(200); // OK
        res.json(course);
      });
    });
  } else {
    res.status(404);
    res.json({ error: "Course doesn't exist" });
  }
};

module.exports = {
  courseGet,
  coursePost,
  coursePatch,
  courseDelete
};
