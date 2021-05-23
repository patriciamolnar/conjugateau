require('dotenv').config(); 
const express = require('express');
const userRouter = express.Router(); 
const nodemailer = require('nodemailer');
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/UserModel');
const crypto = require('crypto');

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
            return res.send({message: 'Account successfully created. Please log in.', success: true});
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
        res.status(200).json({success: true, message: '', user: {_id, email}}); 
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
                    return res.json({saved: true, status: 'removed'});
                });
            } else { //else add
                User.updateOne({_id}, {$push: { saved: verbId }}, function (err, doc) {
                    if(err) {
                        return next(err);
                    } 
                    return res.json({saved: true, status: 'added'});
                });
            }
        })
    } catch(err) {
        return next(err);
    }
});

//change password under Account page when user is logged in.
userRouter.put('/password', passport.authenticate('jwt', { session: false }), function (req, res) {
    const {oldPass, newPass} = req.body; 

    if(!oldPass || !newPass) { //check if password fields were completed
        return res.send({ success: false, message: 'Please fill in all fields.' });
    }

    if(req.user) { 
        const { _id } = req.user; 
        User.findOne({_id}, function(err, doc) { //check if there is a user
            if(err || doc === null) {
                return res.send({ 
                    success: false, 
                    message: 'An error occurred. Clear cookies and try again.' 
                });
            } else { //check if provided old password matches current
                doc.comparePassword(oldPass, (err, user) => {
                    if(err) {
                        return res.send({ success: false, message: 'An error occurred.' });
                    } else if(!user) { 
                        return res.send({ success: false, message: 'Incorrect password.' });
                    } else { //save password
                        user.password = newPass;
                        user.save(err => { 
                            if(err) {
                                return res.send({
                                    success: false, 
                                    message: 'Invalid password. Passwords must contain at least 1 lowercase, 1 uppercase and 1 special character. Minimum length must be 8 characters.'
                                })
                            }
                            else {
                                return res.send({ 
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

//send reset password email
userRouter.post('/forgotten-password', (req, res) => {
    //find user 
    const {email} = req.body; 
    if(!email) {
        return res.status(400).send({message: 'Please provide your email.'});
    }

    User.findOne({'email': email}, (err, doc) => {
        if(err) { //general error
            return res.status(403).send({message: `There was an error.`});
        } else if(doc === null) { //no user
            return res.status(403).send({message: `No account found for ${email}.`});
        } else {
            //generate token
            const token = crypto.randomBytes(20).toString('hex'); 
            User.updateOne({'_id': doc._id}, { 
                $set: {
                    'resetPasswordToken': token, 
                    'resetPasswordExpires': Date.now() + 1800000
                }
            }, (err, doc) => {
                if(err) { 
                    return res.send({message: 'There was an error. Please try again'})
                } else { //if added to DB
                    const transporter = nodemailer.createTransport({
                        service: 'gmail', 
                        auth: {
                            user: process.env.EMAIL_ADDRESS, 
                            pass: process.env.EMAIL_PASSWORD,
                        }
                    }); 
            
                    const mailOptions = {
                        from: 'conjugateau@gmail.com', 
                        to: email, 
                        subject: 'Conjugâteau: Password Reset Link', 
                        text: 'A request has been received to change the password for your Conjugâteau account\n\n'
                        + 'Please click the link below to change it within the next 30 minutes.\n\n'
                        + `http://localhost:3000/reset/${token} \n\n`
                        + 'Alternatively, copy paste the link into your browser to change your password.'
                        + 'If you did not request this change, please ignore this email and your password will remain unchanged.'
                    }
            
                    transporter.sendMail(mailOptions, (mailErr, response) => {
                        if(mailErr) {
                            res.send({message: 'There was an error.'})
                        } else {
                            res.send({message: 'Email successfully sent.'}); 
                        }
                    });
                }
            }); 
        }
    });
});

//change password route
userRouter.put('/reset/:token', (req, res) => {
    const { token } = req.params;
    const { password } = req.body; 
    
    //check if token exists and still valid
    User.findOne({
        'resetPasswordToken': token, 
        'resetPasswordExpires': {
            $gt: Date.now()
        }
    }, (err, doc) => {
        if(err || doc === null) { //invalid token: send error
            return res.send({success: false, message: 'An error occurred. Please try again.'});
        } else { //valid token: change password
            doc.password = password; 
            doc.save(err => { 
                if(err) {
                    return res.send({
                        success: false, 
                        message: 'Invalid password. Passwords must contain at least 1 lowercase, 1 uppercase and 1 special character. Minimum length must be 8 characters.'
                    });
                }
                else {
                    //invalidating token
                    User.updateOne({'_id': doc._id}, { 
                        $set: {
                            'resetPasswordToken': "", 
                            'resetPasswordExpires': Date.now() - 1800000
                        }
                    }, (err, doc) => {
                        return res.send({ 
                            success: true, 
                            message: 'Password successfully changed.'
                        });
                    });
                }
            });
        }
    });
});

//change email 
userRouter.put('/change-email', passport.authenticate('jwt', { session: false }), function (req, res) {
    const {email, password} = req.body; 

    if(!email || !password) { //check if password fields were completed
        return res.send({ success: false, message: 'Please fill in all fields.' });
    }

    if(req.user) { 
        const { _id } = req.user; 
        User.findOne({_id}, function(err, doc) { //check if there is a user
            if(err || doc === null) {
                return res.send({ 
                    success: false, 
                    message: 'An error occurred. Clear cookies and try again.' 
                });
            } else { //check if provided old password matches current
                doc.comparePassword(password, (err, user) => {
                    if(err) {
                        return res.send({ success: false, message: 'An error occurred.' });
                    } else if(!user) { 
                        return res.send({ success: false, message: 'Incorrect password.' });
                    } else { //save password
                        User.updateOne({'_id': doc._id}, { $set: {'email': email} }, (err, doc) => {
                            if(err) {
                                return res.send({ success: false, message: 'An error occurred.' });
                            }

                            return res.send({ success: true, message: 'Email successfully updated.' });
                        })
                    }
                });
            }
        });
    }
});


userRouter.delete('/delete-account', passport.authenticate('jwt', { session: false }), function (req, res) {
    const { password } = req.body; 

    if(!password) { //check if password fields were completed
        return res.send({ success: false, message: 'Please fill in all fields.' });
    }

    if(req.user) { 
        const { _id } = req.user; 
        User.findOne({_id}, function(err, doc) { //check if there is a user
            if(err || doc === null) {
                return res.send({ 
                    success: false, 
                    message: 'An error occurred. Clear cookies and try again.' 
                });
            } else { //check if provided old password matches current
                doc.comparePassword(password, (err, user) => {
                    if(err) {
                        return res.send({ success: false, message: 'An error occurred.' });
                    } else if(!user) { 
                        return res.send({ success: false, message: 'Incorrect password.' });
                    } else { //save password
                        User.deleteOne({'_id': doc._id}, (err, doc) => {
                            if(err) {
                                return res.send({ success: false, message: 'An error occurred.' });
                            }

                            //Log user out
                            res.clearCookie('access_token');
                            return res.send({ success: true, message: 'Account successfully deleted.' });
                        })
                    }
                });
            }
        });
    }
});

module.exports = userRouter;