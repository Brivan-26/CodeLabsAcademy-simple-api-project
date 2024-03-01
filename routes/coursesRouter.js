const express = require("express");
const path = require("path");
const { loadCourses } = require("../helpers/data.helper");
const coursesRouter = express.Router();

coursesRouter.get("/", async (req, res) => {
  try {
    const dataFile = path.join(__dirname, "..", "data", "courses2.json");
    const courses = await loadCourses(dataFile);
    res.json(courses);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server error" });
  }
});

coursesRouter.post("/", async (req, res) => {
  // We get the data sent by the user
  // We validate the data
  //    if something wrong, we terminate the req, and send an error
  //    if all good, we continue
  const { id, title, description, level } = req.body;
  if (!id || !title || !description || !level) {
    return res.status(400).json({ message: "Missing data" });
  }

  if (isNaN(id)) return res.status(400).json({message: "Id is not a number!"})

});

module.exports = coursesRouter;
