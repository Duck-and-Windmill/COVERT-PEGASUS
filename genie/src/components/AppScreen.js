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
import { VictoryCandlestick, VictoryAxis, VictoryTheme } from 'victory-native';

import _ from 'lodash'

import ControlPanel from './ControlPanel'

import { 
  setToken,
  setUsername,
  setPassword,
  setMfa,
  toggleShowMfa,
  setErrorMsg,
  setPositions
} from '../actions'

const SIZE = 40;
import bgSrc from '../images/wallpaper.png';

class AppScreen extends Component {
    constructor() {
        super();

        this.state = {
            isLoading: false,
            positions: [],
            historicals: [],
            equity: ''
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
        this._fetchPortfolio('https://api.robinhood.com/portfolios/' + responseJson.results[0].account_number + '/');
        this._fetchPositions(responseJson.results[0].positions);
      })
      .catch((error) => {
        console.error(error);
      });
    }

    _fetchPortfolio(url) {
      fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Token ' + this.props.token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ equity: responseJson.equity });
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
        var finalItems = [];
        responseJson.results.forEach(function(position, index, arr) {
          arr[index].key = index;
          if (arr[index].quantity > 0) {
            finalItems.push(arr[index]);
          }
        });

        this._fetchSymbols(finalItems);
      })
      .catch((error) => {
        console.error(error);
      });
    }

    _fetchSymbols(positions) {
      var symbols = [];
      var self = this;

      positions.forEach(function(position, index) {
        fetch(position.instrument, {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        })
        .then((response) => response.json())
        .then((responseJson) => {
          var pos = {
            quantity: position.quantity,
            symbol: responseJson.symbol,
            key: index
          }

          symbols.push(pos);

          if(index >= (positions.length - 1)) {
            self._fetchQuotes(symbols);
          }

        })
        .catch((error) => {
          console.error(error);
        });
      });
    }

    _fetchQuotes(positions) {
      var query = positions.map(function(position){
          return position.symbol;
      }).join(",");

      var finalDataSet = []

      var self = this;

      fetch('https://api.robinhood.com/quotes/?symbols=' + query, {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        })
        .then((response) => response.json())
        .then((responseJson) => {

          positions.forEach(function(position, index){
            responseJson.results.filter(function(instrument){
              if (instrument !== null && instrument.symbol === position.symbol) {
                var pos = {
                  quantity: position.quantity,
                  symbol: position.symbol,
                  key: position.index,
                  price: instrument.last_trade_price
                }

                finalDataSet.push(pos);
              }
              if (index >= (positions.length - 1)) {
                self.props.dispatch(setPositions(finalDataSet))
                self._fetchHistoricals();
              }
            });
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }

    _fetchHistoricals() {

      var self = this;
      var query = this.props.positions.map(function(position){
          return position.symbol;
      }).join(",");

      query = this.props.positions[0].symbol;

      fetch('https://api.robinhood.com/quotes/historicals/?symbols='+query+'&interval=10minute&span=day', {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        var portfolioHistoricals = responseJson.results;

        var reduced = portfolioHistoricals.map(function(stock){
          return stock.historicals.map(function(week){
            return {
              x: new Date(week.begins_at),
              open: week.open_price,
              close: week.close_price,
              high: week.high_price,
              low: week.low_price
            }
          });
        });

        var merged = [].concat.apply([], reduced);

        this.setState({ historicals: merged });

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

    render() {
        return (
              <SideMenu 
                menu={<ControlPanel/>}
              >
                <Image style={styles.picture} source={bgSrc}>
                  <View style={styles.backgroundContainer}>
                    <View style={styles.contentContainer}>
                      <Card>
                        <VictoryCandlestick
                          candleColors={{ positive: "#5f5c5b", negative: "#c43a31" }}
                          data={this.state.historicals}
                        />
                      </Card>
                    </View>

                    <View style={styles.contentContainer}>
                      <Card>
                        <FlatList
                          data={this.props.positions}
                          extraData={this.state}
                          keyExtractor={this._keyExtractor}
                          renderItem={({item}) => 
                            <View style={styles.item}>
                              <Text>{item.symbol} ({Math.round(item.quantity)})</Text>
                              <Text>${item.price}</Text>
                            </View>
                          }
                        />
                      </Card>
                    </View>
                  </View>
                </Image>
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
    picture: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    item: {
      padding: 10,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    backgroundContainer: {
      width: DEVICE_WIDTH,
      height: DEVICE_HEIGHT,
      backgroundColor: 'transparent',
    },
    contentContainer: {
      margin: 20,
      marginTop: 40,
      padding: 10,
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
  token: state.token,
  positions: state.positions
})

export default connect(
    mapStateToProps
)(AppScreen);