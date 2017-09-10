import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Animated,
    Easing,
    Button,
    FlatList,
    Text
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Drawer from 'react-native-drawer';

import ControlPanel from './ControlPanel'

const SIZE = 40;

class AppScreen extends Component {
    constructor() {
        super();

        this.state = {
            isLoading: false,
            positions: []
        };

        this._onPress = this._onPress.bind(this);
        this.growAnimated = new Animated.Value(0);
    }

    _keyExtractor = (item, index) => item.id;

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
      fetch('https://api.robinhood.com/accounts/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Token ' + this.props.token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('Account Info: ', responseJson);
        this._fetchWithToken('https://api.robinhood.com/portfolios/' + responseJson.results[0].account_number + '/');
        this._fetchPositions(responseJson.results[0].positions);
      })
      .catch((error) => {
        console.error(error);
      });
    }

    _fetchPositions(url) {
      fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Token ' + this.props.token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(url, responseJson);
        this.setState({ positions: responseJson.results });
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
        console.log(url, responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
    }

    closeControlPanel = () => {
      this._drawer.close()
    };
    openControlPanel = () => {
      this._drawer.open()
    };

    render() {
        const changeScale = this.growAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [1, SIZE],
        });

        return (
            <Drawer
              type="overlay"
              content={<Text>Hello</Text>}
              tapToClose={true}
              openDrawerOffset={0.2}
              panCloseMask={0.2}
              closedDrawerOffset={-3}
              styles={drawerStyles}
              tweenHandler={(ratio) => ({
                main: { opacity:(2-ratio)/2 }
              })}
              >
                <FlatList
                  data={this.state.positions}
                  extraData={this.state}
                  keyExtractor={this._keyExtractor}
                  renderItem={({item}) => <Text style={styles.item}>{item.quantity}</Text>}
                />
                <View style={styles.container}>
                    <TouchableOpacity onPress={this._onPress}
                        style={styles.button}
                        activeOpacity={1}>
                    </TouchableOpacity>
                    <Animated.View style={[ styles.circle, {transform: [{scale: changeScale}]} ]} />
                </View>
            </Drawer>
                
        );
    }

    componentDidMount() {
      this._getAccount();
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
        backgroundColor: '#25c5a1',
    },
    circle: {
        height: SIZE,
        width: SIZE,
        marginTop: -SIZE,
        borderRadius: 100,
        backgroundColor: '#25c5a1',
    },
    image: {
        width: 24,
        height: 24,
    }
});

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
}

const mapStateToProps = (state) => ({
  token: state.token
})

export default connect(
    mapStateToProps
)(AppScreen);