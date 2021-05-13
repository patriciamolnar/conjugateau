const passport = require('passport'); 
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const UserModel = require('./models/UserModel');

const cookieExtractor = req => {
    let token = null;
    if(req && req.cookies) {
        token = req.cookies['access_token'];
    }
    return token;
}

//authorisation 
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor, 
    secretOrKey: 'supersecret123' 
}, (payload, next) => {
    UserModel.findById({_id: payload.sub}, (err, user) => {
        if(err) {
            return next(err, false);
        }
        if(user) {
            return next(null, user);
        } else {
            return next(null, false);
        }
    })
}));

//authenticate user login
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, 
  (username, password, next) => {
    UserModel.findOne({'email': username}, (err, user) => {
        if(err) { //something went wrong with DB
            return next(err); 
        }
        if(!user) { //no user found
            return next(null, false, {message: 'Incorrect email or password.'})
        }
        //check if password is correct
        user.comparePassword(password, next);
    })
}));