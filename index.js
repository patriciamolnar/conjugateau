require('dotenv').config();
const express = require('express');
const cookies = require("cookie-parser");

const db = require('./lib/db');
const userRouter = require('./routes/UserRouter');
const verbRouter = require('./routes/VerbRouter');
const errorHandler = require('./errorHandler');
const port = 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookies());

app.use('/user', userRouter);
app.use('/verbs', verbRouter); 

db.connect(process.env.DEVELOPMENT_DB_DSN).
    then(() => {
        console.log('Conntected to MongoDB'); 
        app.listen(port, () => {
                console.log('Express server started');
            });
    }).catch((err) => {
        console.log(err);
});

// error handling middleware
app.use(errorHandler);