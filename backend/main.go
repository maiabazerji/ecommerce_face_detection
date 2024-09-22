package main

import (
    "backend/handlers"
    "log"
    "net/http"

    "github.com/gorilla/mux"
)

func main() {
    // Remove this line
    // database.init()

    r := mux.NewRouter()
    r.HandleFunc("/login", handlers.LoginHandler).Methods("POST")      // Use proper casing for exported functions
    r.HandleFunc("/signup", handlers.SignupHandler).Methods("POST")
    r.HandleFunc("/products", handlers.GetProductsHandler).Methods("GET")

    log.Fatal(http.ListenAndServe(":8080", r))
}
