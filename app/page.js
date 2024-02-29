'use client'
import { questions } from "@/questions";
import { useState } from "react";


export default function Home() {
  // console.log(questions);
 
  const [currentQuestion,setCurrentQuestion] = useState(0)
  const [selectedOption,setSelectedOption] = useState("")
  const question = questions[currentQuestion]
  const [showAnswer,setShowAnswer] = useState(false)
  const [score,setScore] = useState(0)
  const [showResults,setShowResults] = useState(false)
  const handleOptionSelect=(option)=>{
    setSelectedOption(option)
    setShowAnswer(true)
    if(option === question.answer){
      setScore((prevScore)=> prevScore + 1)
      
    }
  }

  const handleNextClick=()=>{
    setCurrentQuestion((prevQn)=> prevQn + 1)
    setShowAnswer(false)
    if(currentQuestion == questions.length -1 ){
      setShowResults(true)
      setCurrentQuestion(0)
    }
  }

  const handleRestartQuiz =()=>{
    setShowResults(false)
  }
  // console.log(selectedOption);
  // console.log(score);
  return (
  <>
    {showResults ? (
      <div className="quiz-app">
        <h3 className="score">Your score is {score} out of {questions.length}</h3>
         <button onClick={handleRestartQuiz}>Start the Quiz Again!</button>
      </div>
    ): 
    (
      <div className="quiz-app">
      <div className="quiz-header">
         <h2>Awesome Quiz Application</h2>
      </div>
      <div className="quiz-body">
         <h3>
         {question.id} {')'} {question.question}
         </h3>
         <div className="options">
            {
             question.options.map((option,i)=>{
               return(
                 <button className={showAnswer && option == question.answer ? 'correctAnswer' : showAnswer && option == selectedOption ? 'wrongAnswer' :''} key={i} onClick={()=> handleOptionSelect(option)}>{option}</button>
               )
             })
            }
         </div>
      </div>
      <div className="quiz-footer">
         <p>{currentQuestion + 1} out of {questions.length}</p>
         <button className="next" onClick={handleNextClick}>Next</button>
      </div>
    </div>
    )
    }
  </>
  );
}
