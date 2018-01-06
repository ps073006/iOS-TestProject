import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  MapView,
  Dimensions,		
} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
   
    },
    header: {
  	flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#006400',
  	borderBottomWidth: 1,
  	borderBottomColor:'#ddd',
    },
    headerText: {
      fontSize: 18,
      color: 'white',
      padding:0,
  	marginTop:20,  
  	marginRight:Dimensions.get('window').width*0.4,  
    },
    sectionText: {
      fontSize: 16,
  	fontWeight:'bold',  
      color: 'black',
      padding: 4,
    },
    section: {
  	height:30,  
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ddd9c3',
  	borderBottomWidth: 1,
  	borderBottomColor:'#ddd',
    },
    textInput:{
  	  height:40,
  	  borderWidth:0.5,
  	  borderColor:'#0f0f0f',
  	  //alignSelf:'stretch',
  	  color:'blue',
  	  backgroundColor: 'white',
  	  borderTopWidth: 2,
  	  borderTopColor: '#ededed',
  	  fontSize: 16,
  	  marginLeft:20,
  	  marginRight:20,
	  
    },
    textInputGray:{
  	  height:40,
  	  borderWidth:0.5,
  	  borderColor:'#0f0f0f',
  	  //alignSelf:'stretch',
  	  color:'blue',
  	  backgroundColor: '#ddd',
  	  borderTopWidth: 2,
  	  borderTopColor: '#ededed',
  	  fontSize: 16,
  	  marginLeft:20,
  	  marginRight:20,
	  
    },
    footer:{
  	  backgroundColor: 'white',
  	  position:'absolute',
  	  alignItems: 'center',
  	  bottom:0,
  	  left:0,
  	  right:0,
	  
    },
    button:{
  	  backgroundColor:'#006400',
  	  width:100,
  	  height:50,
  	  borderWidth:10,
  	  borderRadius:20,
  	  borderColor:'#006400',
  	  padding:3,
    },
    text:{
    	  fontWeight:'bold',
  	  fontSize:18,
  	  padding:3,
    },
    signText:{
    	marginLeft:20,
    },
    picker:{
      height:150,
  	  width:150,
    },
    labelText:{
      fontSize: 16,
  	  fontWeight:'bold',  
      color: 'black',
      padding: 4,
  	  marginLeft:15,  
    },
    tableText:{
      fontSize: 16,
  	fontWeight:'bold',  
      color: 'black',
      padding: 4,
  	marginLeft:0,  
    },
    tableView:{
    	flex:1,
  	marginLeft:20,
    },
    borderLine:{
    	borderBottomColor: 'black', 
    	borderBottomWidth: 1, 
      width: Dimensions.get('window').width,
    },
});


export default styles;