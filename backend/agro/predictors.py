import numpy as np
from PIL import Image
import os
import tensorflow as tf
from tensorflow.keras import layers
from tensorflow.keras.models import load_model
import random


def predict_and_vote(image, model, img_size):
    
    """
    Run the model over 4 local areas of the given image,
    before making a decision depending on the most predicted
    disease.
    """
    
    # Defining test time sugmentations for the images
    if img_size == 512:
        TTA_runs = 5
        test_time_augmentation_layers = tf.keras.Sequential([
        layers.experimental.preprocessing.RandomCrop(height=img_size, width=img_size),
        layers.experimental.preprocessing.RandomFlip("horizontal_and_vertical"),
        layers.experimental.preprocessing.RandomContrast((0.3,0.3)),
        layers.experimental.preprocessing.RandomZoom((-0.2,0)),
        layers.experimental.preprocessing.CenterCrop(height=img_size, width=img_size)
    ])
    else:
        TTA_runs = 4
        test_time_augmentation_layers = tf.keras.Sequential([
        layers.experimental.preprocessing.RandomFlip("horizontal_and_vertical"),
        layers.experimental.preprocessing.RandomRotation(0.3),
        layers.experimental.preprocessing.RandomContrast((0.2,0.3)),
        layers.experimental.preprocessing.RandomZoom((-0.2,0)),
    ])
    #apply TTA to each of the images and sum all predictions for each local image
    localised_predictions = []
    # local_image = tf.expand_dims(local_image,0)
    augmented_images = [test_time_augmentation_layers(image) for i in range(TTA_runs)]
    predictions = model.predict(augmented_images[0])
    # if img_size == 250:
    #     predictions = tf.nn.softmax(predictions)
    localised_predictions.append(np.sum(predictions, axis=0))
    #sum all predictions from all images and retrieve the index of the highest value
    global_predictions = np.sum(np.array(localised_predictions),axis=0)
    final_prediction = np.argmax(global_predictions)
    final_prediction_confidence = np.max(global_predictions)
    
    return final_prediction, final_prediction_confidence

def load_image_from_path(img_path, img_size, convert_dtype=False, center_crop=False):
    
    """
        Loading the image from image path and converting it into a 4D
        tensor batch
    """
    
    img = tf.io.read_file(img_path)
    img = tf.image.decode_jpeg(img, channels=3)
    if center_crop == True:
        img = tf.image.central_crop(img, central_fraction = 0.7)
    if convert_dtype == True:
        img = tf.image.convert_image_dtype(img, tf.float32)
    img = tf.image.resize(img, (img_size,img_size))
    img = tf.reshape(img, (1,img_size,img_size,3))
    return img

def predictLeafDisease(img_path, img_size, leaf_disease_model):
    
    """
        Function to predict Plant leaf village disease dataset
    """
    
    # loading image from path and converting it to tensor for model training 
    image = load_image_from_path(img_path, img_size)
    
    # loading pretrained model and compile it for prediction
    model = load_model(leaf_disease_model)
    model.compile(optimizer=tf.keras.optimizers.Adam(1e-4),loss=tf.keras.losses.CategoricalHinge(),
              metrics=["accuracy"])
    
    # Types of diseases
    leaf_disease_classes = ['Apple Black rot',
 'Apple Cedar apple rust',
 'Apple Powdery mildew',
 'Apple healthy',
 'Apple scab',
 'Cherry (including_sour) Powdery mildew',
 'Cherry (including_sour) healthy',
 'Corn (maize) Cercospora leaf spot Gray leaf spot',
 'Corn (maize) Common rust',
 'Corn (maize) Northern Leaf Blight',
 'Corn (maize) healthy',
 'Cotton leaf diseased',
 'Cotton leaf fresh',
 'Grape Black rot',
 'Grape Esca (Black_Measles)',
 'Grape Leaf blight (Isariopsis_Leaf_Spot)',
 'Grape healthy',
 'Orange Haunglongbing (Citrus_greening)',
 'Orange Black Rot',
 'Orange Canker',
 'Orange Healthy',
 'Peach Bacterial spot',
 'Peach healthy',
 'Pepper, bell Bacterial spot',
 'Pepper, bell healthy',
 'Potato Early blight',
 'Potato Late blight',
 'Potato healthy',
 'Random',
 'Squash Powdery mildew',
 'Strawberry Leaf scorch',
 'Strawberry healthy',
 'Tomato Bacterial spot',
 'Tomato Early blight',
 'Tomato Late blight',
 'Tomato Leaf Mold',
 'Tomato Septoria leaf spot',
 'Tomato Spider mites Two spotted spider mite',
 'Tomato Target Spot',
 'Tomato Tomato Yellow Leaf Curl Virus',
 'Tomato Tomato mosaic virus',
 'Tomato healthy',
 'Wheat healthy',
 'Wheat leaf rust',
 'Wheat nitrogen deficiency']
    
    # pred, confidence = predict_and_vote(image, model, img_size=img_size)
    # return {"label": leaf_disease_classes[pred], "confidence": confidence*100}
    pred = model.predict(image)
    print("Prediction List",pred)
    print("Maximum",leaf_disease_classes[np.argmax(pred)])
    top_5 = []
    for i in np.argsort(pred)[0][-5:]:
        top_5.append(leaf_disease_classes[i])
    print("Top 5 Accuracy", top_5)
    print(round(np.max(pred)*100,2))
    result = leaf_disease_classes[np.argmax(pred)]
    return {"label": result, "confidence":round(np.max(pred)*100, 2)} 

def predictCassavaLeafDisease(img_path, img_size, model):
    
    """
        Function to predict cassava leaf diseases
    """
    
    # loading image from path and converting it to tensor for model training 
    image = load_image_from_path(img_path, img_size, convert_dtype=False)
    
    # Types of cassava leaf diseases
    classes = [
        "Cassava Bacterial Blight (CBB)",
        "Cassava Brown Streak Disease (CBSD)",
        "Cassava Green Mottle (CGM)",
        "Cassava Mosaic Disease (CMD)",
        "Healthy",
    ]
    
    # Loading pretrained cassava leaf disease model and compiling it
    model = load_model(model)
    model.compile(loss="categorical_crossentropy", optimizer=tf.keras.optimizers.Adam(1e-4), metrics=["accuracy"])
    
    pred, confidence = predict_and_vote(image, model, img_size=img_size)
    return {"label": classes[pred], "confidence": confidence*100}
    # pred = model.predict(image)
    # prediction = ''
    # print(pred)
    # if np.max(pred)* 100 >= 70: 
    #     prediction = classes[np.argmax(pred)]
    # return prediction
    # return {'label': prediction, 'confidence': np.max(pred)*100}
    