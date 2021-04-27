const express = require('express'); 
const mongoose = require('mongoose'); 
require('dotenv').config();

const app = express();
app.use(express.json());

const port = 5000;

mongoose.connect(process.env.DEVELOPMENT_DB_DSN, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('successfully connected to database');
});

app.listen(port, () => {
    console.log('Express server started');
})