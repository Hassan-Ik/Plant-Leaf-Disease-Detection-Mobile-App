import React from 'react';
import Modal from 'react-native-modal';
import {View, ScrollView} from 'react-native';
import {ImagePickerModalView, BodyText, AvatarImage} from './CustomComponents';
const DiseaseClasses = ({isModalVisible, handleToggle}) => {
  const classes = [
    {
      name: 'Apple',
      uri: require('../../assets/apple.png'),
    },
    {
      name: 'Cherry',
      uri: require('../../assets/cherries.png'),
    },
    {
      name: 'Corn',
      uri: require('../../assets/corn.png'),
    },
    {
      name: 'Cotton',
      uri: require('../../assets/cotton.png'),
    },
    {
      name: 'Grape',
      uri: require('../../assets/grapes.png'),
    },
    {
      name: 'Orange',
      uri: require('../../assets/orange.png'),
    },
    {
      name: 'Peach',
      uri: require('../../assets/peach.png'),
    },
    {
      name: 'Potato',
      uri: require('../../assets/potato.png'),
    },
    {
      name: 'Squash',
      uri: require('../../assets/squash.png'),
    },
    {
      name: 'Strawberry',
      uri: require('../../assets/strawberry.png'),
    },
    {
      name: 'Tomato',
      uri: require('../../assets/tomato.png'),
    },
    {
      name: 'Wheat',
      uri: require('../../assets/barley.png'),
    },
  ];
  return (
    <Modal
      isVisible={isModalVisible}
      style={{
        justifyContent: 'flex-end',
        margin: 0,
      }}
      animationInTiming={600}
      onBackdropPress={handleToggle}>
      <ImagePickerModalView>
        <ScrollView style={{maxHeight: 500}}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            {classes.map((value, index) => {
              return (
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  key={index}>
                  <AvatarImage
                    size={100}
                    source={value.uri}
                    style={{resizeMode: 'contain'}}
                  />
                  <BodyText>{value.name}</BodyText>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </ImagePickerModalView>
    </Modal>
  );
};

export default DiseaseClasses;
