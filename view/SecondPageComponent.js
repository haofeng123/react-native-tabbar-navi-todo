import React from 'react';
import {
    View,
    NavigatorIOS,
    
    TouchableOpacity,
    Text,
    TextInput,
     AsyncStorage,
} from 'react-native';

import Home from './Home';
var STORAGE_KEY_ONE = '@haofeng:key_one';

export default class SecondPageComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           ToDos:[] 
        };
    }

    _pressButton() {
       this._saveValueOne();
    }

//初始化数据-默认从AsyncStorage中获取数据
  async _loadInitialState(){
       try{
          var value=await AsyncStorage.getItem(STORAGE_KEY_ONE);
          if(value!=null){
             var obj = JSON.parse(value);
            this.setState( obj);
          }
        }catch(error){
        }
  }

addTask (task) {
    let newTask = {
      key: Date.now(),
      name: task
    }
    let toDos = this.state.ToDos
    toDos.push(newTask)
    this.setState({ToDos: toDos})
  }
    //组件挂载之后回调方法
  componentDidMount(){
      this._didMount = true;
      this._loadInitialState();
  }
    //进行储存数据_ONE
  async _saveValueOne(){
      try{
        var str =JSON.stringify(this.state);
        
         await AsyncStorage.setItem(STORAGE_KEY_ONE,str);
         console.log('============'+str);
      }catch(error){
        console.log(error);
      }
  }

    render() {
        console.log('render2');
    this._didMount && this._saveValueOne();
    let defaultName = 'SecondPageComponent';
    let defaultComponent = SecondPageComponent;
    return (
        
        <View style={{paddingTop:64,paddingLeft:10, }}>
        <TextInput
          placeholder='say something'
          style={{width: 200, height: 40}}
        onChangeText={(text) => this.setState({text})}
          onEndEditing={task => {
            this.addTask(task.nativeEvent.text)
          }}
          ref = { component => this._textInput = component}
        />
        <TouchableOpacity onPress={task => {
            
          }}>
                        <Text>保存</Text>

                </TouchableOpacity>
           
            </View>
    );
    }
}



