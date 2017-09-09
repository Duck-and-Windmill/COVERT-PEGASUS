import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { setTheme, getTheme, MKColor, MKTextField, MKButton } from 'react-native-material-kit';

var token;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      showMfa: false,
      mfa: ''
    }
  }

  toggleShowMfa(){
    this.setState({
      showMfa: !this.state.showMfa
    });
  }

  robinhoodLogin(user, pass, mfa) {

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
        this.toggleShowMfa();
      } else {
        token = responseJson.token;
        this.getAccount();
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  getAccount() {
  fetch('https://api.robinhood.com/accounts/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Token ' + token
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      this.fetchWithToken(responseJson.results[0].portfolio);
      this.fetchWithToken(responseJson.results[0].positions);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  fetchWithToken(url) {
  fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Token ' + token
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
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
              this.robinhoodLogin(this.state.username, this.state.password, this.state.mfa);
            } else {
              this.robinhoodLogin(this.state.username, this.state.password); 
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
