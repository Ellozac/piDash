const express = require("express");
const sqlite = require("sqlite3").verbose();
const app = express();
const jwt = require("jsonwebtoken");
const port = 8080;
var userCheck = null;
let db = new sqlite.Database('database.sqlite');
db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, username TEXT NOT NULL, password TEXT NOT NULL, email TEXT);");
app.use(express.static("public")); 
app.use(express.json());

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
    if (user) {
      return res.sendStatus(409);
    }

    db.run("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", [username, password, email], (err) => {
      if (err) {
        return res.sendStatus(500); 
      }
      return res.sendStatus(200); 
    });
  });
});

var server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
