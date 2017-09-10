import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
import {
    StyleSheet,
    KeyboardAvoidingView,
    View,
    ActivityIndicator,
    TouchableOpacity,
    Image,
    Text
} from 'react-native';
import { connect } from 'react-redux'
import { 
  setToken,
  setUsername,
  setPassword,
  setMfa,
  toggleShowMfa 
} from '../actions'

import UserInput from './UserInput';
import LoginSubmit from './LoginSubmit';

import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';
import eyeImg  from '../images/eye_black.png';

class LoginForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
          showPass: true,
          press: false,
          showMfa: false,
          errorMsg: ''
      };
      this.showPass = this.showPass.bind(this);
    }

    showPass() {
      this.state.press === false ? this.setState({ showPass: false, press: true }) :this.setState({ showPass: true, press: false });
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding'
                style={styles.container}>
                <Text>{this.props.errorMsg}</Text>
                <UserInput source={usernameImg}
                    placeholder='Username'
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    autoCorrect={false}
                    onChangeText={(username) => {
                      this.props.dispatch(setUsername(username))
                    }}
                    value={this.props.username} />
                <UserInput source={passwordImg}
                    secureTextEntry={this.state.showPass}
                    placeholder='Password'
                    returnKeyType={'done'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    onChangeText={(password) => {
                      this.props.dispatch(setPassword(password))
                    }}
                    value={this.props.password} />
                {this.props.showMfa &&
                  <UserInput source={passwordImg}
                      placeholder='MFA'
                      autoCapitalize={'none'}
                      returnKeyType={'done'}
                      autoCorrect={false}
                      onChangeText={(mfa) => {
                        this.props.dispatch(setMfa(mfa))
                      }}
                      value={this.props.mfa} />
                }
            </KeyboardAvoidingView>
        );
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  btnEye: {
    position: 'absolute',
    top: 80,
    right: 28,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },
});

const mapStateToProps = (state) => ({
  token: state.token,
  username: state.username,
  password: state.password,
  mfa: state.mfa,
  showMfa: state.showMfa,
  errorMsg: state.errorMsg
})

export default connect(
    mapStateToProps
)(LoginForm);