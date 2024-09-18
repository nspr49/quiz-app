package service

import (
	"container/list"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"quiz-service/internal/quiz"
)

var quizes = list.New()

func getQuizFromList(quizes *list.List) quiz.Quiz {
	element, ok := quizes.Remove(quizes.Front()).(quiz.Quiz)
	fmt.Println(quizes)
	if ok {
		return element
	}
	return quiz.Quiz{IsEmpty: true}
}

func GetQuiz() quiz.Quiz {
	if quizes.Front() == nil {
		fetchQuiz()
	}
	return getQuizFromList(quizes)
}

func fetchQuiz() {
	response, err := http.Get("https://the-trivia-api.com/v2/questions")
	responseData, err := io.ReadAll(response.Body)
	if err != nil {
		panic(err)
	}
	var fetchedQuizes []quiz.Quiz
	err = json.Unmarshal(responseData, &fetchedQuizes)
	for _, responseQuize := range fetchedQuizes {
		responseQuize.IncorrectAnswers = append(responseQuize.IncorrectAnswers, responseQuize.CorrectAnswer)
		quizes.PushFront(responseQuize)
	}
}
