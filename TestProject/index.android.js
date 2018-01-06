/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  MapView,	
} from 'react-native';

import {
	StackNavigator,
	DrawerNavigator,
} from 'react-navigation';
import Home from './src/USMP/Home';
import NewSite from './src/USMP/NewSite';
import NewMaintenance from './src/USMP/NewMaintenance';
import NewSlopeEvent from './src/USMP/NewSlopeEvent';
import Offsite from './src/USMP/Offsite';
import OffsiteMaintenance from './src/USMP/OffsiteMaintenance';
import OffsiteSlopeEvent from './src/USMP/OffsiteSlopeEvent';
import EditSite from './src/USMP/EditSite';
import EditMaintenance from './src/USMP/EditMaintenance';
import EditSlopeEvent from './src/USMP/EditSlopeEvent';
import userLogin from './src/USMP/userLogin';
import userLogout from './src/USMP/userLogout';



export default class TestProject extends Component {
  render() {
	 const { navigate } = this.props;  
    return (
      <View style={styles.container}>
      
		<Home navigation = {navigation} />
		</View>
    );
  }
}

class Hidden extends React.Component {
  render() {
    return null;
  }
}

class Sleep extends React.Component {
	constructor(props){
	    super(props)
	    this.state = {
		  login:null,	
	    }
	  }	
	//get login success info
	async getSuccess(){
		try{
		//await AsyncStorage.setItem('UserEmail','root@email.com');
		let data =  await AsyncStorage.getItem('UserEmail');
		//alert(data.toString())
		//var result = null;
			this.setState({login:data},()=>{
				//alert(this.state.login)
			});	
		return data;	
		}catch(error){
			console.log(error)
		}
		
		
	}	
		
  render() {
	  //alert(result)
		this.getSuccess();
		let val = null;
		if(this.state.login != null){
			val = <Text>Logged in as {this.state.login} . Tap here to log out.</Text>  ;
			
		}
		else{
			val = <Text>Tap here to log in as a registered user</Text>  ;
		}
		//val += this.state.login;
     return val;
  }
}
/*const EditOffSite = StackNavigator({
	Offsite : {
		screen : Offsite,
		navigationOptions : {
			//title : 'Offline Saved Sites',
		},
	},
	EditSite : {
		screen : EditSite,
		navigationOptions : {
			//title : 'Edit Site',
		},
	},
});*/
const SimpleApp = DrawerNavigator ({
	Home : {
		screen : Home,
		navigationOptions : {
			drawerLabel : 'Home',
		}
	},
	NewSite : {
		screen : NewSite,
		navigationOptions : {
			drawerLabel : 'Slope Rating Form',
		},
	},
	NewMaintenance : {
		screen : NewMaintenance,
		navigationOptions : {
			drawerLabel : 'Maintenance Form',
		},
	},
	NewSlopeEvent : {
		screen : NewSlopeEvent,
		navigationOptions : {
			drawerLabel : 'New Slope Event Form',
		},
	},
	Offsite : {
		screen : Offsite,
		navigationOptions : {
			drawerLabel : 'Offline Saved Sites',
		},
	},
	OffsiteMaintenance : {
		screen : OffsiteMaintenance,
		navigationOptions : {
			drawerLabel : 'Offline Saved Maintenance Forms',
		},
	},
	OffsiteSlopeEvent : {
		screen : OffsiteSlopeEvent,
		navigationOptions : {
			drawerLabel : 'Offline Slope Event Forms',
		},
	},
	EditSite : {
		screen : EditSite,
		navigationOptions : {
			//title : 'Edit Site',
			drawerLabel:<Hidden />,
		},
	},
	EditMaintenance : {
		screen : EditMaintenance,
		navigationOptions : {
			//title : 'Edit Site',
			drawerLabel:<Hidden />,
		},
	},	
	EditSlopeEvent : {
		screen : EditSlopeEvent,
		navigationOptions : {
			//title : 'Edit Site',
			drawerLabel:<Hidden />,
		},
	},
	userLogin : {
		screen : userLogin,
		navigationOptions : {
			//title : 'Edit Site',
			drawerLabel:<Hidden />,
		},
	},
	userLogout : {
		screen : userLogout,
		navigationOptions : {
			//title : 'Edit Site',
			drawerLabel:<Sleep />,
		},
	},
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 18,
    color: 'white',
    padding: 26,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#006400',
	borderBottomWidth: 1,
	borderBottomColor:'#ddd',
  },
  
});

AppRegistry.registerComponent('TestProject', () => SimpleApp);
