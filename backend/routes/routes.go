// backend/routes/routes.go
package routes

import (
    "backend/controllers"

    "github.com/gorilla/mux"
    "github.com/rs/cors"

)

func InitializeRoutes() *mux.Router {
    router := mux.NewRouter()

    // Authentication Routes
    router.HandleFunc("/api/signup", controllers.SignupHandler).Methods("POST")
    router.HandleFunc("/api/login", controllers.LoginHandler).Methods("POST")

    // Add more routes as needed
    // e.g., router.HandleFunc("/api/products", controllers.GetProducts).Methods("GET")

    // CORS configuration
    c := cors.New(cors.Options{
        AllowedOrigins:   []string{"http://localhost:3000"}, 
        AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowedHeaders:   []string{"Content-Type", "Authorization"},
        AllowCredentials: true,
    })

    c.Handler(router)
    return router
}
