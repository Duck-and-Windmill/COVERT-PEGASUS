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
    console.log(this.props)
    if (this.state.isLoading) return;

    var credentials = {
      username: user,
      password: pass
    };

    if (mfa) {
      credentials.mfa_code = mfa;
    }

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
      console.log(responseJson);
      if (responseJson.mfa_required) {
        this._toggleShowMfa();
      } else if (responseJson.token) {
        this.props.dispatch(setToken(responseJson.token));

        console.log(this.props)

        /*Animated.timing(
          this.buttonAnimated,
          {
            toValue: 1,
            duration: 200,
            easing: Easing.linear
          }
        ).start();*/


        this.setState({ isLoading: true });
        Actions.appScreen();
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MKTextField
          placeholder="Username"
          style={styles.textfield}
          ref= {(el) => { this.username = el; }}
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
        />
        <MKTextField
          placeholder="Password"
          password={true}
          style={styles.textfield}
          ref= {(el) => { this.password = el; }}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />
        {this.state.showMfa &&
          <MKTextField
            placeholder="MFA"
            style={styles.textfield}
            ref= {(el) => { this.mfa = el; }}
            onChangeText={(mfa) => this.setState({mfa})}
            value={this.state.mfa}
          />
        }
        <Button
          onPress={() => {
            if (this.state.showMfa) {
              this._robinhoodLogin(this.state.username, this.state.password, this.state.mfa);
            } else {
              this._robinhoodLogin(this.state.username, this.state.password); 
            }
          }}
          title="Submit"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textfield: {
    width: 300
  }
});

const mapStateToProps = (state) => ({
  token: state.token
})

export default connect(
    mapStateToProps
)(LoginScreen);