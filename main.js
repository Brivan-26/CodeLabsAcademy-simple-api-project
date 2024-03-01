const express = require("express");
const coursesRouter = require("./routes/coursesRouter");
const app = express();

const port = 3000;

app.use(express.json({ strict: true }));

// GET: /courses => get all courses
// POST: /courses => add a new course
// DELETE: /courses/:id => delete a new course
app.use("/courses", coursesRouter);

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
