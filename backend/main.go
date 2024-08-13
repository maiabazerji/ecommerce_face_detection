package main

import (
    "context"
    "log"
    "net/http"
    "time"
    "bytes"
    "mime/multipart"
    "encoding/json"
    "io/ioutil"
    "os"

    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

var client *mongo.Client

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()
    var err error
    client, err = mongo.Connect(ctx, options.Client().ApplyURI("mongodb://mongodb:27017"))
    if err != nil {
        log.Fatal(err)
    }

    r := gin.Default()

    // CORS Middleware
    r.Use(cors.New(cors.Config{
        AllowOrigins: []string{"http://localhost:3000"},
        AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
        AllowHeaders: []string{"Origin", "Content-Type", "Authorization"},
    }))

    // Product routes
    r.GET("/products", getProducts)
    r.GET("/products/:id", getProduct)
    r.POST("/products", createProduct)
    r.PUT("/products/:id", updateProduct)
    r.DELETE("/products/:id", deleteProduct)

    // User routes (using face detection)
    r.POST("/register", registerUser)
    r.POST("/login", loginUser)

    r.Run(":5000")
}

// MongoDB Product Handlers

func getProducts(c *gin.Context) {
    collection := client.Database("ecommerce").Collection("products")
    cur, err := collection.Find(context.Background(), bson.D{})
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    var products []bson.M
    if err = cur.All(context.Background(), &products); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, products)
}

func getProduct(c *gin.Context) {
    id := c.Param("id")
    collection := client.Database("ecommerce").Collection("products")
    var product bson.M
    err := collection.FindOne(context.Background(), bson.M{"_id": id}).Decode(&product)
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
        return
    }
    c.JSON(http.StatusOK, product)
}

func createProduct(c *gin.Context) {
    var product bson.M
    if err := c.BindJSON(&product); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    collection := client.Database("ecommerce").Collection("products")
    _, err := collection.InsertOne(context.Background(), product)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusCreated, product)
}

func updateProduct(c *gin.Context) {
    id := c.Param("id")
    var product bson.M
    if err := c.BindJSON(&product); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    collection := client.Database("ecommerce").Collection("products")
    _, err := collection.UpdateOne(context.Background(), bson.M{"_id": id}, bson.M{"$set": product})
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, product)
}

func deleteProduct(c *gin.Context) {
    id := c.Param("id")
    collection := client.Database("ecommerce").Collection("products")
    _, err := collection.DeleteOne(context.Background(), bson.M{"_id": id})
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusNoContent, nil)
}

// Python Face Detection Integration

func callFaceAuthService(endpoint, imagePath, username string) (*FaceAuthResponse, error) {
    file, err := os.Open(imagePath)
    if err != nil {
        return nil, err
    }
    defer file.Close()

    var requestBody bytes.Buffer
    writer := multipart.NewWriter(&requestBody)
    _, err = writer.CreateFormFile("image", file.Name())
    if err != nil {
        return nil, err
    }
    _, err = ioutil.ReadAll(file)
    if err != nil {
        return nil, err
    }

    if username != "" {
        writer.WriteField("username", username)
    }

    writer.Close()

    req, err := http.NewRequest("POST", endpoint, &requestBody)
    if err != nil {
        return nil, err
    }
    req.Header.Set("Content-Type", writer.FormDataContentType())

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    var faceAuthResponse FaceAuthResponse
    if err := json.NewDecoder(resp.Body).Decode(&faceAuthResponse); err != nil {
        return nil, err
    }

    return &faceAuthResponse, nil
}

func registerUser(c *gin.Context) {
    imagePath := c.PostForm("image_path")
    username := c.PostForm("username")

    response, err := callFaceAuthService("http://localhost:5000/register", imagePath, username)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Error contacting face auth service"})
        return
    }

    if response.Error != "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": response.Error})
        return
    }

    c.JSON(http.StatusCreated, gin.H{"message": response.Message})
}

func loginUser(c *gin.Context) {
    imagePath := c.PostForm("image_path")

    response, err := callFaceAuthService("http://localhost:5000/login", imagePath, "")
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Error contacting face auth service"})
        return
    }

    if response.Error != "" {
        c.JSON(http.StatusUnauthorized, gin.H{"error": response.Error})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": response.Message, "username": response.Username})
}

// FaceAuthResponse defines the structure of the response from the face auth service
type FaceAuthResponse struct {
    Message  string `json:"message"`
    Username string `json:"username,omitempty"`
    Error    string `json:"error,omitempty"`
}
