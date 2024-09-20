import { Component, DestroyRef, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Observable } from 'rxjs'

import { QuizService } from '../../services/quiz.service'
import { QuizResultService } from '../../services/quiz-result.service'

import { Question, Quiz } from '../../types/quiz.interface'

@Component({
	selector: 'app-play',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './play.component.html'
})
export class PlayComponent implements OnInit {
	quiz$: Observable<Quiz | undefined>
	questions: string[] = []
	currentQuestion: Question | undefined
	currentQuestionIndex: number = 0
	selectedAnswer: string | null = null
	startTime!: number

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private quizService: QuizService,
		private quizResultService: QuizResultService,
		private destroyRef: DestroyRef
	) {
		this.quiz$ = this.quizService.getQuizById(
			Number(this.route.snapshot.params['id'])
		)
	}

	ngOnInit() {
		this.quiz$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(quiz => {
			if (quiz) {
				this.loadingQuestions(quiz)
				this.quizResultService.setQuestionsCount(quiz.questions.length)
				this.startTime = Date.now()
			}
		})
	}

	loadingQuestions(quiz: Quiz): void {
		this.currentQuestion = quiz.questions[this.currentQuestionIndex]

		this.questions = [
			this.currentQuestion.correct_answer,
			...this.currentQuestion.incorrect_answers
		]
	}

	checkAnswer(): void {
		if (this.selectedAnswer === this.currentQuestion?.correct_answer) {
			this.quizResultService.setCorrectAnswerCount()
		}
	}

	nextQuestion(quiz: Quiz): void {
		this.checkAnswer()

		if (this.currentQuestionIndex < quiz.questions.length - 1) {
			this.currentQuestionIndex++
			this.loadingQuestions(quiz)
		} else {
			this.finishQuiz()
		}
	}

	finishQuiz(): void {
		const spentTime = Date.now() - this.startTime
		this.quizResultService.setSpentTime(spentTime)
		this.router.navigate(['/finish'])
	}

	cancelQuiz(): void {
		this.quizResultService.resetQuizResults()
		this.router.navigate(['/home'])
	}
}
