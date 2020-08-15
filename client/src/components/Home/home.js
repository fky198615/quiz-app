import React from 'react';
import Axios from 'axios';
import Quiz from '../Quiz/quiz';
import Result from '../Result/result';
import './home.css';

function Home() {
    const [id, setId] = React.useState([]);
    const [quizQusetion, setQuizQuestion] = React.useState("");
    const [quizOptions, setQuizOptions] = React.useState([]);
    const [quizCorrectAns, setQuizCorrectAns] = React.useState("");
    const [count, setCount] = React.useState(0);
    const [ifStart, setIfStart] = React.useState(false);
    const [ifEnd, setIfEnd] = React.useState(false);
    const [len, setLen] = React.useState(0);
    const [currentId, setCurrentId] = React.useState(undefined);
    const [choice, setChoice] = React.useState(undefined);
  
    React.useEffect(()=>{
      
      function shuffleArray(arr) {
        for(let i = arr.length-1; i >0; i--)
        {
            const randomIndex = Math.floor(Math.random()*(i + 1));
            [arr[i],arr[randomIndex]] = [arr[randomIndex],arr[i]];
        }
  
      return arr;}
      
      //get idea from https://stackoverflow.com/questions/1787322/htmlspecialchars-equivalent-in-javascript
      function escapeHtml(text) {
        return text
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'")
            .replace(/&eacute;/g, "é");
      }
     
      const addQuestionToDB = async () =>{
        const quizData = await (await fetch(`https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple`)).json();
        console.log("quiz, ", quizData.results);
        setLen(quizData.results.length);
        
        for(let i = 0; i < quizData.results.length; i++){
              let correctAnswer = quizData.results[i].correct_answer;
              let incorrect_answers = quizData.results[i].incorrect_answers;
              let newAnswer = [... incorrect_answers, correctAnswer];
              let newOptions = shuffleArray(newAnswer);
              let question = escapeHtml(quizData.results[i].question);
          
  
            const dataAfterAdding = await Axios.post("http://localhost:5000/questions/adding",{
              "question": question,
              "options": newOptions,
              "correct_answer": correctAnswer,
              "choosen_answer": "",
              "score": 0
            });
           
            console.log("dataAfterAdding, " , dataAfterAdding.data._id);
            id.push(dataAfterAdding.data._id);
            
  
        }
        console.log("id in home, ", id);
        setId(id);
      };
  
      addQuestionToDB();
  
    }, []);
  
    
    
    const startQuiz = async (e)=>{
             let startId = id[count];
             setCurrentId(startId);
             console.log("startId, ", id, count, startId);
             const getFirstQuiz = await Axios.get(`http://localhost:5000/questions/${startId}`);
             console.log("get ", getFirstQuiz);
             setQuizQuestion(getFirstQuiz.data.question);
             setQuizOptions(getFirstQuiz.data.options);
             setQuizCorrectAns(getFirstQuiz.data.correct_answer);
             setIfStart(true);
             setCount(count+1);

             
    }

    const goNext = async (e)=>{
        console.log("next, ",count);
       
        let nextId = id[count];
        setCurrentId(nextId);
        const getNextQuiz = await Axios.get(`http://localhost:5000/questions/${nextId}`);
        console.log("next ", getNextQuiz) ;
        setQuizQuestion(getNextQuiz.data.question);
        setQuizOptions(getNextQuiz.data.options);
        setQuizCorrectAns(getNextQuiz.data.correct_answer);
        setChoice(getNextQuiz.data.choosen_answer);
        setCount(count+1);
        
        // let newCount = count+1;
        
        // // if(newCount >= len){
        // //   setIfEnd(true);
        // // }

    }

    const goPrevious = async(e)=>{
      let previous_count = count-2;
      
      if(previous_count<0){
        return;
        
      }

      console.log("previous, ",previous_count, count);


      
      const previousId = id[previous_count];
      setCurrentId(previousId);
      const getPreviousQuiz = await Axios.get(`http://localhost:5000/questions/${previousId}`);
      setQuizQuestion(getPreviousQuiz.data.question);
      setQuizOptions(getPreviousQuiz.data.options);
      setQuizCorrectAns(getPreviousQuiz.data.correct_answer);
      setChoice(getPreviousQuiz.data.choosen_answer);
      setCount(previous_count+1);
      

    }

    const submit = e =>{
      setIfEnd(true);
    }


  
  return (
    <div className="page"> 
      <div className="homeContainer">
        {ifStart ?
         ( <>
           {ifEnd ?
          
           (<Result quizId = {id} quizLen = {len}/>) :
           
           ( <>
           <div className = "questionContainer">
            <Quiz qusetion ={quizQusetion} options={quizOptions} ifEnd ={ifEnd} correctAnswer={quizCorrectAns} count={count} currentId={currentId} choice={choice} len={len}/>
          </div>
          
          <div className ="nextAndPrevious">
            <button className="previousButton" onClick={goPrevious}>previous</button>
            <button className="nextButton" onClick={goNext}>next</button>
            <button className="submitQuiz" onClick={submit}>Submit quiz</button>
  
           </div>
           </>)
           }
          </>
         ):(
           <>
          <div className = "start">
          <div className = "text">If you are ready, please click the button to start the quiz.</div>
          <div className="homeButtion" > 
              <button className ="quizButtion" type="submit" onClick={startQuiz}>Start Quiz</button>
          
          </div>
          </div>
          </>)
          }
     </div>
    </div>
  );
}

export default Home;