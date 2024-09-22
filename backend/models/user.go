package models

import (
    "encoding/json"
    "net/http"
)

type User struct {
    Email    string `json:"email"`
    Password string `json:"password"`
}

var users = map[string]string{
    "user@example.com": "password123", // Replace with real user management logic
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodPost {
        http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
        return
    }

    var user User
    if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
        http.Error(w, "Bad request", http.StatusBadRequest)
        return
    }

    if password, ok := users[user.Email]; ok && password == user.Password {
        w.WriteHeader(http.StatusOK)
        json.NewEncoder(w).Encode(map[string]bool{"success": true})
    } else {
        w.WriteHeader(http.StatusUnauthorized)
        json.NewEncoder(w).Encode(map[string]interface{}{
            "success": false,
            "message": "Invalid credentials",
        })
    }
}
