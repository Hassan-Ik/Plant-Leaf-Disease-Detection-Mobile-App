# Project Title
Plant Leaf Disease Detection Mobile App 

## Getting Started
All the react native and django application code is available on this repo. It requires python version 3.7 or older to work as model is build using this python version, I am using Django rest framework for this app.
* leaf_disease_model.h5 is the deep learning model, I trained on the dataset, I created by merging different datasets available online.
* predictors.py is the python file, where our image will be converted into tensor batch and given to trained model for prediction.
* HomeScreen.js It is the first that will appear after splash screen, where how to upload image for disease prediction and how many types of plant leaf diseases can our model detect.
* Our Deep learning model currently can detect 12 leaf types and their diseases.

### Prerequisites

* python 3.7
* node
* react
* react native
* tensorflow
* keras
* django
* numpy
* pillow
* pandas
* opencv


### Installing

Download the software setups and follow the on screen instructions

step 1

```
Installing Anaconda, it can be downloaded from below link
```
[Click here to visit download page](https://www.anaconda.com/products/individual#Downloads)

step 2

```
Creating a environment inside Anaconda with python 3.7
```
Anaconda is a great tool for Data Science and Machine Learning. As, In Anaconda , you can create an environment using different python versions for different projects 

step 3

```
  Download Android Studio and java run time environment
```
[Click here to visit download page](https://www.anaconda.com/products/individual#Downloads)

step 4

```
Installing Python Libraries
```
```
cd backend
pip install -r requirements.txt
```
It will install all the necessary python libraries needed for the project to run

step 5

```
Downloading Nodejs 
```
[Click here to visit download page](https://nodejs.org/en/download/)

step 6

```
Installing React and React Native Cli
```
```
npm install react
npm install -g react-native-cli
```

step 7

```
Installing Libraries for react native app
```
```
cd Agro
npm install
```
It will install al the necessary libraries needed for react native app

step 8
  After Installing libraries
  ```
  Running Django Backend
  ```
  ```
  
  cd backend
  python manage.py makemigrations
  python manage.py migrate
  python manage.py runserver
  
  ```
  I will create an Sqlite database and add model tables in the database, and then run the server
 
step 9
  After running backend server
  Go React Native App Directory, Agro
  ```
  cd Agro/android
  ```
  create a local.properties file inside the android folder and add sdk.dir="Sdk root"

step 10

  Open Android folder in android studio and run the app in the android studio to build and show the app in android emulator
 
step 11
  ```
  Building and Running native app in the android emulator 
  ```
  ```
  cd Agro
  react-native run-android
    OR
  react-native run-ios
    OR
  react-native run
  ```
step 12
  ```
    After Running the to connect the app and backend, you can use Ngrok, which provides a https tunnel for requests or check other to connect between them
  ```

## Built Using

* Visual Studio Code 
* Android Studio
* Postman


## Project Demo
* Take a look at the android app


<!-- [![Plant Leaf Disease Detection](https://github.com/Hassan-Ik/Plant-Leaf-Disease-Detection-Mobile-App/blob/main/images/Screenshot_20210808-180304_Agro.jpg =350x250) -->
<img src="https://github.com/Hassan-Ik/Plant-Leaf-Disease-Detection-Mobile-App/blob/main/images/Screenshot_20210808-180304_Agro.jpg"  width="200" height="400" />

## Dataset Resources:

For this App, model I have used data from
* Plant Village Dataset
* PlantDoc Research Dataset
* Data mendely
* Plant Pathology 2021 FGCV
