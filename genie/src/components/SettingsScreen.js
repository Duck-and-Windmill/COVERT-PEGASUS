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
import SideMenu from 'react-native-side-menu'
import { Card } from 'react-native-material-ui';
import { VictoryBar } from "victory-native";

import ControlPanel from './ControlPanel'

const SIZE = 40;
import bgSrc from '../images/wallpaper.png';

class SettingsScreen extends Component {
    constructor() {
        super();

        this.state = {
            isLoading: false,
            username: "superman",
            first_name: "Clark",
            last_name: "Kent",
            email: "s@itmeanshope.com",
            id: "11deface-face-face-face-defacedeface11",
            phone_number: "2125550030",
            city: "New York",
            citizenship: "US",
            marital_status: "married",
            zipcode: "10001",
            country_of_residence: "US",
            state: "NY",
            date_of_birth: "1978-12-18",
            address: "320 10th Av",
            tax_id_ssn: "0001"
        };
        this.growAnimated = new Animated.Value(0);
    }

    _keyExtractor = (item, index) => item.id;

    _getAccountInfo() {
      fetch('https://api.robinhood.com/user/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Token ' + this.props.token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('Account Info: ', responseJson);

        this.setState({ 
          username: responseJson.username,
          first_name: responseJson.first_name,
          last_name: responseJson.last_name,
          email: responseJson.email,
          id: responseJson.id
        });

      })
      .catch((error) => {
        console.error(error);
      }); 
    }

    _getBasicInfo() {
      fetch('https://api.robinhood.com/user/basic_info/ ', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Token ' + this.props.token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('Basic Info: ', responseJson);

        this.setState({ 
          phone_number: responseJson.phone_number,
          city: responseJson.city,
          citizenship: responseJson.citizenship,
          marital_status: responseJson.marital_status,
          zipcode: responseJson.zipcode,
          country_of_residence: responseJson.country_of_residence,
          state: responseJson.state,
          date_of_birth: responseJson.date_of_birth,
          address: responseJson.address,
          tax_id_ssn: responseJson.tax_id_ssn
        });
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
                        <Text style={styles.paddedText}>Account Info:</Text>
                        <Text style={styles.paddedText}>{this.state.first_name} {this.state.last_name}</Text>
                        <Text style={styles.paddedText}>{this.state.username}</Text>
                        <Text style={styles.paddedText}>{this.state.email}</Text>
                        <Text style={styles.paddedText}>{this.state.phone_number}</Text>
                      </Card>
                    </View>

                    <View style={styles.contentContainer}>
                      <Card>
                        <Text style={styles.paddedText}>Basic Info:</Text>
                        <Text style={styles.paddedText}>{this.state.address}, {this.state.city}, {this.state.state}, {this.state.country_of_residence}, {this.state.zipcode}</Text>
                        <Text style={styles.paddedText}>{this.state.date_of_birth}</Text>
                      </Card>
                    </View>
                  </View>
                </Image>
            </SideMenu>
                
        );
    }

    componentDidMount() {
      this._getAccountInfo();
      this._getBasicInfo();
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
    paddedText: {
      padding: 10
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

const mapStateToProps = (state) => ({
  token: state.token
})

export default connect(
    mapStateToProps
)(SettingsScreen);