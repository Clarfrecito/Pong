const express = require("express");
const { findAvailablePort } = require("./port.js");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "../frontend")));
findAvailablePort()
  .then((port) => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error finding an available port:", err);
  });
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});