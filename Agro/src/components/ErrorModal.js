import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import Modal from 'react-native-modal';
import {BodyText} from './CustomComponents';

const ErrorModal = ({show, setShow, errorMessage, onRetry, isRetrying}) => (
  <Modal
    isVisible={show}
    style={{
      justifyContent: 'center',
      margin: 0,
    }}
    // onBackdropPress={() => setShow(false)}
    animationInTiming={600}>
    <View
      style={{
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 20,
        marginHorizontal: 20,
        alignItems: 'center',
        borderRadius: 10,
      }}>
      <BodyText>{errorMessage}</BodyText>
      <Button onPress={onRetry} disabled={isRetrying}>
        Try Again
      </Button>
    </View>
  </Modal>
);

export default ErrorModal;
