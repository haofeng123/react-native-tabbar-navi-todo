import React, { Component } from 'react';
import {
  View,
  Text,
  
} from 'react-native';

import NavigationBar from 'react-native-navbar';

export default class Video extends Component {


render() {
	 
        const titleConfig = {
            title: '视频',
        };
	return(
		<View>
      	<NavigationBar
        title={titleConfig}/>
              <Text style={{flex:1,justifyContent:'center',alignItems:'center'}}>视频
              </Text>
            </View>  
              );
  }
}
