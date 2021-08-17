import React, {useState, useEffect} from 'react';
import {View, ImageBackground, Platform} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  PageSafeAreaView,
  PageKeyboardAwareScrollView,
  PageView,
  PrimaryMediumButton,
  SecondaryMediumButton,
  SubTitle,
  BodyText,
  ResultView,
  ResultRowView,
} from '../components/CustomComponents';
import {
  IconButton,
  ActivityIndicator,
  Colors,
  Button,
} from 'react-native-paper';
import axios from 'axios';
import SizedBox from '../components/SizedBox';
import {baseURL} from '../baseURL';
import ImagePickerModal from '../components/ImagePickerModal';

const PredictionScreen = ({route, navigation}) => {
  const {image} = route.params;
  const [result, setResult] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [isImagePickerModalVisible, setIsImagePickerModalVisible] =
    useState(false);

  const handlePrediction = async () => {
    setProcessing(true);
    const formData = new FormData();
    formData.append('photo', {
      name: image.path.substring(image.path.lastIndexOf('/') + 1),
      type: image.mime,
      uri:
        Platform.OS === 'android'
          ? image.path
          : image.path.replace('file://', ''),
    });
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post(`${baseURL}/leaf`, formData, config);
      const message = res.data;
      let obj = [
        {
          label: message.label,
          confidence: message.confidence,
        },
      ];
      setResult(obj);
      setProcessing(false);
    } catch (error) {
      setProcessing(false);
      alert(error.message);
    }
  };
  console.log(result);
  return (
    <PageSafeAreaView>
      <PageKeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          display: 'flex',
          minHeight: '100%',
          width: '100%',
        }}>
        <ImageBackground
          source={{uri: image.path}}
          resizeMode="cover"
          style={{width: '100%', height: 420, elevation: 3}}>
          <IconButton
            icon={() => (
              <FontAwesome5
                name="long-arrow-alt-left"
                size={40}
                color="black"
              />
            )}
            size={40}
            onPress={() => navigation.navigate('Home')}
          />
        </ImageBackground>
        <SizedBox height={10} />
        <PageView>
          {processing ? (
            <ActivityIndicator
              animating={true}
              size={'medium'}
              color={Colors.yellow800}
            />
          ) : (
            <PrimaryMediumButton
              icon="leaf"
              mode="contained"
              onPress={handlePrediction}>
              Detect Disease
            </PrimaryMediumButton>
          )}
          <SizedBox height={30} />
          {result.length ? (
            <ResultView>
              <ResultRowView>
                <SubTitle>Result:</SubTitle>
                <BodyText style={{fontSize: 20}}>{result[0].label}</BodyText>
              </ResultRowView>
              <SizedBox height={10} />
              <ResultRowView>
                <SubTitle>Confidence:</SubTitle>
                <BodyText style={{fontSize: 20}}>
                  {result[0].confidence}%
                </BodyText>
              </ResultRowView>
            </ResultView>
          ) : null}
        </PageView>
        <SizedBox height={20} />
        <SecondaryMediumButton
          icon="camera"
          mode="contained"
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            borderRadius: 0,
          }}
          onPress={() => setIsImagePickerModalVisible(true)}>
          Choose another Image
        </SecondaryMediumButton>
        <ImagePickerModal
          isModalVisible={isImagePickerModalVisible}
          setIsModalVisible={setIsImagePickerModalVisible}
          navigation={navigation}
        />
      </PageKeyboardAwareScrollView>
    </PageSafeAreaView>
  );
};

export default PredictionScreen;
