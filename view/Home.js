
import React, { Component } from 'react';
import {
  
  StyleSheet,
  Text,
  TextInput,
  ListView,
  AsyncStorage,
  View,
  Navigator
} from 'react-native';
import NavigationBar from 'react-native-navbar';

import SecondPageComponent from './SecondPageComponent';
var STORAGE_KEY_ONE = '@haofeng:key_one';

class HomeView extends React.component{
  constructor(props){
    super(props);
    this.state ={
      
    }
  }
  render() {
    const titleConfig = {
            title: '首页',
        };
     return(
         <NavigationBar
                    title={titleConfig}
                   />
      );
  }
}

export default class Home extends React.Component{
 constructor(props) {
        super(props);
        
        this.state = {
            ToDos2:[],
          dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
        })
    };
    }

//组件挂载之后回调方法
  componentDidMount(){
      this._didMount = true;
      this._loadInitialState();
      const assets = [];
      
  }
  //初始化数据-默认从AsyncStorage中获取数据
 
  async _loadInitialState(){
       try{
          var value=await AsyncStorage.getItem(STORAGE_KEY_ONE);
          if(value!=null){
            var obj = JSON.parse(value);
            //this.setState( obj);
            
            this.setState( {ToDos2:obj.ToDos2,dataSource:this.state.dataSource.cloneWithRows( obj.ToDos2 )})
          
          }
        }catch(error){
        }
  }

  //进行储存数据_ONE
  async _saveValueOne(){
      try{
        var str =JSON.stringify(this.state);
        
         await AsyncStorage.setItem(STORAGE_KEY_ONE,str);
      }catch(error){
        console.log(error);
      }
  }
  
 addTask (task) {
    let newTask = {
      key: Date.now(),
      name: task
    }
    let toDos = this.state.ToDos2
    console.log(toDos)
    toDos.push(newTask)
    this.setState({
      ToDos2: toDos,
      dataSource:this.state.dataSource.cloneWithRows(toDos)
  })
    
  }

  deleteTask(key) {
    let todos = this.state.ToDos2
    let newtodos = todos.filter(task =>  task.key != key)
    this.setState({ToDos2: newtodos})
    this.setState({dataSource:this.state.dataSource.cloneWithRows(newtodos)})
  }

  clearText () {
    this._textInput.setNativeProps({text:''})
  }

  //导航
    _pressButton() {
        const { navigator } = this.props;

                this.props.navigator.push({
                name: 'SecondPageComponent',
                title:'修改页面',
                component: SecondPageComponent,
                params:{
                 message:"I am from FirstPageComponent",
                 
                }
            })
        
    }
    render() {
         this._didMount && this._saveValueOne();
        return (
       <View style={styles.container1} >
              <Navigator
                    initialRoute={{ name: 'Home', component: Home }}
                    configureScene={() => {
                        return Navigator.SceneConfigs.FloatFromRight;
                    } }
                    renderScene={(route, navigator) => {
                       

                        if (route.component) {
                            return React.createElement(route.component, { navigator });
                        }
                    } }
                    />
          <Text>
          Welcome To My Life
          </Text>
        <TextInput
          placeholder='say something'
          style={{width: 200, height: 40}}
          onEndEditing={task => {
            this.addTask(task.nativeEvent.text)
            this.clearText.call(this)
          }}
          ref = { component => this._textInput = component}
        />
        <Text style={styles.content}></Text>
      
        <ListView style={styles.aaa}
         enableEmptySections = {true} 
        dataSource={this.state.dataSource}
        renderRow={(task) => <Text key={task.key}
                                            style={styles.listView}
                                            onPress={this._pressButton.bind(this)}
                                            onLongPress={ () => {
                                                console.log('gogogo');
                                                this.deleteTask(task.key);
                                              }}

                                       >{task.name}</Text>}/>
      

          </View>

        );
    }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding:10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  container1: {
     flex: 1,
     backgroundColor: '#F5FCFF',

   },
  content:{
    fontSize: 14,
    textAlign: 'left',
    margin: 10,
  },
  aaa:{
    width:400,
    height:200,
    
  }
});


