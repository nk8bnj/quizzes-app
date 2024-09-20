export enum Difficulty {
	Easy = 'easy',
	Medium = 'medium',
	Hard = 'hard'
}

export enum QuestionType {
	Multiple = 'multiple',
	Boolean = 'boolean'
}

export interface Question {
	type: QuestionType
	difficulty: Difficulty
	category: string
	question: string
	correct_answer: string
	incorrect_answers: string[]
}

export interface Quiz {
	id: number
	category: string
	questions: Question[]
}
