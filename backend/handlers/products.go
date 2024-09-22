// backend/handlers/product.go
package handlers

import (
    "encoding/json"
    "net/http"

)

type Product struct {
    ID    string `json:"id"`
    Name  string `json:"name"`
    Price int    `json:"price"`
}

func GetProductsHandler(w http.ResponseWriter, r *http.Request) {
    // Fetch products from database
    products := []Product{} // Replace with actual DB fetch logic
    json.NewEncoder(w).Encode(products)
}
