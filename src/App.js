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
                Index={currentIndex}
                Qstlength={questions.length}
                data={questions[currentIndex]}
                showAnswers={showAnswers}
                handleAnswer={handleAnswer}
                handleNxtQst={handleNxtQst}
              />
          )) : (
            <h1 className="Loading">Loading...</h1>
      )}
    </div>
  );
}

export default App;
