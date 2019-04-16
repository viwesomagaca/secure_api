const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const clientRoutes = require('./routes/client');
require('dotenv').config()
const app = express()
const port = process.env.PORT;
const mongo_url = process.env.MONGO_URL;

mongoose.connect(
    mongo_url, 
    { useNewUrlParser:true }
  );

let db = mongoose.connection;
db.once('open', ()=> console.log('Connection to database is established'));

db.on('error', console.error.bind(console, "Database connection error"));

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

mongoose.set('useFindOneAndUpdate', false);

app.listen(port,() => console.log(`App listening on port ${port}!`))
