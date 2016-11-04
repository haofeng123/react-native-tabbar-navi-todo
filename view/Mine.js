import React, { Component } from 'react';
import {
  View,
  Text,
  
} from 'react-native';

import NavigationBar from 'react-native-navbar';

export default class Mine extends Component {


render() {
   const leftButtonConfig = {};
        const titleConfig = {
            title: '我的',
        };
  return(
    <View>
        <NavigationBar
        title={titleConfig}/>
              <Text style={{flex:1,justifyContent:'center',alignItems:'center'}}>我的
              </Text>
            </View>  
              );
  }
}
