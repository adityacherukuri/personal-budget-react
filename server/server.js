const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());

const budget = require("./budget.json");

app.get("/budget", (req, res) => {
  res.json(budget);
});

app.listen(port, () => {
  console.log(`app served at http://localhost:${port}`);
});
