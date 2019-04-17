const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const userModel = require('../model/user');
const JWTstrategy = require('passport-jwt').Strategy;
//We use this to extract the JWT sent by the user
const ExtractJWT = require('passport-jwt').ExtractJwt;


//creating a passport middleware
passport.use('register', new localStrategy({
    usernameField:'email',
    passwordField:'password'
}, async (email, password,done)=>{
    try{
        //save infromation from the user to the database
        const user = await userModel.create({email,password});
        return done(null,user);
    } catch(err){
        done(err);
     }
}));

passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, async ( email, password, done) =>{
    try{
        const user = await userModel.findOne({ email });
        if (!user){
            return done(null, false, { message: 'User does not exist'});
        }

        const validate = await user.isValidPassword(password);
        if(!validate){
             return done(null,false,{ message:'Password does not Match'});
        }
        return done(null, user, { message: 'Logged in Sucessfully'})
    } catch(err){
        return done(err);
   }

}));

//This verifies that the token sent by the user is valid
passport.use(new JWTstrategy({
    //secret we used to sign our JWT
    secretOrKey : 'top_secret',
    //we expect the user to send the token as a query paramater with the name 'secret_token'
    jwtFromRequest : ExtractJWT.fromUrlQueryParameter('secret_token')
  }, async (token, done) => {
    try {
      //Pass the user details to the next middleware
      return done(null, token.user);
    } catch (error) {
      done(error);
    }
  }));