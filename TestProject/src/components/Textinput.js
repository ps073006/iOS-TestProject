import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';

export default class Textinput extends Component {
	<TextInput
	//multiline={true} 
	//numberOfLines={3}
	//value={this.state.comments}
	//onChangeText={(val)=>this.setState({comments:val})}
	style={styles.textInput}
	placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
	</TextInput>
	
}

const styles = StyleSheet.create({
    textInput:{
  	  height:40,
  	  borderWidth:0.5,
  	  borderColor:'#0f0f0f',
  	  //alignSelf:'stretch',
  	  color:'blue',
  	  backgroundColor: '#ddd',
  	  borderTopWidth: 2,
  	  borderTopColor: '#ededed',
  	  fontSize: 16,
	  
    },
});