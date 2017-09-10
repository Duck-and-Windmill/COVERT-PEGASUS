import React, { Component } from 'react';
import {
  SwitchIOS,
  StyleSheet,
  View,
  Text,
  Button,
  Animated,
  Image,
  Easing
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';

import bgSrc from '../images/wallpaper.png';

const SIZE = 40;

export default class ControlPanel extends Component {
  constructor() {
      super();

      this.state = {
          isLoading: false
      };

      this._logout = this._logout.bind(this);
      this.growAnimated = new Animated.Value(0);
  }

  _logout() {
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
          Actions.pop()
          Actions.loginScreen();
      }, 500);
  }

  _home() {
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
          Actions.appScreen();
      }, 500);
  }

  _settings() {
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
          Actions.settingsScreen();
      }, 500);
  }

  render() {
    const changeScale = this.growAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [1, SIZE],
        });

    return (
      <Image style={styles.picture} source={bgSrc}>
         <View style={styles.controlPanel}>
          <Text style={styles.controlPanelWelcome}>
            Genie
          </Text>
          <Button
            onPress={() => {
              this._home();
            }}
            title="Home"
            style={styles.button}
          />
          <Button
            onPress={() => {
              this._settings();
            }}
            title="Settings"
            style={styles.button}
          />
          <Button
            onPress={() => {
              this._logout();
            }}
            title="Logout"
            style={styles.button}
          />
          <Animated.View style={[ styles.circle, {transform: [{scale: changeScale}]} ]} />
        </View>
      </Image>
        
    )
  }
}

const styles = StyleSheet.create({
  picture: {
      flex: 1,
      width: null,
      height: null,
      resizeMode: 'cover',
      flexDirection: 'column',
      justifyContent: 'space-around',
  },
  controlPanel: {
    flex: 1,
    backgroundColor:'#333333',
  },
  button: {
    backgroundColor: '#25c5a1'
  },
  controlPanelText: {
    color:'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 25,
  },
  controlPanelWelcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 25,
    color:'white',
    fontWeight:'bold',
  }
});