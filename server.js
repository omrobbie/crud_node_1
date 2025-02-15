const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const connectDB = require('./server/database/connection');

const app = express();

dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 8080;

// log req
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parser
app.use(bodyparser.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname, "views/ejs"));

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/ing', express.static(path.resolve(__dirname, "assets/ing")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

// load router

app.use('/', require('./server/routes/router'))

app.listen(3000, () => { console.log(`Server is running on http://localhost:${PORT}`) })