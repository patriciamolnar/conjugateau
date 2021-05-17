require('dotenv').config(); 
const express = require('express');
const userRouter = express.Router(); 
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/UserModel');

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
        const user = new User({ 
            email, 
            password
        });
        const savedUser = await user.save(); 
        if(savedUser) {
            return res.send({messages: 'Account successfully created. Please log in.', success: true});
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

userRouter.get('/auth', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { _id } = req.user; 
    return res.json({isAuthenticated: true, id: _id});
});

//get saved conjugations
userRouter.get('/saved', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {  
        const { _id } = req.user; 
        User.findOne({_id}).populate('saved').exec((err, doc) => {
            if(err) {
                return next(err);
            }
            return res.json(doc.saved);
        });
    } catch(err) {
        return next(err);
    }
});

//add saved conjugation id to users document
userRouter.put('/saved', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try { 
        const verbId = req.body._id; 
        const { _id } = req.user; 
        User.findOne({_id}, function(err, doc) {
            if(err) {
                return next(err);
            } 
             
            //if verbID already contained in 'saved', remove it
            if(doc.saved.includes(verbId)) { 
                User.updateOne({_id}, {$pull: { saved: verbId }}, function (err, doc) {
                    if(err) {
                        return next(err);
                    } 
                    return res.json({saved: 'true', status: 'removed'});
                });
            } else { //else add
                User.updateOne({_id}, {$push: { saved: verbId }}, function (err, doc) {
                    if(err) {
                        return next(err);
                    } 
                    return res.json({saved: 'true', status: 'added'});
                });
            }
        })
    } catch(err) {
        return next(err);
    }
});

//change password under Account page when user is logged in.
userRouter.post('/password', passport.authenticate('jwt', { session: false }), function (req, res) {
    const {oldPass, newPass} = req.body; 

    if(!oldPass || !newPass) { //check if password fields were completed
        req.send({ success: false, message: 'Please fill in all fields.' });
    }

    if(req.user) { 
        const { _id } = req.user; 
        User.findOne({_id}, function(err, doc) { //check if there is a user
            if(err) {
                req.send({ 
                    success: false, 
                    message: 'No user found.' 
                });
            } else { //check if provided old password matches current
                doc.comparePassword(req.body.oldPass, (err, user) => {
                    if(err) {
                        res.send({ success: false, message: 'An error occurred.' });
                    } else if(!user) { 
                        res.send({ success: false, message: 'Incorrect password.' });
                    } else { //save password
                        user.password = req.body.newPass;
                        user.save(err => { 
                            if(err) {
                                res.send({
                                    success: false, 
                                    message: 'Invalid password. Passwords must contain at least 1 lowercase, 1 uppercase and 1 special character. Minimum length must be 8 characters.'
                                })
                            }
                            else {
                                res.send({ 
                                    success: true, 
                                    message: 'Password successfully changed.'
                                });
                            }
                        });
                    }
                });
            }
        });
    }
});

module.exports = userRouter;