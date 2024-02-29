const fs = require("fs");

// Function to load courses from the JSON file
const loadCourses = async (path) => {
  try {
    const data = await fs.promises.readFile(path, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") { // this error code means the file does not exist
      throw new Error("Courses file not found");
    } else {
      throw error;
    }
  }
};

// Function to save courses to the JSON file
const saveCourses = async (path, courses) => {
  try {
    const data = JSON.stringify(courses, null, 2); // Format JSON with indentation
    await fs.promises.writeFile(path, data);
  } catch (error) {
    throw error;
  }
};

module.exports = {
    loadCourses,
    saveCourses
}