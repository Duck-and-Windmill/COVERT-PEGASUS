import React from 'react';
import { /*Dimensions*/, AppRegistry, StyleSheet, Text, View, Image, Navigator, TouchableHighlight, Button, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';
import ChatBot from 'react-native-chatbot';

/*const { height, width } = Dimensions.get('window');*/

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
                <TouchableHighlight
                    title='Genie Chat'
                    onPress = {() => navigate('Chat')}
                >
                <Image style={genieButtStyles.button} source={require('./assets/icons/genie-butt.png')}/>
                </TouchableHighlight>


            </View>
        );
    }
}

class ChatScreen extends React.Component {
    static navigationOptions = {
        title: 'Genie Chat',
    }
    render() {
        const steps = [
            {
                id: '0',
                message: 'Welcome to Genie. How can I help?',
                trigger: '2',
            },
            {
                id: '1',
                message: ({ previousValue, steps }) => String(previousValue),
                trigger: '2',
            },
            {
                id: '2',
                user: true,
                trigger: '1',
            },
        ];
        return <ChatBot
            steps={steps}
            placeholder='Talk to Genie...'
            botAvatar='https://img.buzzfeed.com/buzzfeed-static/static/2016-01/21/13/campaign_images/webdr04/how-well-do-you-know-the-genie-from-aladdin-2-5437-1453401463-9_dblbig.jpg'
            botBubbleColor='#25c5a1'
            /*contentStyle={contentOverride}*/
            />
    }
}

const SimpleApp = StackNavigator({
    Home: { screen: HomeScreen },
    Chat: { screen: ChatScreen },
});

export default SimpleApp;

AppRegistry.registerComponent('SimpleApp', () => SimpleApp);



/*const contentOverride = StyleSheet.create({
    contentStyle: {
        height: height - 50,
        backgroundColor: '#326945',
    }
});

Do this stuff to make the background colors change:

chatBotContainer.js line 4 to #326945

chatbot.js line 488 to #326945

*/

const genieButtStyles = StyleSheet.create({
    button: {
        width: 70,
        height: 70,
        padding: 10,
        right: 0,
    }
});
