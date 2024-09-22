package main

import (
    "log"
    "net/http"

    "github.com/gorilla/mux"
    "database"
    "handlers"
)

func main() {
    database.ConnectDB()

    r := mux.NewRouter()
    r.HandleFunc("/login", handlers.loginHandler).Methods("POST")
    r.HandleFunc("/signup", handlers.signupHandler).Methods("POST")
    r.HandleFunc("/products", handlers.getProductsHandler).Methods("GET")

    log.Fatal(http.ListenAndServe(":8080", r))
}
