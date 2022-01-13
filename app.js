const express = require("express");
const port = 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("This is the home page");
});

app.get("/bye", (req, res) => {
  res.send("Goodbye!");
  console.log("SOMEONE HAS MADE A REQUEST TO THIS PAGE")
});
app.listen(port, function () {
  console.log(`The server is connected to ${port}`);
});
