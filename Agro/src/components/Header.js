import React from 'react';
import {Image} from 'react-native';
import {Appbar, IconButton, TouchableRipple} from 'react-native-paper';
import {AppbarHeader} from './CustomComponents';

const Header = props => {
  const {isThemeDark, toggleTheme, navigation} = props;

  return (
    <AppbarHeader>
      <Image
        style={{width: 50, height: 50}}
        source={require('../../assets/logo1.png')}
      />
      <Appbar.Content title="Agro" titleStyle={{fontSize: 24}} />
      {isThemeDark ? (
        <IconButton
          icon={() => (
            <Image
              style={{width: 35, height: 35}}
              source={require('../../assets/moon.png')}
            />
          )}
          onPress={toggleTheme}
        />
      ) : (
        <IconButton
          icon={() => (
            <Image
              style={{width: 35, height: 35}}
              source={require('../../assets/sun.png')}
            />
          )}
          onPress={toggleTheme}
        />
      )}
    </AppbarHeader>
  );
};

export default Header;
