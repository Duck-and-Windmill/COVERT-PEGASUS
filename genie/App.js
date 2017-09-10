import React from 'react';
import { /*Dimensions,*/ AppRegistry, StyleSheet, Text, View, Image, Navigator, TouchableHighlight, Button, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ChatBot from 'react-native-chatbot';

import genieApp from './src/reducers';
import Main from './src/components/Main';

const store = createStore(genieApp)
/*const { height, width } = Dimensions.get('window');*/

export default class App extends React.Component {
    /*static navigationOptions = {
        title: 'Welcome. Plz log in',
    };*/
    render() {
        /*const { navigate } = this.props.navigation;*/
        return (
            <Provider store={store}>
               <Main />
            </Provider>


        );
    }
}

AppRegistry.registerComponent('App', () => App);