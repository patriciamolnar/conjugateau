const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12; 

const collectionName = 'users';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username.'], 
        trim: true,
        index: { unique: [true, 'The username is already taken.'] }, 
        minlength: 3,
        validate: [validator.isAlphanumeric, 'Usernames can only contain letters and numbers.']
    }, 
    email: {
        type: String, 
        required: [true, 'Please enter an email.'], 
        trim: true, 
        lowercase: true,
        index: { unique: [true, 'The email is already taken.'] },
        validate: [validator.isEmail, 'Please enter a valid email address.']
    }, 
    password: {
        type: String,
        required: [true, 'Please enter a password.'], 
        minlength: 8, 
    }
}, {
    timestamps: true,
});

// hash password and save if added/modified
UserSchema.pre('save', async function preSave(next) {
    const user = this;
    if(!user.isModified('password')) {
        return next();
    }
    try {
        const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
        user.password = hash;
        return next(); 
    } catch(err) {
        return next(err);
    }
});

// check if password is correct
UserSchema.methods.comparePassword = function(candidate, next) {
    bcrypt.compare(candidate, this.password, (err, isMatch) => {
        if(err) {
            return next(err);
        } else {
            if(!isMatch) {
                return next(null, isMatch);
            }
            return next(null, this);
        }
    });
}

module.exports = mongoose.model('User', UserSchema, collectionName);