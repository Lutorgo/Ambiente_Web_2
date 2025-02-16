const Teacher = require("../models/teacherModel");

/**
 * Creates a teacher
 *
 * @param {*} req
 * @param {*} res
 */
const teacherPost = (req, res) => {
  const teacher = new Teacher();

  teacher.name = req.body.name;
  teacher.subject = req.body.subject;

  if (teacher.name && teacher.subject) {
    teacher.save(function (err) {
      if (err) {
        res.status(422);
        console.log('error while saving the teacher', err);
        res.json({
          error: 'There was an error saving the teacher'
        });
      }
      res.status(201); // CREATED
      res.header({
        'location': `http://localhost:3000/api/teachers/?id=${teacher.id}`
      });
      res.json(teacher);
    });
  } else {
    res.status(422);
    console.log('error while saving the teacher');
    res.json({
      error: 'No valid data provided for teacher'
    });
  }
};

/**
 * Get all teachers
 *
 * @param {*} req
 * @param {*} res
 */
const teacherGet = (req, res) => {
  // If a specific teacher is required
  if (req.query && req.query.id) {
    Teacher.findById(req.query.id, function (err, teacher) {
      if (err) {
        res.status(404);
        console.log('error while querying the teacher', err);
        res.json({ error: "Teacher doesn't exist" });
      }
      res.json(teacher);
    });
  } else {
    // Get all teachers
    Teacher.find(function (err, teachers) {
      if (err) {
        res.status(422);
        res.json({ error: err });
      }
      res.json(teachers);
    });
  }
};

/**
 * Delete one teacher
 *
 * @param {*} req
 * @param {*} res
 */
const teacherDelete = (req, res) => {
  // If a specific teacher is required
  if (req.query && req.query.id) {
    Teacher.findById(req.query.id, function (err, teacher) {
      if (err) {
        res.status(500);
        console.log('error while querying the teacher', err);
        res.json({ error: "Teacher doesn't exist" });
      }
      // If the teacher exists
      if (teacher) {
        teacher.remove(function (err) {
          if (err) {
            res.status(500).json({ message: "There was an error deleting the teacher" });
          }
          res.status(204).json({});
        });
      } else {
        res.status(404);
        console.log('error while querying the teacher', err);
        res.json({ error: "Teacher doesn't exist" });
      }
    });
  } else {
    res.status(404).json({ error: "You must provide a teacher ID" });
  }
};

/**
 * Updates a teacher
 *
 * @param {*} req
 * @param {*} res
 */
const teacherPatch = (req, res) => {
  // Get teacher by id
  if (req.query && req.query.id) {
    Teacher.findById(req.query.id, function (err, teacher) {
      if (err) {
        res.status(404);
        console.log('error while querying the teacher', err);
        res.json({ error: "Teacher doesn't exist" });
      }

      // Update the teacher object (patch)
      teacher.name = req.body.name ? req.body.name : teacher.name;
      teacher.subject = req.body.subject ? req.body.subject : teacher.subject;

      teacher.save(function (err) {
        if (err) {
          res.status(422);
          console.log('error while saving the teacher', err);
          res.json({
            error: 'There was an error saving the teacher'
          });
        }
        res.status(200); // OK
        res.json(teacher);
      });
    });
  } else {
    res.status(404);
    res.json({ error: "Teacher doesn't exist" });
  }
};

module.exports = {
  teacherGet,
  teacherPost,
  teacherPatch,
  teacherDelete
};