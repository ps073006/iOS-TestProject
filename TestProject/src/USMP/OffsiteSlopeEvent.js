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
  TextInput,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Button,
  Alert,	
  ListView,
  Dimensions,
  FlatList,	
  NetInfo,
  AsyncStorage,
} from 'react-native';
import {
	List,
	ListItem,
} from 'react-native-elements';
import {
	Swipeout
} from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/Entypo';
import realm from './realm';

//var Realm = require('realm');
//let realm = new Realm();
var begin_mile_marker_regex = /^\d*\.?\d+$/;
var begin_mile_marker_format_S = "Beginning Mile Marker must have a decimal value.";

var end_mile_marker_regex = /^\d*\.?\d+$/;
var end_mile_marker_format_S = "Ending Mile Marker must have a decimal value.";

var phone_no_regex = /^\d+$/;
var phone_no_format_S = "Phone No must have an integer value.";

var road_trail_number_regex = /^.{1,30}$/;
var road_trail_number_format_S = "Road/Trail No. cannot be empty and must be shorter than 30 characters.";

var affectedLength_regex = /^\d*\.?\d+$/;
var affectedLength_format_S = "Affected Length must have a decimal value.";






export default class Offsite extends Component {
	
	constructor(props){
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1.id !== r2.id});
		let sites = realm.objects('SLOPE_EVENT');
		console.log(sites.length);
		//alert(sites.length);
		this.state={
			dataSource : ds.cloneWithRows(sites),
			siteId:0,
			//dataSource : ds.cloneWithRows(['name1','name2','name3']),
		};
		//this.renderRow = this.renderRow.bind(this);
	}
	deleteSite(siteId){
		realm.write(()=>{
			let offSites = realm.objects('SLOPE_EVENT').filtered('id='+parseInt(siteId));
			if(offSites.length>0){
				//photos	
				let photos = realm.objects('PHOTOS_SLOPE').filtered('id='+ parseInt(siteId));
				if(photos.length>0){
					realm.delete(photos);	
				}
				realm.delete(offSites);
			}
		});
		const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1.id !== r2.id});
		let sites = realm.objects('SLOPE_EVENT');
		this.setState({dataSource:ds.cloneWithRows(sites)});
		
	}
  validateForm(){

  	var err = "";
	let offSites = realm.objects('SLOPE_EVENT').filtered('id='+parseInt(this.state.siteId));
	let dataHazardType = realm.objects('HAZARD_LINK').filtered('id='+ parseInt(offSites[0].hazardTypeVal));
	
	//alert(offSites[0].siteId);
	if(offSites.length>0){
		if(offSites[0].selectDateApproximator==''){
			err+="Must select a date of event."+'\n';
		}else{
			if(offSites[0].selectDateApproximator=='K'||offSites[0].selectDateApproximator=='A'){
				if(offSites[0].firstinput==''){
					err+="Event date is empty or not entered correctly, need to be 'yyyy-dd-mm'."+'\n';
				}
			}
		}
		if(offSites[0].roadOrTrail==''){
			err+="Road\Trail must have a value."+'\n';
		}
		
	  	if(dataHazardType.length == 0){
	  		err += "Hazard Type must have a value."+'\n';//.concat("<br/>");
	  		//$("#hazard_type").css("background-color", "red");
	  	}
  		/*if(offSites[0].phoneNo.match(phone_no_regex) === null)
  		{
  			err += phone_no_format_S +'\n';
  		}*/
			
  	 
  	  /*	if(offSites[0].affectedLength.toFixed(5).match(affectedLength_regex) === null)
  		{
  	  		err += affectedLength_format_S +'\n';
			
  	  	}	*/
				
			
  	  	if(offSites[0].damagesYNVal == "Y" && offSites[0].damagesVal == "")
  		{
  			err += "Please describe the Deaths, Injuries, or Damages Occur Due to the Landslide/Rockfall."+'\n';
			
  		}
					
		
		/*if(offSites[0].rtNo.match(road_trail_number_regex) === null)
		{
			err += road_trail_number_format_S+'\n';
		}*/
		
		/*if(offSites[0].beginMileMarker.toFixed(5).match(begin_mile_marker_regex) === null)
		{
			err += begin_mile_marker_format_S+'\n';
		}
		
		if(offSites[0].endMileMarker.toFixed(5).match(end_mile_marker_regex) === null)
		{
			err += end_mile_marker_format_S+'\n';
			
		}*/
		
		if(offSites[0].beginCoordinateLatitude.toFixed(5).match(/^\d+\.\d+$/) === null)
		{
			err += "Begin Coordinate Latitude format must match '##.#####'."+'\n';
		
		}
		
		if(offSites[0].beginCoordinateLongitude.toFixed(5).match(/^-\d+\.\d+$/) === null)
		{
			err += "Begin Coordinate Longitude format must match '-###.#####'."+'\n';
		
		}
		
		//}else{
	//err +="Sorry, This form cannot be submitted to the database, because it is filled with wrong format of data. Please create a new slope rating form.";
	//}
  	return err;
	
	}else{
		alert("Please tap any site from the list to submit.");
		this.setState({siteId:0});
	}
	

  }
  
  displayError(err){
  	//alert("Errors in form, please see the error output below and the highlighted fields above.");
  //	$("#submission_error").html(err);
  	alert(err);
  }
   
  netConnection(){
		NetInfo.fetch().then((reach) => {
		  alert('Initial: ' + reach);
		});
		NetInfo.isConnected.fetch().then(isConnected => {
			if(isConnected == true){
				alert("submit goes here");
			}else{
				alert("You need to get online to submit sites to the server.");
			}
		//  console.log('First, is ' + (isConnected ? 'online' : 'offline'));
		});
	}
	
  EditSlopeEvent =(data)=>{
		//alert(data);
		this.props.navigation.navigate('EditSlopeEvent',data)
	};
	
  serverSave(){
	let offSites = realm.objects('SLOPE_EVENT').filtered('id='+parseInt(this.state.siteId));
	//Alert.alert(""+offSites[0].id);
	
	//for(let i = 0; i<1;i++){
		let fd = new FormData();
       	fd.append("observer_name", offSites[0].observerName);
        fd.append("email", offSites[0].email);
        fd.append("phone_no", offSites[0].phoneNo);
        fd.append("observer_comments", offSites[0].observerComments);
        fd.append("date", offSites[0].date);
        fd.append("select_date_approximator", offSites[0].selectDateApproximator);
		var str = offSites[0].firstinput.split("/");
		str = str[2]+"-"+str[0]+"-"+str[1];
        fd.append("dateinput", str);
        //fd.append("hazard_type", offSites[0].hazardTypeVal);
		let dataHazardType = realm.objects('HAZARD_LINK').filtered('id='+ parseInt(offSites[0].hazardTypeVal));
		var dataHazardtype = [];
		//alert("comment"+dataHazardType[1].hazardLink)
		for(let i=0;i<dataHazardType.length;i++){
			dataHazardtype.push(dataHazardType[i].hazardLink)
			//alert("comment"+dataHazardtype[i])
		}
        //alert(hazard_type);
        for (var i = 0; i < dataHazardtype.length; i++) {
            fd.append("hazard_type[]", dataHazardtype[i]);
        }
        fd.append("state", offSites[0].selectedState);
        fd.append("road_trail_number", offSites[0].rtNo);
        fd.append("rt_type", offSites[0].roadOrTrail);
        fd.append("begin_mile_marker", offSites[0].beginMileMarker);
        fd.append("end_mile_marker", offSites[0].endMileMarker);
        fd.append("datum", offSites[0].datum);
        fd.append("begin_coordinate_latitude", offSites[0].beginCoordinateLatitude);
        fd.append("begin_coordinate_longitude", offSites[0].beginCoordinateLongitude);
        fd.append("condition", offSites[0].condition);
        fd.append("affected_length", offSites[0].affectedLength);
		
		if(offSites[0].sizeRockVal==''){
			fd.append("size_rock", undefined);
		}else{
			fd.append("size_rock", offSites[0].sizeRockVal);
		}
		
		if(offSites[0].numFallenRocksVal==''){
			fd.append("num_fallen_rocks", undefined);
		}else{
			fd.append("num_fallen_rocks", offSites[0].numFallenRocksVal);
		}
		
		if(offSites[0].volDebrisVal==''){
			fd.append("vol_debris", undefined);
		}else{
			fd.append("vol_debris", offSites[0].volDebrisVal);
		}
		
		//fd.append("size_rock", offSites[0].sizeRockVal);
		//fd.append("num_fallen_rocks", offSites[0].numFallenRocksVal);
        //fd.append("vol_debris", offSites[0].volDebrisVal);
		
        fd.append("above_road", offSites[0].aboveRoad);
        fd.append("below_road", offSites[0].belowRoad);
        fd.append("at_culvert", offSites[0].atCulvert);
        fd.append("above_river", offSites[0].aboveRiver);
        fd.append("above_coast", offSites[0].aboveCoast);
        fd.append("burned_area", offSites[0].burnedArea);
        fd.append("deforested_slope", offSites[0].deforestedSlope);
        fd.append("urban", offSites[0].urban);
        fd.append("mine", offSites[0].mine);
        fd.append("retaining_wall", offSites[0].retainingWall);
        fd.append("natural_slope", offSites[0].naturalSlope);
		fd.append("engineered_slope", offSites[0].engineeredSlope);
        fd.append("unknown", offSites[0].unknownLocation);
        fd.append("other", offSites[0].otherLocation);
        fd.append("rain_checkbox", offSites[0].rain);
        fd.append("thunder_checkbox", offSites[0].thunder);
        fd.append("cont_rain_checkbox", offSites[0].contRain);
        fd.append("hurricane_checkbox", offSites[0].hurricane);
        fd.append("flood_checkbox", offSites[0].flood);
        fd.append("snowfall_checkbox", offSites[0].snowfall);
        fd.append("freezing_checkbox", offSites[0].freezing);
        fd.append("high_temp_checkbox",offSites[0].highTemp);
        fd.append("earthquake_checkbox", offSites[0].earthquake);
        fd.append("volcano_checkbox", offSites[0].volcano);
        fd.append("leaky_pipe_checkbox", offSites[0].leakyPipe);
        fd.append("mining_checkbox", offSites[0].mining);
        fd.append("construction_checkbox", offSites[0].construction);
        fd.append("dam_embankment_collapse_checkbox", offSites[0].damEmbankmentCollapse);
        fd.append("not_obvious_checkbox", offSites[0].notObvious);
        fd.append("unknown_checkbox", offSites[0].unknownCause);
        fd.append("other_checkbox", offSites[0].otherCause);
		
        fd.append("damages_y_n", offSites[0].damagesYNVal);
        fd.append("damages", offSites[0].damagesVal);
		
		//flag for offline sites
		fd.append("offline_site", "1");
		
		let images = realm.objects('PHOTOS_SLOPE').filtered('id='+ parseInt(offSites[0].id));
		var dataImage = [];
		for(let i=0;i<images.length;i++){
			dataImage.push(images[i].photo);
			var name = dataImage[i].slice(dataImage[i].lastIndexOf("/")+1,dataImage[i].length);
			//alert(dataImage[i]+"name: "+name);
			
			fd.append("file[]", {uri:'file://'+dataImage[i], name: name, type: 'image/jpg', isStatic: true});
			//fd.append("files[]", dataImage[i]);
			
		}
		//	
		//https://usmp.info/server/new_slope_event/add_new_slope_event.php
		//https://nl.cs.montana.edu/test_sites/prashanta.saha/server/new_site_php/add_new_site.php
		//https://nl.cs.montana.edu/test_sites/prashanta.saha/server/new_slope_form.php
		
		fetch("https://usmp.info/server/new_slope_event/add_new_slope_event.php", {
		          method: 'POST',
		          body: fd,
		
		      })
		      .then((response) => {
			  //Alert.alert(JSON.stringify(response));
			  alert("Successfully Submitted to server database.")
			  this.deleteSite(offSites[0].id);
			  this.setState({siteId:0});
			  })
		      .catch((error) => {
				//  alert(error);
			  alert("Submission to server database failed.")
		          console.error(error);
		      })
	}

	//get login success info
	async getSuccess(){
		try{
		//AsyncStorage.removeItem('Success');
		let data =  await AsyncStorage.getItem('Success');
		//alert(data)
		
		if(data == 'success'){
			this.serverSave()
		}else{
			this.props.navigation.navigate('userLogin',{site:3})
		}
			
		}catch(error){
			console.log(error)
		}
	}	
	
  submitSites =()=>{
		if(this.state.siteId==0){
			alert("Please tap any site from the list to submit.")
		}else{
			
			var err = this.validateForm();
		
			//this.serverSave();
		
			if(err == "")
			{
				this.getSuccess();
				//this.serverSave();
			
			}
			else
			{
				this.displayError(err);
			}
		
		  }
		  
	};
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
		Offline Saved Slope Events
		</Text>
      	</View>
					
		<ListView 
		style={styles.listView}	
		contentInset={{bottom:60}}
		enableEmptySections={true}
		automaticallyAdjustContentInsets={false}
		dataSource = {this.state.dataSource}
		renderRow = {(data)=>
			<TouchableHighlight underlayColor = '#dddddd' style={{height:40}}> 
			<View>
			<Text 
			style={styles.listText}
			numberOfLines={2} 
			onPress ={() => {
				//this.editSite(data);
				this.setState({siteId:data.id});
			}}
			>
			<Text style={{fontWeight:'bold', fontSize:18}}>{data.rtNo}</Text> date added:{data.date}
			<Text 
			style={{fontWeight:'bold', left:Dimensions.get('window').width-40, fontSize:16, color:'blue',paddingBottom:5}}
			
			onPress ={() => {
				this.EditSlopeEvent(data);
				//this.setState({siteId:data.id})
				
			}}
			>Edit </Text>
			<Text 
			style={{fontWeight:'bold', left:Dimensions.get('window').width, fontSize:16, color:'blue',paddingBottom:5}}
			
			onPress ={() => {
				Alert.alert(
					'Delete site',
					'Are you sure you want to delete this site?',
					[
					{text:'Ok', onPress:()=>this.deleteSite(data.id)},
					{text:'Cancel', onPress:()=>console.log('ok pressed')},	
					],
					{cancelable:false}
				)
				
				//this.setState({siteId:data.id})
				
			}}
			>Delete </Text>
			</Text>
			
			
			
			<View style={{height:1, backgroundColor:'#dddddd'}}/>
			</View>
			</TouchableHighlight>
			
		}
		//renderRow = {(data) => data.siteName}
		
		/>
			
      	<View style={styles.footer}>
     		<TouchableHighlight 
			style={styles.button} 
			onPress = {()=> 
				//this.netConnection()
				this.submitSites()
			}>
				<Text style={styles.text}>Submit Site</Text>
			</TouchableHighlight>
     		
      	</View>
			
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
	marginLeft:0,   
	marginRight:Dimensions.get('window').width*0.45,     
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
	  width:150,
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
  listView: {
      backgroundColor: '#eeeeee',
      height: 600,
	  paddingTop:20,
    },
  listText: {
       fontSize:14, 
	   color:'#000000',
	  	paddingTop:2,	
      },
 
});

//AppRegistry.registerComponent('Offsite', () => Offsite);
