const express = require("express");
const { users } = require("./model/index");
const app = express();
app.set("view engine", "ejs");

require("./model/index");

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

app.post("/register",async (req, res) => {
  console.log(req.body);
  
    const {email, username, password} = req.body


    //validation 
    //types: here on api, form(frontend), in the model ex: allowNull: false
    if(!email || !username || !password){
      return res.send("please fill email, username, password")
    }
   await users.create({
      email: email,
      username: username,
      password: password,
    }
    )
    res.send('user creted successfully')
  
});
