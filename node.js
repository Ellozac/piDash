const { MongoClient } = require('mongodb');
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const port = 8080;

app.use(express.static("public")); 
app.use(express.json());

app.get("/", (req, res) => {
  res.redirect("/login.html");
});

var server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
