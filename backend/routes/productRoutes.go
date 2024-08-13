package routes

import (
    "context"
    "encoding/json"
    "net/http"
    "time"

    "backend/models"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/bson/primitive"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

var Client *mongo.Client

// Connect to MongoDB
func ConnectDB(uri string) {
    var err error
    Client, err = mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
    if err != nil {
        panic(err)
    }
}

// GetProducts retrieves all products
func GetProducts(w http.ResponseWriter, r *http.Request) {
    var products []models.Product
    collection := Client.Database("ecommerce").Collection("products")
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    cursor, err := collection.Find(ctx, bson.M{})
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    defer cursor.Close(ctx)

    for cursor.Next(ctx) {
        var product models.Product
        if err := cursor.Decode(&product); err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }
        products = append(products, product)
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(products)
}

// CreateProduct adds a new product
func CreateProduct(w http.ResponseWriter, r *http.Request) {
    var product models.Product
    if err := json.NewDecoder(r.Body).Decode(&product); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
    product.ID = primitive.NewObjectID()

    collection := Client.Database("ecommerce").Collection("products")
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    _, err := collection.InsertOne(ctx, product)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(product)
}
