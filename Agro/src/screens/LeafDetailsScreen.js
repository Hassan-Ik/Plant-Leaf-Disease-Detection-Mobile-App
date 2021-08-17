import React from 'react';
import {ImageBackground, View} from 'react-native';
import {
  PageSafeAreaView,
  PageKeyboardAwareScrollView,
  PageView,
  PrimaryMediumButton,
  SubTitle,
  BodyText,
  Title,
  AppbarHeader,
} from '../components/CustomComponents';
import {IconButton, Button} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {baseURL} from '../baseURL';
import SizedBox from '../components/SizedBox';

const makeArray = data => {
  let string = '';
  let array = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i] !== '.') {
      string += data[i];
    } else {
      array.push(string);
      string = '';
    }
  }
  return array;
};
const LeafDetailsScreen = ({route, navigation}) => {
  const data = route.params;
  console.log(data);
  let symptoms = makeArray(data.symptoms);
  let causes = makeArray(data.causes);
  let effects = makeArray(data.effects);
  let management = makeArray(data.management);
  console.log(management);
  return (
    <PageSafeAreaView>
      <PageKeyboardAwareScrollView
        contentContainerStyle={{
          display: 'flex',
          minHeight: '100%',
          width: '100%',
        }}>
        <ImageBackground
          source={{uri: `${baseURL}${data.image}`}}
          resizeMode="cover"
          style={{
            width: '100%',
            height: 300,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            overflow: 'hidden',
            elevation: 3,
          }}>
          <IconButton
            icon={() => (
              <FontAwesome5
                name="long-arrow-alt-left"
                size={40}
                color="black"
              />
            )}
            size={40}
            onPress={() => navigation.navigate('Library')}
          />
        </ImageBackground>
        <PageView>
          <SizedBox height={20} />
          <BodyText style={{fontSize: 24, fontWeight: '700'}}>
            {data.name}
          </BodyText>
          <SizedBox height={5} />
          {data.type === 'Healthy' ? (
            <BodyText
              style={{
                color: '#1A6354',
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              {data.type}
            </BodyText>
          ) : (
            <BodyText
              style={{
                color: '#fdd835',
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              {data.type}
            </BodyText>
          )}
          <SizedBox height={20} />
          <SubTitle>Details</SubTitle>
          <BodyText>{data.details}</BodyText>
          {data.symptoms !== '' ? (
            <>
              <SizedBox height={20} />
              <SubTitle>Symptoms</SubTitle>
              {symptoms.map((value, index) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingRight: 15,
                    }}
                    key={index}>
                    <IconButton icon="circle" size={10} />
                    <BodyText>{value}</BodyText>
                  </View>
                );
              })}
            </>
          ) : null}

          {data.causes !== '' ? (
            <>
              <SizedBox height={20} />
              <SubTitle>Causes</SubTitle>
              {causes.map((value, index) => {
                return (
                  <View
                    style={{flexDirection: 'row', paddingRight: 15}}
                    key={index}>
                    <IconButton icon="circle" size={10} />
                    <BodyText>{value}</BodyText>
                  </View>
                );
              })}
            </>
          ) : null}

          {data.effects !== '' ? (
            <>
              <SizedBox height={20} />
              <SubTitle>Effects</SubTitle>
              {effects.map((value, index) => {
                return (
                  <View
                    style={{flexDirection: 'row', paddingRight: 15}}
                    key={index}>
                    <IconButton icon="circle" size={10} />
                    <BodyText>{value}</BodyText>
                  </View>
                );
              })}
            </>
          ) : null}

          {data.management !== '' ? (
            <>
              <SizedBox height={20} />
              <SubTitle>Management</SubTitle>
              {management.map((value, index) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingRight: 15,
                    }}
                    key={index}>
                    <IconButton icon="circle" size={10} />
                    <BodyText>{value}</BodyText>
                  </View>
                );
              })}
            </>
          ) : null}
        </PageView>
      </PageKeyboardAwareScrollView>
    </PageSafeAreaView>
  );
};

export default LeafDetailsScreen;
