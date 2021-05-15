require('dotenv').config(); 
const express = require('express');
const userRouter = express.Router(); 
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const signToken = userID => {
    return JWT.sign({
        iss: 'Conjugateau',
        sub: userID
    }, process.env.JWT_KEY, {expiresIn: '1h'});
}

// Add user to DB
userRouter.post('/register', async (req, res, next) => {
    try { //try to register user 
        const { email, password } = req.body;
        const user = new UserModel({ 
            email, 
            password
        });
        const savedUser = await user.save(); 
        if(savedUser) {
            return res.send({message: 'User successfully created.'});
        }
        return next(new Error('Failed to save user.'));
    } catch(err) {
        return next(err);
    }
});

userRouter.post('/login', passport.authenticate('local', {session: false}), (req, res) => {
    if(req.isAuthenticated()) {
        const {_id, email} = req.user; 
        console.log(req.user);
        const token = signToken(_id);
        res.cookie('access_token', token, {httpOnly: true, sameSite: true}); 
        res.status(200).json({isAuthenticated: true, user: {_id, email}}); 
    } 
}); 

userRouter.get('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.clearCookie('access_token');
    res.json({user: {_id: ''}, success: true});
}); 

module.exports = userRouter;