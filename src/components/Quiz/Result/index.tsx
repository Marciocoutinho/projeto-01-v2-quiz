import S from './styles.module.css'
import { Button } from "../Button";

interface ResultProps {
    correctAnswersCount: number
    quizSize: number
    handleTryAgain: () => void
}

export function Result (props: ResultProps) {
    return (
        <div className={S.container}>
            <h1 className={S.title}>Resultado</h1>

            <h2 className={S.subtitle}>
                Você acertou {props.correctAnswersCount} de {props.quizSize} pregutas
            </h2>

            <Button onClick={props.handleTryAgain}>Tente Novamente</Button>
        </div>
    )
}