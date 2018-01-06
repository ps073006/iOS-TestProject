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
  Image,
	Dimensions,	
} from 'react-native';

import ImageSlider from 'react-native-image-slider';

import Icon from 'react-native-vector-icons/Entypo';


export default class Home extends Component {
	constructor(props) {
	        super(props);
 
	        this.state = {
	            position: 0,
	            interval: null
	        };
	    }
 
	    componentWillMount() {
	        this.setState({interval: setInterval(() => {
	            this.setState({position: this.state.position === 8 ? 0 : this.state.position + 1});
	        }, 2000)});
	    }
 
	    componentWillUnmount() {
	        clearInterval(this.state.interval);
	    }
		openDrawer=()=>{
			this.props.navigation.navigate('DrawerOpen')
		}
  render() {
	 const { navigate } =  this.props.navigation ;  
    return (
			
      <View style={styles.container}>
      	<View style={styles.header}>
  	  		<Icon name="menu" 
				style={{marginTop:20,marginRight:Dimensions.get('window').width*0.27,color:'white'}} 
				size={40} 
				backgroundColor="#ffffff" 
				onPress={this.openDrawer}>	
			</Icon>
				<Text style={styles.headerText} 
						onPress={() => this.props.navigation.navigate('DrawerOpen')}>
						Unstable Slope Management System
				</Text>	
		
      	</View>
			<ImageSlider 
				   	width ={Dimensions.get('window').width}
				    height ={Dimensions.get('window').height-420}
					style={styles.image}
                   	images={[
			        require('../logos/ArmyCoreOfEngineersUSACE.png'),
			        require('../logos/BureauOfIndianAffairsBIA.png'),
			        require('../logos/BureauOfLandManagementBLM.jpeg'),
					require('../logos/FederalHighwayAdministrationFHWA.jpg'),
					require('../logos/NationalForestServiceNFS.png'),
					require('../logos/NationalParkServiceNPS.png'),
					require('../logos/WesternFederalLandsHighwayWFL.png'),
					require('../logos/BureauOfReclamationUSBR.png'),
					require('../logos/credits.png'),
                   ]}
				   
                   position={this.state.position}
                   onPositionChanged={position => this.setState({position})}/>
				 <Text style={styles.welcomeText} >   
				   Hello User, welcome to the mobile version of the site. Please tap on the menu icon or slide to right to see menu and access the site.
      			 </Text>
				 <Text style={styles.warningText} >   
			
				   </Text>
		 		  
	  </View>
    );
  }
}

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
    padding: 0,
	marginTop:20,    
	marginRight:Dimensions.get('window').width*0.27,  
  },
  welcomeText: {
    fontSize: 18,
    color: 'green',
    paddingTop: 26,
  },
  warningText: {
    fontSize: 18,
    color: 'red',
    paddingTop: 226,
  },
  
  images:{
	  flex:1,
  },
});

AppRegistry.registerComponent('Home', () => Home);
