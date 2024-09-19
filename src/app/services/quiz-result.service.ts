import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuizResultService {
  private correctAnswersCount: number = 0;
  private questionsCount: number = 0;
  private spentTime: number = 0;

  setCorrectAnswerCount() {
    this.correctAnswersCount++;
  }

  getCorrectAnswersCount(): number {
    return this.correctAnswersCount;
  }

  setQuestionsCount(count: number) {
    this.questionsCount = count;
  }

  getQuestionsCount(): number {
    return this.questionsCount;
  }

  resetQuizResults() {
    this.correctAnswersCount = 0;
    this.questionsCount = 0;
    this.spentTime = 0;
  }

  setSpentTime(time: number): void {
    this.spentTime = time;
  }

  getSpentTime(): number {
    return this.spentTime;
  }
}
