const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
const app = express()
const port = process.env.PORT;
const mongo_url = process.env.MONGO_URL;
const mongoose = require('mongoose');
require('./auth/auth');
const routes = require('./routes/api');
const loginRoutes = require('./routes/client');
const passport = require('passport');
const jwt = require('jsonwebtoken');



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

//Handle errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error : err });
});
app.use('/',loginRoutes);
//We plugin our jwt strategy as a middleware so only verified users can access this route
app.use('/user', passport.authenticate('jwt', { session : false }), routes );


app.use("/api",routes);
app.listen(port, () => console.log(`App listening on port ${port}!`))
