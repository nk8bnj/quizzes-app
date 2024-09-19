import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Quiz } from '../../types/quiz.interface';

@Component({
  selector: 'app-quiz-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './quiz-card.component.html',
})
export class QuizCardComponent {
  @Input() quiz!: Quiz;
}
