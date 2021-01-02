import React, { useEffect, useState } from 'react'
import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import Questions from './Questions';

const API_URL = `https://opentdb.com/api.php?amount=6&category=18&difficulty=easy&type=multiple`

function App() {

  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [showAnswers, setShowAnswers] = useState(false)

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const questions = data.results.map((question) => 
        ({
          ...question,
          answers: [
            question.correct_answer,
            ...question.incorrect_answers,
          ].sort(() => Math.random() - 0.5),
        }))

        setQuestions(questions)
        // console.log(questions)
      })
  },[])

  // console.log(`This is Console ${questions}`)

  const handleAnswer = (answer) => {
    if (!showAnswers){
      if (answer === questions[currentIndex].correct_answer){
        setScore(score + 1)
      }
    }
    setShowAnswers(true)
  }

  const handleNxtQst = () => {
    setShowAnswers(false)
    setCurrentIndex(currentIndex + 1)
  }

  const PlayAGAIN = () =>{
    setScore(0)
    setShowResult(false)
    setCurrentIndex(0)
    window.location.reload()
    // console.log('Play AGain call')
  }

  return (
    <div className="App">
      <h1 className="App--title">QuizApP</h1>
      {questions.length > 0 ? (
          currentIndex >= questions.length  ? (
            <div className="Result--box">
              {score > 3 ? (
                <h1 className="win">!!Congrats!!</h1>
              ) : (
                <h1 className="lose">!Try Again!</h1>
              )}
              <h2>Correct Answers are <span className="result--score">{score}</span> Out of {questions.length}</h2>
              <button className="playagn--btn" onClick={() => PlayAGAIN()}>Play AGAIN</button>
            </div>
          ) : (
              <Questions 
                key={currentIndex}
                Index={currentIndex}
                Qstlength={questions.length}
                data={questions[currentIndex]}
                showAnswers={showAnswers}
                handleAnswer={handleAnswer}
                handleNxtQst={handleNxtQst}
              />
          )) : (
            <Loader
                className="Loading" 
                type="Bars" 
                color="#00BFFF" 
                height={100} 
                width={100} 
                timeout={3000} />
      )}
    </div>
  );
}

export default App;
