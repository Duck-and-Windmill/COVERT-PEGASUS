import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, Navigator, TouchableHighlight, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
                <Text style={styles.container}>Hello, Welcome Screen!</Text>

                <TouchableHighlight
                    title='Genie Chat'
                    onPress = {() => navigate('Chat')}
                >
                <Image style={genieButtStyles.button} source={require('./genie-butt.png')}/>
                </TouchableHighlight>


            </View>
        );
    }
}

class ChatScreen extends React.Component {
    static navigationOptions = {
        title: 'Genie Chat',
    };
    render() {
        return <Text style={styles.container}>Hello, Genie!</Text>;
    }
}

const SimpleApp = StackNavigator({
    Home: { screen: HomeScreen },
    Chat: { screen: ChatScreen },
});

export default SimpleApp;

AppRegistry.registerComponent('SimpleApp', () => SimpleApp);




class Message extends React.Component {
    render() {
        return (
            <Text>Hello bois</Text>
        );
    }
}

const genieButtStyles = StyleSheet.create({
    button: {
        width: 70,
        height: 70,
        padding: 10,
        float: right;
    }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
