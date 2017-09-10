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
import Dimensions from 'Dimensions';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Drawer from 'react-native-drawer';
import SideMenu from 'react-native-side-menu'
import { Card } from 'react-native-material-ui';
import { VictoryBar } from "victory-native";

import ControlPanel from './ControlPanel'

const SIZE = 40;

class AppScreen extends Component {
    constructor() {
        super();

        this.state = {
            isLoading: false,
            positions: []
        };
        this.growAnimated = new Animated.Value(0);
    }

    _keyExtractor = (item, index) => item.id;

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
        responseJson.results.forEach(function(position, index, arr) {
          arr[index].key = index
        });
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
        return (
              <SideMenu 
                menu={<ControlPanel/>}
              >
                <View style={styles.backgroundContainer}>
                  <View style={styles.contentContainer}>
                    <Card>
                      <VictoryBar/>
                    </Card>
                  </View>

                  <View style={styles.contentContainer}>
                    <Card>
                      <FlatList
                        data={this.state.positions}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        renderItem={({item}) => <Text style={styles.item}>{item.quantity}</Text>}
                      />
                    </Card>
                  </View>
                </View>
            </SideMenu>
                
        );
    }

    componentDidMount() {
      this._getAccount();
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    backgroundContainer: {
      width: DEVICE_WIDTH,
      height: DEVICE_HEIGHT,
      backgroundColor: '#ffffff',
    },
    contentContainer: {
      margin: 20,
      marginTop: 40,
      flex: 1,
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
  drawer: { 
    shadowColor: '#000000', 
    shadowOpacity: 0.8, 
    shadowRadius: 3,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  main: {
    paddingLeft: 3,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
}

const mapStateToProps = (state) => ({
  token: state.token
})

export default connect(
    mapStateToProps
)(AppScreen);