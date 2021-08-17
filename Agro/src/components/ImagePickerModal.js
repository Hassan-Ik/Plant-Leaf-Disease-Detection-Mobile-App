import React from 'react';
import Modal from 'react-native-modal';
import {
  ImagePickerModalView,
  PrimaryMediumButton,
  SecondaryMediumButton,
} from './CustomComponents';
import ImagePicker from 'react-native-image-crop-picker';
import SizedBox from './SizedBox';

const ImagePickerModal = ({isModalVisible, setIsModalVisible, navigation}) => {
  const chooseImage = () => {
    ImagePicker.openPicker({
      width: 384,
      height: 384,
      cropping: true,
      multiple: false,
    })
      .then(response => {
        navigation.navigate('Prediction', {
          image: response,
        });
        setIsModalVisible(false)
      })
      .catch(error => console.log(error));
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 384,
      height: 384,
      cropping: true,
      multiple: false,
    })
      .then(response => {
        navigation.navigate('Prediction', {
          image: response,
        });
        setIsModalVisible(false)
      })
      .catch(error => console.log(error));
  };

  return (
    <Modal
      isVisible={isModalVisible}
      style={{justifyContent: 'flex-end', margin: 0}}
      onBackdropPress={() => setIsModalVisible(false)}>
      <ImagePickerModalView>
        <PrimaryMediumButton
          icon="camera"
          mode="contained"
          onPress={openCamera}>
          Capture an Image
        </PrimaryMediumButton>
        <SizedBox height={10} />
        <PrimaryMediumButton
          icon="image"
          mode="contained"
          onPress={chooseImage}>
          Open Gallery
        </PrimaryMediumButton>
        <SizedBox height={10} />
        <SecondaryMediumButton
          icon="cancel"
          mode="contained"
          onPress={() => setIsModalVisible(false)}>
          Cancel
        </SecondaryMediumButton>
      </ImagePickerModalView>
    </Modal>
  );
};

export default ImagePickerModal;
