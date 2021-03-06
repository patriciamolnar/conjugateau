const express = require('express');
const verbRouter = express.Router();
const Verb = require('../models/VerbModel'); 
const User = require('../models/UserModel');
const passport = require('passport');

// Get all entries from verbs collection
verbRouter.get('/', async (req, res, next) => {
    try { 
        Verb.find({}, function (err, document) {
            if (err) {
                return next(err);
            }
            return res.json(document);
        });
        return next(new Error('An error occurred.'));
    } catch(err) {
        return next(err);
    }
});

//get verbs based on tenses user selected
verbRouter.get('/:tenses', async (req, res, next) => {
    try { 
        //convert query string into array of tenses
        const tenses = req.params.tenses.split('+'); 
        Verb.find({"tense": {$in: tenses}}, function (err, document) {
            if (err) {
                return next(err);
            }
            return res.json(document);
        });
        return next(new Error('An error occurred.'));
    } catch(err) {
        return next(err);
    }
});

//search for the conjugation of a word by supplying  the infinitive
verbRouter.get('/search/:infinitive', async (req, res, next) => {
    try { 
        const regex = new RegExp(req.params.infinitive, "i"); 
        Verb.find({"infinitive": {$regex: regex}}, function (err, document) {
            if (err) {
                return next(err);
            }
            return res.json(document);
        });
        return next(new Error('An error occurred.'));
    } catch(err) {
        return next(err);
    }
});

module.exports = verbRouter;