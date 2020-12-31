import React from 'react'

function Questions({
    showAnswers, 
    handleAnswer, 
    handleNxtQst,
    Index,
    Qstlength,
    data: {question, answers, correct_answer}
}) {

    return (
        <div className="question--box">
          <div className="info--col">
            <h2>Question {Index+1} / {Qstlength}</h2>
            <h3 className="question"
                dangerouslySetInnerHTML={{ __html: question}}
            />
          </div>
          <div className="btns--col"> 
            {answers.map((answer,index) => {
                const bgClr = showAnswers 
                    ? answer === correct_answer 
                        ? "answerBtn true" 
                        : "answerBtn false" 
                    : "answerBtn"

                return(    
                    <button className= {bgClr}
                        onClick={() => handleAnswer(answer)}
                        dangerouslySetInnerHTML={{ __html: answer}}
                    />
                )
            })}<br/>
            <button className="next--btn"
                onClick={() => handleNxtQst()}
            >
                Next Questions
            </button>
          </div>
        </div>
    )
}

export default Questions
