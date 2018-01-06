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
var umbrella_agency_regex = /^.+$/;
var umbrella_agency_format_S = "Umbrella agency must have a value.";

var regional_admin_regex = /^.+$/;
var regional_admin_format_S = "Regional admin must have a value.";

var local_admin_regex = /^.+$/;
var local_admin_format_S = "Local admin must have a value.";


var date_regex = /^(\d{4})-(\d{2})-(\d{2})( (\d{2}):(\d{2}):(\d{2}))?$/;
var date_no_time_regex = /^(\d{4})-(\d{2})-(\d{2})$/;
var date_format_S = "Date format must match 'YYYY-MM-DD' or 'YYYY-MM-DD HH:MM:SS'.";

var road_trail_number_regex = /^.{1,30}$/;
var road_trail_number_format_S = "Road/Trail No. cannot be empty and must be shorter than 30 characters.";

var begin_mile_marker_regex = /^\d*\.?\d+$/;
var begin_mile_marker_format_S = "Beginning Mile Marker must have a decimal value.";

var end_mile_marker_regex = /^\d*\.?\d+$/;
var end_mile_marker_format_S = "Ending Mile Marker must have a decimal value.";

var site_id_regex = /^\d+$/;
var site_id_format_S = "Site ID must have an integer value.";

var total_regex = /^\d+$/;
var total_format_S = "Total must have an integer value.";




export default class Offsite extends Component {
	
	constructor(props){
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1.id !== r2.id});
		let sites = realm.objects('MAINTENANCE_FORM');
		console.log(sites.length);
		this.state={
			dataSource : ds.cloneWithRows(sites),
			siteId:0,
			//dataSource : ds.cloneWithRows(['name1','name2','name3']),
		};
		//this.renderRow = this.renderRow.bind(this);
	}
	deleteSite(siteId){
		realm.write(()=>{
			let offSites = realm.objects('MAINTENANCE_FORM').filtered('id='+parseInt(siteId));
			if(offSites.length>0){
				realm.delete(offSites);
			}
		});
		const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1.id !== r2.id});
		let sites = realm.objects('MAINTENANCE_FORM');
		this.setState({dataSource:ds.cloneWithRows(sites)});
		
	}
  validateForm(){

  	var err = "";
	let offSites = realm.objects('MAINTENANCE_FORM').filtered('id='+parseInt(this.state.siteId));
	//alert(offSites[0].siteId);
	//alert(""+offSites[0].maintenanceType+" "+offSites[0].typeofEvent);
	if(offSites.length>0){
	  	if(offSites[0].selectedAgency.match(umbrella_agency_regex) === null || offSites[0].selectedAgency == "search_0"){
	  		err += umbrella_agency_format_S+'\n';//.concat("<br/>");
	  		//$("#umbrella_agency").css("background-color", "red");
	  	}

	  	if(offSites[0].selectedRegion.match(regional_admin_regex) === null || offSites[0].selectedRegion == "search_0"){
	  		err += regional_admin_format_S+'\n';//.concat("<br/>");
	  		//$("#regional_admin").css("background-color", "red");
	  	}

	  	if(offSites[0].selectedLocal.match(local_admin_regex) === null || offSites[0].selectedLocal == "search_0"){
	  		err += local_admin_format_S+'\n';//.concat("<br/>");
	  		//$("#local_admin").css("background-color", "red");
	  	}
		
		if(offSites[0].siteId.toFixed(0).match(site_id_regex) === null){
			err += site_id_format_S+'\n';
		}
		
		if(offSites[0].date.match(date_regex) === null)
		{
			err += date_format_S+'\n';
		}
		
		/*if(offSites[0].rtNo.match(road_trail_number_regex) === null)
		{
			err += road_trail_number_format_S+'\n';
		}*/
		
		if(offSites[0].beginMileMarker.toFixed(5).match(begin_mile_marker_regex) === null)
		{
			err += begin_mile_marker_format_S+'\n';
		}
		
		if(offSites[0].endMileMarker.toFixed(5).match(end_mile_marker_regex) === null)
		{
			err += end_mile_marker_format_S+'\n';
			
		}
		
		if(offSites[0].maintenanceLat.toFixed(5).match(/^\d+\.\d+$/) === null)
		{
			err += "Maintenance Coordinate Latitude format must match '##.#####'."+'\n';
		
		}
		
		if(offSites[0].maintenanceLong.toFixed(5).match(/^-\d+\.\d+$/) === null)
		{
			err += "Maintenance Coordinate Longitude format must match '-###.#####'."+'\n';
		
		}
		
  		if(offSites[0].total.match(total_regex) === null)
		{
  			err += total_format_S+'\n';
  		}
		
		if(isNaN(offSites[0].totalPercent) || offSites[0].totalPercent != 100)
		{
			err += "Running total of the cost percentages should be equal to 100."+'\n';
		
		}
		
		if((offSites[0].designPse > 100 || offSites[0].designPse < 0)||(offSites[0].removeDitchDebris > 100 || offSites[0].removeDitchDebris < 0)||
	(offSites[0].removeRoadTrailDebris > 100 || offSites[0].removeRoadTrailDebris < 0)||(offSites[0].relevelAggregate > 100 || offSites[0].relevelAggregate < 0)||
	(offSites[0].relevelPatch > 100 || offSites[0].relevelPatch < 0)||(offSites[0].drainageImprovement > 100 || offSites[0].drainageImprovement < 0)||
	(offSites[0].deepPatch > 100 || offSites[0].deepPatch < 0)||(offSites[0].haulDebris > 100 || offSites[0].haulDebris < 0)||
	(offSites[0].scalingRockSlopes > 100 || offSites[0].scalingRockSlopes < 0)||(offSites[0].roadTrailAlignment > 100 || offSites[0].roadTrailAlignment < 0)||
	(offSites[0].repairRockfallBarrier > 100 || offSites[0].repairRockfallBarrier < 0)||(offSites[0].repairRockfallNetting > 100 || offSites[0].repairRockfallNetting < 0)||
	(offSites[0].sealingCracks > 100 || offSites[0].sealingCracks < 0)||(offSites[0].guardrail > 100 || offSites[0].guardrail < 0)||
	(offSites[0].cleaningDrains > 100 || offSites[0].cleaningDrains < 0)||(offSites[0].flaggingSigning > 100 || offSites[0].flaggingSigning < 0)||
	(offSites[0].other1 > 100 || offSites[0].other1 < 0)||(offSites[0].other2 > 100 || offSites[0].other2 < 0)||
	(offSites[0].other3 > 100 || offSites[0].other3 < 0)||(offSites[0].other4 > 100 || offSites[0].other4 < 0)||
	(offSites[0].other5 > 100 || offSites[0].other5 < 0)){
		
			err += "Make sure all fields in cost percentages  are less than or equal to 100 or  greater than or equal to 0. Fields have been colored with red."+'\n';			
			
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
		//NetInfo.fetch().then((reach) => {
		//  alert('Initial: ' + reach);
		//});
		NetInfo.isConnected.fetch().then(isConnected => {
			if(isConnected == true){
				this.serverSave();
				//alert("submit goes here");
			}else{
				alert("You need to get online to submit sites to the server.");
			}
		//  console.log('First, is ' + (isConnected ? 'online' : 'offline'));
		});
	}
	
  EditMaintenance =(data)=>{
		//alert(data);
		this.props.navigation.navigate('EditMaintenance',data)
	};
	
  serverSave(){
	let offSites = realm.objects('MAINTENANCE_FORM').filtered('id='+parseInt(this.state.siteId));
	//Alert.alert(""+offSites[0].maintenanceType+" "+offSites[0].typeofEvent);
	
	//for(let i = 0; i<1;i++){
		let fd = new FormData();
		fd.append("site_id", offSites[0].siteId);
		//console.log($("#site_id").val());
		fd.append("code_relation", offSites[0].codeRelation);
		if(offSites[0].maintenanceType==''){
			fd.append("maintenance_type",undefined);
		}else{
			fd.append("maintenance_type",offSites[0].maintenanceType);
		}
		//fd.append("maintenance_type",offSites[0].maintenanceType);
        fd.append("road_trail_no", offSites[0].rtNo);
        fd.append("begin_mile_marker", offSites[0].beginMileMarker);
        fd.append("end_mile_marker", offSites[0].endMileMarker);
        fd.append("umbrella_agency", offSites[0].selectedAgency);
        fd.append("regional_admin", offSites[0].selectedRegion);
        fd.append("local_admin", offSites[0].selectedLocal);
		if(offSites[0].typeofEvent==''){
			fd.append("us_event", undefined);
		}else{
			fd.append("us_event", offSites[0].typeofEvent);
		}
		//fd.append("us_event", offSites[0].typeofEvent);
        fd.append("event_desc", offSites[0].eventDesc);
        //var str = $("#firstinput").val().split("/");
        //str = str[2]+"-"+str[0]+"-"+str[1];
        fd.append("dateinput", offSites[0].date);
		fd.append("maintenance_lat", offSites[0].maintenanceLat);
        fd.append("maintenance_long", offSites[0].maintenanceLong);
        fd.append("design_pse", offSites[0].designPse);
		fd.append("design_pse_val", offSites[0].designPseVal);
        fd.append("remove_ditch_debris", offSites[0].removeDitchDebris);
		fd.append("remove_ditch_debris_val", offSites[0].removeDitchDebrisVal);
        fd.append("remove_road_trail_debris", offSites[0].removeRoadTrailDebris);
		fd.append("remove_road_trail_debris_val", offSites[0].removeRoadTrailDebrisVal);
        fd.append("relevel_aggregate", offSites[0].relevelAggregate);
		fd.append("relevel_aggregate_val", offSites[0].relevelAggregateVal);
        fd.append("relevel_patch", offSites[0].relevelPatch);
		fd.append("relevel_patch_val", offSites[0].relevelPatchVal);
        fd.append("drainage_improvement", offSites[0].drainageImprovement);
		fd.append("drainage_improvement_val", offSites[0].drainageImprovementVal);
        fd.append("deep_patch", offSites[0].deepPatch);
		fd.append("deep_patch_val", offSites[0].deepPatchVal);
        fd.append("haul_debris", offSites[0].haulDebris);
		fd.append("haul_debris_val", offSites[0].haulDebrisVal);
        fd.append("scaling_rock_slopes", offSites[0].scalingRockSlopes);
		fd.append("scaling_rock_slopes_val", offSites[0].scalingRockSlopesVal);
        fd.append("road_trail_alignment", offSites[0].roadTrailAlignment);
		fd.append("road_trail_alignment_val", offSites[0].roadTrailAlignmentVal);
        fd.append("repair_rockfall_barrier", offSites[0].repairRockfallBarrier);
		fd.append("repair_rockfall_barrier_val", offSites[0].repairRockfallBarrierVal);
        fd.append("repair_rockfall_netting", offSites[0].repairRockfallNetting);
		fd.append("repair_rockfall_netting_val", offSites[0].repairRockfallNettingVal);
        fd.append("sealing_cracks", offSites[0].sealingCracks);
		fd.append("sealing_cracks_val", offSites[0].sealingCracksVal);
        fd.append("guardrail", offSites[0].guardrail);
		fd.append("guardrail_val", offSites[0].guardrailVal);
        fd.append("cleaning_drains", offSites[0].cleaningDrains);
		fd.append("cleaning_drains_val", offSites[0].cleaningDrainsVal);
        fd.append("flagging_signing", offSites[0].flaggingSigning);
		fd.append("flagging_signing_val", offSites[0].flaggingSigningVal);
        fd.append("other1_desc", offSites[0].other1Desc);
		fd.append("other1", offSites[0].other1);
		fd.append("other1_val", offSites[0].other1Val);
        fd.append("other2_desc", offSites[0].other2Desc);
		fd.append("other2", offSites[0].other2);
		fd.append("other2_val", offSites[0].other2Val);
        fd.append("other3_desc", offSites[0].other3Desc);
		fd.append("other3", offSites[0].other3);
		fd.append("other3_val", offSites[0].other3Val);
        fd.append("other4_desc", offSites[0].other4Desc);
		fd.append("other4", offSites[0].other4);
		fd.append("other4_val", offSites[0].other4Val);
        fd.append("other5_desc", offSites[0].other5Desc);
		fd.append("other5", offSites[0].other5);
		fd.append("other5_val", offSites[0].other5Val);
        fd.append("total", offSites[0].total);
        fd.append("total_percent", offSites[0].totalPercent);
		//	
		//usmp.info	
		//https://nl.cs.montana.edu/test_sites/prashanta.saha/server/new_site_php/add_new_site.php
		//https://nl.cs.montana.edu/test_sites/prashanta.saha/server/new_slope_form.php
		
		fetch("https://usmp.info/server/maintenance/add_maintenance.php", {
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
				//  alert(error)
			  alert("Submission to server database failed.")
		         // console.error(error);
		      })
	}
	//https://usmp.info/server/authentication/initial_login.php
	/*loginInfo(){
		let fd = new FormData();
		fd.append("email", 'root@email.com');
		fd.append("password", 'pkvRpqdTnQteZMW');
		fetch("https://nl.cs.montana.edu/test_sites/prashanta.saha/server/authentication/app_login.php", {
		          method: 'POST',
				  body: JSON.stringify({
					  email:'root@email.com',
					  password:'pkvRpqdTnQteZMW'
				  })
		
		      })
		      .then((response) => {
			  alert(JSON.stringify(response));
			  //alert("Successfully Submitted to server database.")
			  //this.deleteSite(offSites[0].id);
			  //this.setState({siteId:0});
			  })
		      .catch((error) => {
				//  alert(error)
			  alert("Submission to server database failed.")
		         // console.error(error);
		      })
		
	}	*/
	/*	async store(){
			try{
			await AsyncStorage.setItem('Success','success');
				
			}catch(error){
				console.log(error)
			}
		}*/
		//get login success info
		async getSuccess(){
			try{
			//AsyncStorage.removeItem('Success');
			let data =  await AsyncStorage.getItem('Success');
			//alert(data)
			
			if(data == 'success'){
				this.serverSave()
			}else{
				//alert("www")
				this.props.navigation.navigate('userLogin',{site:2})
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
					//this.store();
					this.getSuccess();		
				//this.loginInfo();
				//this.serverSave();
			//check netconnection and submit to the server
				//this.netConnection();
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
		Offline Saved Maintenance Forms
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
				this.EditMaintenance(data);
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
