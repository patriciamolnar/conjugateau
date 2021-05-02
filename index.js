const express = require('express');
const db = require('./lib/db');
const userRouter = require('./routes/UserRouter');
const errorHandler = require('./errorHandler');
const port = 5000;
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/user', userRouter);

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