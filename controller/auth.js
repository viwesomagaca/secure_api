const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
// const clientRoutes = require('../controller/user');

router.post('/register', passport.authenticate('register',{ session: false}),async(req,res,next) =>{
  passport.authenticate('login', async (err, user, info) => {   
    try {
      const body = { _id : user._id, email : user.email };
      const token = jwt.sign({ user : body },'top_secret');
      res.json({ 
          success:true,
          message : 'Signup successful',
          user : req.user ,
          token : token
      })  
    } catch (err) {

      res.status(400).json({
        success: false,
        message: "User Authentication failed",
        error: err
    })

    }
  })(req, res, next);
});
  


//login route.
router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {   
      try {
        if(err || !user){
          // const error = new Error('Credentials do not Match')
          // return next(error);
          return res.json({
            success: false,
            message: 'Credentials do not Match'
          })
        }
        req.login(user, { session : false }, async (error) => {
          if( error ) return next(error)
          //storing email and _id to the token
          const body = { _id : user._id, email : user.email };
          //Sign the JWT token and populate the payload with the user email and id
          const token = jwt.sign({ user : body },'top_secret');
          //Send back the token to the user
          return res.json({ 
            success:true,
            message : 'Login Successful',
            user : req.user ,
            token : token
           })  
         })
        } catch (err) {
         res.json({
            success: false,
            error: err
        })
        }
      })(req, res, next);
    });

module.exports = router;



// FIELD NOTES **************************
// ASYNC AWAIT

// async function fetchStuff() {
//   try {
//     const res = await getData();
//     console.log(res);
//   } catch (err) {
//     console.log(err);
//   }
  
// }

// // PROMISE .then()
// function fetchStuff() {
//   getData()
//   .then(res => {
//     console.log(res);
    
//   })
//   .catch(err => {
//     console.log(err);
    
//   })
// }


