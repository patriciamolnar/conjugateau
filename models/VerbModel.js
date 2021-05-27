const mongoose = require('mongoose');

const collectionName = 'verbs';

const VerbSchema = new mongoose.Schema({
    infinitive: {
        type: String,
        required: true,   
    }, 
    en: {
        type: String,
        required: true,   
    }, 
    type: {
        type: String,
        required: true,   
    }, 
    tense: {
        type: String,
        required: true,   
    }, 
    pronoun: {
        type: String,
        required: true,   
    }, 
    conjugation: {
        type: String,
        required: true,   
    }
});



module.exports = mongoose.model('Verb', VerbSchema, collectionName);