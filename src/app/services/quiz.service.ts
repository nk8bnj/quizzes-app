import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

import { preparedQuizzes } from '../helpers/prepared-quizzes.helper';

import { Quiz, Question } from '../types/quiz.interface';

const AMOUNT_OF_QUIZZES = 10;
const AMOUNT_OF_QUESTIONS = 30;

const URL = `https://opentdb.com/api.php?amount=${AMOUNT_OF_QUESTIONS}`;

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private apiUrl = URL;
  private quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject<Quiz[]>([]);

  constructor(private http: HttpClient) {}

  getQuizzes(): Observable<Quiz[]> {
    return this.http.get<{ results: Question[] }>(this.apiUrl).pipe(
      map((response) => preparedQuizzes(response.results, AMOUNT_OF_QUIZZES)),
      tap((quizzes) => this.quizzes$.next(quizzes)),
    );
  }

  getQuizById(id: number): Observable<Quiz | undefined> {
    return this.quizzes$.pipe(
      map((quizzes) => quizzes.find((quiz) => quiz.id === id)),
    );
  }

  getRandomQuizId(): Observable<number> {
    return this.quizzes$.pipe(
      map((quizzes) => {
        const index = Math.floor(Math.random() * AMOUNT_OF_QUIZZES);

        return quizzes[index].id;
      }),
    );
  }
}
