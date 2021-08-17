import React, {useEffect, useCallback, useState} from 'react';
import {SafeAreaView, StatusBar, useColorScheme, View} from 'react-native';
import 'react-native-gesture-handler';
import {lighttheme} from './src/infrastructure/theme/lighttheme';
import {darktheme} from './src/infrastructure/theme/darktheme';
import {ThemeProvider} from 'styled-components';
import Navigation from './src/navigation';
import SplashScreen from 'react-native-splash-screen';
import Header from './src/components/Header';

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  const [isThemeDark, setIsThemeDark] = useState(false);

  let theme = isThemeDark ? darktheme : lighttheme;

  const toggleTheme = useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    // <Provider store={store}>
    <ThemeProvider theme={theme}>
      <StatusBar />
      <Navigation
        theme={theme}
        toggleTheme={toggleTheme}
        isThemeDark={isThemeDark}
      />
    </ThemeProvider>
  );
};

export default App;
