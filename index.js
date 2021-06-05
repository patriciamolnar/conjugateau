require('dotenv').config();
const express = require('express');
const cookies = require('cookie-parser');
const path = require('path');

const db = require('./lib/db');
const userRouter = require('./routes/UserRouter');
const verbRouter = require('./routes/VerbRouter');
const errorHandler = require('./errorHandler');
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookies());

app.use('/user', userRouter);
app.use('/verbs', verbRouter); 

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'frontend/build')));
    
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
    });
  }

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