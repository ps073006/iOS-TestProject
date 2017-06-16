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

export default class Notifications extends Component {
  static navigationOptions = {
    drawerLabel: 'Notifications',
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.goBack()}
        title="Go back home"
      />
    );
  }
}


const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});