const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/projects");

var projectSchema = new mongoose.Schema({
  title: String,
  client: String,
});

var Project = mongoose.model("Project", projectSchema);

// Adding new project to the database
// Project.create(
//   {
//     title: "Renovation of Boys Hostel, UNN",
//     client: "University of Nigeria, Nsukka",
//   },
//   (err, proj) => {
//     if (err) {
//       console.log("There is an error!");
//       console.log(err);
//     } else {
//       console.log("Data created and saved!");
//       console.log(proj);
//     }
//   }
// );

// Find all the projects

Project.find({}, (err, proj) => {
  if (err) {
    console.log("Ohhh, There is an error");
    console.log(err);
  } else {
    console.log(proj);
  }
});
