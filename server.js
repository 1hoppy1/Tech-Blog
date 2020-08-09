const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');

// uncomment when you run locally!!!
// make sure to comment the code when deploy to heroku
require("dotenv").config()

//add in session cookies
const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: process.env.SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

//add in session cookies


const app = express();
const PORT = process.env.PORT || 3001;

app.use(session(sess));


const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// turn on routes
app.use(routes);

// turn on connection to database and server
sequelize.sync({
  force: false
}).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});