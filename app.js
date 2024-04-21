const path = require("path");
const express = require("express");
const OS = require("os");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/")));
app.use(cors());

mongoose.connect("mongodb+srv://ayowilfred:metropolitan95@cluster0.uhwgu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    app.listen(3000, () => {
        console.log("Server successfully running on port - " + 3000);
      });
}).catch((error)=>{
    console.log("Error connecting to database",error)
})

var Schema = mongoose.Schema;

var dataSchema = new Schema({
  name: String,
  id: Number,
  description: String,
  image: String,
  velocity: String,
  distance: String,
});
var planetModel = mongoose.model("planets", dataSchema);

app.post("/planet", function (req, res) {
    planetModel.findOne(
      {
        id: req.body.id,
      },
      function (err, planetData) {
        if (err) {
          console.error("Error finding planet data:", err);
          res.status(500).send("Error finding planet data");
        } else {
          if (!planetData) {
            res.status(404).send("Planet not found");
          } else {
            res.send(planetData);
          }
        }
      }
    );
  });
  

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "/", "index.html"));
});

app.get("/os", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send({
    os: OS.hostname(),
    env: process.env.NODE_ENV,
  });
});

app.get("/live", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send({
    status: "live",
  });
});

app.get("/ready", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send({
    status: "ready",
  });
});



module.exports = app;
