import React, { Component } from 'react';
import {
  View,
  Text,
  
} from 'react-native';
import NavigationBar from 'react-native-navbar';

export default class Follow extends Component {


render() {
   const leftButtonConfig = {};
        const titleConfig = {
            title: '关注',
        };
  return(
    <View>
        <NavigationBar
        title={titleConfig}/>
              <Text style={{flex:1,justifyContent:'center',alignItems:'center'}}>关注
              </Text>
            </View>  
              );
  }
}

