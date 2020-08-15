const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionModle = new Schema({

    question: {
        type: String,
        required: true
    },

    options: {
        type: [String],
        required: true

    },

    correct_answer: {
        type: String,
        required: true
    },

    choosen_answer:{
        type: String
    },

    score:{
        type: Number
    }

});


module.exports = quizQuestion = mongoose.model('quiz_question', questionModle);