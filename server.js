require('dotenv').config()
let cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const express = require("express");
const app = express();
const port = 3000;

const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");

// Use Body Parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cookieParser());

// Handlebars
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");


app.use(expressValidator());



//Controllers
require("./controllers/posts")(app);
require('./controllers/comments')(app);
require('./controllers/auth.js')(app);

// set db
require("./data/reddit-db");

// app.get('/', (req, res) => res.render('posts-index'))
app.get("/posts/new", (req, res) => res.render("posts-new"));



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
module.exports = app;