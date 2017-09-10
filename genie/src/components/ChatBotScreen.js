import React from 'react';
import { Dimensions, KeyboardAvoidingView, AppRegistry, StyleSheet, Text, View, Image, Navigator, TouchableHighlight, Button, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ChatBot from 'react-native-chatbot';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { connect } from 'react-redux';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';
import SideMenu from 'react-native-side-menu'
import ControlPanel from './ControlPanel'

import { GiftedChat } from 'react-native-gifted-chat';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

const accessToken = "af3aedbb148f460f9ca4754a3780fbae"
const baseUrl = "https://api.api.ai/v1/"

var msgid = 2;

class ChatScreen extends React.Component {
    _getMessage( message ){
      fetch(baseUrl + 'query?v=20170831', {
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
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("res", responseJson);
        if (responseJson.result.fulfillment.data && responseJson.result.fulfillment.data.gif) {
          var messages = [
            {
              _id: ++msgid,
              "createdAt": new Date(),
              "text": responseJson.result.fulfillment.speech || responseJson.result.speech,
              "image": responseJson.result.fulfillment.data.gif,
              "user": {
                "_id": 2,
                name: 'Genie',
                avatar: 'https://img.buzzfeed.com/buzzfeed-static/static/2016-01/21/13/campaign_images/webdr04/how-well-do-you-know-the-genie-from-aladdin-2-5437-1453401463-9_dblbig.jpg',
              },
            }
          ]
        } else {
          var messages = [
            {
              _id: ++msgid,
              "createdAt": new Date(),
              "text": responseJson.result.fulfillment.speech || responseJson.result.speech,
              "user": {
                "_id": 2,
                name: 'Genie',
                avatar: 'https://img.buzzfeed.com/buzzfeed-static/static/2016-01/21/13/campaign_images/webdr04/how-well-do-you-know-the-genie-from-aladdin-2-5437-1453401463-9_dblbig.jpg',
              },
            }
          ]
        }
          
        this.setState((previousState) => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }));
      })
      .catch((error) => {
        console.error(error);
        return 'ERROR'
      });
    }

    state = {
    messages: [],
  };

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Welcome to Genie. How can I help?',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Genie',
            avatar: 'https://img.buzzfeed.com/buzzfeed-static/static/2016-01/21/13/campaign_images/webdr04/how-well-do-you-know-the-genie-from-aladdin-2-5437-1453401463-9_dblbig.jpg',
          },
        },
        {
          _id: 2,
          image: 'https://media.giphy.com/media/v5jWoU9SBe6qY/giphy.gif',  
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Genie',
            avatar: 'https://img.buzzfeed.com/buzzfeed-static/static/2016-01/21/13/campaign_images/webdr04/how-well-do-you-know-the-genie-from-aladdin-2-5437-1453401463-9_dblbig.jpg',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this._getMessage(messages[0].text)
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

    render() {
        return (
          <SideMenu 
            menu={<ControlPanel/>}
          >
            <View style={styles.contentContainer}>
              <GiftedChat
                messages={this.state.messages}
                onSend={(messages) => this.onSend(messages)}
                user={{
                  _id: 1,
                }}
              />
              <KeyboardSpacer/>
            </View>
          </SideMenu>
        );
    }
}

const styles = StyleSheet.create({
    contentContainer: {
      padding: 10,
      flex: 1,
      backgroundColor: '#ffffff'
    }
});

const mapStateToProps = (state) => ({
  token: state.token
})

export default connect(
    mapStateToProps
)(ChatScreen);
