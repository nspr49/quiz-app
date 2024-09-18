package routes

import (
	"net/http"
	"quiz-service/internal/service"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func getQuiz(g *gin.Context) {
	g.JSON(http.StatusOK, gin.H{
		"quiz": service.GetQuiz()})
}

func InitQuizRoutes() {
	router := gin.Default()
	router.Use(cors.Default())
	router.GET("/quiz", getQuiz)
	router.Run("localhost:8080")
}
