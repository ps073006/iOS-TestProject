import React, { Component } from 'react';
import { AppRegistry, StyleSheet, TextInput, View, Alert, Button,Dimensions, Text, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'; 
// Importing Stack Navigator library to add multiple activities.
import { StackNavigator } from 'react-navigation';

export default class userLogout extends Component {
	constructor(props){
	    super(props)
		
	}
	//get login success info
	async getSuccess(){
		try{
		//AsyncStorage.removeItem('Success');
		let data =  await AsyncStorage.getItem('Success');
		//alert(data)
		
		if(data == 'success'){
			AsyncStorage.removeItem('Success');
			AsyncStorage.removeItem('UserEmail');
			alert("User has been logged out.");
			this.props.navigation.navigate('Home');
		}else{
			this.props.navigation.navigate('userLogin',{site:-1})
		}
			
		}catch(error){
			console.log(error)
		}
	}
	
	render() {
    	
		this. getSuccess();
	    return null;
	}
	
}