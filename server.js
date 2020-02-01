const express = require('express')
const app = express()
const port = 3000
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

require('./controllers/posts')(app);
// Set db
require('./data/reddit-db');


app.get('/', (req, res) => res.render('home'))
app.get('/posts/new', (req, res) => res.render('posts-new'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))







