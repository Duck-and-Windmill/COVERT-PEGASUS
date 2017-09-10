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
        </Router>
      </ThemeProvider>
    );
  }
}