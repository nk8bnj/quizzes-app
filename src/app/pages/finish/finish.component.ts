import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { QuizResultService } from '../../services/quiz-result.service'

import { preparedTime } from '../../helpers/prepared-time.helper'

@Component({
	selector: 'app-finish',
	standalone: true,
	imports: [],
	templateUrl: './finish.component.html'
})
export class FinishComponent implements OnInit {
	correctAnswersCount: number = 0
	questionsCount: number = 0
	spentTime: string = ''

	constructor(
		private quizResultService: QuizResultService,
		private router: Router
	) {}

	ngOnInit() {
		this.correctAnswersCount = this.quizResultService.getCorrectAnswersCount()
		this.questionsCount = this.quizResultService.getQuestionsCount()

		const time = this.quizResultService.getSpentTime()
		this.spentTime = preparedTime(time)
	}

	returnToHome(): void {
		this.quizResultService.resetQuizResults()
		this.router.navigate(['/home'])
	}
}
