const fs = require("fs");
const loadCourses = async (path) => {
  // it opens a file
  // return whatever it read
  try {
    const data = await fs.promises.readFile(path, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("Courses file not found!");
    } else {
      throw err;
    }
  }
};

module.exports = {
  loadCourses,
};
