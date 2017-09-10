import React from 'react';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  Image,
  Alert,
  View,
  Button
} from 'react-native';
import { setTheme, getTheme, MKColor, MKTextField, MKButton } from 'react-native-material-kit';
import { Actions, ActionConst } from 'react-native-router-flux';

import { connect } from 'react-redux'
import { setToken } from '../actions'

import Wallpaper from './Wallpaper';
import LoginForm from './LoginForm';
import LoginSubmit from './LoginSubmit';
import Logo from './Logo';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      showMfa: false,
      mfa: '',
      isLoading: false
    }

    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
  }

  _toggleShowMfa(){
    this.setState({
      showMfa: !this.state.showMfa
    });
  }

  _robinhoodLogin(user, pass, mfa) {
    if (this.state.isLoading) return;

    var credentials = {
      username: user,
      password: pass
    };

    if (mfa) {
      credentials.mfa_code = mfa;
    }


    this.setState({ isLoading: true });
    fetch('https://api.robinhood.com/api-token-auth/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.mfa_required) {
        this._toggleShowMfa();
        this.setState({ isLoading: false });
      } else if (responseJson.token) {
        this.props.dispatch(setToken(responseJson.token));

        Animated.timing(
          this.buttonAnimated,
          {
            toValue: 1,
            duration: 200,
            easing: Easing.linear
          }
        ).start();

        this._onGrow();

        setTimeout(() => {
          Actions.appScreen();
          this.setState({ isLoading: false });
          this.buttonAnimated.setValue(0);
          this.growAnimated.setValue(0);
        }, 300);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  _onGrow() {
    Animated.timing(
      this.growAnimated,
      {
        toValue: 1,
        duration: 200,
        easing: Easing.linear
      }
    ).start();
  }

  render() {
    return (
      <Wallpaper >
        <Logo />
        <LoginForm />
        <LoginSubmit/>
      </Wallpaper>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token
})

export default connect(
    mapStateToProps
)(LoginScreen);