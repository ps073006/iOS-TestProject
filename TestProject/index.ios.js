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

import NewSite from './src/USMP/NewSite';
import Home from './src/USMP/Home';
import Offsite from './src/USMP/Offsite';
import EditSite from './src/USMP/EditSite';
import MapBox from './src/USMP/MapBox';



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
const EditOffSite = StackNavigator({
	Offsite : {
		screen : Offsite,
		navigationOptions : {
			title : 'Offline Saved Sites',
		},
	},
	EditSite : {
		screen : EditSite,
		navigationOptions : {
			title : 'Edit Site',
		},
	},
});
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
	Offsite : {
		screen : EditOffSite,
		navigationOptions : {
			drawerLabel : 'Offline Saved Sites',
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
