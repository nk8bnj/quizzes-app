import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { QuizCardComponent } from '../../components/quiz-card/quiz-card.component';
import { LoaderComponent } from '../../components/loader/loader.component';

import { QuizService } from '../../services/quiz.service';

import { Quiz } from '../../types/quiz.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, QuizCardComponent, LoaderComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  quizzes$: Observable<Quiz[]>;
  randomQuizId$: Observable<number | null>;

  constructor(private quizService: QuizService) {
    this.quizzes$ = this.quizService.getQuizzes();
    this.randomQuizId$ = this.quizService.getRandomQuizId();
  }
}
