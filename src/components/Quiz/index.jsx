import { useState } from 'react'

import { QuestionAnswer } from './QuestionAnswer'

import { Button } from './Button'

import S from './styles.module.css'

const QUESTIONS = [
  {
    id: 1,
    question: 'Qual é meu nome?',
    answers: ['Marcia', 'Adele', 'Lúcia', 'Marcio'],
    correctAnswer: 'Marcio',
  },
  {
    id: 2,
    question: 'Qual é a minha idade?',
    answers: ['25', '34', '35', '22'],
    correctAnswer: '34',
  }, 
  {
    id: 3,
    question: 'O que eu sou?',
    answers: ['Desenvolvedor', 'Professor', 'Dentista', 'Advogado'],
    correctAnswer: 'Professor',
  }, 
  {
    id: 4,
    question: 'Qual é Adele?',
    answers: ['Uma enfermeira', 'Uma médica', 'Uma professora', 'Uma dentista'],
    correctAnswer: 'Uma enfermeira',
  },
]

export function Quiz () {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
    const [isCurrentQuestionAnswered, setIsCurrentQuestionAnswered] = useState(false)

    const handleAnswerQuestion = (event, question, answer) => {
        if (isCurrentQuestionAnswered) {
            return
        }
        const isCorrectAnswer = question.correctAnswer === answer

        const resultClassName = isCorrectAnswer ?  S.correct : S.incorrect
        event.currentTarget.classList.toggle(resultClassName)

        if (isCorrectAnswer) {
            setCorrectAnswersCount(correctAnswersCount + 1)
        }

        setIsCurrentQuestionAnswered(true)
    }

    const handleNextQuestion = () => {
        if (currentQuestionIndex + 1 < QUESTIONS.length) {
            setCurrentQuestionIndex(index => index + 1)
        }

        setIsCurrentQuestionAnswered(false)
    }

    const currentQuestion = QUESTIONS[currentQuestionIndex]

    return (
        <div className={S.container}>
            <div className={S.card}>
                <div className={S.quiz}>
                    <header className={S.quizHeader}>
                        <span className={S.questionCount}>PERGUNTA 1/04</span>
                        <p className={S.question}>
                            {currentQuestion.question}
                        </p>
                    </header>

                    <ul className={S.answers}>
                        {currentQuestion.answers.map(answer => (
                            <li key={answer} className={S.answerItem}>
                            <QuestionAnswer 
                                answer={answer} 
                                question={currentQuestion} 
                                handleAnswerQuestion={handleAnswerQuestion}
                            />
                        </li >
                        ))}                        
                    </ul>

                    {isCurrentQuestionAnswered && (
                        <Button onClick={handleNextQuestion}>Próxima Perguta</Button>
                    )}
                </div>
            </div>
        </div>
    )
}