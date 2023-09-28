const express = require("express");
const app = express();
app.set("view engine", ejs);

app.listen(3000, (req, res) => {
  console.log("hello from auth folder");
});

app.get("/", (req, res) => {
  res.send("<p>This is home page</p>");
});

app.get("/register", (req, res) => {
  res.render("register");
});
