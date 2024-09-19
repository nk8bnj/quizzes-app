import { Question, Quiz } from '../types/quiz.interface';

export const preparedQuizzes = (
  questions: Question[],
  amount: number,
): Quiz[] => {
  const groupedQuestions = questions.reduce(
    (acc: Record<string, Question[]>, cur) => {
      if (!acc[cur.category]) {
        acc[cur.category] = [];
      }

      acc[cur.category].push(cur);

      return acc;
    },
    {},
  );

  const groupedQuizzes = Object.keys(groupedQuestions)
    .slice(0, amount)
    .map((category) => ({
      id: Math.floor(Math.random() * 1000),
      category,
      questions: groupedQuestions[category],
    }));

  return groupedQuizzes;
};

