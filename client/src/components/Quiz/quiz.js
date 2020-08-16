import React from 'react';

import './quiz.css';
import Axios from 'axios';

function Quiz(props) {
 
  const enterAnswer =  e =>{
  
  let select_answer = e.target.getAttribute("data-index");
  console.log("get answer,", props.options[select_answer]);
  let score = 0;
  
  props.setAnswer(props.options[select_answer]);
  
  if(props.options[select_answer] === props.correctAnswer){
    score = score+1;
  }

   const editQusetion = Axios.post(`http://localhost:5000/questions/edit/${props.currentId}`, {
     "question": props.qusetion,
     "options": props.options,
     "correct_answer": props.correctAnswer,
     "choosen_answer": props.options[select_answer],
     "score": score
   })
   
   console.log("editQusetion, ", editQusetion);

 }
  
 return (
     <div>
       <div className = "number">{props.count}/{props.len}</div>
       <div className= "quizTitle">{props.count}. {props.qusetion}</div>
       <ul>
         {
            props.options.map(function(item, i){
            return <button className ={`${props.answer === item ? "selected" : "origin"}`} key={i} data-index={i} onClick={enterAnswer}>{item}</button>;
            })
         }
       </ul>
       <div className="select">Last time you selected: <span className="yourChoice">{props.choice}</span></div>
    </div>
  );
}

export default Quiz;