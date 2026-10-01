const express = require("express");

const app = express();
const PORT = 3000;

// Let Express read JSON request bodies
app.use(express.json());

// In-memory data store
let students = [];
let nextId = 1;

// Add a student
app.post("/students", (req, res) => {
  const { name, age, course } = req.body;

  if (!name || age === undefined || !course) {
    return res.status(400).json({
      message: "Name, age, and course are required.",
    });
  }

  const student = {
    id: nextId++,
    name,
    age,
    course,
  };

  students.push(student);
  res.status(201).json(student);
});

// Get all students
app.get("/students", (req, res) => {
  res.json(students);
});

// Get one student by ID
app.get("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((student) => student.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found." });
  }

  res.json(student);
});

// Update a student by ID
app.put("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((student) => student.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found." });
  }

  const { name, age, course } = req.body;

  if (!name || age === undefined || !course) {
    return res.status(400).json({
      message: "Name, age, and course are required.",
    });
  }

  student.name = name;
  student.age = age;
  student.course = course;

  res.json(student);
});

// Delete a student by ID
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const studentIndex = students.findIndex((student) => student.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student not found." });
  }

  students.splice(studentIndex, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Student API is running at http://localhost:${PORT}`);
});