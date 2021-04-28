const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12; 

const collectionName = 'users';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, 
        trim: true,
        index: { unique: true }, 
        minlength: 3,
    }, 
    email: {
        type: String, 
        required: true, 
        trim: true, 
        lowercase: true,
        index: { unique: true },
        validate: {
            validator: emailValidator.validate, 
            message: props => `${props.value} is not a valid email address`,
        }
    }, 
    password: {
        type: String,
        required: true, 
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
UserSchema.methods.comparePassword = async function comparePassword(candidate) {
    return bcrypt.compare(candidate, this.password);
}

module.exports = mongoose.model('User', UserSchema, collectionName);