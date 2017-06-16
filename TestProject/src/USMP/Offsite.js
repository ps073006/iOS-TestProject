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

export default class Offsite extends Component {
	
	constructor(props){
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1.id !== r2.id});
		let sites = realm.objects('SITE_INFORMATION');
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
			let offSites = realm.objects('SITE_INFORMATION').filtered('id='+parseInt(siteId));
			if(offSites.length>0){
				let dataHazardType = realm.objects('HAZARD_LINK').filtered('id='+ parseInt(offSites[0].hazardType));
				if(dataHazardType.length>0){
					realm.delete(dataHazardType);
				}
			
				//comment
				let dataComment = realm.objects('COMMENTS').filtered('id='+ parseInt(offSites[0].comment));
				realm.delete(dataComment);
				//fmlaLink
				let dataFmla = realm.objects('FMLA_LINK').filtered('id='+ parseInt(offSites[0].fmla));
				realm.delete(dataFmla);
		
				let dataPrelimLandslideRating = realm.objects('LANDSLIDE_PRILIMINARY_RATING').filtered('id='+ parseInt(offSites[0].preliminaryRatingLandslideId));
				realm.delete(dataPrelimLandslideRating);
				//ROCKFALL_PRILIMINARY_RATING
				let dataHazardLandslideRating = realm.objects('LANDSLIDE_HAZARD_RATING').filtered('id='+ parseInt(offSites[0].hazardRatingLandslideId));
				realm.delete(dataHazardLandslideRating);
		
				let dataPrelimRockfallRating = realm.objects('ROCKFALL_PRILIMINARY_RATING').filtered('id='+ parseInt(offSites[0].preliminaryRatingRockfallId));
				realm.delete(dataPrelimRockfallRating);
				//dataHazardRockfallRating
				let dataHazardRockfallRating = realm.objects('ROCKFALL_HAZARD_RATING').filtered('id='+ parseInt(offSites[0].hazardRatingRockfallId));
				realm.delete(dataHazardRockfallRating);
		
				realm.delete(offSites);
		
			
			}
		});
		const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1.id !== r2.id});
		let sites = realm.objects('SITE_INFORMATION');
		this.setState({dataSource:ds.cloneWithRows(sites)});
		
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
	
	editSite =(data)=>{
		//alert(data);
		this.props.navigation.navigate('EditSite',data)
	};
	submitSites =()=>{
		if(this.state.siteId==0){
			alert("Please tap any site from the list to submit.")
		}else{
		let offSites = realm.objects('SITE_INFORMATION').filtered('id='+parseInt(this.state.siteId));
		//Alert.alert(""+offSites[0].id);
		
		//for(let i = 0; i<1;i++){
			let fd = new FormData();
		//fd.append("siteName",offSites[0].siteName)
		//fd.append("siteLocation",offSites[0].siteLocation)
			fd.append("old_site_id", offSites[0].id);
			//fd.append("mgmt_area", $("#mgmt_area").val());
			fd.append("umbrella_agency", offSites[0].umbrellaAgency);
	        fd.append("regional_admin", offSites[0].regionalAdmin);
	        fd.append("local_admin", offSites[0].localAdmin);
			fd.append("road_trail_number", offSites[0].rtNo);
			fd.append("road_trail_class", offSites[0].rtClass);
			fd.append("begin_mile_marker", offSites[0].beginMileMarker);
			fd.append("end_mile_marker", offSites[0].endMileMarker);
			fd.append("road_or_trail", offSites[0].roadOrTrail);
			fd.append("side", offSites[0].side);
			fd.append("rater", offSites[0].rater);
			fd.append("date", offSites[0].date);
		
			fd.append("weather", offSites[0].weather);
			fd.append("begin_coordinate_latitude", offSites[0].beginCoordinateLatitude);
			fd.append("begin_coordinate_longitude", offSites[0].beginCoordinateLongitude);
			fd.append("end_coordinate_latitude", offSites[0].endCoordinateLatitude);
			fd.append("end_coordinate_longitude", offSites[0].endCoordinateLongitude);
			fd.append("datum", offSites[0].datum);
			fd.append("aadt", offSites[0].aadt);
			//fd.append("hazard_type", $("#hazard_type").val());
			//var hazard_type = $('#hazard_type').val();
			let dataHazardType = realm.objects('HAZARD_LINK').filtered('id='+ parseInt(offSites[0].hazardType));
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
			fd.append("length_affected", offSites[0].lengthAffected);
			fd.append("slope_height_axial_length", offSites[0].slopeHeightAxialLength);
			fd.append("slope_angle", offSites[0].slopeAngle);
			fd.append("sight_distance", offSites[0].sightDistance);
			fd.append("road_trail_width", offSites[0].roadTrailWidth);
			fd.append("speed_limit", offSites[0].speedLimit);
			
			fd.append("minimum_ditch_width", offSites[0].minimumDitchWidth);
			fd.append("maximum_ditch_width", offSites[0].maximumDitchWidth);
			fd.append("minimum_ditch_depth", offSites[0].minimumDitchDepth);
			fd.append("maximum_ditch_depth", offSites[0].maximumDitchDepth);
			fd.append("first_begin_ditch_slope", offSites[0].firstBeginDitchSlope);
			fd.append("first_end_ditch_slope", offSites[0].firstEndDitchSlope);
			fd.append("second_begin_ditch_slope", offSites[0].secondBeginDitchSlope);
			fd.append("second_end_ditch_slope", offSites[0].secondEndDitchSlope);
			fd.append("start_annual_rainfall", offSites[0].startAnnualRainfall);
			fd.append("end_annual_rainfall", offSites[0].endAnnualRainfall);
			fd.append("sole_access_route", offSites[0].soleAccessRoute);
			fd.append("fixes_present", offSites[0].fixesPresent);
			fd.append("blk_size", offSites[0].blkSize);
			fd.append("volume", offSites[0].volume);
			
			
			//prelim rating for all
			fd.append("impact_on_use", offSites[0].impactOnUse);
			var aadt_usage_calc_checkbox = (offSites[0].aadtUsageCalcCheckbox == true)?'1':'0';
			fd.append("aadt_usage_calc_checkbox", aadt_usage_calc_checkbox);
			fd.append("aadt_usage", offSites[0].aadtUsage);
			fd.append("prelim_rating", offSites[0].prelimRating);
			
			//hazard rating for all
			fd.append("slope_drainage", offSites[0].slopeDrainage);
			fd.append("hazard_rating_annual_rainfall", offSites[0].hazardRatingAnnualRainfall);
			fd.append("hazard_rating_slope_height_axial_length", offSites[0].hazardRatingSlopeHeightAxialLength);

			//LANDSLIDE_PRILIMINARY_RATING
			if(offSites[0].preliminaryRatingLandslideId > 0){
				let dataPrelimLandslideRating = realm.objects('LANDSLIDE_PRILIMINARY_RATING').filtered('id='+ parseInt(offSites[0].preliminaryRatingLandslideId));
			

				//prelim landslide data
				fd.append("prelim_landslide_road_width_affected", dataPrelimLandslideRating[0].roadWidthAffected); 
				fd.append("prelim_landslide_slide_erosion_effects", dataPrelimLandslideRating[0].slideErosionEffects);
				fd.append("prelim_landslide_length_affected", dataPrelimLandslideRating[0].lengthAffected);
				
				//prelim rockfall data
				fd.append("prelim_rockfall_ditch_eff", '0');
				fd.append("prelim_rockfall_rockfall_history", '0');
				fd.append("prelim_rockfall_block_size_event_vol", '0');
				
				//ROCKFALL_PRILIMINARY_RATING
				let dataHazardLandslideRating = realm.objects('LANDSLIDE_HAZARD_RATING').filtered('id='+ parseInt(offSites[0].hazardRatingLandslideId));
		

				//hazard rating landslide fields
				fd.append("hazard_landslide_thaw_stability", dataHazardLandslideRating[0].thawStability);
				fd.append("hazard_landslide_maint_frequency", dataHazardLandslideRating[0].maintFrequency);
				fd.append("hazard_landslide_movement_history", dataHazardLandslideRating[0].movementHistory);
				
				//hazard rating rockfall fields
				fd.append("hazard_rockfall_maint_frequency", '0');
				fd.append("case_one_struc_cond", '0');
				fd.append("case_one_rock_friction", '0');
				fd.append("case_two_struc_condition", '0');
				fd.append("case_two_diff_erosion", '0');
			
				//hazardRatingLandslideTotal
	  			var hazardRatingLandslideTotal = parseInt(dataPrelimLandslideRating[0].roadWidthAffected) 
				+ parseInt(dataPrelimLandslideRating[0].slideErosionEffects)
	  			+ parseInt(dataPrelimLandslideRating[0].lengthAffected) 
				+ parseInt(offSites[0].slopeDrainage) 
				+ parseInt(offSites[0].hazardRatingAnnualRainfall)
	  			+ parseInt(offSites[0].hazardRatingSlopeHeightAxialLength) 
				+ parseInt(dataHazardLandslideRating[0].thawStability) 
	  			+ parseInt(dataHazardLandslideRating[0].maintFrequency) 
				+ parseInt(dataHazardLandslideRating[0].movementHistory) ;
			
				//hazardRatingRockfallTotal
				var hazardRatingRockfallTotal  =  parseInt(offSites[0].slopeDrainage) + parseInt(offSites[0].hazardRatingAnnualRainfall) + parseInt(offSites[0].hazardRatingSlopeHeightAxialLength);
		
			}
			
			//ROCKFALL_PRILIMINARY_RATING
			if(offSites[0].preliminaryRatingRockfallId > 0){
				
				let dataPrelimRockfallRating = realm.objects('ROCKFALL_PRILIMINARY_RATING').filtered('id='+ parseInt(offSites[0].preliminaryRatingRockfallId));
			
				//prelim rockfall data
				fd.append("prelim_rockfall_ditch_eff", dataPrelimRockfallRating[0].ditchEff);
				fd.append("prelim_rockfall_rockfall_history", dataPrelimRockfallRating[0].rockfallHistory);
				fd.append("prelim_rockfall_block_size_event_vol", dataPrelimRockfallRating[0].blockSizeEventVol);
				
				//dataHazardRockfallRating
				let dataHazardRockfallRating = realm.objects('ROCKFALL_HAZARD_RATING').filtered('id='+ parseInt(offSites[0].hazardRatingRockfallId));
			
				//hazard rating rockfall fields
				fd.append("hazard_rockfall_maint_frequency", dataHazardRockfallRating[0].maintFrequency);
				fd.append("case_one_struc_cond", dataHazardRockfallRating[0].caseOneStrucCond);
				fd.append("case_one_rock_friction", dataHazardRockfallRating[0].caseOneRockFriction);
				fd.append("case_two_struc_condition", dataHazardRockfallRating[0].caseTwoStrucCondition);
				fd.append("case_two_diff_erosion", dataHazardRockfallRating[0].caseTwoDiffErosion);
			
				//prelim landslide data
				fd.append("prelim_landslide_road_width_affected", '0'); 
				fd.append("prelim_landslide_slide_erosion_effects", '0');
				fd.append("prelim_landslide_length_affected", '0');
				
				//hazard rating landslide fields
				fd.append("hazard_landslide_thaw_stability", '0');
				fd.append("hazard_landslide_maint_frequency", '0');
				fd.append("hazard_landslide_movement_history", '0');
				
				//hazardRatingRockfallTotal
				var hazardRatingRockfallTotal  = parseInt(dataPrelimRockfallRating[0].ditchEff) + parseInt(dataPrelimRockfallRating[0].rockfallHistory)
				+ parseInt(dataPrelimRockfallRating[0].blockSizeEventVol) + parseInt(offSites[0].slopeDrainage) 
				+ parseInt(offSites[0].hazardRatingAnnualRainfall) + parseInt(offSites[0].hazardRatingSlopeHeightAxialLength) 
				+ parseInt(dataHazardRockfallRating[0].maintFrequency);
				if(parseInt(dataHazardRockfallRating[0].caseOneStrucCond) + parseInt(dataHazardRockfallRating[0].caseOneRockFriction) 
		 		   > parseInt(dataHazardRockfallRating[0].caseTwoStrucCondition) + parseInt(dataHazardRockfallRating[0].caseTwoDiffErosion))
				{
					hazardRatingRockfallTotal += parseInt(dataHazardRockfallRating[0].caseOneStrucCond) + parseInt(dataHazardRockfallRating[0].caseOneRockFriction);
				}
				else
				{
					hazardRatingRockfallTotal += parseInt(dataHazardRockfallRating[0].caseTwoStrucCondition) + parseInt(dataHazardRockfallRating[0].caseTwoDiffErosion);
				}
				
				//hazardRatingLandslideTotal
	  			var hazardRatingLandslideTotal = parseInt(offSites[0].slopeDrainage) + parseInt(offSites[0].hazardRatingAnnualRainfall) + parseInt(offSites[0].hazardRatingSlopeHeightAxialLength) ;
			
			}
			
			//risk ratings
			fd.append("route_trail_width", offSites[0].routeTrailWidth);
			fd.append("human_ex_factor", offSites[0].humanExFactor);
			fd.append("percent_dsd", offSites[0].percentDsd);
			fd.append("r_w_impacts", offSites[0].rWImpacts);
			fd.append("enviro_cult_impacts", offSites[0].enviroCultImpacts);
			fd.append("maint_complexity", offSites[0].maintComplexity);
			fd.append("event_cost", offSites[0].eventCost);
			
			//hazard totals
			fd.append("hazard_rating_landslide_total", hazardRatingLandslideTotal);
			fd.append("hazard_rating_rockfall_total", hazardRatingRockfallTotal);
			fd.append("risk_total", offSites[0].riskTotal);
			fd.append("total_score", offSites[0].totalScore);
			
			//comment
			let dataComment = realm.objects('COMMENTS').filtered('id='+ parseInt(offSites[0].comment));
		
			//comments
			fd.append("comments", dataComment[0].comment);
			
			//fmlaLink
			let dataFmla = realm.objects('FMLA_LINK').filtered('id='+ parseInt(offSites[0].fmla));
			//alert(dataFmla[0].fmlaId)
			//fmla
			fd.append("fmla_id", dataFmla[0].fmlaId);
			fd.append("fmla_name", dataFmla[0].fmlaName);
			fd.append("fmla_description", dataFmla[0].fmlaDescription);
			
			//space for files or images
			//
			//	
			//usmp.info	
			//https://nl.cs.montana.edu/test_sites/prashanta.saha/server/new_site_php/add_new_site.php
			//https://nl.cs.montana.edu/test_sites/prashanta.saha/server/new_slope_form.php
  		fetch("https://nl.cs.montana.edu/test_sites/prashanta.saha/server/new_site_php/add_new_site.php", {
  		          method: 'POST',
  		          body: fd,
			
  		      })
  		      .then((response) => {
  				  //Alert.alert(JSON.stringify(response));
				  alert("Successfully Submitted to server database.")
				  this.deleteSite(offSites[0].id);
				  //fd = new FormData();
  			  })
  		      .catch((error) => {
				  alert("Submission to server database failed.")
  		          console.error(error);
  		      })
		  }
			
	//	}
		  
	};
  render() {
  	
    return (
<View style={styles.container}>
      	<View style={styles.header}>
  	  		<Icon name="menu" 
		style={{marginTop:20,marginRight:150}}  
		size={40} backgroundColor="#3b5998" 
		onPress={() => this.props.navigation.navigate('DrawerOpen')}>
 		<Text 
		style={styles.headerText}
		onPress={() => this.props.navigation.navigate('DrawerOpen')}
		>
		Site titles
		</Text>
			
			</Icon>
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
				this.setState({siteId:data.id})
			}}
			>
			<Text style={{fontWeight:'bold', fontSize:18}}>ID - {data.id}</Text> date added:{data.date}
			<Text 
			style={{fontWeight:'bold', left:Dimensions.get('window').width-40, fontSize:16, color:'blue',paddingBottom:5}}
			
			onPress ={() => {
				this.editSite(data);
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
				this.netConnection()
				//this.submitSites()
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
  headerText: {
    fontSize: 18,
    color: 'white',
    padding: 15,
	 alignItems: 'center', 
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#006400',
	borderBottomWidth: 1,
	borderBottomColor:'#ddd',
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
	  paddingTop:0,
    },
  listText: {
       fontSize:14, 
	   color:'#000000',
	  	paddingTop:2,	
      },
});

//AppRegistry.registerComponent('Offsite', () => Offsite);
