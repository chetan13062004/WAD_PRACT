const express = require("express");
const mongoose = require("mongoose");
const Student = require("./models/students");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/student")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Insert initial data
app.get("/insert", async (req, res) => {
  const data = [
    { Name: "Umesh", Roll_No: 1, WAD_Marks: 28, CC_Marks: 30, DSBDA_Marks: 22, CNS_Marks: 25, AI_Marks: 29 },
    { Name: "Amit", Roll_No: 2, WAD_Marks: 15, CC_Marks: 20, DSBDA_Marks: 19, CNS_Marks: 30, AI_Marks: 35 },
    { Name: "Priya", Roll_No: 3, WAD_Marks: 32, CC_Marks: 33, DSBDA_Marks: 31, CNS_Marks: 35, AI_Marks: 36 },
    { Name: "Ravi", Roll_No: 4, WAD_Marks: 10, CC_Marks: 15, DSBDA_Marks: 11, CNS_Marks: 20, AI_Marks: 17 },
    { Name: "Sneha", Roll_No: 5, WAD_Marks: 40, CC_Marks: 39, DSBDA_Marks: 41, CNS_Marks: 45, AI_Marks: 42 }
  ];
  await Student.insertMany(data);
  res.send("Data Inserted!");
});

// Display all + count
app.get("/", async (req, res) => {
  const stud = await Student.find();
  const count = await Student.countDocuments();
  res.render("index", { stud, count });
});

// Students with DSBDA > 20
app.get("/dsbda", async (req, res) => {
  const students = await Student.find({ DSBDA_Marks: { $gt: 20 } });
  res.json(students.map(s => s.Name));
});

// Update marks by 10 for a specified student
app.get("/update/:name", async (req, res) => {
  await Student.updateOne(
    { Name: req.params.name },
    { $inc: {
      WAD_Marks: 10, CC_Marks: 10, DSBDA_Marks: 10, CNS_Marks: 10, AI_Marks: 10
    }}
  );
  res.send(`Updated marks for ${req.params.name}`);
});

// List students with >25 in all subjects
app.get("/highscores", async (req, res) => {
  const students = await Student.find({
    WAD_Marks: { $gt: 25 },
    CC_Marks: { $gt: 25 },
    DSBDA_Marks: { $gt: 25 },
    CNS_Marks: { $gt: 25 },
    AI_Marks: { $gt: 25 }
  });
  res.json(students.map(s => s.Name));
});

// Students with <40 in both Maths and Science (WAD and CC)
app.get("/lowmathscience", async (req, res) => {
  const students = await Student.find({
    WAD_Marks: { $lt: 40 },
    CC_Marks: { $lt: 40 }
  });
  res.json(students.map(s => s.Name));
});

// Delete student by name
app.get("/delete/:name", async (req, res) => {
  await Student.deleteOne({ Name: req.params.name });
  res.send(`Deleted student ${req.params.name}`);
});

app.listen(3000, () => console.log("Server started on http://localhost:3000"));
