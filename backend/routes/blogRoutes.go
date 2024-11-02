package routes

import "github.com/gin-gonic/gin"

func PDFRoutes(router *gin.Engine) {
    router.Static("/pdfs", "./public/pdfs")
}
