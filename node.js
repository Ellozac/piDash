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


app.post("/loginReq", (req, res) => {
  const { username, password } = req.body;
  console.log(username)
})

var server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
