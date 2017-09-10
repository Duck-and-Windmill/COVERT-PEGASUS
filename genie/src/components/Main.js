import React from 'react';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';
import { COLOR, ThemeProvider } from 'react-native-material-ui';

import LoginScreen from './LoginScreen';
import AppScreen from './AppScreen';
import SettingsScreen from './SettingsScreen'

const uiTheme = {
    palette: {
        primaryColor: COLOR.green500,
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
};

export default class Main extends React.Component {
    _chat() {
      if (this.state.isLoading) return;

      this.setState({ isLoading: true });

      Animated.timing(
          this.growAnimated,
          {
              toValue: 1,
              duration: 300,
              easing: Easing.linear,
          }
      ).start();

      setTimeout(() => {
          Actions.ChatScreen();
      }, 500);
  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Router>
          <Scene key="root">
            <Scene key="loginScreen"
              component={LoginScreen}
              animation='fade'
              hideNavBar={true}
              initial={true}
            />
            <Scene key="appScreen"
              component={AppScreen}
              animation='fade'
              hideNavBar={true}
            />
            <Scene key="settingsScreen"
              component={SettingsScreen}
              animation='fade'
              hideNavBar={true}
            />
          </Scene>

          <Button
            onPress={() => {
              this._chatBot();
            }}
            title="ChatBot"
            style={styles.button}
            />

        </Router>
      </ThemeProvider>
    );
  }
}
