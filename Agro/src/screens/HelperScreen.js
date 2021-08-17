import React from 'react';
import {View, Image} from 'react-native';
import {
  PageSafeAreaView,
  PageKeyboardAwareScrollView,
  PageView,
  SubTitle,
  BodyText,
} from '../components/CustomComponents';
import {IconButton} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SizedBox from '../components/SizedBox';
const HelperScreen = ({navigation}) => {
  return (
    <PageSafeAreaView>
      <PageKeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          display: 'flex',
          minHeight: '100%',
          width: '100%',
        }}>
        <IconButton
          icon={() => (
            <FontAwesome5 name="long-arrow-alt-left" size={40} color="black" />
          )}
          size={40}
          onPress={() => navigation.navigate('Home')}
        />
        <PageView>
          <SubTitle style={{textAlign: 'center'}}>
            Uploading Leaf Image for Disease Detection
          </SubTitle>
          <SizedBox height={10} />
          <BodyText>
            For the model to accurately detect the leaf disease Capture leaf
            image or select saved image from gallery and crop it to fit the leaf
            in the cropped box
          </BodyText>
          <SizedBox height={10} />
          <SubTitle style={{fontSize: 20}}>Demo:</SubTitle>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <BodyText>1- Capture Image/Select Saved Image</BodyText>

            <Image
              style={{
                width: 200,
                height: 200,
                alignSelf: 'center',
              }}
              source={require('../../assets/apple_black_rot.jpg')}
            />
            <BodyText>
              2- Crop Image to fit the diseased area in the box
            </BodyText>
            <Image
              style={{
                width: 200,
                height: 200,
                alignSelf: 'center',
              }}
              source={require('../../assets/apple_black_rot_cropped.jpg')}
            />
            <SizedBox height={10} />
            <BodyText>
              Then Click, Get Disease to get the correct disease with the
              confidence
            </BodyText>
          </View>
        </PageView>
      </PageKeyboardAwareScrollView>
    </PageSafeAreaView>
  );
};

export default HelperScreen;
