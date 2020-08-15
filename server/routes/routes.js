const express = require("express");
const route = express.Router();
const cors = require("cors");

const Question = require('../model/quizQusetion');

route.use(cors());

route.post('/adding', async (req, res) => {
    try{
        
        const question = req.body.question;
        const options = req.body.options;
        const correct_answer = req.body.correct_answer;
        const choosen_answer = req.body.choosen_answer;
        const score = req.body.score;


        const addQusetion = new Question({
            question,
            options,
            correct_answer,
            choosen_answer,
            score
        });

        addQusetion.save()
            .then(() => res.json(addQusetion))
            .catch(err => res.status(400).json({err: err.message}));

    }catch(err){
        res.status(500).json({err: err.message});
    }
})


route.get('/:id', async (req, res) => {
    try{
        console.log("getting!!!");
        console.log("req.id ", req.params.id);
        Question.findById(req.params.id)
          .then(question => res.json(question))
          .catch(err => res.status(400).json({err: err.message}));
    }catch(err){
        res.status(500).json({err: err.message });
   }
})

route.post("/edit/:id", async (req, res) => {
    try{
        console.log("editing, ", req.body.question, req.body.options, req.body.correct_answer, req.body.choosen_answer, req.body.score);
        Question.findById(req.params.id)
        .then(quiz => {
            quiz.question = req.body.question;
            quiz.options = req.body.options;
            quiz.correct_answer = req.body.correct_answer;
            quiz.choosen_answer = req.body.choosen_answer;
            quiz.score = req.body.score;

            quiz.save()
               .then(()=>res.json(quiz))
               .catch(err => res.status(400).json({err: "svaing error " + err.message}));
        })
        .catch(err => res.status(400).json({err: "finding error " +err.message}));

    }catch(err){
        res.status(500).json({err: err.message});
    }
})

//  route.get("/show/result", async (req, res)=>{
//      try{
//          console.log("getting result!!!");
//          Question.find()
//            .then(question => res.json(question))
//            .catch(err => res.status(400).json({err: "resuting error" + err.message}));

//      }catch(err){
//          res.status(500).json({err: err.message});
//      }
//  })

module.exports = route;
