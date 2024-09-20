from deepface import DeepFace

def test_model(image_path):
    try:
        result = DeepFace.represent(img_path=image_path, model_name='VGG-Face')
        print("Model output:", result)
    except Exception as e:
        print("Error:", e)

# Replace with a valid image path on your system
test_image_path = 'photo.jpg'
test_model(test_image_path)
