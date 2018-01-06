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

var road_or_trail_regex = /^.+$/;
var road_or_trail_format_S = "Road/Trail must have a value.";

var road_trail_class_regex = /^.{1,30}$/;
var road_trail_class_format_S = "Road/Trail Class must be shorter than 30 characters.";

var rater_regex = /^.{1,30}$/;
var rater_format_S = "Rater cannot be empty and must be shorter than 30 characters.";

var begin_mile_marker_regex = /^\d*\.?\d+$/;
var begin_mile_marker_format_S = "Beginning Mile Marker must have a decimal value.";

var end_mile_marker_regex = /^\d*\.?\d+$/;
var end_mile_marker_format_S = "Beginning Mile Marker must have a decimal value.";

var side_regex = /^.+$/;
var side_format_S = "Side must have a value.";

var weather_regex = /^.+$/;
var weather_format_S = "Weather must have a value.";

var hazard_type_regex = /^.+$/;
var hazard_type_format_S = "Hazard Type must have a value.";

var rockfall_landslide_checkbox_format_S = "Either Rockfall, or Landslide must be selected.";

var begin_coordinate_latitude_regex = /^\d+\.\d+$/;
var begin_coordinate_latitude_format_S = "Beginning Coordinate Latitude format must match '##.#####'.";

var begin_coordinate_longitude_regex = /^-\d+\.\d+$/;
var begin_coordinate_longitude_format_S = "Beginning Coordinate Longitude format must match '-###.#####'.";

var end_coordinate_latitude_regex = /^\d+\.\d+$/;
var end_coordinate_latitude_format_S = "End Coordinate Latitude format must match '##.#####'.";

var end_coordinate_longitude_regex = /^-\d+\.\d+$/;
var end_coordinate_longitude_format_S = "End Coordinate Longitude format must match '-###.#####'.";

var aadt_regex = /^\d+$/;
var aadt_format_S = "AADT must have an integer value.";

var length_affected_regex = /^\d*\.?\d+$/;
var length_affected_format_S = "Length of Affected Road/Trail must have a decimal value.";

var slope_height_axial_length_regex = /^\d*\.?\d+$/;
var slope_height_axial_length_format_S = "Slope Height (rock)/Axial Length (slide) must have a decimal value.";

var slope_angle_regex = /^\d+$/;
var slope_angle_format_S = "Slope Angle must have an integer value between 0 and 90 degrees.";

var sight_distance_regex = /^\d*\.?\d+$/;
var sight_distance_format_S = "Sight Distance must have a decimal value.";

var road_trail_width_regex = /^\d*\.?\d+$/;
var road_trail_width_format_S = "Roadway/Trail width must have a decimal value.";

var speed_limit_regex = /^\d+$/;
var speed_limit_format_S = "Speed Limit must have an integer value.";

var minimum_ditch_width_regex = /^\d*\.?\d+$/;
var minimum_ditch_width_format_S = "Ditch Width minimum must have a decimal value.";

var maximum_ditch_width_regex = /^\d*\.?\d+$/;
var maximum_ditch_width_format_S = "Ditch Width maximum must have a decimal value.";

var minimum_ditch_depth_regex = /^\d*\.?\d+$/;
var minimum_ditch_depth_format_S = "Ditch Depth minimum must have a decimal value.";

var maximum_ditch_depth_regex = /^\d*\.?\d+$/;
var maximum_ditch_depth_format_S = "Ditch Depth maximum must have a decimal value.";

var first_begin_ditch_slope_regex = /^\d+$/;
var first_begin_ditch_slope_format_S = "Ditch Slope first begin must have an integer value.";

var first_end_ditch_slope_regex = /^\d+$/;
var first_end_ditch_slope_format_S = "Ditch Slope first end must have an integer value.";

var second_begin_ditch_slope_regex = /^\d+$/;
var second_begin_ditch_slope_format_S = "Ditch Slope second begin must have an integer value.";

var second_end_ditch_slope_regex = /^\d+$/;
var second_end_ditch_slope_format_S = "Ditch Slope second end must have an integer value.";

var blk_size_regex = /^\d*\.?\d+$/;
var blk_size_format_S = "Blk Size must have a decimal value.";

var volume_regex = /^\d*\.?\d+$/;
var volume_format_S = "Volume must have a decimal value.";

var blk_volume_format_S = "Block size or Volume must have a decimal value.";

var start_annual_rainfall_regex = /^\d*\.?\d+$/;
var start_annual_rainfall_format_S = "Annual Rainfall minimum must have a decimal value.";

var end_annual_rainfall_regex = /^\d*\.?\d+$/;
var end_annual_rainfall_format_S = "Annual Rainfall maximum must have a decimal value.";

var sole_access_route_regex = /^.+$/;
var sole_access_route_format_S = "Sole Access Route must have a value.";

var fixes_present_regex = /^.+$/;
var fixes_present_format_S = "Mitigation Present must have a value.";

//make sure that the calculations entered manually don't exceed the permitted values

var prelim_landslide_road_width_affected_regex = /^\d+$/;
var prelim_landslide_road_width_affected_format_S = "Field A must have an integer value between 0 and 100.";

var prelim_landslide_slide_erosion_effects_regex = /^\d+$/;
var prelim_landslide_slide_erosion_effects_format_S = "Field B must have an integer value between 0 and 100.";

var prelim_landslide_length_affected_regex = /^\d+$/;
var prelim_landslide_length_affected_format_S = "Field C must have an integer value between 0 and 100.";

var prelim_rockfall_ditch_eff_regex = /^\d+$/;
var prelim_rockfall_ditch_eff_format_S = "Field D must have an integer value between 0 and 100.";

var prelim_rockfall_rockfall_history_regex = /^\d+$/;
var prelim_rockfall_rockfall_history_format_S = "Field E must have an integer value between 0 and 100.";

var prelim_rockfall_block_size_event_vol_regex = /^\d+$/;
var prelim_rockfall_block_size_event_vol_format_S = "Field F must have an integer value between 0 and 100.";

var impact_on_use_regex = /^\d+$/;
var impact_on_use_format_S = "Field G must have an integer value between 0 and 100.";

var aadt_usage_regex = /^\d+$/;
var aadt_usage_format_S = "Field H must have an integer value between 0 and 100.";

var slope_drainage_regex = /^\d+$/;
var slope_drainage_format_S = "Field I must have an integer value between 0 and 100.";

var hazard_rating_annual_rainfall_regex = /^\d+$/;
var hazard_rating_annual_rainfall_format_S = "Field J must have an integer value between 0 and 100.";

var hazard_rating_slope_height_axial_length_regex = /^\d+$/;
var hazard_rating_slope_height_axial_length_format_S = "Field K must have an integer value between 0 and 100.";

var hazard_landslide_thaw_stability_regex = /^\d+$/;
var hazard_landslide_thaw_stability_format_S = "Field L must have an integer value between 0 and 100.";

var hazard_landslide_maint_frequency_regex = /^\d+$/;
var hazard_landslide_maint_frequency_format_S = "Field M must have an integer value between 0 and 100.";

var hazard_landslide_movement_history_regex = /^\d+$/;
var hazard_landslide_movement_history_format_S = "Field N must have an integer value between 0 and 100.";

var hazard_rockfall_maint_frequency_regex = /^\d+$/;
var hazard_rockfall_maint_frequency_format_S = "Field O must have an integer value between 0 and 100.";

var case_one_struc_cond_regex = /^\d+$/;
var case_one_struc_cond_format_S = "Field P must have an integer value between 0 and 100.";

var case_one_rock_friction_regex = /^\d+$/;
var case_one_rock_friction_format_S = "Field Q must have an integer value between 0 and 100.";

var case_two_struc_condition_regex = /^\d+$/;
var case_two_struc_condition_format_S = "Field R must have an integer value between 0 and 100.";

var case_two_diff_erosion_regex = /^\d+$/;
var case_two_diff_erosion_format_S = "Field S must have an integer value between 0 and 100.";

var route_trail_width_regex = /^\d+$/;
var route_trail_width_format_S = "Field V must have an integer value between 0 and 100.";

var human_ex_factor_regex = /^\d+$/;
var human_ex_factor_format_S = "Field W must have an integer value between 0 and 100.";

var percent_dsd_regex = /^\d+$/;
var percent_dsd_format_S = "Field X must have an integer value between 0 and 100.";

var r_w_impacts_regex = /^\d+$/;
var r_w_impacts_format_S = "Field Y must have an integer value between 0 and 100.";

var enviro_cult_impacts_regex = /^\d+$/;
var enviro_cult_impacts_format_S = "Field Z must have an integer value between 0 and 100.";

var maint_complexity_regex = /^\d+$/;
var maint_complexity_format_S = "Field AA must have an integer value between 0 and 100.";

var event_cost_regex = /^\d+$/;

var event_cost_format_S = "Field BB must have an integer value between 0 and 100.";



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
				//hazard_type
				let dataHazardType = realm.objects('HAZARD_LINK').filtered('id='+ parseInt(offSites[0].hazardType));
				if(dataHazardType.length>0){
					realm.delete(dataHazardType);
				}
				//photos	
				let photos = realm.objects('PHOTOS').filtered('id='+ parseInt(siteId));
				if(photos.length>0){
					realm.delete(photos);	
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
  validateForm(){

  	var err = "";
	let offSites = realm.objects('SITE_INFORMATION').filtered('id='+parseInt(this.state.siteId));
	if(offSites.length>0){

	let dataHazardType = realm.objects('HAZARD_LINK').filtered('id='+ parseInt(offSites[0].hazardType));
	
	//alert(offSites[0].preliminaryRatingLandslideId +". "+offSites[0].preliminaryRatingRockfallId)
	
	//LANDSLIDE_PRILIMINARY_RATING
if(offSites[0].preliminaryRatingLandslideId > 0){
	let dataPrelimLandslideRating = realm.objects('LANDSLIDE_PRILIMINARY_RATING').filtered('id='+ parseInt(offSites[0].preliminaryRatingLandslideId));
	//prelim landslide data
	if(dataPrelimLandslideRating.length>0){
		var roadWidthAffected = dataPrelimLandslideRating[0].roadWidthAffected;
		var slideErosionEffects = dataPrelimLandslideRating[0].slideErosionEffects;
		var lengthAffected = dataPrelimLandslideRating[0].lengthAffected;
	
	}else{
		var roadWidthAffected = 0;
		var slideErosionEffects = 0;
		var lengthAffected = 0;
	
	}
	
	//prelim rockfall data
	var ditchEff = 0;
	var rockfallHistory = 0;
	var blockSizeEventVol = 0;
	
	//ROCKFALL_PRILIMINARY_RATING
	let dataHazardLandslideRating = realm.objects('LANDSLIDE_HAZARD_RATING').filtered('id='+ parseInt(offSites[0].hazardRatingLandslideId));
	//hazard rating landslide fields
	if(dataHazardLandslideRating.length>0){
		var thawStability = dataHazardLandslideRating[0].thawStability;
		var maintFrequency = dataHazardLandslideRating[0].maintFrequency;
		var movementHistory = dataHazardLandslideRating[0].movementHistory;
		
	}else{
		var thawStability = 0;
		var maintFrequency = 0;
		var movementHistory = 0;
	
	}
	
	//hazard rating rockfall fields
	var rockfallMaintFrequency = 0;
	var strucCond = 0;
	var rockFriction = 0;
	var strucCondition = 0;
	var diffErosion = 0;
}

//ROCKFALL_PRILIMINARY_RATING
if(offSites[0].preliminaryRatingRockfallId > 0){
	
	let dataPrelimRockfallRating = realm.objects('ROCKFALL_PRILIMINARY_RATING').filtered('id='+ parseInt(offSites[0].preliminaryRatingRockfallId));
	//prelim landslide data
	var roadWidthAffected = 0;
	var slideErosionEffects = 0;
	var lengthAffected = 0;
	
	//prelim rockfall data
	if(dataPrelimRockfallRating.length>0){
		var ditchEff = dataPrelimRockfallRating[0].ditchEff;
		var rockfallHistory = dataPrelimRockfallRating[0].rockfallHistory;
		var blockSizeEventVol = dataPrelimRockfallRating[0].blockSizeEventVol;
	
	}else{
		var ditchEff = 0;
		var rockfallHistory = 0;
		var blockSizeEventVol = 0;
	
	}
	
	//dataHazardRockfallRating
	let dataHazardRockfallRating = realm.objects('ROCKFALL_HAZARD_RATING').filtered('id='+ parseInt(offSites[0].hazardRatingRockfallId));
	//hazard rating landslide fields
	var thawStability = 0;
	var maintFrequency = 0;
	var movementHistory = 0;
	
	//hazard rating rockfall fields
	if(dataHazardRockfallRating.length>0){
		var rockfallMaintFrequency = dataHazardRockfallRating[0].maintFrequency;
		var strucCond = dataHazardRockfallRating[0].caseOneStrucCond;
		var rockFriction = dataHazardRockfallRating[0].caseOneRockFriction;
		var strucCondition = dataHazardRockfallRating[0].caseTwoStrucCondition;
		var diffErosion = dataHazardRockfallRating[0].caseTwoDiffErosion;
		
	}else{
		var rockfallMaintFrequency = 0;
		var strucCond = 0;
		var rockFriction = 0;
		var strucCondition = 0;
		var diffErosion = 0;
		
	}
}	
if(offSites[0].preliminaryRatingLandslideId > 0 || offSites[0].preliminaryRatingRockfallId > 0){

  	if(offSites[0].umbrellaAgency.match(umbrella_agency_regex) === null){
  		err += umbrella_agency_format_S+'\n';//.concat("<br/>");
  		//$("#umbrella_agency").css("background-color", "red");
  	}

  	if(offSites[0].regionalAdmin.match(regional_admin_regex) === null){
  		err += regional_admin_format_S+'\n';//.concat("<br/>");
  		//$("#regional_admin").css("background-color", "red");
  	}

  	if(offSites[0].localAdmin.match(local_admin_regex) === null){
  		err += local_admin_format_S+'\n';//.concat("<br/>");
  		//$("#local_admin").css("background-color", "red");
  	}

  	if(offSites[0].date.match(date_regex) === null){
		//alert(this.state.date);
  		err += date_format_S+'\n';//.concat("<br/>");
  		//$("#date").css("background-color", "red");
  	}

  	if(offSites[0].rtNo.match(road_trail_number_regex) === null){
  		err += road_trail_number_format_S+'\n';//.concat("<br/>");
  		//$("#road_trail_number").css("background-color", "red");
  	}

  	if(offSites[0].roadOrTrail.match(road_or_trail_regex) === null){
  		err += road_or_trail_format_S+'\n';//.concat("<br/>");
  		//$("#road_or_trail").css("background-color", "red");
  	}

  	if(offSites[0].rtClass.match(road_trail_class_regex) === null){
  		err += road_trail_class_format_S+'\n';//.concat("<br/>");
  		//$("#road_trail_class").css("background-color", "red");
  	}

  	if(offSites[0].rater.match(rater_regex) === null){
  		err += rater_format_S+'\n';//.concat("<br/>");
  		//$("#rater").css("background-color", "red");
  	}
	//alert(offSites[0].beginMileMarker.toFixed(2))

  	if(offSites[0].beginMileMarker.toFixed(5).match(begin_mile_marker_regex) === null){
  		err += begin_mile_marker_format_S+'\n';//.concat("<br/>");
  		//$("#begin_mile_marker").css("background-color", "red");
  	}

  	if(offSites[0].endMileMarker.toFixed(5).match(end_mile_marker_regex) === null){
  		err += end_mile_marker_format_S+'\n';//.concat("<br/>");
  		//$("#end_mile_marker").css("background-color", "red");
  	}

  	if(offSites[0].side.match(side_regex) === null){
  		err += side_format_S+'\n';//.concat("<br/>");
  		//$("#side").css("background-color", "red");
  	}

  	if(offSites[0].weather.match(weather_regex) === null){
  		err += weather_format_S+'\n';//.concat("<br/>");
  		//$("#weather").css("background-color", "red");
  	}
		
  	if(dataHazardType.length == 0){
  		err += hazard_type_format_S+'\n';//.concat("<br/>");
  		//$("#hazard_type").css("background-color", "red");
  	}
//	alert(offSites[0].beginCoordinateLatitude.toFixed(5))

    if(offSites[0].beginCoordinateLatitude.toFixed(5).match(begin_coordinate_latitude_regex) === null){
  		err += begin_coordinate_latitude_format_S+'\n';//.concat("<br/>");
  		//$("#begin_coordinate_latitude").css("background-color", "red");
  	}

	if(offSites[0].beginCoordinateLongitude.toFixed(5).match(begin_coordinate_longitude_regex) === null){
  		err += begin_coordinate_longitude_format_S+'\n';//.concat("<br/>");
  		//$("#begin_coordinate_longitude").css("background-color", "red");
  	}

  	if(offSites[0].endCoordinateLatitude.toFixed(5).match(end_coordinate_latitude_regex) === null){
  		err += end_coordinate_latitude_format_S+'\n';//.concat("<br/>");
  		//$("#end_coordinate_latitude").css("background-color", "red");
  	}

  	if(offSites[0].endCoordinateLongitude.toFixed(5).match(end_coordinate_longitude_regex) === null){
  		err += end_coordinate_longitude_format_S+'\n';//.concat("<br/>");
  		//$("#end_coordinate_longitude").css("background-color", "red");
  	}
	//alert(offSites[0].aadt)
//var aadt = parseInt(offSites[0].aadt);

  	if(offSites[0].aadt.toFixed(0).match(aadt_regex) === null){
  		err += aadt_format_S+'\n';//.concat("<br/>");
  		//$("#aadt").css("background-color", "red");
  	}

  	if(offSites[0].lengthAffected.toFixed(5).match(length_affected_regex) === null){
  		err += length_affected_format_S+'\n';//.concat("<br/>");
  		//$("#length_affected").css("background-color", "red");
  	}

  	if(offSites[0].slopeHeightAxialLength.toFixed(5).match(slope_height_axial_length_regex) === null){
  		err += slope_height_axial_length_format_S+'\n';//.concat("<br/>");
  		//$("#slope_height_axial_length").css("background-color", "red");
  	}

  	if(offSites[0].slopeAngle.toFixed(0).match(slope_angle_regex) === null){
  		err += slope_angle_format_S+'\n';//.concat("<br/>");
  		//$("#slope_angle").css("background-color", "red");
  	}

  	if(offSites[0].sightDistance.toFixed(5).match(sight_distance_regex) === null){
  		err += sight_distance_format_S+'\n';//.concat("<br/>");
  		//$("#sight_distance").css("background-color", "red");
  	}

  	if(offSites[0].roadTrailWidth.toFixed(5).match(road_trail_width_regex) === null){
  		err += road_trail_width_format_S+'\n';//.concat("<br/>");
  		//$("#road_trail_width").css("background-color", "red");
  	}

  	if(offSites[0].speedLimit.toFixed(0).match(speed_limit_regex) === null){
  		err += speed_limit_format_S+'\n';//.concat("<br/>");
  		//$("#speed_limit").css("background-color", "red");
  	}

  	if(offSites[0].minimumDitchWidth.toFixed(5).match(minimum_ditch_width_regex) === null){
  		err += minimum_ditch_width_format_S+'\n';//.concat("<br/>");
  		//$("#minimum_ditch_width").css("background-color", "red");
  	}

  	if(offSites[0].maximumDitchWidth.toFixed(5).match(maximum_ditch_width_regex) === null){
  		err += maximum_ditch_width_format_S+'\n';//.concat("<br/>");
  		//$("#maximum_ditch_width").css("background-color", "red");
  	}

  	if(offSites[0].minimumDitchDepth.toFixed(5).match(minimum_ditch_depth_regex) === null){
  		err += minimum_ditch_depth_format_S+'\n';//.concat("<br/>");
  		//$("#minimum_ditch_depth").css("background-color", "red");
  	}

  	if(offSites[0].maximumDitchDepth.toFixed(5).match(maximum_ditch_depth_regex) === null){
  		err += maximum_ditch_depth_format_S+'\n';//.concat("<br/>");
  		//$("#maximum_ditch_depth").css("background-color", "red");
  	}
		
  	if(offSites[0].firstBeginDitchSlope.toFixed(0).match(first_begin_ditch_slope_regex) === null){
  		err += first_begin_ditch_slope_format_S+'\n';//.concat("<br/>");
  		//$("#first_begin_ditch_slope").css("background-color", "red");
  	}

  	if(offSites[0].firstEndDitchSlope.toFixed(0).match(first_end_ditch_slope_regex) === null){
  		err += first_end_ditch_slope_format_S+'\n';//.concat("<br/>");
  		//$("#first_end_ditch_slope").css("background-color", "red");
  	}

  	if(offSites[0].secondBeginDitchSlope.toFixed(0).match(second_begin_ditch_slope_regex) === null){
  		err += second_begin_ditch_slope_format_S+'\n';//.concat("<br/>");
  		//$("#second_begin_ditch_slope").css("background-color", "red");
  	}

  	if(offSites[0].secondEndDitchSlope.toFixed(0).match(second_end_ditch_slope_regex) === null){
  		err += second_end_ditch_slope_format_S+'\n';//.concat("<br/>");
  		//$("#second_end_ditch_slope").css("background-color", "red");
  	}

  	if(offSites[0].blkSize.toFixed(5).match(blk_size_regex) === null && offSites[0].volume.toFixed(5).match(volume_regex) === null){
  		err += blk_volume_format_S+'\n';//.concat("<br/>");
		//err += blk_size_format_S+'\n';//.concat("<br/>");
  		//$("#blk_size").css("background-color", "red");
  	}

  	//if(offSites[0].volume.toFixed(5).match(volume_regex) === null){
  	//	err += volume_format_S+'\n';//.concat("<br/>");
  		//$("#volume").css("background-color", "red");
		//}

  	if(offSites[0].startAnnualRainfall.toFixed(5).match(start_annual_rainfall_regex) === null){
  		err += start_annual_rainfall_format_S+'\n';//.concat("<br/>");
  		//$("#start_annual_rainfall").css("background-color", "red");
  	}

  	if(offSites[0].endAnnualRainfall.toFixed(5).match(end_annual_rainfall_regex) === null){
  		err += end_annual_rainfall_format_S+'\n';//.concat("<br/>");
  		//$("#end_annual_rainfall").css("background-color", "red");
  	}

  	if(offSites[0].soleAccessRoute.match(sole_access_route_regex) === null){
  		err += sole_access_route_format_S+'\n';//.concat("<br/>");
  		//$("#sole_access_route").css("background-color", "red");
  	}

  	if(offSites[0].fixesPresent.match(fixes_present_regex) === null){
  		err += fixes_present_format_S+'\n';//.concat("<br/>");
  		//$("#fixes_present").css("background-color", "red");
  	}

  	if(roadWidthAffected.toFixed(0).match(prelim_landslide_road_width_affected_regex) === null){
  		err += prelim_landslide_road_width_affected_format_S+'\n';//.concat("<br/>");
  		//$("#prelim_landslide_road_width_affected").css("background-color", "red");
	}

  	if(slideErosionEffects.toFixed(0).match(prelim_landslide_slide_erosion_effects_regex) === null){
  		err += prelim_landslide_slide_erosion_effects_format_S+'\n';//.concat("<br/>");
  		//$("#prelim_landslide_slide_erosion_effects").css("background-color", "red");
  	}

  	if(lengthAffected.toFixed(0).match(prelim_landslide_length_affected_regex) === null){
  		err += prelim_landslide_length_affected_format_S+'\n';//.concat("<br/>");
  		//$("#prelim_landslide_length_affected").css("background-color", "red");
  	}

  	if(ditchEff.toFixed(0).match(prelim_rockfall_ditch_eff_regex) === null){
  		err += prelim_rockfall_ditch_eff_format_S+'\n';//.concat("<br/>");
  		//$("#prelim_rockfall_ditch_eff").css("background-color", "red");
  	}

  	if(rockfallHistory.toFixed(0).match(prelim_rockfall_rockfall_history_regex) === null){
  		err += prelim_rockfall_rockfall_history_format_S+'\n';//.concat("<br/>");
  		//$("#prelim_rockfall_rockfall_history").css("background-color", "red");
  	}

  	if(blockSizeEventVol.toFixed(0).match(prelim_rockfall_block_size_event_vol_regex) === null){
  		err += prelim_rockfall_block_size_event_vol_format_S+'\n';//.concat("<br/>");
  		//$("#prelim_rockfall_block_size_event_vol").css("background-color", "red");
  	}

  	if(offSites[0].impactOnUse.toFixed(0).match(impact_on_use_regex) === null){
  		err += impact_on_use_format_S+'\n';//.concat("<br/>");
  		//$("#impact_on_use").css("background-color", "red");
  	}

  	if(offSites[0].aadtUsage.toFixed(0).match(aadt_usage_regex) === null){
  		err += aadt_usage_format_S+'\n';//.concat("<br/>");
  		//$("#aadt_usage").css("background-color", "red");
  	}

  	if(offSites[0].slopeDrainage.toFixed(0).match(slope_drainage_regex) === null){
  		err += slope_drainage_format_S+'\n';//.concat("<br/>");
  		//$("#slope_drainage").css("background-color", "red");
  	}

  	if(offSites[0].hazardRatingAnnualRainfall.toFixed(0).match(hazard_rating_annual_rainfall_regex) === null){
  		err += hazard_rating_annual_rainfall_format_S+'\n';//.concat("<br/>");
  		//$("#hazard_rating_annual_rainfall").css("background-color", "red");
  	}

  	if(offSites[0].hazardRatingSlopeHeightAxialLength.toFixed(0).match(hazard_rating_slope_height_axial_length_regex) === null){
  		err += hazard_rating_slope_height_axial_length_format_S+'\n';//.concat("<br/>");
  		//$("#hazard_rating_slope_height_axial_length").css("background-color", "red");
  	}

  	if(thawStability.toFixed(0).match(hazard_landslide_thaw_stability_regex) === null){
  		err += hazard_landslide_thaw_stability_format_S+'\n';//.concat("<br/>");
  		//$("#hazard_landslide_thaw_stability").css("background-color", "red");
  	}

  	if(maintFrequency.toFixed(0).match(hazard_landslide_maint_frequency_regex) === null){
  		err += hazard_landslide_maint_frequency_format_S+'\n';//.concat("<br/>");
  		//$("#hazard_landslide_maint_frequency").css("background-color", "red");
  	}

  	if(movementHistory.toFixed(0).match(hazard_landslide_movement_history_regex) === null){
  		err += hazard_landslide_movement_history_format_S+'\n';//.concat("<br/>");
  		//$("#hazard_landslide_movement_history").css("background-color", "red");
  	}
	
  	if(rockfallMaintFrequency.toFixed(0).match(hazard_rockfall_maint_frequency_regex) === null){
  		err += hazard_rockfall_maint_frequency_format_S+'\n';//.concat("<br/>");
  		//$("#hazard_rockfall_maint_frequency").css("background-color", "red");
  	}

  	if(strucCond.toFixed(0).match(case_one_struc_cond_regex) === null){
  		err += case_one_struc_cond_format_S+'\n';//.concat("<br/>");
  		//$("#case_one_struc_cond").css("background-color", "red");
  	}

  	if(rockFriction.toFixed(0).match(case_one_rock_friction_regex) === null){
  		err += case_one_rock_friction_format_S+'\n';//.concat("<br/>");
  		//$("#case_one_rock_friction").css("background-color", "red");
  	}

  	if(strucCondition.toFixed(0).match(case_two_struc_condition_regex) === null){
  		err += case_two_struc_condition_format_S+'\n';//.concat("<br/>");
  		//$("#case_two_struc_condition").css("background-color", "red");
  	}

  	if(diffErosion.toFixed(0).match(case_two_diff_erosion_regex) === null){
  		err += case_two_diff_erosion_format_S+'\n';//.concat("<br/>");
  		//$("#case_two_diff_erosion").css("background-color", "red");
  	}

  	if(offSites[0].routeTrailWidth.toFixed(0).match(route_trail_width_regex) === null){
  		err += route_trail_width_format_S+'\n';//.concat("<br/>");
  		//$("#route_trail_width").css("background-color", "red");
  	}

  	if(offSites[0].humanExFactor.toFixed(0).match(human_ex_factor_regex) === null){
  		err += human_ex_factor_format_S+'\n';//.concat("<br/>");
  		//$("#human_ex_factor").css("background-color", "red");
  	}

  	if(offSites[0].percentDsd.toFixed(0).match(percent_dsd_regex) === null){
  		err += percent_dsd_format_S+'\n';//.concat("<br/>");
  		//$("#percent_dsd").css("background-color", "red");
  	}

  	if(offSites[0].rWImpacts.toFixed(0).match(r_w_impacts_regex) === null){
  		err += r_w_impacts_format_S+'\n';//.concat("<br/>");
  		//$("#r_w_impacts").css("background-color", "red");
  	}

  	if(offSites[0].enviroCultImpacts.toFixed(0).match(enviro_cult_impacts_regex) === null){
  		err += enviro_cult_impacts_format_S+'\n';//.concat("<br/>");
  		//$("#enviro_cult_impacts").css("background-color", "red");
  	}

  	if(offSites[0].maintComplexity.toFixed(0).match(maint_complexity_regex) === null){
  		err += maint_complexity_format_S+'\n';//.concat("<br/>");
  		//$("#maint_complexity").css("background-color", "red");
  	}

  	if(offSites[0].eventCost.toFixed(0).match(event_cost_regex) === null){
  		err += event_cost_format_S+'\n';//.concat("<br/>");
  		//$("#event_cost").css("background-color", "red");
  	}
	  
}else{
	err +="Sorry, This form cannot be submitted to the database, because it is filled with wrong format of data. Please create a new slope rating form.";
}
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
	
  editSite =(data)=>{
		//alert(data);
		this.props.navigation.navigate('EditSite',data)
	};
	
  serverSave(){
	let offSites = realm.objects('SITE_INFORMATION').filtered('id='+parseInt(this.state.siteId));
	//Alert.alert(""+offSites[0].id);
	
	//for(let i = 0; i<1;i++){
		let fd = new FormData();
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
		
		//flag for offline sites
		fd.append("offline_site", "1");
		//space for files or images
		let images = realm.objects('PHOTOS').filtered('id='+ parseInt(offSites[0].id));
		var dataImage = [];
		for(let i=0;i<images.length;i++){
			dataImage.push(images[i].photo);
			var name = dataImage[i].slice(dataImage[i].lastIndexOf("/")+1,dataImage[i].length);
			//alert(dataImage[i]+"name: "+name);
			
			fd.append("file[]", {uri:'file://'+dataImage[i], name: name, type: 'image/jpg', isStatic: true});
			
		}
		
		//	
		//usmp.info	
		//https://nl.cs.montana.edu/test_sites/prashanta.saha/server/new_site_php/add_new_site.php
		//https://nl.cs.montana.edu/test_sites/prashanta.saha/server/new_slope_form.php
		
		fetch("https://usmp.info/server/new_site_php/add_new_site.php", {
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
				 // alert(error)
			  alert("Submission to server database failed.")
		         // console.error(error);
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
			this.props.navigation.navigate('userLogin',{site:1})
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
		style={{marginTop:20,marginRight:Dimensions.get('window').width*0.3,color:'white'}}  
		size={40} backgroundColor="#3b5998" 
		onPress={() => this.props.navigation.navigate('DrawerOpen')}>
 		</Icon>
 		<Text 
		style={styles.headerText}
		onPress={() => this.props.navigation.navigate('DrawerOpen')}
		>
		Offline Saved Sites
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
