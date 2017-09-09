import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Animated,
    Easing,
    Button
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux'

const SIZE = 40;

class AppScreen extends Component {
    constructor() {
        super();

        this.state = {
            isLoading: false,
        };

        this._onPress = this._onPress.bind(this);
        this.growAnimated = new Animated.Value(0);
    }

    _onPress() {
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
            Actions.pop();
        }, 500);
    }

    _getAccount() {
      console.log(this.props)
      fetch('https://api.robinhood.com/accounts/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Token ' + this.props.token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this._fetchWithToken(responseJson.results[0].portfolio);
        this._fetchWithToken(responseJson.results[0].positions);
      })
      .catch((error) => {
        console.error(error);
      });
    }

    _fetchWithToken(url) {
      fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Token ' + this.props.token
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
        const changeScale = this.growAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [1, SIZE],
        });

        return (
            <View style={styles.container}>
                <Button
                onPress={() => {
                  this._getAccount()
                }}
                title="Submit"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
                />
                <TouchableOpacity onPress={this._onPress}
                    style={styles.button}
                    activeOpacity={1}>
                </TouchableOpacity>
                <Animated.View style={[ styles.circle, {transform: [{scale: changeScale}]} ]} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: SIZE,
        height: SIZE,
        borderRadius: 100,
        zIndex: 99,
        backgroundColor: '#F035E0',
    },
    circle: {
        height: SIZE,
        width: SIZE,
        marginTop: -SIZE,
        borderRadius: 100,
        backgroundColor: '#F035E0',
    },
    image: {
        width: 24,
        height: 24,
    }
});

const mapStateToProps = (state) => ({
  token: state.token
})

export default connect(
    mapStateToProps
)(AppScreen);