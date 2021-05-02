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
    }, 'supersecret123', {expiresIn: '1h'});
}

// Add user to DB
userRouter.post('/register', async (req, res, next) => {
    try { //try to register user 
        const { username, email, password } = req.body;
        const user = new UserModel({
            username, 
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
        const {_id, username} = req.user; 
        console.log(req.user);
        const token = signToken(_id);
        res.cookie('access_token', token, {httpOnly: true, sameSite: true}); 
        res.status(200).json({isAuthenticated: true, user: {username}}); 
    } 
}); 

userRouter.get('/logout', (req, res) => {
    res.clearCookie('access_token');
    res.json({user: {username: ''}, success: true});
}); 

module.exports = userRouter;