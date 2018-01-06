import React, { Component } from 'react';
import { AppRegistry, StyleSheet, TextInput, View, Alert, Button,Dimensions, Text, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'; 
// Importing Stack Navigator library to add multiple activities.
import { StackNavigator } from 'react-navigation';

export default class userLogin extends Component {
	constructor(props){
	    super(props)
		let offsite = this.props.navigation.state.params.site;
		//alert(offsite)
	    this.state = {
 
	      UserEmail: '',
	      UserPassword: '',
		  offSite:offsite,	
	    }
	  }
	 
	  UserLoginFunction = () =>{
 
	   const UserEmail  = this.state.UserEmail;
	   const UserPassword  = this.state.UserPassword;
 	  //alert("."+UserEmail+"."+UserPassword+".")
 	  //https://usmp.info/server/authentication/app_login.php
	  fetch("https://nl.cs.montana.edu/test_sites/prashanta.saha/server/authentication/app_login.php", {
	    method: 'POST',
	    body: JSON.stringify({
	      email: UserEmail,
	      password: UserPassword
					//  email:'root@email.com',
					//  password:'pkvRpqdTnQteZMW'
 
	    })
 
	  }).then((response) => response.json())
	        .then((responseJson) => {
 
	          // If server response message same as Data Matched
	         if(responseJson === 'Data Matched')
	          {
 				 //Alert.alert(responseJson);
	              //Then open Profile activity and send user email to profile activity.
				 AsyncStorage.removeItem('Success');
				 AsyncStorage.setItem('Success','success');
				 AsyncStorage.setItem('UserEmail',UserEmail);
				 
				 if(this.state.offSite == 1){
				 	this.props.navigation.navigate('Offsite');
				 }else if(this.state.offSite == 2){
				 	this.props.navigation.navigate('OffsiteMaintenance');
				 }else if(this.state.offSite == 3){
				 	this.props.navigation.navigate('OffsiteSlopeEvent');
				 }else if(this.state.offSite == -1){
				 	this.props.navigation.navigate('Home');
				 }
	             
 
	          }
	          else{
 
	            Alert.alert(responseJson);
	          }
 
	        }).catch((error) => {
	          console.error(error);
	        });
 
	    } 
		
		render() {
		    return (
 
		<View style={styles.container}>
				
		      	<View style={styles.header}>
		  	  	<Icon name="menu" 
				style={{marginTop:20,marginRight:Dimensions.get('window').width*0.15,color:'white'}}  
				size={40} backgroundColor="#3b5998" 
				onPress={() => this.props.navigation.navigate('DrawerOpen')}>
		 		</Icon>
		 		<Text 
				style={styles.headerText}
				onPress={() => this.props.navigation.navigate('DrawerOpen')}
				>
				User Login Form
				</Text>
		      	</View>
				
				<View style={styles.inputView}>
		        <TextInput
          
		          // Adding hint in Text Input using Place holder.
		          placeholder="Username (Email)"
 
		          onChangeText={(val) => this.setState({UserEmail:val})}
 
		          // Making the Under line Transparent.
		          underlineColorAndroid='transparent'
 
		          style={styles.TextInputStyleClass}
		        />
 
		        <TextInput
          
		          // Adding hint in Text Input using Place holder.
		          placeholder="Password"
 
		          onChangeText={(val) => this.setState({UserPassword:val})}
 
		          // Making the Under line Transparent.
		          underlineColorAndroid='transparent'
 
		          style={styles.TextInputStyleClass}
 
		          secureTextEntry={true}
		        />
 
		        <Button title="Login" onPress={this.UserLoginFunction} color="#2196F3" />
      			</View>
  
 
		</View>
            
		    );
		  }	
	
}



const styles = StyleSheet.create({
 
container :{
flex:1,

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
  padding: 0,
marginTop:20,    
marginLeft:0,   
marginRight:Dimensions.get('window').width*0.45,     
},
inputView:{
	justifyContent: 'center',
	marginTop:200, 
},
 
TextInputStyleClass: {
 
textAlign: 'center',
marginBottom: 7,
height: 40,
borderWidth: 1,
// Set border Hex Color Code Here.
 borderColor: '#2196F3',
 
 // Set border Radius.
 borderRadius: 5 ,
 
},

});