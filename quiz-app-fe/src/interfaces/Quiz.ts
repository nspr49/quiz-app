export interface Question {
  text: string;
}

export interface Quiz {
  category: string;
  id: number;
  correctAnswer: string;
  incorrectAnswers: string[];
  question: Question;
  tags: string[];
  difficulty: string[];
  regions: string[];
  isNiche: boolean;
}

export interface QuizWrapper {
  quiz: Quiz;
}
