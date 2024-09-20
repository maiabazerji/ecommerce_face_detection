package main

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"mime/multipart"
	"net/http"
	"os"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
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
	// := means declare and assign a variable at the same time
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// // Set up MongoDB Atlas connection
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
}

// RegisterFace handles face registration
func RegisterFace(w http.ResponseWriter, r *http.Request) {
	userID := r.FormValue("user_id")
	file, _, err := r.FormFile("image")
	if err != nil {
		http.Error(w, "Invalid image upload", http.StatusBadRequest)
		return
	}
	defer file.Close()

	// Send image to Python service for face embedding
	embedding, err := sendToPythonService(userID, file, "register")
	if err != nil {
		http.Error(w, "Face recognition failed", http.StatusInternalServerError)
		return
	}

	// Save embedding to MongoDB
	collection := client.Database("ecommerce").Collection("users")
	objID, _ := primitive.ObjectIDFromHex(userID)
	_, err = collection.UpdateOne(context.TODO(), bson.M{"_id": objID}, bson.M{"$set": bson.M{"face_embedding": embedding}})
	if err != nil {
		http.Error(w, "Failed to update user embedding", http.StatusInternalServerError)
		return
	}

	w.Write([]byte("Face registered successfully"))
}

// LoginFace handles face authentication
func LoginFace(w http.ResponseWriter, r *http.Request) {
	userID := r.FormValue("user_id")
	file, _, err := r.FormFile("image")
	if err != nil {
		http.Error(w, "Invalid image upload", http.StatusBadRequest)
		return
	}
	defer file.Close()

	// Send image to Python service for authentication
	result, err := sendToPythonService(userID, file, "login")
	if err != nil {
		http.Error(w, "Face authentication failed", http.StatusInternalServerError)
		return
	}

	if result == "success" {
		w.Write([]byte("Login successful"))
	} else {
		http.Error(w, "Login failed", http.StatusUnauthorized)
	}
}

// Helper function to communicate with Python service
func sendToPythonService(userID string, file multipart.File, action string) (string, error) {
	var buf bytes.Buffer
	writer := multipart.NewWriter(&buf)

	fw, err := writer.CreateFormFile("image", "upload.jpg")
	if err != nil {
		return "", err
	}

	_, err = io.Copy(fw, file)
	if err != nil {
		return "", err
	}

	writer.WriteField("user_id", userID)
	writer.Close()

	// Call Python API (replace 'localhost:5000' with the actual Python service URL)
	url := fmt.Sprintf("http://localhost:5000/%s", action)
	req, err := http.NewRequest("POST", url, &buf)
	if err != nil {
		return "", err
	}
	req.Header.Set("Content-Type", writer.FormDataContentType())

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	return string(body), nil
}
