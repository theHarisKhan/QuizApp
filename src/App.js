import React, { useEffect, useState } from 'react'
import './App.css';
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
        setQuestions(data.results)
        console.log(data.results)
      })
  },[])

  console.log(currentIndex)

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

  return (
    <div className="App">
      <h1 className="App--title">QuizApP</h1>
      {questions.length > 0 ? (
          currentIndex >= questions.length  ? (
            <>
              <h1>Correct Answers are {score}</h1>
              {/* <button onclick={() => PlayAGAIN()}>Play AGAIN</button> */}
            </>
          ) : (
              <Questions 
                key={currentIndex}
                index={currentIndex}
                Qst={questions[currentIndex]}
                showAnswers={showAnswers}
                handleAnswer={handleAnswer}
                handleNxtQst={handleNxtQst}
              />
          )) : (
            <h1>I am Loading</h1>
      )}
    </div>
  );
}

export default App;
