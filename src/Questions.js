import React from 'react'

function Questions({
    showAnswers, 
    Qst, 
    handleAnswer, 
    index, 
    handleNxtQst
}) {

    const ShuffleAnswers = [Qst.correct_answer, ...Qst.incorrect_answers].sort(
        () => Math.random() - 0.5
    )

    // for checkbtn correct answers
    // const CheckIt = (numb) => {
    //     return (
    //         Qst.correct_answer === ShuffleAnswers[numb] ?
    //         'answerBtn active' : 'answerBtn'
    //     )
    // }

    return (
        <div className="question--box">
          <div className="info--col">
            <h2>Question {index+1} /6</h2>
            <h3 className="question"
                dangerouslySetInnerHTML={{ __html: Qst.question}}
            />
          </div>
          <div className="btns--col"> 
            {ShuffleAnswers.map((answer,index) => {
                const bgClr = showAnswers 
                    ? answer === Qst.correct_answer 
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
