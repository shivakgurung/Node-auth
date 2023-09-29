const express = require("express");
const { users } = require("./model/index");
const app = express();
app.set("view engine", "ejs");

require("./model/index");
const bcrypt = require("bcryptjs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, (req, res) => {
  console.log("App started");
});

app.get("/", (req, res) => {
  res.send("<p>This is home page</p>");
});

app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/register", async (req, res) => {
  console.log(req.body);

  const { email, username, password } = req.body;

  //validation
  //types: here on api, form(frontend), in the model ex: allowNull: false
  if (!email || !username || !password) {
    return res.send("please fill email, username, password");
  }
  await users.create({
    email: email,
    username: username,
    password: bcrypt.hashSync(password, 12),
  });
  res.send("user creted successfully");
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const userExists = await users.findAll({
    where: {
      email: email,
    },
  });
  console.log("user exists", userExists);

  if (userExists.length > 0) {
    //check password
    const isMatch = bcrypt.compareSync(password, userExists[0].password);
    // console.log(isMatch);
    if (isMatch) {
      res.send("Login Successful!");
    } else {
      res.send("Invalid email or password!");
    }
  } else {
    //show error message
    res.send("Invalid credentials");
  }
});
