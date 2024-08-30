package main

import (
    "context"
    "encoding/json"
    "log"
    "net/http"
    "github.com/gorilla/mux"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
    "github.com/rs/cors"
    "github.com/joho/godotenv"
    "go.mongodb.org/mongo-driver/bson/primitive"
    "time"
    "os"
)

var client *mongo.Client

// Product struct for MongoDB document
type Product struct {
    ID           primitive.ObjectID `json:"id" bson:"_id"`
    Name         string             `json:"name" bson:"name"`
    Brand        string             `json:"brand" bson:"brand"`
    Price        float64            `json:"price" bson:"price"`
    Category     string             `json:"category" bson:"category"`
    Rating       float64            `json:"rating" bson:"rating"`
    NumReviews   int                `json:"numReviews" bson:"numReviews"`
    CountInStock int                `json:"countInStock" bson:"countInStock"`
    ImageURL     string             `json:"image_url" bson:"image_url"`
}

func main() {
    // Load environment variables
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }

    // // Set up MongoDB Atlas connection
    // uri := "mongodb+srv://<maiabazerji>:<jxIq82co3YwRfpZy>@cluster0.mongodb.net/<ecommerce>?retryWrites=true&w=majority"
    uri := os.Getenv("MONGODB_URI")
    // connectionString := os.Getenv(uri)
    clientOptions := options.Client().ApplyURI(uri).SetServerSelectionTimeout(10 * time.Second)
    client, err = mongo.Connect(context.TODO(), clientOptions)
    if err != nil {
        log.Fatal(err)
    }

    // Check the connection
    err = client.Ping(context.TODO(), nil)
    if err != nil {
        log.Fatal(err)
    }
    log.Println("Connected to MongoDB Atlas!")

    // Set up routes
    r := mux.NewRouter()
    r.HandleFunc("/products", GetProducts).Methods("GET")
    // Add more routes as needed

    // Set up CORS
    handler := cors.Default().Handler(r)
    log.Println("Starting server on port 8000...")
    // Start the server
    log.Fatal(http.ListenAndServe(":8000", handler))
}

// GetProducts handles GET requests to retrieve products from MongoDB Atlas
func GetProducts(w http.ResponseWriter, r *http.Request) {
    collection := client.Database("ecommerce").Collection("products")

    cursor, err := collection.Find(context.TODO(), bson.M{})
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    defer cursor.Close(context.TODO())

    var products []Product
    if err = cursor.All(context.TODO(), &products); err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(products)
}
