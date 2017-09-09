import React from 'react';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';

import LoginScreen from './LoginScreen';
import AppScreen from './AppScreen';

export default class Main extends React.Component {
  render() {
    return (
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
        </Scene>
      </Router>
    );
  }
}