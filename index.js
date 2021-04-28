const express = require('express'); 
const mongoose = require('mongoose'); 
require('dotenv').config();
const db = require('./lib/db');
const UserModel = require('./models/UserModel');

const app = express();
app.use(express.json());

const port = 5000;

db.connect(process.env.DEVELOPMENT_DB_DSN).
    then(() => {
        console.log('Conntected to MongoDB'); 
        app.listen(port, () => {
                console.log('Express server started');
            });
    }).catch((err) => {
        console.log(err);
    });

// Add user to DB
app.post('/register', async (req, res, next) => {
    try {
        const user = new UserModel({
            username: req.body.username, 
            email: req.body.email, 
            password: req.body.password
        });
        const savedUser = await user.save(); 
        if(savedUser) {
            return res.send({message: 'successfully added user'});
        }
        return next(new Error('Failed to save user'));
    } catch(err) {
        return next(err);
    }
});