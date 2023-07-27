import { MouseEvent, useState } from 'react'
import { QuestionAnswer } from './QuestionAnswer'

import { Button } from './Button'
import { Result } from './Result'
import { ProgressBar } from './ProgressBar'

import S from './styles.module.css'

export interface Question {
    id: number
    question: string
    answers: string[]
    correctAnswer: string
}


const QUESTIONS: Question[] = [
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
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
    const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0)
    const [isCurrentQuestionAnswered, setIsCurrentQuestionAnswered] = useState<boolean>(false)
    const [isTakingQuiz, setIsTakingQuiz] = useState<boolean>(true)

    const quizSize = QUESTIONS.length
    const currenteQuestionNumber = currentQuestionIndex + 1


    const handleAnswerQuestion = (
        event: MouseEvent<HTMLButtonElement>, 
        question: Question, 
        answer: string
        ): void => {
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
        if (currenteQuestionNumber < quizSize) {
            setCurrentQuestionIndex(index => index + 1)
        } else {
            setIsTakingQuiz(false)
        }

        setIsCurrentQuestionAnswered(false)
    }

    const handleTryAgain = () => {
        setIsTakingQuiz(true)
        setCorrectAnswersCount(0)
        setCurrentQuestionIndex(0)
    }

    const currentQuestion = QUESTIONS[currentQuestionIndex]
    const navigationButtonText = currentQuestionIndex + 1 === quizSize ? 'Ver Resultado' : 'Próxima Perguta'
    return (
        <div className={S.container}>
            <div className={S.card}>
               {isTakingQuiz ? (
                    <div className={S.quiz}>
                        <ProgressBar size={quizSize} currentStep={currenteQuestionNumber} />

                    <header className={S.quizHeader}>
                        <span className={S.questionCount}>
                            PERGUNTA {currenteQuestionNumber} / {quizSize} 
                        </span>
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
                        <Button onClick={handleNextQuestion}>
                            {navigationButtonText}
                        </Button>
                    )}
                </div>
               ) : (
                    <Result 
                        correctAnswersCount={correctAnswersCount}
                        quizSize={quizSize}
                        handleTryAgain={handleTryAgain}

                    />
               )} 
            </div>
        </div>
    )
}