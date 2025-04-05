const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});
app.use(express.static(path.join(__dirname, "../frontend")));
