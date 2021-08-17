import React from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {Button} from 'react-native-paper';
import {BodyText, ErrorModalView} from './CustomComponents';
import SizedBox from './SizedBox';

const NoInternetModal = ({show, onRetry, isRetrying}) => (
  <Modal
    isVisible={show}
    style={{
      justifyContent: 'center',
      margin: 0,
    }}
    animationInTiming={600}>
    <ErrorModalView>
      <BodyText style={{fontSize: 22, fontWeight: 'bold'}}>
        Connection Error
      </BodyText>
      <SizedBox height={10} />
      <BodyText>
        Oops! Looks like your device is not connected to the Internet.
      </BodyText>
      <SizedBox height={10} />
      <Button
        onPress={onRetry}
        disabled={isRetrying}
        mode="contained"
        icon="reload"
        style={{backgroundColor: '#1A6354'}}>
        Try Again
      </Button>
    </ErrorModalView>
  </Modal>
);

export default NoInternetModal;
