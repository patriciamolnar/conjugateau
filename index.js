const express = require('express'); 
const mongoose = require('mongoose'); 
require('dotenv').config();
const db = require('./lib/db');

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

