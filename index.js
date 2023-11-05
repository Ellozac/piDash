const express = require("express");
const sqlite = require("sqlite3").verbose();
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const port = 8080;
var userCheck = null;
let db = new sqlite.Database('database.sqlite');
db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, username TEXT NOT NULL, password TEXT NOT NULL, email TEXT, salt BLOB NOT NULL);");
app.use(express.static("public")); 
app.use(express.json());

function randIntBetween(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
app.get("/", (req, res) => {
  res.redirect("/login.html");
});


app.post("/loginReq", (req, res) => {
  const { username, password } = req.body;
  // Add username password check then return signed JWT token 
  res.sendStatus(200);
});


app.post("/signupInfo", (req, res) => {
  const { username, password, email } = req.body;
  console.log(email, password, username);
  if (!username || !password) {
    return res.sendStatus(400); 
  }

  db.get("SELECT username FROM users WHERE username = ?", [username], (err, user) => {
    if (err) {
      console.log(err);
    }
    if (user) {
      return res.sendStatus(409);
    }
    var salt = randIntBetween(10,30)
    bcrypt.hash(password, salt, (err, hash) => {
      var passwordHash = hash;
      db.run("INSERT INTO users (username, password, email, salt) VALUES (?, ?, ?, ?)", [username, passwordHash, email, salt], (err) => {
      if (err) {
        return res.sendStatus(500);
        console.log(err);
      }
      return res.sendStatus(200); 
      });

    });

     });
});

var server = app.listen(8080,'0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
