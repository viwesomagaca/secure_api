const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
const app = express()
const port = process.env.PORT;
const mongo_url = process.env.MONGO_URL;
const mongoose = require('mongoose');
const routes = require('./routes/api');

mongoose.connect(
  mongo_url,
  {useNewUrlParser: true}
);

let db = mongoose.connection;
db.once('open', () => console.log('database connection established!'));
db.on('error',console.error.bind(console,'Database connection error'))

mongoose.set('useFindOneAndUpdate', false);

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api",routes);
app.listen(port, () => console.log(`App listening on port ${port}!`))
