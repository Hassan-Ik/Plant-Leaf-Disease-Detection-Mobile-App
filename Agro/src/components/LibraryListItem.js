import React, {useState, useEffect} from 'react';
import {View, Dimensions, Image} from 'react-native';
import {Button, IconButton} from 'react-native-paper';
import {
  BodyText,
  ListItemView,
  ListItemPressable,
  ListItemText,
} from './CustomComponents';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {baseURL} from '../baseURL';

const MobileScreen = Dimensions.get('screen');
const finalWidth = MobileScreen.width - 30;
const finalModalHeight = MobileScreen.height - 300;
const modalInputHeight = finalModalHeight - 100;

const LibraryListItem = ({
  navigation,
  id,
  name,
  type,
  details,
  symptoms,
  causes,
  effects,
  management,
  image,
}) => {
  return (
    <>
      <ListItemPressable
        onPress={() => {
          navigation.navigate('Details', {
            id: id,
            name: name,
            type: type,
            details: details,
            symptoms: symptoms,
            causes: causes,
            effects: effects,
            management: management,
            image: image,
          });
        }}
        animationType="slide"
        transparent={false}>
        <ListItemView>
          <View
            style={{
              width: '40%',
              height: '100%',
              justifyContent: 'flex-start',
            }}>
            <Image
              style={{
                width: '100%',
                height: 160,
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
              }}
              source={{uri: `${baseURL}${image}`}}
            />
          </View>
          <View
            style={{
              flexDirection: 'column',
              width: '60%',
              height: 160,
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <ListItemText>{name}</ListItemText>
            {type === 'Healthy' ? (
              <Button
                mode="contained"
                labelStyle={{color: '#83B9AE'}}
                style={{
                  backgroundColor: '#1A6354',
                  elevation: 0,
                  borderRadius: 50,
                }}>
                {type}
              </Button>
            ) : (
              <Button
                mode="contained"
                labelStyle={{color: '#fdd835'}}
                style={{
                  backgroundColor: '#3E5F2D',
                  elevation: 0,
                  borderRadius: 50,
                }}>
                {type}
              </Button>
            )}
          </View>
        </ListItemView>
      </ListItemPressable>
    </>
  );
};

export default LibraryListItem;
