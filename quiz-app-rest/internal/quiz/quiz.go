package quiz

import "math/rand"

type Question struct {
	Text string `json:"text"`
}

type Quiz struct {
	Category         string   `json:"category"`
	Id               int64    `json:"id"`
	CorrectAnswer    string   `json:"correctAnswer"`
	IncorrectAnswers []string `json:"incorrectAnswers"`
	Question         Question `json:"question"`
	Tags             []string `json:"tags"`
	Difficulty       string   `json:"difficulty"`
	Regions          []string `json:"regions"`
	IsNiche          bool     `json:"isNiche"`
	IsEmpty          bool
}

func (q Quiz) Shuffle() Quiz {
	q.IncorrectAnswers = append(q.IncorrectAnswers, q.CorrectAnswer)
	for i := range q.IncorrectAnswers {
		j := rand.Intn(i + 1)
		q.IncorrectAnswers[i], q.IncorrectAnswers[j] = q.IncorrectAnswers[j], q.IncorrectAnswers[i]
	}
	return q

}
