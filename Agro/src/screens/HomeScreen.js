import React, {useState, useEffect} from 'react';
import {
  View,
  Platform,
  Image,
  PermissionsAndroid,
  ScrollView,
} from 'react-native';
import {
  PageKeyboardAwareScrollView,
  PageView,
  PageSafeAreaView,
  SecondaryMediumButton,
  PredictionView,
  PredictionRowView,
  Caption,
  SubTitle,
} from '../components/CustomComponents';
import DiseaseClasses from '../components/DiseaseClasses';
import Header from '../components/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SizedBox from '../components/SizedBox';
import ImagePickerModal from '../components/ImagePickerModal';
import {Button} from 'react-native-paper';
import NoInternetModal from '../components/NoInternetModal';
import NetInfo from '@react-native-community/netinfo';

const HomeScreen = props => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImagePickerModalVisible, setIsImagePickerModalVisible] =
    useState(false);
  const [isOffline, setOfflineStatus] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async () => {
      checkInternetConnection();
    });
    return unsubscribe;
  }, []);

  const checkInternetConnection = () => {
    setIsRetrying(true);
    NetInfo.fetch()
      .then(state => {
        const offline = !(state.isConnected && state.isInternetReachable);
        if (offline) {
          setOfflineStatus(offline);
        } else {
          setOfflineStatus(false);
        }
      })
      .finally(() => {
        setIsRetrying(false);
      });
  };

  const handleToggle = () => {
    setIsModalVisible(!isModalVisible);
  };
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };
  const handleImagePicker = async () => {
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      setIsImagePickerModalVisible(true);
    }
  };
  return (
    <PageSafeAreaView>
      <Header
        navigation={props.navigation}
        toggleTheme={props.toggleTheme}
        isThemeDark={props.isThemeDark}
      />
      <PageKeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          display: 'flex',
          minHeight: '100%',
          width: '100%',
        }}>
        <PageView>
          <DiseaseClasses
            isModalVisible={isModalVisible}
            handleToggle={handleToggle}
          />
          <ImagePickerModal
            isModalVisible={isImagePickerModalVisible}
            setIsModalVisible={setIsImagePickerModalVisible}
            navigation={props.navigation}
          />
          <NoInternetModal
            show={isOffline}
            onRetry={checkInternetConnection}
            isRetrying={isRetrying}
          />
          <SizedBox height={10} />
          <SubTitle style={{elevation: 5, fontSize: 20}}>
            Detect Plant Leaf Disease
          </SubTitle>
          <SizedBox height={10} />
          <PredictionView
            style={{
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.74,
              shadowRadius: 10.67,
            }}>
            <PredictionRowView
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <Image
                style={{width: 50, height: 50}}
                source={require('../../assets/picture.png')}
              />
              <MaterialIcons
                name="arrow-forward-ios"
                size={30}
                color="darkgreen"
              />
              <Image
                style={{width: 50, height: 50}}
                source={require('../../assets/process.png')}
              />
              <MaterialIcons
                name="arrow-forward-ios"
                size={30}
                color="darkgreen"
              />
              <Image
                style={{width: 50, height: 50}}
                source={require('../../assets/analysis.png')}
              />
            </PredictionRowView>
            <SizedBox height={10} />
            <PredictionRowView>
              <View
                style={{
                  width: '33.3%',
                  alignItems: 'center',
                }}>
                <Caption>Select an Image</Caption>
              </View>
              <View style={{width: '33.3%', alignItems: 'center'}}>
                <Caption>Image Processing</Caption>
              </View>
              <View style={{width: '33.3%', alignItems: 'flex-end'}}>
                <Caption>Get Diagnosis</Caption>
              </View>
            </PredictionRowView>
            <SizedBox height={20} />
            <SecondaryMediumButton
              icon="camera"
              mode="contained"
              onPress={handleImagePicker}>
              Select an Image
            </SecondaryMediumButton>
          </PredictionView>
          <SizedBox height={50} />
          <View>
            <SubTitle style={{textAlign: 'center', elevation: 3}}>
              How to upload image for better disease detection?
            </SubTitle>
            <Button
              onPress={() => props.navigation.navigate('Helper')}
              labelStyle={{fontSize: 18}}
              icon="cursor-default-click-outline"
              color="green">
              Click Here to know!
            </Button>
          </View>

          <SizedBox height={50} />
          <View>
            <SubTitle style={{textAlign: 'center', elevation: 3}}>
              Currently we can detect the following leaf species and their
              diseases
            </SubTitle>
            <Button
              onPress={handleToggle}
              labelStyle={{fontSize: 18}}
              icon="leaf"
              color="green">
              Show Leaf Species
            </Button>
          </View>
        </PageView>
      </PageKeyboardAwareScrollView>
    </PageSafeAreaView>
  );
};

export default HomeScreen;
