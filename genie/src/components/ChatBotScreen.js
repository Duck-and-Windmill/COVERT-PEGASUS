import React from 'react';
import { Dimensions, AppRegistry, StyleSheet, Text, View, Image, Navigator, TouchableHighlight, Button, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ChatBot from 'react-native-chatbot';

import { connect } from 'react-redux';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';
import SideMenu from 'react-native-side-menu'
import ControlPanel from './ControlPanel'

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

const accessToken = "af3aedbb148f460f9ca4754a3780fbae"
const baseUrl = "https://api.api.ai/v1/"

class ChatScreen extends React.Component {
    async _getMessage( message ){
      let reponse = await fetch(baseUrl + 'query', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer' + accessToken
        },
        body: JSON.stringify({
          query: message, 
          lang: "en", 
          sessionId: "genie"
        })
      })
      let body = await response.json();
      console.log(body);
      return "test"
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
                message: ({ previousValue, steps }) => this._getMessage(previousValue),
                trigger: '2'
            },
            {
                id: '2',
                user: true,
                trigger: '1',
            },
        ];
        return (
          <SideMenu 
            menu={<ControlPanel/>}
          >
            <ChatBot
              steps={steps}
              placeholder='Talk to Genie...'
              botAvatar='https://img.buzzfeed.com/buzzfeed-static/static/2016-01/21/13/campaign_images/webdr04/how-well-do-you-know-the-genie-from-aladdin-2-5437-1453401463-9_dblbig.jpg'
              botBubbleColor='#25c5a1'
            />
          </SideMenu>
        );
    }
}

const mapStateToProps = (state) => ({
  token: state.token
})

export default connect(
    mapStateToProps
)(ChatScreen);
