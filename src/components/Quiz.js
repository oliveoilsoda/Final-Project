import React, { useState } from 'react'
import { questions } from './Questions';
import SubmitResults from './SubmitResults';
// import axios from 'axios';

export default function Quiz({ 
    APIData, setAPIData, onSubmit, score, setScore, username, setUserName, handleChange 
}) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);

    const handleClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
        console.log('was answer correct?', isCorrect)
    };


    return (
        <div className="quiz-app justify-content-center">
            {showScore ? (
                <section className="showScore-section font-face-f1b">
                    Your score is {score} out of {questions.length}<br/>
                    {/* passing results to SubmitResults */}
                    <SubmitResults 
                        score={score} 
                        setScore={setScore} 
                        APIData={APIData} 
                        setAPIData={setAPIData}
                        onSubmit={onSubmit}
                        handleChange={handleChange}
                        username={username}
                        setUserName={setUserName}
                    />
                </section>
            ) : (
                <>
                    <section className="question-section font-face-f1b">
                        <h1>
                            Question {currentQuestion + 1}/{questions.length}
                        </h1>
                        <p>{questions[currentQuestion].questionText}</p>
                    </section>

                    <section className="answer-section ">
                        {questions[currentQuestion].answerOptions.map((item, index) => (
                            <button 
                                className='btn btn-answer font-face-f1r' 
                                key={index} 
                                onClick={() => handleClick(item.isCorrect)}>
                                {item.answerText}
                            </button>
                        ))}
                    </section>
                </>
            )}
        </div>
    );
}