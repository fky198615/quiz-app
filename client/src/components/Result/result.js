import React from 'react';
import Axios from 'axios';

import './result.css';


function Result(props){

    const [userChoice, setUserChoice] = React.useState([]);
    const [userScore, setUserScore] = React.useState(0);
    const [correct, setCorrect] = React.useState([]);
    let temp_userChoice = [];
    let correct_userChoice = [];
    let temp_useScore = 0;
    
    React.useEffect(()=>{

        const gettingResult = async (e) =>
        {      
            console.log("showing result!!!", props.quizLen, props.quizId);
               for(let i = 0; i < props.quizLen; i++)
               {
                let resutId = props.quizId[i]
                const result = await Axios.get(`http://localhost:5000/questions/${resutId}`);
                console.log("get result", result);
                temp_userChoice.push(result.data.choosen_answer);
                correct_userChoice.push(result.data.correct_answer);
                temp_useScore = temp_useScore + result.data.score;
                }

            
               setUserChoice(temp_userChoice);
               setUserScore(temp_useScore);
               setCorrect(correct_userChoice);
        }
       
        gettingResult();
       
    },[])
    
    
    return (
        <div className = "outterContainer">
          <div className = "innerContainer">
            <div className = "userContainer">
                <h1 className="choice">You choice: </h1>
                {
                userChoice.map(function(item, i){
                           return <li className="userItem" key={i}>{item}</li>;})
                }
            </div>

             <div className = "correctContainer">
                <h2 className="correct">Correct Answers: </h2>
                {
                correct.map(function(item, i){
                           return <li className="correctItem" key={i}>{item}</li>;})
                }
             </div>
           </div>
           <div className = "scoreContainer">
              Your score: <span className="point">{userScore}/{props.quizLen}</span> 

           </div>
        </div>
    );

    
}


export default Result;