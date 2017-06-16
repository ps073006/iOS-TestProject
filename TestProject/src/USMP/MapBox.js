import React, { Component } from 'react'
import {
   MapView,
   StyleSheet
} from 'react-native'

export default MapBox = (props) => {
   return (
	   <View style={styles.container}>
      <MapView
         style = {styles.map}
         showsUserLocation = {false}
         followUserLocation = {false}
         zoomEnabled = {true}
      />
 	  <Button
 	    onPress={() => this.props.navigation.goBack()}
        // onPress={() => navigate('Test')}
         title="Go back to home page"
       />
		</View>
   )
}

const styles = StyleSheet.create ({
   map: {
      height: 400,
      marginTop: 80
   }
})
//AppRegistry.registerComponent('TestProject', () => MapBox);