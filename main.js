const express = require("express");
const coursesRouter = require("./routes/coursesRoutes");

const app = express();
const port = process.env.PORT || 3000;

// Middleware to handle invalid JSON payloads
app.use(express.json({ strict: true })); // Throws error for invalid or missing JSON bodies

// Make use of our custom route
app.use("/courses", coursesRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
