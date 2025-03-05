const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  credits: { type: Number, required: true },
  teacher: {
    type: mongoose.ObjectId,
    ref: 'Teacher', // Referencia al modelo Teacher
    required: true,
  },
});

module.exports = mongoose.model('Course', courseSchema);
