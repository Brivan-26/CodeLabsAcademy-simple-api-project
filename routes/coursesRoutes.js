const express = require("express");
const path = require("path");
const coursesRouter = express.Router();
const {loadCourses, saveCourses} = require("../helpers/data.helper")


// data file path
const dataFile = path.join(__dirname, "..", "data", "courses.json");

  
  // The course class
class Course {
    constructor(id, title, level, description) {
      this.id = id;
      this.title = title;
      this.level = level;
      this.description = description;
    }
}

// Endpoint to get all courses
coursesRouter.get("/", async (req, res) => {
    try {
      const courses = await loadCourses(dataFile);
      res.json(courses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
});
  
// Endpoint to add a new course
coursesRouter.post("/", async (req, res) => {
      // We get data from the body
    const { id, title, level, description } = req.body;
  
    // Perform necessary checks
    // IMPORTANT: more robust validation needs to be made, we removed them for simplicity
    if (!id || !title || !description || !level) {
      return res.status(400).json({ message: "Missing required fields" });
    }
  
    const courses = await loadCourses(dataFile);
    const existingIds = courses.map((course) => course.id);
  
    // We check if the course with the given id already exists
    if (existingIds.includes(id)) {
      return res.status(409).json({ message: "Course ID already exists" });
    }
  
    // We push the new course and save the new list of courses to the JSON file
    const newCourse = new Course(id, title, level, description);
    courses.push(newCourse);
    await saveCourses(dataFile, courses);
  
    res.status(201).json({ message: "Course added successfully" });
});
  
// Endpoint to delete a course by ID
coursesRouter.delete("/:id", async (req, res) => {
  
      // We get the course if from params and check its validity
    const courseId = parseInt(req.params.id);
    if (isNaN(courseId)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }
  
    const courses = await loadCourses(dataFile);
    const filteredCourses = courses.filter((course) => course.id !== courseId);
  
    // A way to know if the course with the given id exists or not. 
    // If the course exists, then `filteredCourses` should be different then the original courses
    if (filteredCourses.length === courses.length) {
      return res.status(404).json({ message: "Course not found" });
    }
  
    // We save the new courses (that exclude the deleted course) to the JSON file
    await saveCourses(dataFile, filteredCourses);
    res.json({ message: "Course deleted successfully" });
});

module.exports = coursesRouter;