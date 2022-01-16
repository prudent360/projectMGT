const express = require("express");
const bp = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

// connect to mongoose db
mongoose.connect("mongodb://localhost/projects");

app.use(express.static("public"));
app.use(bp.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Setting up project schema
var projectSchema = new mongoose.Schema({
  title: String,
  client: String,
  init_cost: Number,
  final_cost: Number,
  start_date: Date,
  finish_date: Date
});

var Project = new mongoose.model("Project", projectSchema);

// Create and save project

// Project.create(
//   {
//     title: "Dualization of Uruk Anam road",
//     client: "Uruk Anam Local Government",
//     init_cost: 200000,
//     final_cost: 300000

//   },
//   (err, proj) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(proj);
//     }
//   }
// );

app.get("/", (req, res) => {
  var homepage = "Homepage";
  res.render("home", { homepage: homepage });
});

app.get("/projects", (req, res) => {
  // Get all projects from the database
  Project.find({}, (err, proj) => {
    if (err) {
      console.log("There is an error!");
      console.log(err);
    } else {
      res.render("projects", { proj: proj });
    }
  });
  // res.render("projects", { projects: projects });
});


app.get("/addproject", (req, res) => {
  res.render("add-project");
});

//SHOW ROUTE
app.get("/project/:id", (req, res) => {
  Project.findById(req.params.id, (err, foundProject) => {
    if (err) {
      res.redirect("/projects");
    } else {
      res.render("single-project", {single: foundProject});
    }
  });
});

// EDIT ROUTE
app.get("/project/:id/edit", (req, res) => {
  res.render("edit");
});

app.post("/addproject", (req, res) => {
  var title = req.body.title;
  var client = req.body.client;
  var init_cost = req.body.init_cost;
  var final_cost = req.body.final_cost;
  var start_date = req.body.start_date;
  var finish_date = req.body.finish_date;
  var newProject = {
    title: title,
    client: client,
    init_cost: init_cost,
    final_cost: final_cost,
    start_date: start_date,
    finish_date: finish_date
  };

  // Create a new project and save it into the DB
  Project.create(newProject, (err, newly_created) => {
    if (err) {
      console.log("Cannot create new project");
      console.log(err);
    } else {
      res.redirect("/projects");
    }
  });
});

app.get("*", (req, res) => {
  res.send("Page not found. What are you doing with your life?");
});

app.listen(port, function () {
  console.log(`The server is connected to ${port}`);
});
