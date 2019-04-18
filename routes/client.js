const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
// const clientRoutes = require('../controller/user');

router.post('/register', passport.authenticate('register',{ session: false}),async(req,res,next) =>{
  passport.authenticate('login', async (err, user, info) => {   try {
  const body = { _id : user._id, email : user.email };
  const token = jwt.sign({ user : body },'top_secret');
    res.json({ 
        message : 'Signup successful',
        user : req.user ,
        token : token
      })  } catch (error) {
        return next(error);
      }
    })(req, res, next);
    });
  


//login route.
router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {   try {
        if(err || !user){
          const error = new Error('An Error occured')
          return next(error);
        }
        req.login(user, { session : false }, async (error) => {
          if( error ) return next(error)
          //storing email and _id to the token
          const body = { _id : user._id, email : user.email };
          //Sign the JWT token and populate the payload with the user email and id
          const token = jwt.sign({ user : body },'top_secret');
          //Send back the token to the user
          return res.json({ token });
        });     } catch (error) {
        return next(error);
      }
    })(req, res, next);
  });

module.exports = router;