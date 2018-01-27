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
	Picker,
	Item,
	Switch,	
	Dimensions,
	FlatList,
	SectionList,
	H1,
	ListItem,
	 findNodeHandle,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import SelectMultiple from 'react-native-select-multiple';
import Table from 'react-native-simple-table';
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/Entypo';
import realm from './realm';
import {dataRegion,dataLocal,dataSide,dataWeather,dataYesNo} from './agencyInfo.js';
import Upload from '../components/Upload';

const columns = [
  {
    title: 'Category Ratings',
    dataIndex: 'cat',
    width: 75
  },
  {
    title: '3',
    dataIndex: '3',
    width: 75
  },
  {
    title: '9',
    dataIndex: '9',
	 width: 75
  },
  {
    title: '27',
    dataIndex: '27',
	  width: 75
  },
  {
    title: '81',
    dataIndex: '81',
	  width: 75
  },
];
 
const rockfallLandslide = [
  {label: 'Rockfall', value: 'rockfall' },
  {label: 'Landslide', value: 'landslide' }
];
const hazardType = [
   { label: 'Planar', value: '1' },
   { label: 'Wedge', value: '2' },
   { label: 'Toppling', value: '3' },
    { label: 'Raveling/Undermining', value: '4' },
    { label: 'Rock Avalanche', value: '5' },
    { label: 'Indeterminate Rock Failures', value: '6' },
    { label: 'Diff. Erosion', value: '7' },
    { label: 'Translational', value: '8' },
    { label: 'Rotational', value: '9' },
    { label: 'Debris Flow', value: '10' },
    { label: 'Shallow Slump', value: '11' },
    { label: 'Erosional Failure', value: '12' },
 ];
 const roadOrTrail = [
   {label: 'R', value: 'R' },
   {label: 'T', value: 'T' }
 ];
 
 const formSourceA = [
   {value: '3', label: '3 : 0-5%'},
   {value: '9', label: '9 : 6-25%'},
   {value: '27', label: '27 : 26-50%'},
   {value: '81', label: '81 : 51-100%'}
 ];
 
 const formSourceB = [
   {value: '3', label: '3 : Visible crack or slight deposit of material / minor erosion'},
   {value: '9', label: '9 : 1 inch offset, or 6-inch deposit of material / major erosion will affect travel in < 5 years'},
   {value: '27', label: '27 : 2-inch offset or 12-inch deposit / mod. erosion impacting travel annually'},
   {value: '81', label: '81 : 4-inch offset or 24-inch deposit / severe erosion impacting travel consistently'}
 ];
 
 const formSourceC = [
   {value: '3', label: '3 : 25 ft'},
   {value: '9', label: '9 : 100 ft'},
   {value: '27', label: '27 : 225 ft'},
   {value: '81', label: '81 : 400 ft'}
 ];
 
 const formSourceD = [
   {value: '3', label: '3 : Good'},
   {value: '9', label: '9 : Moderate'},
   {value: '27', label: '27 : Limited'},
   {value: '81', label: '81 : No Catchment'}
 ];
 
 const formSourceE = [
   {value: '3', label: '3 : Few Falls'},
   {value: '9', label: '9 : Occasional Falls'},
   {value: '27', label: '27 : Many Falls'},
   {value: '81', label: '81 : Constant Falls'}
 ];
 
 const formSourceF = [
   {value: '3', label: '3 : 1ft or 3yd^3'},
   {value: '9', label: '9 : 2ft or 6yd^3'},
   {value: '27', label: '27 : 3ft or 9yd^3'},
   {value: '81', label: '81 : 4ft or 12yd^3'}
 ];
 
 const formSourceG = [
   {value: '3', label: '3 : Full use continues with minor delay'},
   {value: '9', label: '9 : Partial use remains Use modification required, short (3mi / 30min.) detour available'},
   {value: '27', label: '27 : Use is blocked - long (>30min.) detour available or less than 1 day closure'},
   {value: '81', label: '81 : Use is blocked - no detour available or closure longer than 1 week'}
 ];
 
 const formSourceH = [
   {value: '3', label: '3 : 50 Rarely Used Insignificant economic / rec. importance'},
   {value: '9', label: '9 : 200 Occasionally used Minor economic / rec. importance'},
   {value: '27', label: '27 : 450 Frequently used Moderate economic / rec. importance'},
   {value: '81', label: '81 : 800 Constantly used Significant economic / rec. importance'}
 ];
 
 const formSourceI = [
   {value: '3', label: '3 : Slope appears dry or well drained; surface runoff well controlled'},
   {value: '9', label: '9 : Intermittent water on slope; mod. well drained; or surface runoff moderately controlled'},
   {value: '27', label: '27 : Water usually on slope; poorly drained; or surface runoff poorly controlled'},
   {value: '81', label: '81 : Water always on slope; very poorly drained; or surface water runoff control not present'}
 ];
 
 const formSourceJ = [
   {value: '3', label: '3 : 0-10"'},
   {value: '9', label: '9 : 10-30"'},
   {value: '27', label: '27 : 30-60"'},
   {value: '81', label: '81 : 60"+'}
 ];
 
 const formSourceK = [
   {value: '3', label: '3 : 25ft'},
   {value: '9', label: '9 : 50ft'},
   {value: '27', label: '27 : 75ft'},
   {value: '81', label: '81 : 100ft'}
 ];
 
 const formSourceL = [
   {value: '3', label: '3 : Unfrozen / Thaw Stable'},
   {value: '9', label: '9 : Slightly Thaw Unstable'},
   {value: '27', label: '27 : Moderately Thaw Unstable'},
   {value: '81', label: '81 : Highly Thaw Unstable'}
 ];
 
 const formSourceM = [
   {value: '3', label: '3 : Every 10 years'},
   {value: '9', label: '9 : Every 5 years'},
   {value: '27', label: '27 : Every 2 years'},
   {value: '81', label: '81 : Every year'}
 ];
 
 const formSourceN = [
   {value: '3', label: '3 : Minor movement or sporadic creep'},
   {value: '9', label: '9 : Up to 1 inch annually or steady annual creep'},
   {value: '27', label: '27 : Up to 3 inches per event, one event per year'},
   {value: '81', label: '81 : >3" per event, >6" annually, more than 1 event per year (includes all debris flows)'}
 ];
 
 const formSourceO = [
   {value: '3', label: '3 : Normal, scheduled maintenance'},
   {value: '9', label: '9 : Patrols after every storm event'},
   {value: '27', label: '27 : Routine seasonal patrols'},
   {value: '81', label: '81 : Year round patrols'}
 ];
 
 const formSourceP = [
   {value: '3', label: '3 : favorable'},
   {value: '9', label: '9 : random'},
   {value: '27', label: '27 : Discontinuous adverse'},
   {value: '81', label: '81 : Continuous adverse'}
 ];
 
 const formSourceQ = [
   {value: '3', label: '3 : Rough / Irregular'},
   {value: '9', label: '9 : Undulating'},
   {value: '27', label: '27 : Planar'},
   {value: '81', label: '81 : Clay infilled / Slickensided'}
 ];

 const formSourceR = [
   {value: '3', label: '3 : Few differential erosion features'},
   {value: '9', label: '9 : Occasional differential erosion features'},
   {value: '27', label: '27 : Many differential erosion features'},
   {value: '81', label: '81 : Major differential erosion features'}
 ];
 
 const formSourceS = [
   {value: '3', label: '3 : Small difference'},
   {value: '9', label: '9 : Moderate difference'},
   {value: '27', label: '27 : Large difference'},
   {value: '81', label: '81 : Extreme difference'}
 ];
 
 const formSourceV = [
   {value: '3', label: '3 : 36ft 14ft'},
   {value: '9', label: '9 : 28ft 10ft'},
   {value: '27', label: '27 : 20ft 6ft'},
   {value: '81', label: '81 : 12ft 2ft'}
 ];
 
 const formSourceW = [
   {value: '3', label: '3 : 12.5% of the time'},
   {value: '9', label: '9 : 25% of the time'},
   {value: '27', label: '27 : 37.5% of the time'},
   {value: '81', label: '81 : 50% of the time'}
 ];
 
 const formSourceX = [
   {value: '3', label: '3 : Adequate, 100% of the low design value'},
   {value: '9', label: '9 : Moderate, 80% of the low design value'},
   {value: '27', label: '27 : Limited, 60% of the low design value'},
   {value: '81', label: '81 : Very limited, 40% of the low design value'}
 ];
 
 const formSourceY = [
   {value: '3', label: '3 : No R/W implications'},
   {value: '9', label: '9 : Minor effects beyond R/W'},
   {value: '27', label: '27 : Private property, no structures affected'},
   {value: '81', label: '81 : Structures, roads, RR, utilities, or Parks affected'}
 ];
 
 const formSourceZ = [
   {value: '3', label: '3 : None/No Potential to Cause Effects'},
   {value: '9', label: '9 : Likely to Effect/No Hist. Prop. Affected'},
   {value: '27', label: '27 : Likely to adversely Affect/Finding of No Adverse Effect'},
   {value: '81', label: '81 : Current adverse effects/Adverse Effect'}
 ];
 
 const formSourceAA = [
   {value: '3', label: '3 : Routine Effort / In-House'},
   {value: '9', label: '9 : In-House maint. / special project'},
   {value: '27', label: '27 : Specialized equip. / contracts'},
   {value: '81', label: '81 : Complex / dangerous effort / location / contract'}
 ];

 const formSourceBB = [
   {value: '3', label: '3 : $0-2k'},
   {value: '9', label: '9 : $2-25k'},
   {value: '27', label: '27 : $25-100k'},
   {value: '81', label: '81 : $100k'}
 ];
 

 //var mgmt_area_regex = /^.{1,120}$/;
 //var mgmt_area_format_S = "Management Area cannot be empty and must be shorter than 120 characters.";

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
 var end_mile_marker_format_S = "Ending Mile Marker must have a decimal value.";

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
 var begin_coordinate_longitude_format_S = "Beginning Coordinate Longitude format must match '-##.#####'.";

 var end_coordinate_latitude_regex = /^\d+\.\d+$/;
 var end_coordinate_latitude_format_S = "End Coordinate Latitude format must match '##.#####'.";

 var end_coordinate_longitude_regex = /^-\d+\.\d+$/;
 var end_coordinate_longitude_format_S = "End Coordinate Longitude format must match '-##.#####'.";

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

 var first_begin_ditch_slope_regex = /^\d*\.?\d+$/;
 var first_begin_ditch_slope_format_S = "Ditch Slope first begin must have a decimal value.";

 var first_end_ditch_slope_regex = /^\d*\.?\d+$/;
 var first_end_ditch_slope_format_S = "Ditch Slope first end must have a decimal value.";

 var second_begin_ditch_slope_regex = /^\d*\.?\d+$/;
 var second_begin_ditch_slope_format_S = "Ditch Slope second begin must have a decimal value.";

 var second_end_ditch_slope_regex = /^\d*\.?\d+$/;
 var second_end_ditch_slope_format_S = "Ditch Slope second end must have a decimal value.";

 var blk_size_regex = /^\d*\.?\d+$/;
 var blk_size_format_S = "Blk Size must have a decimal value.";

 var volume_regex = /^\d*\.?\d+$/;
 var volume_format_S = "Volume must have a decimal value.";

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



export default class EditSite extends Component {

	constructor(props){
		
		super(props);
		//let data = realm.objects('SITE_INFORMATION').filtered('id='+parseInt(this.state.siteId));
		
		const data = this.props.navigation.state.params;
		//let data = realm.objects('SITE_INFORMATION').filtered('id='+parseInt(siteId));
		
		//rockfall landslide radio default
		var rockfallLandslide = 'rockfall';
		var rockLandKey = 0;
		//hazardlinks
		let dataHazardType = realm.objects('HAZARD_LINK').filtered('id='+ parseInt(data.hazardType));
		var dataHazardtype = [];
		//alert("comment"+dataHazardType[1].hazardLink)
		for(let i=0;i<dataHazardType.length;i++){
			dataHazardtype.push(dataHazardType[i].hazardLink.toString())
			//alert("comment"+dataHazardtype[i])
		}
		//alert("comment"+dataHazardtype.length)
		//comment
		let dataComment = realm.objects('COMMENTS').filtered('id='+ parseInt(data.comment));
		//let dataComments = realm.objects('COMMENTS');
		//let dataComment = realm.objects('COMMENTS').filtered('id='+34);
	
					//alert("comment"+dataComment[0].comment)
		//fmlaLink
		let dataFmla = realm.objects('FMLA_LINK').filtered('id='+ parseInt(data.fmla));
		
		//preliminary rock/landslide default
		var prelimLandslideRoadWidthAffected = 0;
		var	prelimLandslideSlideErosionEffects = 0;
		var	prelimLandslideLengthAffected = 0;
		var prelimRockfallDitchEff = 0;
		var prelimRockfallRockfallHistory = 0;
		var prelimRockfallBlockSizeEventVol = 0;
		var	prelimRatingLandslideTotal = 0;
		var	prelimRatingRockfallRotal = 0;
		
		if(data.preliminaryRatingLandslideId > 0){
			//LANDSLIDE_PRILIMINARY_RATING
			let dataPrelimLandslideRating = realm.objects('LANDSLIDE_PRILIMINARY_RATING').filtered('id='+ parseInt(data.preliminaryRatingLandslideId));
			if(dataPrelimLandslideRating.length>0){
			 	prelimLandslideRoadWidthAffected = dataPrelimLandslideRating[0].roadWidthAffected;
				prelimLandslideSlideErosionEffects = dataPrelimLandslideRating[0].slideErosionEffects;
				prelimLandslideLengthAffected = dataPrelimLandslideRating[0].lengthAffected;
				
			}
			 	
			  	prelimRatingLandslideTotal = isNaN(parseInt(prelimLandslideRoadWidthAffected)) ? 0 : parseInt(prelimLandslideRoadWidthAffected);
			  	prelimRatingLandslideTotal += isNaN(parseInt(prelimLandslideSlideErosionEffects)) ? 0 : parseInt(prelimLandslideSlideErosionEffects);
			  	prelimRatingLandslideTotal += isNaN(parseInt(prelimLandslideLengthAffected)) ? 0 : parseInt(prelimLandslideLengthAffected);
			  	prelimRatingLandslideTotal += isNaN(parseInt(data.impactOnUse)) ? 0 : parseInt(data.impactOnUse);
		  	  
			  	if(data.aadtUsageCalcCheckbox == true){
		    	  	prelimRatingLandslideTotal += isNaN(parseInt(data.aadtUsage)) ? 0 : parseInt(data.aadtUsage);
		  	  	}
			  	//prelimRatingLandslideTotal += isNaN(parseInt(data.aadtUsage)) ? 0 : parseInt(data.aadtUsage);
		
			
		}else{
			//ROCKFALL_PRILIMINARY_RATING
			let dataPrelimRockfallRating = realm.objects('ROCKFALL_PRILIMINARY_RATING').filtered('id='+ parseInt(data.preliminaryRatingRockfallId));
			if(dataPrelimRockfallRating.length>0){
				prelimRockfallDitchEff = dataPrelimRockfallRating[0].ditchEff;
				prelimRockfallRockfallHistory = dataPrelimRockfallRating[0].rockfallHistory;
				prelimRockfallBlockSizeEventVol = dataPrelimRockfallRating[0].blockSizeEventVol;
			
			}
			
	  	  	prelimRatingRockfallRotal = isNaN(parseInt(prelimRockfallDitchEff)) ? 0 : parseInt(prelimRockfallDitchEff);
	  	  	prelimRatingRockfallRotal += isNaN(parseInt(prelimRockfallRockfallHistory)) ? 0 : parseInt(prelimRockfallRockfallHistory);
	  	  	prelimRatingRockfallRotal += isNaN(parseInt(prelimRockfallBlockSizeEventVol)) ? 0 : parseInt(prelimRockfallBlockSizeEventVol);
	  	  	prelimRatingRockfallRotal += isNaN(parseInt(data.impactOnUse)) ? 0 : parseInt(data.impactOnUse);
			
		  	if(data.aadtUsageCalcCheckbox == true){
	    	  	prelimRatingRockfallRotal += isNaN(parseInt(data.aadtUsage)) ? 0 : parseInt(data.aadtUsage);
	  	  	}
			//alert(prelimRatingRockfallRotal);
	  	  	//prelimRatingRockfallRotal += isNaN(parseInt(data.aadtUsage)) ? 0 : parseInt(data.aadtUsage);
	
		
		}
		
		//hazard rock/landslide default
		var	hazardLandslideThawStability = 0;
		var	hazardLandslideMaintFrequency = 0;
		var	hazardLandslideMovementHistory = 0;
		var	hazardRockfallMaintFrequency = 0;
		var	caseOneStrucCond = 0;
		var	caseOneRockFriction = 0;
		var	caseTwoStrucCondition = 0;
		var	caseTwoDiffErosion = 0;
		var	hazardRatingLandslideTotal = 0;
		var	hazardRatingRockfallTotal = 0;
		
		if(data.hazardRatingLandslideId > 0){
			//ROCKFALL_PRILIMINARY_RATING
			let dataHazardLandslideRating = realm.objects('LANDSLIDE_HAZARD_RATING').filtered('id='+ parseInt(data.hazardRatingLandslideId));
			if(dataHazardLandslideRating.length>0){
				hazardLandslideThawStability = dataHazardLandslideRating[0].thawStability;
				hazardLandslideMaintFrequency = dataHazardLandslideRating[0].maintFrequency;
				hazardLandslideMovementHistory = dataHazardLandslideRating[0].movementHistory;
			
			}
			
  			hazardRatingLandslideTotal = parseInt(prelimLandslideRoadWidthAffected) 
			+ parseInt(prelimLandslideSlideErosionEffects)
  			+ parseInt(prelimLandslideLengthAffected) 
			+ parseInt(data.slopeDrainage) 
			+ parseInt(data.hazardRatingAnnualRainfall)
  			+ parseInt(data.hazardRatingSlopeHeightAxialLength) 
			+ parseInt(hazardLandslideThawStability) 
  			+ parseInt(hazardLandslideMaintFrequency) 
			+ parseInt(hazardLandslideMovementHistory) ;
			
			//alert("id "+parseInt(data.hazardRatingLandslideId)+" diff"+parseInt(caseTwoDiffErosion)+"  "+hazardRatingRockfallTotal);
		
			
		}else{
			//ROCKFALL_HAZARD_RATING
			let dataHazardRockfallRating = realm.objects('ROCKFALL_HAZARD_RATING').filtered('id='+ parseInt(data.hazardRatingRockfallId));
			//let dataHazardRockfallRating = realm.objects('ROCKFALL_HAZARD_RATING').filtered('id="20"');
			if(dataHazardRockfallRating.length>0){
				hazardRockfallMaintFrequency = dataHazardRockfallRating[0].maintFrequency;
				caseOneStrucCond = dataHazardRockfallRating[0].caseOneStrucCond;
				caseOneRockFriction = dataHazardRockfallRating[0].caseOneRockFriction;
				caseTwoStrucCondition = dataHazardRockfallRating[0].caseTwoStrucCondition;
				caseTwoDiffErosion = dataHazardRockfallRating[0].caseTwoDiffErosion;
			
			}
			
			hazardRatingRockfallTotal  += parseInt(prelimRockfallDitchEff) + parseInt(prelimRockfallRockfallHistory)
			+ parseInt(prelimRockfallBlockSizeEventVol) + parseInt(data.slopeDrainage) 
			+ parseInt(data.hazardRatingAnnualRainfall) + parseInt(data.hazardRatingSlopeHeightAxialLength) 
			+ parseInt(hazardRockfallMaintFrequency);
			if(parseInt(caseOneStrucCond) + parseInt(caseOneRockFriction) 
	 		   > parseInt(caseTwoStrucCondition) + parseInt(caseTwoDiffErosion))
			{
				hazardRatingRockfallTotal += parseInt(caseOneStrucCond) + parseInt(caseOneRockFriction);
			}
			else
			{
				hazardRatingRockfallTotal += parseInt(caseTwoStrucCondition) + parseInt(caseTwoDiffErosion);
			}
			//alert("id "+parseInt(data.hazardRatingRockfallId)+" diff"+parseInt(caseTwoDiffErosion)+"  "+hazardRatingRockfallTotal);
		
			}
		
		//alert(dataComment[0].comment +" "+ data.hazardRatingLandslideId)
		var date = new Date();
		
        var today = date.getFullYear() + "-" + (((date.getMonth()+1) < 10)?"0":"") + 
			(date.getMonth()+1) + "-" + ((date.getDate() < 10)?"0":"") + date.getDate();

         var timeNow =((date.getHours() < 10)?"0":"") + date.getHours() 
			 +":"+ ((date.getMinutes() < 10)?"0":"") + date.getMinutes() +":"+
			  ((date.getSeconds() < 10)?"0":"") + date.getSeconds();
  		var date = today+" "+timeNow;
		
		//setting rockfall landslide radiobutton
		if(prelimLandslideLengthAffected > 0){
			var rockfallLandslide = 'landslide';
			var rockLandKey = 1;
			//alert(rockfallLandslide)
		}else{
			var rockfallLandslide = 'rockfall';
			var rockLandKey = 0;
			//alert(rockfallLandslide)
		}
		
		if(data.roadOrTrail.toString()== 'R'){
			var roadOrTrailKey = 0;
			//alert(rockfallLandslide)
		}else if(data.roadOrTrail.toString()== 'T'){
			var roadOrTrailKey = 1;
			//alert(rockfallLandslide)
		}
		
		if(prelimRockfallDitchEff.toString()== '3'){
			var prelimRockfallDitchEffKey = 0;
			//alert(rockfallLandslide)
		}else if(prelimRockfallDitchEff.toString()== '9'){
			var prelimRockfallDitchEffKey = 1;
			//alert(rockfallLandslide)
		}else if(prelimRockfallDitchEff.toString()== '27'){
			var prelimRockfallDitchEffKey = 2;
					//alert(rockfallLandslide)
		}else if(prelimRockfallDitchEff.toString()== '81'){
			var prelimRockfallDitchEffKey = 3;
							//alert(rockfallLandslide)
		}else{
			var prelimRockfallDitchEffKey = -1;
		}
		
		if(prelimRockfallRockfallHistory.toString()== '3'){
			var prelimRockfallRockfallHistoryKey = 0;
			//alert(rockfallLandslide)
		}else if(prelimRockfallRockfallHistory.toString()== '9'){
			var prelimRockfallRockfallHistoryKey = 1;
			//alert(rockfallLandslide)
		}else if(prelimRockfallRockfallHistory.toString()== '27'){
			var prelimRockfallRockfallHistoryKey = 2;
					//alert(rockfallLandslide)
		}else if(prelimRockfallRockfallHistory.toString()== '81'){
			var prelimRockfallRockfallHistoryKey = 3;
							//alert(rockfallLandslide)
		}else{
			var prelimRockfallRockfallHistoryKey = -1;
		}
		
		if(prelimRockfallBlockSizeEventVol.toString()== '3'){
			var prelimRockfallBlockSizeEventVolKey = 0;
			//alert(rockfallLandslide)
		}else if(prelimRockfallBlockSizeEventVol.toString()== '9'){
			var prelimRockfallBlockSizeEventVolKey = 1;
			//alert(rockfallLandslide)
		}else if(prelimRockfallBlockSizeEventVol.toString()== '27'){
			var prelimRockfallBlockSizeEventVolKey = 2;
					//alert(rockfallLandslide)
		}else if(prelimRockfallBlockSizeEventVol.toString()== '81'){
			var prelimRockfallBlockSizeEventVolKey = 3;
							//alert(rockfallLandslide)
		}else{
			var prelimRockfallBlockSizeEventVolKey = -1;
		}
		
		if(data.impactOnUse.toString()== '3'){
			var impactOnUseKey = 0;
			//alert(rockfallLandslide)
		}else if(data.impactOnUse.toString()== '9'){
			var impactOnUseKey = 1;
			//alert(rockfallLandslide)
		}else if(data.impactOnUse.toString()== '27'){
			var impactOnUseKey = 2;
					//alert(rockfallLandslide)
		}else if(data.impactOnUse.toString()== '81'){
			var impactOnUseKey = 3;
							//alert(rockfallLandslide)
		}else{
			var impactOnUseKey = -1;
		}
		
		if(data.aadtUsage.toString()== '3'){
			var aadtUsageKey = 0;
			//alert(rockfallLandslide)
		}else if(data.aadtUsage.toString()== '9'){
			var aadtUsageKey = 1;
			//alert(rockfallLandslide)
		}else if(data.aadtUsage.toString()== '27'){
			var aadtUsageKey = 2;
					//alert(rockfallLandslide)
		}else if(data.aadtUsage.toString()== '81'){
			var aadtUsageKey = 3;
							//alert(rockfallLandslide)
		}else{
			var aadtUsageKey = -1;
		}
		
		if(data.slopeDrainage.toString()== '3'){
			var slopeDrainageKey = 0;
			//alert(rockfallLandslide)
		}else if(data.slopeDrainage.toString()== '9'){
			var slopeDrainageKey = 1;
			//alert(rockfallLandslide)
		}else if(data.slopeDrainage.toString()== '27'){
			var slopeDrainageKey = 2;
					//alert(rockfallLandslide)
		}else if(data.slopeDrainage.toString()== '81'){
			var slopeDrainageKey = 3;
							//alert(rockfallLandslide)
		}else{
			var slopeDrainageKey = -1;
		}
		
		if(data.hazardRatingAnnualRainfall.toString()== '3'){
			var hazardRatingAnnualRainfallKey = 0;
			//alert(rockfallLandslide)
		}else if(data.hazardRatingAnnualRainfall.toString()== '9'){
			var hazardRatingAnnualRainfallKey = 1;
			//alert(rockfallLandslide)
		}else if(data.hazardRatingAnnualRainfall.toString()== '27'){
			var hazardRatingAnnualRainfallKey = 2;
					//alert(rockfallLandslide)
		}else if(data.hazardRatingAnnualRainfall.toString()== '81'){
			var hazardRatingAnnualRainfallKey = 3;
							//alert(rockfallLandslide)
		}else{
			var hazardRatingAnnualRainfallKey = -1;
		}
		
		if(data.hazardRatingSlopeHeightAxialLength.toString()== '3'){
			var hazardRatingSlopeHeightAxialLengthKey = 0;
			//alert(rockfallLandslide)
		}else if(data.hazardRatingSlopeHeightAxialLength.toString()== '9'){
			var hazardRatingSlopeHeightAxialLengthKey = 1;
			//alert(rockfallLandslide)
		}else if(data.hazardRatingSlopeHeightAxialLength.toString()== '27'){
			var hazardRatingSlopeHeightAxialLengthKey = 2;
					//alert(rockfallLandslide)
		}else if(data.hazardRatingSlopeHeightAxialLength.toString()== '81'){
			var hazardRatingSlopeHeightAxialLengthKey = 3;
							//alert(rockfallLandslide)
		}else{
			var hazardRatingSlopeHeightAxialLengthKey = -1;
		}
		
		if(hazardRockfallMaintFrequency.toString()== '3'){
			var hazardRockfallMaintFrequencyKey = 0;
			//alert(rockfallLandslide)
		}else if(hazardRockfallMaintFrequency.toString()== '9'){
			var hazardRockfallMaintFrequencyKey = 1;
			//alert(rockfallLandslide)
		}else if(hazardRockfallMaintFrequency.toString()== '27'){
			var hazardRockfallMaintFrequencyKey = 2;
					//alert(rockfallLandslide)
		}else if(hazardRockfallMaintFrequency.toString()== '81'){
			var hazardRockfallMaintFrequencyKey = 3;
							//alert(rockfallLandslide)
		}else{
			var hazardRockfallMaintFrequencyKey = -1;
		}
		
		if(caseOneStrucCond.toString()== '3'){
			var caseOneStrucCondKey = 0;
			//alert(rockfallLandslide)
		}else if(caseOneStrucCond.toString()== '9'){
			var caseOneStrucCondKey = 1;
			//alert(rockfallLandslide)
		}else if(caseOneStrucCond.toString()== '27'){
			var caseOneStrucCondKey = 2;
					//alert(rockfallLandslide)
		}else if(caseOneStrucCond.toString()== '81'){
			var caseOneStrucCondKey = 3;
							//alert(rockfallLandslide)
		}else{
			var caseOneStrucCondKey = -1;
		}
		
		if(caseOneRockFriction.toString()== '3'){
			var caseOneRockFrictionKey = 0;
			//alert(rockfallLandslide)
		}else if(caseOneRockFriction.toString()== '9'){
			var caseOneRockFrictionKey = 1;
			//alert(rockfallLandslide)
		}else if(caseOneRockFriction.toString()== '27'){
			var caseOneRockFrictionKey = 2;
					//alert(rockfallLandslide)
		}else if(caseOneRockFriction.toString()== '81'){
			var caseOneRockFrictionKey = 3;
							//alert(rockfallLandslide)
		}else{
			var caseOneRockFrictionKey = -1;
		}
		
		if(caseTwoStrucCondition.toString()== '3'){
			var caseTwoStrucConditionKey = 0;
			//alert(rockfallLandslide)
		}else if(caseTwoStrucCondition.toString()== '9'){
			var caseTwoStrucConditionKey = 1;
			//alert(rockfallLandslide)
		}else if(caseTwoStrucCondition.toString()== '27'){
			var caseTwoStrucConditionKey = 2;
					//alert(rockfallLandslide)
		}else if(caseTwoStrucCondition.toString()== '81'){
			var caseTwoStrucConditionKey = 3;
							//alert(rockfallLandslide)
		}else{
			var caseTwoStrucConditionKey = -1;
		}
		
		if(caseTwoDiffErosion.toString()== '3'){
			var caseTwoDiffErosionKey = 0;
			//alert(rockfallLandslide)
		}else if(caseTwoDiffErosion.toString()== '9'){
			var caseTwoDiffErosionKey = 1;
			//alert(rockfallLandslide)
		}else if(caseTwoDiffErosion.toString()== '27'){
			var caseTwoDiffErosionKey = 2;
					//alert(rockfallLandslide)
		}else if(caseTwoDiffErosion.toString()== '81'){
			var caseTwoDiffErosionKey = 3;
							//alert(rockfallLandslide)
		}else{
			var caseTwoDiffErosionKey = -1;
		}
		
		if(prelimLandslideRoadWidthAffected.toString()== '3'){
			var prelimLandslideRoadWidthAffectedKey = 0;
			//alert(rockfallLandslide)
		}else if(prelimLandslideRoadWidthAffected.toString()== '9'){
			var prelimLandslideRoadWidthAffectedKey = 1;
			//alert(rockfallLandslide)
		}else if(prelimLandslideRoadWidthAffected.toString()== '27'){
			var prelimLandslideRoadWidthAffectedKey = 2;
					//alert(rockfallLandslide)
		}else if(prelimLandslideRoadWidthAffected.toString()== '81'){
			var prelimLandslideRoadWidthAffectedKey = 3;
							//alert(rockfallLandslide)
		}else{
			var prelimLandslideRoadWidthAffectedKey = -1;
		}
		
		if(prelimLandslideSlideErosionEffects.toString()== '3'){
			var prelimLandslideSlideErosionEffectsKey = 0;
			//alert(rockfallLandslide)
		}else if(prelimLandslideSlideErosionEffects.toString()== '9'){
			var prelimLandslideSlideErosionEffectsKey = 1;
			//alert(rockfallLandslide)
		}else if(prelimLandslideSlideErosionEffects.toString()== '27'){
			var prelimLandslideSlideErosionEffectsKey = 2;
					//alert(rockfallLandslide)
		}else if(prelimLandslideSlideErosionEffects.toString()== '81'){
			var prelimLandslideSlideErosionEffectsKey = 3;
							//alert(rockfallLandslide)
		}else{
			var prelimLandslideSlideErosionEffectsKey = -1;
		}
		
		if(prelimLandslideLengthAffected.toString()== '3'){
			var prelimLandslideLengthAffectedKey = 0;
			//alert(rockfallLandslide)
		}else if(prelimLandslideLengthAffected.toString()== '9'){
			var prelimLandslideLengthAffectedKey = 1;
			//alert(rockfallLandslide)
		}else if(prelimLandslideLengthAffected.toString()== '27'){
			var prelimLandslideLengthAffectedKey = 2;
					//alert(rockfallLandslide)
		}else if(prelimLandslideLengthAffected.toString()== '81'){
			var prelimLandslideLengthAffectedKey = 3;
							//alert(rockfallLandslide)
		}else{
			var prelimLandslideLengthAffectedKey = -1;
		}
		
		if(hazardLandslideThawStability.toString()== '3'){
			var hazardLandslideThawStabilityKey = 0;
			//alert(rockfallLandslide)
		}else if(hazardLandslideThawStability.toString()== '9'){
			var hazardLandslideThawStabilityKey = 1;
			//alert(rockfallLandslide)
		}else if(hazardLandslideThawStability.toString()== '27'){
			var hazardLandslideThawStabilityKey = 2;
					//alert(rockfallLandslide)
		}else if(hazardLandslideThawStability.toString()== '81'){
			var hazardLandslideThawStabilityKey = 3;
							//alert(rockfallLandslide)
		}else{
			var hazardLandslideThawStabilityKey = -1;
		}
		
		if(hazardLandslideMaintFrequency.toString()== '3'){
			var hazardLandslideMaintFrequencyKey = 0;
			//alert(rockfallLandslide)
		}else if(hazardLandslideMaintFrequency.toString()== '9'){
			var hazardLandslideMaintFrequencyKey = 1;
			//alert(rockfallLandslide)
		}else if(hazardLandslideMaintFrequency.toString()== '27'){
			var hazardLandslideMaintFrequencyKey = 2;
					//alert(rockfallLandslide)
		}else if(hazardLandslideMaintFrequency.toString()== '81'){
			var hazardLandslideMaintFrequencyKey = 3;
							//alert(rockfallLandslide)
		}else{
			var hazardLandslideMaintFrequencyKey = -1;
		}
		
		if(hazardLandslideMovementHistory.toString()== '3'){
			var hazardLandslideMovementHistoryKey = 0;
			//alert(rockfallLandslide)
		}else if(hazardLandslideMovementHistory.toString()== '9'){
			var hazardLandslideMovementHistoryKey = 1;
			//alert(rockfallLandslide)
		}else if(hazardLandslideMovementHistory.toString()== '27'){
			var hazardLandslideMovementHistoryKey = 2;
					//alert(rockfallLandslide)
		}else if(hazardLandslideMovementHistory.toString()== '81'){
			var hazardLandslideMovementHistoryKey = 3;
							//alert(rockfallLandslide)
		}else{
			var hazardLandslideMovementHistoryKey = -1;
		}
		
		if(data.routeTrailWidth.toString()== '3'){
			var routeTrailWidthKey = 0;
			//alert(rockfallLandslide)
		}else if(data.routeTrailWidth.toString()== '9'){
			var routeTrailWidthKey = 1;
			//alert(rockfallLandslide)
		}else if(data.routeTrailWidth.toString()== '27'){
			var routeTrailWidthKey = 2;
					//alert(rockfallLandslide)
		}else if(data.routeTrailWidth.toString()== '81'){
			var routeTrailWidthKey = 3;
							//alert(rockfallLandslide)
		}else{
			var routeTrailWidthKey = -1;
		}
		
		if(data.humanExFactor.toString()== '3'){
			var humanExFactorKey = 0;
			//alert(rockfallLandslide)
		}else if(data.humanExFactor.toString()== '9'){
			var humanExFactorKey = 1;
			//alert(rockfallLandslide)
		}else if(data.humanExFactor.toString()== '27'){
			var humanExFactorKey = 2;
					//alert(rockfallLandslide)
		}else if(data.humanExFactor.toString()== '81'){
			var humanExFactorKey = 3;
							//alert(rockfallLandslide)
		}else{
			var humanExFactorKey = -1;
		}
		
		if(data.percentDsd.toString()== '3'){
			var percentDsdKey = 0;
			//alert(rockfallLandslide)
		}else if(data.percentDsd.toString()== '9'){
			var percentDsdKey = 1;
			//alert(rockfallLandslide)
		}else if(data.percentDsd.toString()== '27'){
			var percentDsdKey = 2;
					//alert(rockfallLandslide)
		}else if(data.percentDsd.toString()== '81'){
			var percentDsdKey = 3;
							//alert(rockfallLandslide)
		}else{
			var percentDsdKey = -1;
		}
		
		if(data.rWImpacts.toString()== '3'){
			var rWImpactsKey = 0;
			//alert(rockfallLandslide)
		}else if(data.rWImpacts.toString()== '9'){
			var rWImpactsKey = 1;
			//alert(rockfallLandslide)
		}else if(data.rWImpacts.toString()== '27'){
			var rWImpactsKey = 2;
					//alert(rockfallLandslide)
		}else if(data.rWImpacts.toString()== '81'){
			var rWImpactsKey = 3;
							//alert(rockfallLandslide)
		}else{
			var rWImpactsKey = -1;
		}
		
		if(data.enviroCultImpacts.toString()== '3'){
			var enviroCultImpactsKey = 0;
			//alert(rockfallLandslide)
		}else if(data.enviroCultImpacts.toString()== '9'){
			var enviroCultImpactsKey = 1;
			//alert(rockfallLandslide)
		}else if(data.enviroCultImpacts.toString()== '27'){
			var enviroCultImpactsKey = 2;
					//alert(rockfallLandslide)
		}else if(data.enviroCultImpacts.toString()== '81'){
			var enviroCultImpactsKey = 3;
							//alert(rockfallLandslide)
		}else{
			var enviroCultImpactsKey = -1;
		}
		
		if(data.maintComplexity.toString()== '3'){
			var maintComplexityKey = 0;
			//alert(rockfallLandslide)
		}else if(data.maintComplexity.toString()== '9'){
			var maintComplexityKey = 1;
			//alert(rockfallLandslide)
		}else if(data.maintComplexity.toString()== '27'){
			var maintComplexityKey = 2;
					//alert(rockfallLandslide)
		}else if(data.maintComplexity.toString()== '81'){
			var maintComplexityKey = 3;
							//alert(rockfallLandslide)
		}else{
			var maintComplexityKey = -1;
		}
		
		if(data.eventCost.toString()== '3'){
			var eventCostKey = 0;
			//alert(rockfallLandslide)
		}else if(data.eventCost.toString()== '9'){
			var eventCostKey = 1;
			//alert(rockfallLandslide)
		}else if(data.eventCost.toString()== '27'){
			var eventCostKey = 2;
					//alert(rockfallLandslide)
		}else if(data.eventCost.toString()== '81'){
			var eventCostKey = 3;
							//alert(rockfallLandslide)
		}else{
			var eventCostKey = -1;
		}
		
		//let editSites = realm.objects('Site');//.filtered('id="3"');
		//let editSite = editSites.filtered('id='+id);
		//alert("risk"+data.riskTotal.toString());
		this.state = { 
			id: data.id,
			selectedAgency:data.umbrellaAgency,
			selectedRegion:data.regionalAdmin,
			selectedLocal:data.localAdmin,
			date:date, 
			oldDate:data.date,
			rockfallLandslide:rockfallLandslide.toString(),
			rockLandKey:rockLandKey,
			hazardType: dataHazardtype, // table hazardlink array
			hazardLink:data.hazardType, //table hazardlink id
			rtNo:data.rtNo.toString(),
			roadOrTrail:data.roadOrTrail.toString(),
			roadOrTrailKey:roadOrTrailKey,
			rtClass:data.rtClass.toString(),
			rater:data.rater.toString(),
			beginMileMarker:data.beginMileMarker.toFixed(2).toString(),
			endMileMarker:data.endMileMarker.toFixed(2).toString(),
			side:data.side.toString(),
			weather:data.weather.toString(),
      		lastPosition: 'unknown',
			beginCoordinateLatitude:data.beginCoordinateLatitude.toString(),
			beginCoordinateLongitude:data.beginCoordinateLongitude.toString(),
			endCoordinateLatitude:data.endCoordinateLatitude.toString(),
			endCoordinateLongitude:data.endCoordinateLongitude.toString(),
			datum:data.datum.toString(),
			aadt:data.aadt.toString(),
			lengthAffected:data.lengthAffected.toString(),
			slopeHeightAxialLength:data.slopeHeightAxialLength.toString(),
			slopeAngle:data.slopeAngle.toString(),
			sightDistance:data.sightDistance.toString(),
			roadTrailWidth:data.roadTrailWidth.toString(),
			speedLimit:data.speedLimit.toString(),
			minimumDitchWidth:data.minimumDitchWidth.toString(),
			maximumDitchWidth:data.maximumDitchWidth.toString(),
			minimumDitchDepth:data.minimumDitchDepth.toString(),
			maximumDitchDepth:data.maximumDitchDepth.toString(),
			firstBeginDitchSlope:data.firstBeginDitchSlope.toString(),
			firstEndDitchSlope:data.firstEndDitchSlope.toString(),
			secondBeginDitchSlope:data.secondBeginDitchSlope.toString(),
			secondEndDitchSlope:data.secondEndDitchSlope.toString(),
			blkSize:data.blkSize.toString(),
			volume:data.volume.toString(),
			startAnnualRainfall:data.startAnnualRainfall.toString(),
			endAnnualRainfall:data.endAnnualRainfall.toString(),
			soleAccessRoute:data.soleAccessRoute.toString(),
			fixesPresent:data.fixesPresent.toString(),
			file: [],
			comments:(dataComment.length>0)?dataComment[0].comment.toString():'',
			fmlaName:(dataFmla.length>0)?dataFmla[0].fmlaName.toString():'',
			fmlaId:(dataFmla.length>0)?dataFmla[0].fmlaId.toString():'',
			fmlaDescription:(dataFmla.length>0)?dataFmla[0].fmlaDescription.toString():'',
			commentId:data.comment,
			fmlaLinkId:data.fmla,
			preliminaryRatingLandslideId:data.preliminaryRatingLandslideId,
			preliminaryRatingRockfallId:data.preliminaryRatingRockfallId,
			prelimLandslideRoadWidthAffected:prelimLandslideRoadWidthAffected.toString(),
			prelimLandslideSlideErosionEffects:prelimLandslideSlideErosionEffects.toString(),
			prelimLandslideLengthAffected:prelimLandslideLengthAffected.toString(),
			prelimRockfallDitchEff:prelimRockfallDitchEff.toString(),
			prelimRockfallRockfallHistory:prelimRockfallRockfallHistory.toString(),
			prelimRockfallBlockSizeEventVol:prelimRockfallBlockSizeEventVol.toString(),
			impactOnUse:data.impactOnUse.toString(),
			aadtUsage:data.aadtUsage.toString(),
			aadtUsageCalcCheckbox:data.aadtUsageCalcCheckbox,
			editable:false,
			prelimRatingLandslideTotal:prelimRatingLandslideTotal.toString(),
			prelimRatingRockfallRotal:prelimRatingRockfallRotal.toString(),
			prelimRating:data.prelimRating.toString(),
			slopeDrainage:data.slopeDrainage.toString(),
			hazardRatingLandslideId:data.hazardRatingLandslideId,
			hazardRatingRockfallId:data.hazardRatingRockfallId,
			hazardRatingAnnualRainfall:data.hazardRatingAnnualRainfall.toString(),
			hazardRatingSlopeHeightAxialLength:data.hazardRatingSlopeHeightAxialLength.toString(),
			hazardLandslideThawStability:hazardLandslideThawStability.toString(),
			hazardLandslideMaintFrequency:hazardLandslideMaintFrequency.toString(),
			hazardLandslideMovementHistory:hazardLandslideMovementHistory.toString(),
			hazardRockfallMaintFrequency:hazardRockfallMaintFrequency.toString(),
			caseOneStrucCond:caseOneStrucCond.toString(),
			caseOneRockFriction:caseOneRockFriction.toString(),
			caseTwoStrucCondition:caseTwoStrucCondition.toString(),
			caseTwoDiffErosion:caseTwoDiffErosion.toString(),
			hazardRatingLandslideTotal:hazardRatingLandslideTotal.toString(),
			hazardRatingRockfallTotal:hazardRatingRockfallTotal.toString(),
			routeTrailWidth:data.routeTrailWidth.toString(), // because roadOrTrail = 'R' is selected by default
			humanExFactor:data.humanExFactor.toString(),
			percentDsd:data.percentDsd.toString(),
			rWImpacts:data.rWImpacts.toString(),
			enviroCultImpacts:data.enviroCultImpacts.toString(),
			maintComplexity:data.maintComplexity.toString(),
			eventCost:data.eventCost.toString(),
			riskTotal:data.riskTotal.toString(),
			totalScore:data.totalScore.toString(),
			prelimRockfallDitchEffKey:prelimRockfallDitchEffKey,
			prelimRockfallRockfallHistoryKey:prelimRockfallRockfallHistoryKey,
			prelimRockfallBlockSizeEventVolKey:prelimRockfallBlockSizeEventVolKey,
			impactOnUseKey:impactOnUseKey,
			aadtUsageKey:aadtUsageKey,
			slopeDrainageKey:slopeDrainageKey,
			hazardRatingAnnualRainfallKey:hazardRatingAnnualRainfallKey,
			hazardRatingSlopeHeightAxialLengthKey:hazardRatingSlopeHeightAxialLengthKey,
			hazardRockfallMaintFrequencyKey:hazardRockfallMaintFrequencyKey,
			caseOneStrucCondKey:caseOneStrucCondKey,
			caseOneRockFrictionKey:caseOneRockFrictionKey,
			caseTwoStrucConditionKey:caseTwoStrucConditionKey,
			caseTwoDiffErosionKey:caseTwoDiffErosionKey,
			prelimLandslideRoadWidthAffectedKey:prelimLandslideRoadWidthAffectedKey,
			prelimLandslideSlideErosionEffectsKey:prelimLandslideSlideErosionEffectsKey,
			prelimLandslideLengthAffectedKey:prelimLandslideLengthAffectedKey,
			hazardLandslideThawStabilityKey:hazardLandslideThawStabilityKey,
			hazardLandslideMaintFrequencyKey:hazardLandslideMaintFrequencyKey,
			hazardLandslideMovementHistoryKey:hazardLandslideMovementHistoryKey,
			routeTrailWidthKey:routeTrailWidthKey,
			humanExFactorKey:humanExFactorKey,
			percentDsdKey:percentDsdKey,
			rWImpactsKey:rWImpactsKey,
			enviroCultImpactsKey:enviroCultImpactsKey,
			maintComplexityKey:maintComplexityKey,
			eventCostKey:eventCostKey,
			slopeEvent:0,
			aadtCheck:true,
		 };
		//Alert.alert(""+editSite[0].siteName);
	}
	onDateChange(date) {
	   // this.setState({date: date});
		alert(date)
	  }
	  //form validation before submit
	  validateForm(){
	
	  	var err = "";
	
	  	if(this.state.rockfallLandslide != 'rockfall' 
	  		&& this.state.rockfallLandslide != 'landslide'){
	  			err += rockfall_landslide_checkbox_format_S+'\n';//.concat("<br/>");
	  	}
		
	  	if(this.state.selectedAgency.match(umbrella_agency_regex) === null){
	  		err += umbrella_agency_format_S+'\n';//.concat("<br/>");
	  		//$("#umbrella_agency").css("background-color", "red");
	  	}

	  	if(this.state.selectedRegion.match(regional_admin_regex) === null){
	  		err += regional_admin_format_S+'\n';//.concat("<br/>");
	  		//$("#regional_admin").css("background-color", "red");
	  	}

	  	if(this.state.selectedLocal.match(local_admin_regex) === null){
	  		err += local_admin_format_S+'\n';//.concat("<br/>");
	  		//$("#local_admin").css("background-color", "red");
	  	}

	  	if(this.state.date.match(date_regex) === null){
			alert(this.state.date);
	  		err += date_format_S+'\n';//.concat("<br/>");
	  		//$("#date").css("background-color", "red");
	  	}

	  	if(this.state.rtNo.match(road_trail_number_regex) === null){
	  		err += road_trail_number_format_S+'\n';//.concat("<br/>");
	  		//$("#road_trail_number").css("background-color", "red");
	  	}

	  	if(this.state.roadOrTrail.match(road_or_trail_regex) === null){
	  		err += road_or_trail_format_S+'\n';//.concat("<br/>");
	  		//$("#road_or_trail").css("background-color", "red");
	  	}

	  	if(this.state.rtClass.match(road_trail_class_regex) === null){
	  		err += road_trail_class_format_S+'\n';//.concat("<br/>");
	  		//$("#road_trail_class").css("background-color", "red");
	  	}

	  	if(this.state.rater.match(rater_regex) === null){
	  		err += rater_format_S+'\n';//.concat("<br/>");
	  		//$("#rater").css("background-color", "red");
	  	}

	  	if(this.state.beginMileMarker.match(begin_mile_marker_regex) === null){
	  		err += begin_mile_marker_format_S+'\n';//.concat("<br/>");
	  		//$("#begin_mile_marker").css("background-color", "red");
	  	}

	  	if(this.state.endMileMarker.match(end_mile_marker_regex) === null){
	  		err += end_mile_marker_format_S+'\n';//.concat("<br/>");
	  		//$("#end_mile_marker").css("background-color", "red");
	  	}

	  	if(this.state.side.match(side_regex) === null){
	  		err += side_format_S+'\n';//.concat("<br/>");
	  		//$("#side").css("background-color", "red");
	  	}

	  	if(this.state.weather.match(weather_regex) === null){
	  		err += weather_format_S+'\n';//.concat("<br/>");
	  		//$("#weather").css("background-color", "red");
	  	}
			
	  	if(this.state.hazardType.length == 0){
	  		err += hazard_type_format_S+'\n';//.concat("<br/>");
	  		//$("#hazard_type").css("background-color", "red");
	  	}

	  	if(this.state.beginCoordinateLatitude.match(begin_coordinate_latitude_regex) === null){
	  		err += begin_coordinate_latitude_format_S+'\n';//.concat("<br/>");
	  		//$("#begin_coordinate_latitude").css("background-color", "red");
	  	}

	  	if(this.state.beginCoordinateLongitude.match(begin_coordinate_longitude_regex) === null){
	  		err += begin_coordinate_longitude_format_S+'\n';//.concat("<br/>");
	  		//$("#begin_coordinate_longitude").css("background-color", "red");
	  	}

	  	if(this.state.endCoordinateLatitude.match(end_coordinate_latitude_regex) === null){
	  		err += end_coordinate_latitude_format_S+'\n';//.concat("<br/>");
	  		//$("#end_coordinate_latitude").css("background-color", "red");
	  	}

	  	if(this.state.endCoordinateLongitude.match(end_coordinate_longitude_regex) === null){
	  		err += end_coordinate_longitude_format_S+'\n';//.concat("<br/>");
	  		//$("#end_coordinate_longitude").css("background-color", "red");
	  	}

	  	if(this.state.aadt.match(aadt_regex) === null){
	  		err += aadt_format_S+'\n';//.concat("<br/>");
	  		//$("#aadt").css("background-color", "red");
	  	}

	  	if(this.state.lengthAffected.match(length_affected_regex) === null){
	  		err += length_affected_format_S+'\n';//.concat("<br/>");
	  		//$("#length_affected").css("background-color", "red");
	  	}

	  	if(this.state.slopeHeightAxialLength.match(slope_height_axial_length_regex) === null){
	  		err += slope_height_axial_length_format_S+'\n';//.concat("<br/>");
	  		//$("#slope_height_axial_length").css("background-color", "red");
	  	}

	  	if(this.state.slopeAngle.match(slope_angle_regex) === null){
	  		err += slope_angle_format_S+'\n';//.concat("<br/>");
	  		//$("#slope_angle").css("background-color", "red");
	  	}

	  	if(this.state.sightDistance.match(sight_distance_regex) === null){
	  		err += sight_distance_format_S+'\n';//.concat("<br/>");
	  		//$("#sight_distance").css("background-color", "red");
	  	}

	  	if(this.state.roadTrailWidth.match(road_trail_width_regex) === null){
	  		err += road_trail_width_format_S+'\n';//.concat("<br/>");
	  		//$("#road_trail_width").css("background-color", "red");
	  	}

	  	if(this.state.speedLimit.match(speed_limit_regex) === null){
	  		err += speed_limit_format_S+'\n';//.concat("<br/>");
	  		//$("#speed_limit").css("background-color", "red");
	  	}

	  	if(this.state.minimumDitchWidth.match(minimum_ditch_width_regex) === null){
	  		err += minimum_ditch_width_format_S+'\n';//.concat("<br/>");
	  		//$("#minimum_ditch_width").css("background-color", "red");
	  	}

	  	if(this.state.maximumDitchWidth.match(maximum_ditch_width_regex) === null){
	  		err += maximum_ditch_width_format_S+'\n';//.concat("<br/>");
	  		//$("#maximum_ditch_width").css("background-color", "red");
	  	}

	  	if(this.state.minimumDitchDepth.match(minimum_ditch_depth_regex) === null){
	  		err += minimum_ditch_depth_format_S+'\n';//.concat("<br/>");
	  		//$("#minimum_ditch_depth").css("background-color", "red");
	  	}

	  	if(this.state.maximumDitchDepth.match(maximum_ditch_depth_regex) === null){
	  		err += maximum_ditch_depth_format_S+'\n';//.concat("<br/>");
	  		//$("#maximum_ditch_depth").css("background-color", "red");
	  	}
			
	  	if(this.state.firstBeginDitchSlope.match(first_begin_ditch_slope_regex) === null){
	  		err += first_begin_ditch_slope_format_S+'\n';//.concat("<br/>");
	  		//$("#first_begin_ditch_slope").css("background-color", "red");
	  	}

	  	if(this.state.firstEndDitchSlope.match(first_end_ditch_slope_regex) === null){
	  		err += first_end_ditch_slope_format_S+'\n';//.concat("<br/>");
	  		//$("#first_end_ditch_slope").css("background-color", "red");
	  	}

	  	if(this.state.secondBeginDitchSlope.match(second_begin_ditch_slope_regex) === null){
	  		err += second_begin_ditch_slope_format_S+'\n';//.concat("<br/>");
	  		//$("#second_begin_ditch_slope").css("background-color", "red");
	  	}
	
	  	if(this.state.secondEndDitchSlope.match(second_end_ditch_slope_regex) === null){
	  		err += second_end_ditch_slope_format_S+'\n';//.concat("<br/>");
	  		//$("#second_end_ditch_slope").css("background-color", "red");
	  	}

	  	if(this.state.blkSize.match(blk_size_regex) === null){
	  		err += blk_size_format_S+'\n';//.concat("<br/>");
	  		//$("#blk_size").css("background-color", "red");
	  	}

	  	if(this.state.volume.match(volume_regex) === null){
	  		err += volume_format_S+'\n';//.concat("<br/>");
	  		//$("#volume").css("background-color", "red");
	  	}
	
	  	if(this.state.startAnnualRainfall.match(start_annual_rainfall_regex) === null){
	  		err += start_annual_rainfall_format_S+'\n';//.concat("<br/>");
	  		//$("#start_annual_rainfall").css("background-color", "red");
	  	}

	  	if(this.state.endAnnualRainfall.match(end_annual_rainfall_regex) === null){
	  		err += end_annual_rainfall_format_S+'\n';//.concat("<br/>");
	  		//$("#end_annual_rainfall").css("background-color", "red");
	  	}

	  	if(this.state.soleAccessRoute.match(sole_access_route_regex) === null){
	  		err += sole_access_route_format_S+'\n';//.concat("<br/>");
	  		//$("#sole_access_route").css("background-color", "red");
	  	}

	  	if(this.state.fixesPresent.match(fixes_present_regex) === null){
	  		err += fixes_present_format_S+'\n';//.concat("<br/>");
	  		//$("#fixes_present").css("background-color", "red");
	  	}

	  	if(this.state.prelimLandslideRoadWidthAffected.match(prelim_landslide_road_width_affected_regex) === null){
	  		err += prelim_landslide_road_width_affected_format_S+'\n';//.concat("<br/>");
	  		//$("#prelim_landslide_road_width_affected").css("background-color", "red");
	  	}

	  	if(this.state.prelimLandslideSlideErosionEffects.match(prelim_landslide_slide_erosion_effects_regex) === null){
	  		err += prelim_landslide_slide_erosion_effects_format_S+'\n';//.concat("<br/>");
	  		//$("#prelim_landslide_slide_erosion_effects").css("background-color", "red");
	  	}

	  	if(this.state.prelimLandslideLengthAffected.match(prelim_landslide_length_affected_regex) === null){
	  		err += prelim_landslide_length_affected_format_S+'\n';//.concat("<br/>");
	  		//$("#prelim_landslide_length_affected").css("background-color", "red");
	  	}

	  	if(this.state.prelimRockfallDitchEff.match(prelim_rockfall_ditch_eff_regex) === null){
	  		err += prelim_rockfall_ditch_eff_format_S+'\n';//.concat("<br/>");
	  		//$("#prelim_rockfall_ditch_eff").css("background-color", "red");
	  	}

	  	if(this.state.prelimRockfallRockfallHistory.match(prelim_rockfall_rockfall_history_regex) === null){
	  		err += prelim_rockfall_rockfall_history_format_S+'\n';//.concat("<br/>");
	  		//$("#prelim_rockfall_rockfall_history").css("background-color", "red");
	  	}

	  	if(this.state.prelimRockfallBlockSizeEventVol.match(prelim_rockfall_block_size_event_vol_regex) === null){
	  		err += prelim_rockfall_block_size_event_vol_format_S+'\n';//.concat("<br/>");
	  		//$("#prelim_rockfall_block_size_event_vol").css("background-color", "red");
	  	}

	  	if(this.state.impactOnUse.match(impact_on_use_regex) === null){
	  		err += impact_on_use_format_S+'\n';//.concat("<br/>");
	  		//$("#impact_on_use").css("background-color", "red");
	  	}

	  	if(this.state.aadtUsage.match(aadt_usage_regex) === null){
	  		err += aadt_usage_format_S+'\n';//.concat("<br/>");
	  		//$("#aadt_usage").css("background-color", "red");
	  	}

	  	if(this.state.slopeDrainage.match(slope_drainage_regex) === null){
	  		err += slope_drainage_format_S+'\n';//.concat("<br/>");
	  		//$("#slope_drainage").css("background-color", "red");
	  	}

	  	if(this.state.hazardRatingAnnualRainfall.match(hazard_rating_annual_rainfall_regex) === null){
	  		err += hazard_rating_annual_rainfall_format_S+'\n';//.concat("<br/>");
	  		//$("#hazard_rating_annual_rainfall").css("background-color", "red");
	  	}

	  	if(this.state.hazardRatingSlopeHeightAxialLength.match(hazard_rating_slope_height_axial_length_regex) === null){
	  		err += hazard_rating_slope_height_axial_length_format_S+'\n';//.concat("<br/>");
	  		//$("#hazard_rating_slope_height_axial_length").css("background-color", "red");
	  	}

	  	if(this.state.hazardLandslideThawStability.match(hazard_landslide_thaw_stability_regex) === null){
	  		err += hazard_landslide_thaw_stability_format_S+'\n';//.concat("<br/>");
	  		//$("#hazard_landslide_thaw_stability").css("background-color", "red");
	  	}

	  	if(this.state.hazardLandslideMaintFrequency.match(hazard_landslide_maint_frequency_regex) === null){
	  		err += hazard_landslide_maint_frequency_format_S+'\n';//.concat("<br/>");
	  		//$("#hazard_landslide_maint_frequency").css("background-color", "red");
	  	}

	  	if(this.state.hazardLandslideMovementHistory.match(hazard_landslide_movement_history_regex) === null){
	  		err += hazard_landslide_movement_history_format_S+'\n';//.concat("<br/>");
	  		//$("#hazard_landslide_movement_history").css("background-color", "red");
	  	}
		
	  	if(this.state.hazardRockfallMaintFrequency.match(hazard_rockfall_maint_frequency_regex) === null){
	  		err += hazard_rockfall_maint_frequency_format_S+'\n';//.concat("<br/>");
	  		//$("#hazard_rockfall_maint_frequency").css("background-color", "red");
	  	}

	  	if(this.state.caseOneStrucCond.match(case_one_struc_cond_regex) === null){
	  		err += case_one_struc_cond_format_S+'\n';//.concat("<br/>");
	  		//$("#case_one_struc_cond").css("background-color", "red");
	  	}

	  	if(this.state.caseOneRockFriction.match(case_one_rock_friction_regex) === null){
	  		err += case_one_rock_friction_format_S+'\n';//.concat("<br/>");
	  		//$("#case_one_rock_friction").css("background-color", "red");
	  	}

	  	if(this.state.caseTwoStrucCondition.match(case_two_struc_condition_regex) === null){
	  		err += case_two_struc_condition_format_S+'\n';//.concat("<br/>");
	  		//$("#case_two_struc_condition").css("background-color", "red");
	  	}

	  	if(this.state.caseTwoDiffErosion.match(case_two_diff_erosion_regex) === null){
	  		err += case_two_diff_erosion_format_S+'\n';//.concat("<br/>");
	  		//$("#case_two_diff_erosion").css("background-color", "red");
	  	}

	  	if(this.state.routeTrailWidth.match(route_trail_width_regex) === null){
	  		err += route_trail_width_format_S+'\n';//.concat("<br/>");
	  		//$("#route_trail_width").css("background-color", "red");
	  	}

	  	if(this.state.humanExFactor.match(human_ex_factor_regex) === null){
	  		err += human_ex_factor_format_S+'\n';//.concat("<br/>");
	  		//$("#human_ex_factor").css("background-color", "red");
	  	}

	  	if(this.state.percentDsd.match(percent_dsd_regex) === null){
	  		err += percent_dsd_format_S+'\n';//.concat("<br/>");
	  		//$("#percent_dsd").css("background-color", "red");
	  	}

	  	if(this.state.rWImpacts.match(r_w_impacts_regex) === null){
	  		err += r_w_impacts_format_S+'\n';//.concat("<br/>");
	  		//$("#r_w_impacts").css("background-color", "red");
	  	}

	  	if(this.state.enviroCultImpacts.match(enviro_cult_impacts_regex) === null){
	  		err += enviro_cult_impacts_format_S+'\n';//.concat("<br/>");
	  		//$("#enviro_cult_impacts").css("background-color", "red");
	  	}

	  	if(this.state.maintComplexity.match(maint_complexity_regex) === null){
	  		err += maint_complexity_format_S+'\n';//.concat("<br/>");
	  		//$("#maint_complexity").css("background-color", "red");
	  	}

	  	if(this.state.eventCost.match(event_cost_regex) === null){
	  		err += event_cost_format_S+'\n';//.concat("<br/>");
	  		//$("#event_cost").css("background-color", "red");
	  	}

	
	  	return err;
	
	  }
	  
	  displayError(err){
	  	//alert("Errors in form, please see the error output below and the highlighted fields above.");
	  //	$("#submission_error").html(err);
	  	alert(err);
	  } 
	  
  	//save site after each field change  
  	saveSiteInfo(){
  		var road = 0;
  		var trail = 0;
  		var slopeStatus = 1;
		
		if(this.state.rockfallLandslide=='rockfall'){
		  //setting landslide tableids to 0
		  this.setState({preliminaryRatingLandslideId:0},()=>{
		  	
		  });
		  this.setState({hazardRatingLandslideId:0},()=>{
		  	
		  });
		  var preliminaryRatingLandslideId  = 0;
		  var hazardRatingLandslideId = 0;
		  var preliminaryRatingRockfallId = this.state.preliminaryRatingRockfallId;
		  var hazardRatingRockfallId = this.state.hazardRatingRockfallId;
		  
		 // alert(this.state.prelimRatingLandslideTotal)
		}else{
		  //setting rockfall tableids to 0
		  this.setState({preliminaryRatingRockfallId:0},()=>{
		  	
		  });
		  this.setState({hazardRatingRockfallId:0},()=>{
		  	
		  });
		  var preliminaryRatingLandslideId  = this.state.preliminaryRatingLandslideId;
		  var hazardRatingLandslideId = this.state.hazardRatingLandslideId;
		  var preliminaryRatingRockfallId = 0;
		  var hazardRatingRockfallId = 0;
	  	  
		}
		
		
  		if(parseInt(this.state.hazardRatingLandslideTotal) > parseInt(this.state.hazardRatingRockfallTotal)){
  			var hazardTotal = parseInt(this.state.hazardRatingLandslideTotal)
  		}else{
  			var hazardTotal = parseInt(this.state.hazardRatingRockfallTotal)
  		}
	    //alert("id"+this.state.hazardRatingRockfallId+" toTal"+this.state.hazardRatingRockfallTotal+"   diff"+this.state.caseTwoDiffErosion);
  	  	realm.write(()=>{
  			let site = realm.create('SITE_INFORMATION',{
  				id: this.state.id,
  				umbrellaAgency:this.state.selectedAgency,
  				regionalAdmin:this.state.selectedRegion,
  				localAdmin:this.state.selectedLocal,
  				date:this.state.date,
  				hazardType:this.state.hazardLink,
  				rtNo:this.state.rtNo,
  				roadOrTrail:this.state.roadOrTrail,
  				rtClass:this.state.rtClass,
  				rater:this.state.rater,
				beginMileMarker:isNaN(parseFloat(this.state.beginMileMarker))? 0.0: parseFloat(this.state.beginMileMarker),
				endMileMarker:isNaN(parseFloat(this.state.endMileMarker))? 0.0: parseFloat(this.state.endMileMarker),
  				side:this.state.side,
  				road:road,
  				trail:trail,
  				weather:this.state.weather,
				beginCoordinateLatitude:isNaN(parseFloat(this.state.beginCoordinateLatitude))? 0.0: parseFloat(this.state.beginCoordinateLatitude),
				beginCoordinateLongitude:isNaN(parseFloat(this.state.beginCoordinateLongitude))? 0.0 : parseFloat(this.state.beginCoordinateLongitude),
				endCoordinateLatitude:isNaN(parseFloat(this.state.endCoordinateLatitude))? 0.0: parseFloat(this.state.endCoordinateLatitude),
				endCoordinateLongitude:isNaN(parseFloat(this.state.endCoordinateLongitude))? 0.0: parseFloat(this.state.endCoordinateLongitude),
				datum:this.state.datum,
				aadt:isNaN(parseInt(this.state.aadt))? 0:parseInt(this.state.aadt),
				lengthAffected:isNaN(parseFloat(this.state.lengthAffected))? 0.0: parseFloat(this.state.lengthAffected),
				slopeHeightAxialLength:isNaN(parseFloat(this.state.slopeHeightAxialLength))? 0.0: parseFloat(this.state.slopeHeightAxialLength),
				slopeAngle:isNaN(parseInt(this.state.slopeAngle))? 0: parseInt(this.state.slopeAngle),
				sightDistance:isNaN(parseFloat(this.state.sightDistance))? 0.0: parseFloat(this.state.sightDistance),
				roadTrailWidth:isNaN(parseFloat(this.state.roadTrailWidth))? 0.0: parseFloat(this.state.roadTrailWidth),
				speedLimit:isNaN(parseInt(this.state.speedLimit))? 0: parseInt(this.state.speedLimit),
				minimumDitchWidth:isNaN(parseFloat(this.state.minimumDitchWidth))? 0.0: parseFloat(this.state.minimumDitchWidth),
				maximumDitchWidth:isNaN(parseFloat(this.state.maximumDitchWidth))? 0.0: parseFloat(this.state.maximumDitchWidth),
				minimumDitchDepth:isNaN(parseFloat(this.state.minimumDitchDepth))? 0.0: parseFloat(this.state.minimumDitchDepth),
				maximumDitchDepth:isNaN(parseFloat(this.state.maximumDitchDepth))? 0.0: parseFloat(this.state.maximumDitchDepth),
				firstBeginDitchSlope:isNaN(parseInt(this.state.firstBeginDitchSlope))? 0: parseInt(this.state.firstBeginDitchSlope),
				firstEndDitchSlope:isNaN(parseInt(this.state.firstEndDitchSlope))? 0: parseInt(this.state.firstEndDitchSlope),
				secondBeginDitchSlope:isNaN(parseInt(this.state.secondBeginDitchSlope))? 0: parseInt(this.state.secondBeginDitchSlope),
				secondEndDitchSlope:isNaN(parseInt(this.state.secondEndDitchSlope))? 0: parseInt(this.state.secondEndDitchSlope),
				blkSize:isNaN(parseFloat(this.state.blkSize))? 0.0: parseFloat(this.state.blkSize),
				volume:isNaN(parseFloat(this.state.volume))? 0.0: parseFloat(this.state.volume),
				startAnnualRainfall:isNaN(parseFloat(this.state.startAnnualRainfall))? 0.0: parseFloat(this.state.startAnnualRainfall),
				endAnnualRainfall:isNaN(parseFloat(this.state.endAnnualRainfall))? 0.0: parseFloat(this.state.endAnnualRainfall),
				soleAccessRoute:this.state.soleAccessRoute,
  				fixesPresent:this.state.fixesPresent,
  				comment:this.state.commentId,
  				fmla:this.state.fmlaLinkId,
  				preliminaryRatingLandslideId:preliminaryRatingLandslideId,
  				preliminaryRatingRockfallId:preliminaryRatingRockfallId,
				impactOnUse:isNaN(parseInt(this.state.impactOnUse))? 0: parseInt(this.state.impactOnUse),
				aadtUsage:isNaN(parseInt(this.state.aadtUsage))? 0: parseInt(this.state.aadtUsage),
				aadtUsageCalcCheckbox:this.state.aadtUsageCalcCheckbox,
				prelimRating:isNaN(parseInt(this.state.prelimRating))? 0: parseInt(this.state.prelimRating),
				slopeDrainage:isNaN(parseInt(this.state.slopeDrainage))? 0: parseInt(this.state.slopeDrainage),
				hazardRatingAnnualRainfall:isNaN(parseInt(this.state.hazardRatingAnnualRainfall))? 0: parseInt(this.state.hazardRatingAnnualRainfall),
				hazardRatingSlopeHeightAxialLength:isNaN(parseInt(this.state.hazardRatingSlopeHeightAxialLength))? 0: parseInt(this.state.hazardRatingSlopeHeightAxialLength),
				hazardRatingLandslideId:hazardRatingLandslideId,
  				hazardRatingRockfallId:hazardRatingRockfallId,
				routeTrailWidth:isNaN(parseInt(this.state.routeTrailWidth))? 0: parseInt(this.state.routeTrailWidth),
				humanExFactor:isNaN(parseInt(this.state.humanExFactor))? 0: parseInt(this.state.humanExFactor),
				percentDsd:isNaN(parseInt(this.state.percentDsd))? 0: parseInt(this.state.percentDsd),
				rWImpacts:isNaN(parseInt(this.state.rWImpacts))? 0: parseInt(this.state.rWImpacts),
				enviroCultImpacts:isNaN(parseInt(this.state.enviroCultImpacts))? 0: parseInt(this.state.enviroCultImpacts),
				maintComplexity:isNaN(parseInt(this.state.maintComplexity))? 0: parseInt(this.state.maintComplexity),
				eventCost:isNaN(parseInt(this.state.eventCost))? 0: parseInt(this.state.eventCost),
				hazardTotal:isNaN(hazardTotal)?0:parseInt(hazardTotal),
				riskTotal:isNaN(parseInt(this.state.riskTotal))? 0: parseInt(this.state.riskTotal),
				totalScore:isNaN(parseInt(this.state.totalScore))? 0: parseInt(this.state.totalScore),
				slopeStatus:slopeStatus,
  				email:'root@email.com',
  				},true);
				
    			//comment schema
    			let comment = realm.create('COMMENTS',{
    				id: this.state.commentId,
    				comment:this.state.comments,		
    			},true);
				
				//fmlalink schema
	  	  		let fmlalink = realm.create('FMLA_LINK',{
	  	  			id: this.state.fmlaLinkId,
	  	  			fmlaName:this.state.fmlaName,
	  	  			fmlaId:this.state.fmlaId,
	  	  			fmlaDescription:this.state.fmlaDescription,
	  	  		},true);
				
			//hazardlinks schema update
		
				let hazardlinks = realm.objects('HAZARD_LINK').filtered('id='+ parseInt(this.state.hazardLink));
				var updateKey = 0;
				//alert("comment"+dataHazardType[1].hazardLink)
				//function is checking if the selected array of hazard type changed or not
				function checkArray(element){
					for(let i=0;i<hazardlinks.length;i++){
						return hazardlinks[i].hazardLink == element;
					}
				}
			
				if(this.state.hazardType.findIndex(checkArray)==-1){
					updateKey = 1;
				}
				//alert(updateKey);
			
				if(updateKey == 1){
				realm.delete(hazardlinks);
	
				for(let i = 0; i < this.state.hazardType.length; i++){
					this.state.hazardType[i]['value']
				let	hazardlink = realm.create('HAZARD_LINK',{
						id: parseInt(this.state.hazardLink),
						hazardLink:parseInt(this.state.hazardType[i]['value']),
	
					},true);
				
			
					}//for 
				}//if
				
				//save LANDSLIDE_PRILIMINARY_RATING
	  	  		let prelimLandslide = realm.create('LANDSLIDE_PRILIMINARY_RATING',{
	  	  			id: parseInt(this.state.preliminaryRatingLandslideId),
					roadWidthAffected:isNaN(parseInt(this.state.prelimLandslideRoadWidthAffected))?0:parseInt(this.state.prelimLandslideRoadWidthAffected),
					slideErosionEffects:isNaN(parseInt(this.state.prelimLandslideSlideErosionEffects))?0:parseInt(this.state.prelimLandslideSlideErosionEffects),
					lengthAffected:isNaN(parseInt(this.state.prelimLandslideLengthAffected))?0:parseInt(this.state.prelimLandslideLengthAffected),
		  		},true);
				
				//save ROCKFALL_PRILIMINARY_RATING
	  			let prelimRockfall = realm.create('ROCKFALL_PRILIMINARY_RATING',{
	  				id: parseInt(this.state.preliminaryRatingRockfallId),
					ditchEff:isNaN(parseInt(this.state.prelimRockfallDitchEff))?0:parseInt(this.state.prelimRockfallDitchEff),
					rockfallHistory:isNaN(parseInt(this.state.prelimRockfallRockfallHistory))?0:parseInt(this.state.prelimRockfallRockfallHistory),
					blockSizeEventVol:isNaN(parseInt(this.state.prelimRockfallBlockSizeEventVol))?0:parseInt(this.state.prelimRockfallBlockSizeEventVol),
				},true);
				
				 //saveHazardLandslide
	  			let hazardLandslide = realm.create('LANDSLIDE_HAZARD_RATING',{
	  				id: parseInt(this.state.hazardRatingLandslideId),
					thawStability:isNaN(parseInt(this.state.hazardLandslideThawStability))?0:parseInt(this.state.hazardLandslideThawStability),
					maintFrequency:isNaN(parseInt(this.state.hazardLandslideMaintFrequency))?0:parseInt(this.state.hazardLandslideMaintFrequency),
					movementHistory:isNaN(parseInt(this.state.hazardLandslideMovementHistory))?0:parseInt(this.state.hazardLandslideMovementHistory),
		
	  				},true);
					
					
					//save ROCKFALL_HAZARD_RATING
		  			let hazardRockfall = realm.create('ROCKFALL_HAZARD_RATING',{
		  				id: parseInt(this.state.hazardRatingRockfallId),
						maintFrequency:isNaN(parseInt(this.state.hazardRockfallMaintFrequency))?0:parseInt(this.state.hazardRockfallMaintFrequency),
						caseOneStrucCond:isNaN(parseInt(this.state.caseOneStrucCond))?0:parseInt(this.state.caseOneStrucCond),
						caseOneRockFriction:isNaN(parseInt(this.state.caseOneRockFriction))?0:parseInt(this.state.caseOneRockFriction),
						caseTwoStrucCondition:isNaN(parseInt(this.state.caseTwoStrucCondition))?0:parseInt(this.state.caseTwoStrucCondition),
						caseTwoDiffErosion:isNaN(parseInt(this.state.caseTwoDiffErosion))?0:parseInt(this.state.caseTwoDiffErosion),		
					},true);
				
  	  	});

  	  } 
	
	       	
  	onButtonPress(){
  	/*	var err = this.validateForm();
		
  		//this.offlineSave();
		
  		if(err == "")
  		{
  			this.offlineSave();
			
  		}
  		else
  		{
  			this.displayError(err);
  		}*/
		
  	}
	
    renderRegion(){
		//this.setState({selectedAgency:value});
		//alert(value)
    	items=[];
		for(let item of dataRegion){
			let text = item;
			if(text.indexOf(this.state.selectedAgency)!= '-1'){
				text = text.slice(text.indexOf('_')+1,text.length).replace(/_/g,' '); 
				items.push(<Picker.Item key={item} value={item} label={text}/>)
		}
	}
		return items;
    } 
	renderLocal(){
		//alert(this.state.selectedRegion)
    	items=[];
		for(let item of dataLocal){
			let text = item;
			if(text.indexOf(this.state.selectedRegion)!= '-1'){
				text = text.slice(this.state.selectedRegion.length+1,text.length).replace(/_/g,' '); 
				items.push(<Picker.Item key={item} value={item} label={text}/>)
		}
	}
		return items;
	}
	//setting selected hazardtypes
	onSelectionsChange = (hazardType) => {
	    // selectedFruits is array of { label, value }
	    this.setState({ hazardType:hazardType },()=>{
			this.saveSiteInfo();
	    	//alert(this.state.hazardType[0]['label'])
	    })
		
	  }
	 //setting state to default for management area
	 onValueChange = (value) => {
	    this.setState({selectedAgency:value},()=>{
	    	this.saveSiteInfo()
	    })
		if(value == 'search_0'){
	   	 	this.setState({selectedRegion:'search_0'})			
		}
	  }
	  //render Side dropdown
      renderSide(){
  		//this.setState({selectedAgency:value});
  		//alert(value)
      	items=[];
  		for(let item of dataSide){
  			let text = item;
  				items.push(<Picker.Item key={item} value={item} label={item}/>)
  		}
  		return items;
      }
	  
	  //render weather dropdown
      renderWeather(){
  		//this.setState({selectedAgency:value});
  		//alert(value)
      	items=[];
  		for(let item of dataWeather){
  			let text = item;
  				items.push(<Picker.Item key={item} value={item} label={item}/>)
  		}
  		return items;
      }
	  //getCoordinates start
	  getBeginCoordinates(){
		  navigator.geolocation.getCurrentPosition(
		        (position) => {
		          var beginCoordinateLongitude = JSON.stringify(position.coords.longitude);
				  var beginCoordinateLatitude = JSON.stringify(position.coords.latitude);
				  //alert(beginCoordinateLongitude)
		          this.setState({beginCoordinateLongitude});
				  this.setState({beginCoordinateLatitude});
		        },
		        (error) => alert(error.message),
		        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
		      );
	  }
	  //getCoordinates end
	  getEndCoordinates(){
		  navigator.geolocation.getCurrentPosition(
		        (position) => {
		          var endCoordinateLongitude = JSON.stringify(position.coords.longitude);
				  var endCoordinateLatitude = JSON.stringify(position.coords.latitude);
				  //alert(beginCoordinateLongitude)
		          this.setState({endCoordinateLongitude});
				  this.setState({endCoordinateLatitude});
		        },
		        (error) => alert(error.message),
		        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
		      );
	  }
	  //render soleAccessRoute dropdown
      renderSoleAccessRoute(){
  		//this.setState({selectedAgency:value});
  		//alert(value)
      	items=[];
  		for(let item of dataYesNo){
  			let text = item;
  				items.push(<Picker.Item key={item} value={item} label={item}/>)
  		}
  		return items;
      }
	  //render fixesPresent dropdown
      renderFixesPresent(){
  		//this.setState({selectedAgency:value});
  		//alert(value)
      	items=[];
  		for(let item of dataYesNo){
  			let text = item;
  				items.push(<Picker.Item key={item} value={item} label={item}/>)
  		}
  		return items;
      }
	  //prelim_rockfall_block_size_event_vol
	  blkSizeVolume(value){
		 //alert(value) 
		 //  if(this.state.rockfallLandslide == 'rockfall'){
	  	if (value == 'rockfall') {
	  		var blkSize = Math.round(Math.pow(3, this.state.blkSize));
	  		var volSize = Math.round(Math.pow(3, this.state.volume/ 3));
	  		if(blkSize > 100)
	  			blkSize = 100;
	  		if(volSize > 100)
	  			volSize = 100;
			//alert(blkSize +" "+volSize)
	  		if(blkSize > volSize)
	  		{
				this.setState({prelimRockfallBlockSizeEventVol:blkSize.toString()},()=>{
					//this.prelimRockfallRating(value);
					//this.rockfallHazardTotal(value);
				});
	  		}
	  		else
	  		{
				this.setState({prelimRockfallBlockSizeEventVol:volSize.toString()},()=>{
					//this.prelimRockfallRating(value);
					//this.rockfallHazardTotal(value);
				});
	  		}
	  	}
	  	else {
	  		this.setState({prelimRockfallBlockSizeEventVol:'0'},()=>{
	  			//this.prelimRockfallRating(value);
				//this.rockfallHazardTotal(value);
	  		});
	  	}
	  }
	  //prelim_landslide_length_affected
	  lengthAffected(value){
	  	if(value == 'landslide') {
				
	  		var val = Math.pow(3, Math.sqrt((this.state.lengthAffected/25)));
			//alert(val);	
	  		//$("#prelim_landslide_length_affected").val((val > 100) ? 100 : Math.round(val));
			this.setState({prelimLandslideLengthAffected:(val > 100) ? '100' : Math.round(val).toString()},()=>{
				//alert(this.state.prelimLandslideLengthAffected)
				//this.prelimLandslideRating(value)
			});
	  	}
	  	else {
	  		this.setState({prelimLandslideLengthAffected:'0'},()=>{
			//	this.prelimLandslideRating(value)
	  		//	alert(this.state.prelimLandslideLengthAffected)
	  		});
	  	}
	  }
	 //aadt_usage
	  prelimAadt(value){
	  	if(value == true){
	  		var calc_val = Math.round(Math.pow(3, Math.sqrt((this.state.aadt/50))) );
	  		if(calc_val > 100)
	  			calc_val = 100;
			if(parseInt(this.state.aadtUsage) == calc_val || parseInt(this.state.aadtUsage) == 0){
				this.setState({aadtUsage:calc_val.toString()},()=>{
					//alert(this.state.aadtUsage)
				//	this.prelimLandslideRating(this.state.rockfallLandslide)
				});
			}
	  		//$("#aadt_usage").val(calc_val);
	  	}
	  }
	  //PRELIMINARY RATING
	  prelimRating(value){
	  	if(value == 'landslide')
			this.setState({prelimRating:Math.round(this.state.prelimRatingLandslideTotal).toString()},()=>{}) 
	  		//$("#prelim_rating").val(Math.round($("#prelim_rating_landslide_total").val()));
	  	else
			this.setState({prelimRating:Math.round(this.state.prelimRatingRockfallRotal).toString()},()=>{}) 
	  		
	  		//$("#prelim_rating").val(Math.round($("#prelim_rating_rockfall_total").val()));
	
	  }
	  //LANDSLIDES TOTAL
	  prelimLandslideRating(value){
	  	var sum = isNaN(parseInt(this.state.prelimLandslideRoadWidthAffected)) ? 0 : parseInt(this.state.prelimLandslideRoadWidthAffected);
	  	sum += isNaN(parseInt(this.state.prelimLandslideSlideErosionEffects)) ? 0 : parseInt(this.state.prelimLandslideSlideErosionEffects);
	  	sum += isNaN(parseInt(this.state.prelimLandslideLengthAffected)) ? 0 : parseInt(this.state.prelimLandslideLengthAffected);
	  	sum += isNaN(parseInt(this.state.impactOnUse)) ? 0 : parseInt(this.state.impactOnUse);
  	  if(this.state.aadtUsageCalcCheckbox == true){
  	  	sum += isNaN(parseInt(this.state.aadtUsage)) ? 0 : parseInt(this.state.aadtUsage);
		  
	  }
	  	
	  	if(value == 'landslide')
			//alert(this.state.prelimLandslideLengthAffected);
			this.setState({prelimRatingLandslideTotal:Math.round(sum).toString()},()=>{
				this.prelimRating(value);
			})
	  		//$("#prelim_rating_landslide_total").val(Math.round(sum));
	
	  	
	  }
	  //ROCKFALL TOTAL
	  prelimRockfallRating(value){
  	  	var sum = isNaN(parseInt(this.state.prelimRockfallDitchEff)) ? 0 : parseInt(this.state.prelimRockfallDitchEff);
  	  	sum += isNaN(parseInt(this.state.prelimRockfallRockfallHistory)) ? 0 : parseInt(this.state.prelimRockfallRockfallHistory);
  	  	sum += isNaN(parseInt(this.state.prelimRockfallBlockSizeEventVol)) ? 0 : parseInt(this.state.prelimRockfallBlockSizeEventVol);
  	  	sum += isNaN(parseInt(this.state.impactOnUse)) ? 0 : parseInt(this.state.impactOnUse);
		if(this.state.aadtUsageCalcCheckbox == true){
	  	  	sum += isNaN(parseInt(this.state.aadtUsage)) ? 0 : parseInt(this.state.aadtUsage);
	
		}
  	  	
  	  	if(value == 'rockfall')
  			this.setState({prelimRatingRockfallRotal:Math.round(sum).toString()},()=>{
  				this.prelimRating(value); 
  			})
  	  		//$("#prelim_rating_landslide_total").val(Math.round(sum));
	
  	  	
	  }
	  //annualRainfall
	  annualRainfall(){ 
			//startAnnualRainfall:'',
			//endAnnualRainfall:'',
	  	//var avg = Math.round((parseInt(this.state.startAnnualRainfall) + parseInt(this.state.endAnnualRainfall))/2);
		if(parseInt(this.state.startAnnualRainfall) > parseInt(this.state.endAnnualRainfall)){
			var avg = parseInt(this.state.startAnnualRainfall);
		}else{
			var avg = parseInt(this.state.endAnnualRainfall);
		}
	  	var rating = 3;
	  	if(avg > 10)
	  		rating = 9;
	  	if(avg > 30)
	  		rating = 27;
	  	if(avg > 60)
	  		rating = 81;
		this.setState({hazardRatingAnnualRainfall:rating.toString()},()=>{
			
		})
	  	//$("#hazard_rating_annual_rainfall").val(rating);
	  }
	  //slopeHeightAxialLength
	  slopeHeightAxialLength() {	
	  	var val = Math.round(Math.pow(3, this.state.slopeHeightAxialLength/25));	
	  	if(val > 100)
	  		val = 100;
		this.setState({hazardRatingSlopeHeightAxialLength:val.toString()},()=>{
			
		})
	  	//$("#hazard_rating_slope_height_axial_length").val(val);
	  }
	  //ROCKFALL HAZARD TOTAL
	  rockfallHazardTotal(value){
  	  	var value = 0;
  		//alert("value"+this.state.prelimLandslideRoadWidthAffected);
  	  //	if(this.state.prelimLandslideRoadWidthAffected =='')
  	  //	{
  	  		value  += isNaN(parseInt(this.state.prelimRockfallDitchEff)) ? 0 : parseInt(this.state.prelimRockfallDitchEff); 
  			value  += isNaN(parseInt(this.state.prelimRockfallRockfallHistory)) ? 0 : parseInt(this.state.prelimRockfallRockfallHistory);
  	  		value  += isNaN(parseInt(this.state.prelimRockfallBlockSizeEventVol)) ? 0 : parseInt(this.state.prelimRockfallBlockSizeEventVol);
  			value  += isNaN(parseInt(this.state.slopeDrainage)) ? 0 : parseInt(this.state.slopeDrainage); 
  	  		value  += isNaN(parseInt(this.state.hazardRatingAnnualRainfall)) ? 0 : parseInt(this.state.hazardRatingAnnualRainfall);
  			value  += isNaN(parseInt(this.state.hazardRatingSlopeHeightAxialLength)) ? 0 : parseInt(this.state.hazardRatingSlopeHeightAxialLength);
  	  		value  += isNaN(parseInt(this.state.hazardRockfallMaintFrequency)) ? 0 : parseInt(this.state.hazardRockfallMaintFrequency);
				
  			var	caseOne = isNaN(parseInt(this.state.caseOneStrucCond)) ? 0 : parseInt(this.state.caseOneStrucCond);
  			caseOne 	+= isNaN(parseInt(this.state.caseOneRockFriction)) ? 0 : parseInt(this.state.caseOneRockFriction);
  			var caseTwo = isNaN(parseInt(this.state.caseTwoStrucCondition)) ? 0 : parseInt(this.state.caseTwoStrucCondition);
  			caseTwo     +=  isNaN(parseInt(this.state.caseTwoDiffErosion)) ? 0 : parseInt(this.state.caseTwoDiffErosion);
			
  	  		if(caseOne > caseTwo)
  	  		{
  	  			value += caseOne;
  	  		}
  	  		else
  	  		{
  	  			value += caseTwo;
  	  		}
  	  //	}
  		this.setState({hazardRatingRockfallTotal:Math.round(value).toString()},()=>{
  			//alert("value"+value+",hazardRatingRockfallTotal"+this.state.hazardRatingRockfallTotal);
  			//alert(this.state.hazardRatingRockfallTotal);
  			this.totalScore();
			this.saveSiteInfo();
  		})
  	  	//$("#hazard_rating_rockfall_total").val(Math.round(value));
  	  	//total_score();
	  }
	  //LANDSLIDE HAZARD TOTAL
	  landslideHazardTotal(){
	  	var value = 0;
	  	if(this.state.prelimLandslideRoadWidthAffected != "0")
	  	{//isNaN(parseInt(this.state.hazardLandslideMovementHistory)) ? 0 : parseInt(this.state.hazardLandslideMovementHistory)
	  		value += isNaN(parseInt(this.state.prelimLandslideRoadWidthAffected)) ? 0 : parseInt(this.state.prelimLandslideRoadWidthAffected); 
			value += isNaN(parseInt(this.state.prelimLandslideSlideErosionEffects)) ? 0 : parseInt(this.state.prelimLandslideSlideErosionEffects);
	  		value += isNaN(parseInt(this.state.prelimLandslideLengthAffected)) ? 0 : parseInt(this.state.prelimLandslideLengthAffected);
			value += isNaN(parseInt(this.state.slopeDrainage)) ? 0 : parseInt(this.state.slopeDrainage);
			value += isNaN(parseInt(this.state.hazardRatingAnnualRainfall)) ? 0 : parseInt(this.state.hazardRatingAnnualRainfall);
	  		value += isNaN(parseInt(this.state.hazardRatingSlopeHeightAxialLength)) ? 0 : parseInt(this.state.hazardRatingSlopeHeightAxialLength);
			value += isNaN(parseInt(this.state.hazardLandslideThawStability)) ? 0 : parseInt(this.state.hazardLandslideThawStability);
	  		value += isNaN(parseInt(this.state.hazardLandslideMaintFrequency)) ? 0 : parseInt(this.state.hazardLandslideMaintFrequency);
			value += isNaN(parseInt(this.state.hazardLandslideMovementHistory)) ? 0 : parseInt(this.state.hazardLandslideMovementHistory);
	  	}
		this.setState({hazardRatingLandslideTotal:Math.round(value).toString()},()=>{
			this.totalScore();
		})
	  	//$("#hazard_rating_landslide_total").val(Math.round(value));
	  	//total_score();
	  }
	  //TOTAL SCORE
	  totalScore(){
	  	var risk_total = isNaN(parseInt(this.state.riskTotal)) ? 0 : parseInt(this.state.riskTotal);
	  	var landslide_hazard_total = isNaN(parseInt(this.state.hazardRatingLandslideTotal)) ? 0 : parseInt(this.state.hazardRatingLandslideTotal);
	  	var rockfall_hazard_total = isNaN(parseInt(this.state.hazardRatingRockfallTotal)) ? 0 : parseInt(this.state.hazardRatingRockfallTotal);
	  	var hazard_total = landslide_hazard_total;
	  	if(rockfall_hazard_total > landslide_hazard_total)
	  		hazard_total = rockfall_hazard_total;
		
		this.setState({totalScore:Math.round(risk_total + hazard_total).toString()},()=>{
			//this.totalScore();
			this.saveSiteInfo();
		})
	  	//$("#total_score").val(Math.round(risk_total + hazard_total));
	  }
	  //routeTrailWidth
	  routeTrailWidth(){ 
	  	var road_or_trail = this.state.roadOrTrail;
	  	var road = Math.round(this.state.roadTrailWidth);
	  	var trail = road;
	  	// var road = Math.round(Math.pow(3, (44-$("#road_trail_width").val())/8));
	  	// var trail = Math.round(Math.pow(3, (18-$("#road_trail_width").val())/4));
	  	if(road_or_trail == "r" || road_or_trail == "R") //Road Traffic
	  	{
	  		road = Math.round(Math.pow(3,(44-road)/8));
	  		road = Math.min(road, 100);
			this.setState({routeTrailWidth:road.toString()},()=>{
				//this.totalScore();
			})
	  		//$("#route_trail_width").val(road);
	  	}
	  	else if(road_or_trail == "t" || road_or_trail == "T")//Trail Traffic
	  	{
	  		trail = Math.round(Math.pow(3,(18-trail)/4));
	  		trail = Math.min(trail, 100);
			this.setState({routeTrailWidth:trail.toString()},()=>{
				//this.totalScore();
			})
	  		//$("#route_trail_width").val(trail);
	  	} else {
			this.setState({routeTrailWidth:'0'},()=>{
				//this.totalScore();
			})
	  		//$("#route_trail_width").val(0);
	  	}
	  }
	  //humanExposureFactor
	  humanExposureFactor(){
	  	var calc_val = this.state.aadt/24;
	  	calc_val = calc_val * this.state.lengthAffected / 5280 * 100;
	  	calc_val = calc_val / this.state.speedLimit;
	  	calc_val = calc_val / 12.5;
	  	calc_val = Math.round(Math.pow(3,calc_val));
	
	  	calc_val = Math.min(calc_val, 100);
	  	calc_val = Math.max(calc_val, 0);
		this.setState({humanExFactor:calc_val.toString()},()=>{
			//this.totalScore();
		})
	  //	$("#human_ex_factor").val( calc_val );
	  }
	  //percentDsd
	  percentDsd(){
	  	var value = 0;
		if(this.state.roadOrTrail == "r" || this.state.roadOrTrail == "R"){
		  	if(this.state.speedLimit <= 25)
		  		value = (120 - (this.state.sightDistance / 375) * 100)/20;
		  	else if(this.state.speedLimit <= 30)
		  		value = (120 - (this.state.sightDistance / 450) * 100)/20;
		  	else if(this.state.speedLimit <= 35)	
		  		value = (120 - (this.state.sightDistance / 525) * 100)/20;	
		  	else if(this.state.speedLimit <= 40)
		  		value = (120 - (this.state.sightDistance / 600) * 100)/20;
		  	else if(this.state.speedLimit <= 45)
		  		value = (120 - (this.state.sightDistance / 675) * 100)/20;
		  	else if(this.state.speedLimit <= 50)
		  		value = (120 - (this.state.sightDistance / 750) * 100)/20;
		  	else if(this.state.speedLimit <= 55)
		  		value = (120 - (this.state.sightDistance / 875) * 100)/20;
		  	else if(this.state.speedLimit <= 60)
		  		value = (120 - (this.state.sightDistance / 1000) * 100)/20;
		  	else //if($("#speed_limit").val() == 65)	
		  		value = (120 - (this.state.sightDistance / 1050) * 100)/20;	
		  	value = Math.pow(3, value);
		  	value = Math.min(value, 100);
		  	value = Math.max(value, 0);
		}
	  	
		this.setState({percentDsd:Math.round(value).toString()},()=>{
			//this.totalScore();
		})
		
	  //	$("#percent_dsd").val(Math.round(value));
	  }
	  //RISK TOTALS
	  riskTotal(){
	  	var impact_on_use = isNaN(parseInt(this.state.impactOnUse)) ? 0 : parseInt(this.state.impactOnUse);
	  	var aadt_usage = isNaN(parseInt(this.state.aadtUsage)) ? 0 : parseInt(this.state.aadtUsage);
	  	var route_trail_width = isNaN(parseInt(this.state.routeTrailWidth)) ? 0 : parseInt(this.state.routeTrailWidth);
	  	var human_ex_factor = isNaN(parseInt(this.state.humanExFactor)) ? 0 : parseInt(this.state.humanExFactor);
	  	var percent_dsd = isNaN(parseInt(this.state.percentDsd)) ? 0 : parseInt(this.state.percentDsd);
	  	var r_w_impacts = isNaN(parseInt(this.state.rWImpacts)) ? 0 : parseInt(this.state.rWImpacts);
	  	var enviro_cult_impacts = isNaN(parseInt(this.state.enviroCultImpacts)) ? 0 : parseInt(this.state.enviroCultImpacts);
	  	var maint_complexity = isNaN(parseInt(this.state.maintComplexity)) ? 0 : parseInt(this.state.maintComplexity);
	  	var event_cost = isNaN(parseInt(this.state.eventCost)) ? 0 : parseInt(this.state.eventCost);

		this.setState({riskTotal:Math.round(impact_on_use + aadt_usage + route_trail_width 
			+ human_ex_factor + percent_dsd + r_w_impacts + enviro_cult_impacts 
			+ maint_complexity + event_cost).toString()},()=>{
			this.totalScore();
		})
	  //	$("#risk_total").val(Math.round(impact_on_use + aadt_usage + route_trail_width 
		//	+ human_ex_factor + percent_dsd + r_w_impacts + enviro_cult_impacts 
		//	+ maint_complexity + event_cost));
	  	//total_score();
	  }
	  //onBlur Input Check
	  onBlurInputCheck(value){
		 // onBlur={()=>this.onBlurCheck('selectedAgency')}
		  
		  if(value == 'selectedAgency'){
  		    if(this.state.selectedAgency.match(umbrella_agency_regex) === null)
  		    {
  		      //if($("#umbrella_agency").css("background-color") != 'rgb(255, 0, 0)')
  		        alert(umbrella_agency_format_S);
  		      //$("#umbrella_agency").css("background-color", "red");
  		    }
  		  //  else
  		    //  $("#umbrella_agency").css("background-color", "white");
		  
		  } 
		  if(value == 'selectedRegion'){
  		    if(this.state.selectedRegion.match(regional_admin_regex) === null)
  		    {
  		     // if($("#regional_admin").css("background-color") != 'rgb(255, 0, 0)')
  		        alert(regional_admin_format_S);
  		      //$("#regional_admin").css("background-color", "red");
  		    }
  		    //else
  		     // $("#regional_admin").css("background-color", "white");
		  
  		    }
		
  		  if(value == 'selectedLocal'){
  		    if(this.state.selectedLocal.match(local_admin_regex) === null)
  		    {
  		      //if($("#local_admin").css("background-color") != 'rgb(255, 0, 0)')
  		        alert(local_admin_format_S);
  		     // $("#local_admin").css("background-color", "red");
  		    }
  		   // else
  		    //  $("#local_admin").css("background-color", "white");
		  
    		    }	
				
				if(value == 'date'){
					if(this.state.date.match(date_regex) === null)
					{
						//if($("#date").css("background-color") != 'rgb(255, 0, 0)')
							alert(date_format_S);
						//$("#date").css("background-color", "red");
					}
					//else
					//	$("#date").css("background-color", "white");
				
				}		
				
				if(value == 'rtNo'){
					if(this.state.rtNo.match(road_trail_number_regex) === null)
					{
						//if($("#road_trail_number").css("background-color") != 'rgb(255, 0, 0)')
							alert(road_trail_number_format_S);
						//$("#road_trail_number").css("background-color", "red");
					}
					//else
						//$("#road_trail_number").css("background-color", "white");
				
				}
				
				if(value == 'roadOrTrail'){
					if(this.state.roadOrTrail.match(road_or_trail_regex) === null)
					{
						//if($("#road_or_trail").css("background-color") != 'rgb(255, 0, 0)')
							alert(road_or_trail_format_S);
						//$("#road_or_trail").css("background-color", "red");
					}
					//else
					//	$("#road_or_trail").css("background-color", "white");
				
				}
				
				if(value == 'rtClass'){
					if(this.state.rtClass.match(road_trail_class_regex) === null)
					{
						//if($("#road_trail_class").css("background-color") != 'rgb(255, 0, 0)')
							alert(road_trail_class_format_S);
						//$("#road_trail_class").css("background-color", "red");
					}
					//else
					//	$("#road_trail_class").css("background-color", "white");
				
				}
				
				if(value == 'rater'){
					if(this.state.rater.match(rater_regex) === null)
					{
						//if($("#rater").css("background-color") != 'rgb(255, 0, 0)')
							alert(rater_format_S);
						//$("#rater").css("background-color", "red");
					}
					//else
					//	$("#rater").css("background-color", "white");
				
				}
				
				if(value == 'beginMileMarker'){
					if(this.state.beginMileMarker.match(begin_mile_marker_regex) === null)
					{
						//if($("#begin_mile_marker").css("background-color") != 'rgb(255, 0, 0)')
							alert(begin_mile_marker_format_S);
						//$("#begin_mile_marker").css("background-color", "red");
					}
					//else
					//	$("#begin_mile_marker").css("background-color", "white");
				
				}
				
				if(value == 'endMileMarker'){
					if(this.state.endMileMarker.match(end_mile_marker_regex) === null)
					{
						//if($("#end_mile_marker").css("background-color") != 'rgb(255, 0, 0)')
							alert(end_mile_marker_format_S);
						//$("#end_mile_marker").css("background-color", "red");
					}
					//else
					//	$("#end_mile_marker").css("background-color", "white");
				
				}
				
				if(value == 'side'){
					if(this.state.side.match(side_regex) === null)
					{
						//if($("#side").css("background-color") != 'rgb(255, 0, 0)')
							alert(side_format_S);
						//$("#side").css("background-color", "red");
					}
					//else
					//	$("#side").css("background-color", "white");
				
				}
				
				if(value == 'weather'){
					if(this.state.weather.match(weather_regex) === null)
					{
						//if($("#weather").css("background-color") != 'rgb(255, 0, 0)')
							alert(weather_format_S);
						//$("#weather").css("background-color", "red");
					}
					//else
					//	$("#weather").css("background-color", "white");
				
				}
				
				if(value == 'hazardType'){
  				  //var test =$("#hazard_type").val();
  				  //alert($("#hazard_type option:selected").length);
  					if(this.state.hazardType.length == 0)
  					{
  						//if($("#hazard_type").css("background-color") != 'rgb(255, 0, 0)')
  							alert(hazard_type_format_S);
  						//$("#hazard_type").css("background-color", "red");
  					}
  					//else
  					//	$("#hazard_type").css("background-color", "white");
				
				}
				
				if(value == 'beginCoordinateLatitude'){
					if(this.state.beginCoordinateLatitude.match(begin_coordinate_latitude_regex) === null)
					{
						//if($("#begin_coordinate_latitude").css("background-color") != 'rgb(255, 0, 0)')
							alert(begin_coordinate_latitude_format_S);
						//$("#begin_coordinate_latitude").css("background-color", "red");
					}
					//else
					//	$("#begin_coordinate_latitude").css("background-color", "white");
				
				}
				
				if(value == 'beginCoordinateLongitude'){
					if(this.state.beginCoordinateLongitude.match(begin_coordinate_longitude_regex) === null)
					{
						//if($("#begin_coordinate_longitude").css("background-color") != 'rgb(255, 0, 0)')
							alert(begin_coordinate_longitude_format_S);
						//$("#begin_coordinate_longitude").css("background-color", "red");
					}
					//else
					//	$("#begin_coordinate_longitude").css("background-color", "white");
				
				}
				
				if(value == 'endCoordinateLatitude'){
					if(this.state.endCoordinateLatitude.match(end_coordinate_latitude_regex) === null)
					{
						//if($("#end_coordinate_latitude").css("background-color") != 'rgb(255, 0, 0)')
							alert(end_coordinate_latitude_format_S);
						//$("#end_coordinate_latitude").css("background-color", "red");
					}
					//else
					//	$("#end_coordinate_latitude").css("background-color", "white");
				
				}
				
				if(value == 'endCoordinateLongitude'){
					if(this.state.endCoordinateLongitude.match(end_coordinate_longitude_regex) === null){
						//if($("#end_coordinate_longitude").css("background-color") != 'rgb(255, 0, 0)')
							alert(end_coordinate_longitude_format_S);
						//$("#end_coordinate_longitude").css("background-color", "red");
					}
					//else
					//	$("#end_coordinate_longitude").css("background-color", "white");
				
				}
				
				if(value == 'aadt'){
					if(parseInt(this.state.aadt) != NaN && parseInt(this.state.aadt) >0){
						this.setState({aadtCheck:false});
					}else{
						this.setState({aadtCheck:true});
					}
					
					if(this.state.aadtUsageCalcCheckbox == true){
					if(this.state.aadt.match(aadt_regex) === null){
						//if($("#aadt").css("background-color") != 'rgb(255, 0, 0)')
							alert(aadt_format_S);
						//$("#aadt").css("background-color", "red");
					}
					//else
					//	$("#aadt").css("background-color", "white");
				}
				}
			
				if(value == 'lengthAffected'){
					if(this.state.lengthAffected.match(length_affected_regex) === null){
						//if($("#length_affected").css("background-color") != 'rgb(255, 0, 0)')
							alert(length_affected_format_S);
						//$("#length_affected").css("background-color", "red");
					}
					//else
					//	$("#length_affected").css("background-color", "white");
				
				}
				
				if(value == 'slopeHeightAxialLength'){
					if(this.state.slopeHeightAxialLength.match(slope_height_axial_length_regex) === null){
					//	if($("#slope_height_axial_length").css("background-color") != 'rgb(255, 0, 0)')
							alert(slope_height_axial_length_format_S);
					//	$("#slope_height_axial_length").css("background-color", "red");
					}
					//else
					//	$("#slope_height_axial_length").css("background-color", "white");
				
				}
				
				if(value == 'slopeAngle'){
					if(this.state.slopeAngle.match(slope_angle_regex) === null
						|| this.state.slopeAngle > 90){
						//if($("#slope_angle").css("background-color") != 'rgb(255, 0, 0)')
							alert(slope_angle_format_S);
						//$("#slope_angle").css("background-color", "red");
					}
					//else
					//	$("#slope_angle").css("background-color", "white");
				
				}
				
				if(value == 'sightDistance'){
					if(this.state.sightDistance.match(sight_distance_regex) === null){
					//	if($("#sight_distance").css("background-color") != 'rgb(255, 0, 0)')
							alert(sight_distance_format_S);
						//$("#sight_distance").css("background-color", "red");
					}
					//else
					//	$("#sight_distance").css("background-color", "white");
				
				}
		
				if(value == 'roadTrailWidth'){
					if(this.state.roadTrailWidth.match(road_trail_width_regex) === null){
						//if($("#road_trail_width").css("background-color") != 'rgb(255, 0, 0)')
							alert(road_trail_width_format_S);
						//$("#road_trail_width").css("background-color", "red");
					}
					//else
					//	$("#road_trail_width").css("background-color", "white");
				
				}
				
				if(value == 'speedLimit'){
					if(this.state.speedLimit.match(speed_limit_regex) === null){
						//if($("#speed_limit").css("background-color") != 'rgb(255, 0, 0)')
							alert(speed_limit_format_S);
						//$("#speed_limit").css("background-color", "red");
					}
					//else{
					//	$("#speed_limit").css("background-color", "white");
					//}
				}
				
				if(value == 'minimumDitchWidth'){
					if(this.state.minimumDitchWidth.match(minimum_ditch_width_regex) === null){
					//	if($("#minimum_ditch_width").css("background-color") != 'rgb(255, 0, 0)')
							alert(minimum_ditch_width_format_S);
					//	$("#minimum_ditch_width").css("background-color", "red");
					}
					//else
					//	$("#minimum_ditch_width").css("background-color", "white");
				
				}
				
				if(value == 'maximumDitchWidth'){
					if(this.state.maximumDitchWidth.match(maximum_ditch_width_regex) === null){
					//	if($("#maximum_ditch_width").css("background-color") != 'rgb(255, 0, 0)')
							alert(maximum_ditch_width_format_S);
					//	$("#maximum_ditch_width").css("background-color", "red");
					}
					//else
					//	$("#maximum_ditch_width").css("background-color", "white");
				
				}
				
				
				if(value == 'minimumDitchDepth'){
					if(this.state.minimumDitchDepth.match(minimum_ditch_depth_regex) === null){
						//if($("#minimum_ditch_depth").css("background-color") != 'rgb(255, 0, 0)')
							alert(minimum_ditch_depth_format_S);
						//$("#minimum_ditch_depth").css("background-color", "red");
					}
					//else
					//	$("#minimum_ditch_depth").css("background-color", "white");
				
				}
				
				if(value == 'maximumDitchDepth'){
					if(this.state.maximumDitchDepth.match(maximum_ditch_depth_regex) === null){
					//	if($("#maximum_ditch_depth").css("background-color") != 'rgb(255, 0, 0)')
							alert(maximum_ditch_depth_format_S);
					//	$("#maximum_ditch_depth").css("background-color", "red");
					}
					//else
					//	$("#maximum_ditch_depth").css("background-color", "white");
				
				}
				
				if(value == 'firstBeginDitchSlope'){
					if(this.state.firstBeginDitchSlope.match(first_begin_ditch_slope_regex) === null){
					//	if($("#first_begin_ditch_slope").css("background-color") != 'rgb(255, 0, 0)')
							alert(first_begin_ditch_slope_format_S);
					//	$("#first_begin_ditch_slope").css("background-color", "red");
					}
					//else
					//	$("#first_begin_ditch_slope").css("background-color", "white");
				
				}
				
				if(value == 'firstEndDitchSlope'){
					if(this.state.firstEndDitchSlope.match(first_end_ditch_slope_regex) === null){
						//if($("#first_end_ditch_slope").css("background-color") != 'rgb(255, 0, 0)')
							alert(first_end_ditch_slope_format_S);
						//$("#first_end_ditch_slope").css("background-color", "red");
					}
					//else
					//	$("#first_end_ditch_slope").css("background-color", "white");
				
				}
				
				if(value == 'secondBeginDitchSlope'){
					if(this.state.secondBeginDitchSlope.match(second_begin_ditch_slope_regex) === null){
						//if($("#second_begin_ditch_slope").css("background-color") != 'rgb(255, 0, 0)')
							alert(second_begin_ditch_slope_format_S);
						//$("#second_begin_ditch_slope").css("background-color", "red");
					}
					//else
					//	$("#second_begin_ditch_slope").css("background-color", "white");
				
				}
				
				if(value == 'secondEndDitchSlope'){
					if(this.state.secondEndDitchSlope.match(second_end_ditch_slope_regex) === null){
					//	if($("#second_end_ditch_slope").css("background-color") != 'rgb(255, 0, 0)')
							alert(second_end_ditch_slope_format_S);
					//	$("#second_end_ditch_slope").css("background-color", "red");
					}
					//else
					//	$("#second_end_ditch_slope").css("background-color", "white");
				
				}
				
				if(value == 'blkSize'){
					if(this.state.blkSize.match(blk_size_regex) === null){
						//if($("#blk_size").css("background-color") != 'rgb(255, 0, 0)')
							alert(blk_size_format_S);
						//$("#blk_size").css("background-color", "red");
					}
					//else
					//	$("#blk_size").css("background-color", "white");
				
				}
				
				if(value == 'volume'){
					if(this.state.volume.match(volume_regex) === null){
					//	if($("#volume").css("background-color") != 'rgb(255, 0, 0)')
							alert(volume_format_S);
					//	$("#volume").css("background-color", "red");
					}
					//else
					//	$("#volume").css("background-color", "white");
				
				}
				
				if(value == 'startAnnualRainfall'){
					if(this.state.startAnnualRainfall.match(start_annual_rainfall_regex) === null){
						//if($("#start_annual_rainfall").css("background-color") != 'rgb(255, 0, 0)')
							alert(start_annual_rainfall_format_S);
						//$("#start_annual_rainfall").css("background-color", "red");
					}
					//else
					//	$("#start_annual_rainfall").css("background-color", "white");
				
				}
				
				if(value == 'endAnnualRainfall'){
					if(this.state.endAnnualRainfall.match(end_annual_rainfall_regex) === null){
						//if($("#end_annual_rainfall").css("background-color") != 'rgb(255, 0, 0)')
							alert(end_annual_rainfall_format_S);
						//$("#end_annual_rainfall").css("background-color", "red");
					}
					//else
					//	$("#end_annual_rainfall").css("background-color", "white");
				
				}
				
				if(value == 'soleAccessRoute'){
					if(this.state.soleAccessRoute.match(sole_access_route_regex) === null){
						//if($("#sole_access_route").css("background-color") != 'rgb(255, 0, 0)')
							alert(sole_access_route_format_S);
						//$("#sole_access_route").css("background-color", "red");
					}
					//else
					//	$("#sole_access_route").css("background-color", "white");
				
				}
				
				if(value == 'fixesPresent'){
					if(this.state.fixesPresent.match(sole_access_route_regex) === null){
						//if($("#fixes_present").css("background-color") != 'rgb(255, 0, 0)')
							alert(fixes_present_format_S);
						//$("#fixes_present").css("background-color", "red");
					}
					//else
					//	$("#fixes_present").css("background-color", "white");
				
				}
				
		 if(value=='A'){
	 	  	if(this.state.prelimLandslideRoadWidthAffected.match(prelim_landslide_road_width_affected_regex) === null
	 	  	|| this.state.prelimLandslideRoadWidthAffected > 100){
	 	  		//this.state.prelimLandslideRoadWidthAffected.css("background-color", "red");
	 	  		alert(prelim_landslide_road_width_affected_format_S);
				//this.setState({style: {backgroundColor: "red"}});
	 	  	}
	 	  	//else
	 			//alert("ok");
	 	  		//$("#prelim_landslide_road_width_affected").css("background-color", "white");
	  	
		 }
		 if(value=='B'){
		 	if(this.state.prelimLandslideSlideErosionEffects.match(prelim_landslide_slide_erosion_effects_regex) === null
		 	|| this.state.prelimLandslideSlideErosionEffects > 100){
		 		//$("#prelim_landslide_slide_erosion_effects").css("background-color", "red");
		 		alert(prelim_landslide_slide_erosion_effects_format_S);
				//this.setState({style: {backgroundColor: "red"}});
    
		 	}
		 	//else
		 		//$("#prelim_landslide_slide_erosion_effects").css("background-color", "white");
		 }
		 if(value=='C'){
		 	if(this.state.prelimLandslideLengthAffected.match(prelim_landslide_length_affected_regex) === null
		 	|| this.state.prelimLandslideLengthAffected > 100){
		 		//$("#prelim_landslide_length_affected").css("background-color", "red");
		 		alert(prelim_landslide_length_affected_format_S);
				//this.setState({style: {backgroundColor: "red"}});
    
		 	}
		 	//else
		 		//$("#prelim_landslide_length_affected").css("background-color", "white");
		 }
		 
		 if(value=='D'){
 		 	if(this.state.prelimRockfallDitchEff.match(prelim_rockfall_ditch_eff_regex) === null
 		 	|| this.state.prelimRockfallDitchEff > 100){
 		 		//$("#prelim_rockfall_ditch_eff").css("background-color", "red");
 		 		alert(prelim_rockfall_ditch_eff_format_S);
 		 	}
 		 	//else
 		 	//	$("#prelim_rockfall_ditch_eff").css("background-color", "white");
		
		 	 }
		 
		 if(value=='E'){
			 if(this.state.prelimRockfallRockfallHistory.match(prelim_rockfall_rockfall_history_regex) === null
		 	|| this.state.prelimRockfallRockfallHistory > 100){
		 		//$("#prelim_rockfall_rockfall_history").css("background-color", "red");
		 		alert(prelim_rockfall_rockfall_history_format_S);
		 	}
		 	//else
		 	//	$("#prelim_rockfall_rockfall_history").css("background-color", "white");
		 
		 	}
		 
		 if(value=='F'){
 		 	if(this.state.prelimRockfallBlockSizeEventVol.match(prelim_rockfall_block_size_event_vol_regex) === null
 		 	|| this.state.prelimRockfallBlockSizeEventVol > 100){
 		 		//$("#prelim_rockfall_block_size_event_vol").css("background-color", "red");
 		 		alert(prelim_rockfall_block_size_event_vol_format_S);
 		 	}
 		 	//else
 		 		//$("#prelim_rockfall_block_size_event_vol").css("background-color", "white");

	  
		 	}
   		 if(value=='G'){
			if(this.state.impactOnUse.match(impact_on_use_regex) === null
			|| this.state.impactOnUse > 100){
				//$("#impact_on_use").css("background-color", "red");
				alert(impact_on_use_format_S);
			}
			//else
				//$("#impact_on_use").css("background-color", "white");
		
   		 	}
			
      	 if(value=='H'){
			if(this.state.aadtUsage.match(aadt_usage_regex) === null
			|| this.state.aadtUsage > 100){
				//$("#aadt_usage").css("background-color", "red");
				alert(aadt_usage_format_S);
			}
			//else
			//	$("#aadt_usage").css("background-color", "white");
		
      		 	}
			
	     if(value=='aadtUsageCalcCheckbox'){
			if(this.state.aadtUsage.match(aadt_usage_regex) === null
			|| this.state.aadtUsage > 100){
				//$("#aadt_usage").css("background-color", "red");
				alert(aadt_usage_format_S);
			}
			//else
			//	$("#aadt_usage").css("background-color", "white");
		
	      		}
				
	       if(value=='I'){
			if(this.state.slopeDrainage.match(slope_drainage_regex) === null
			|| this.state.slopeDrainage > 100){
				//$("#slope_drainage").css("background-color", "red");
				alert(slope_drainage_format_S);
			}
			//else
			//	$("#slope_drainage").css("background-color", "white");
		
	         		 	}
						
		   if(value=='J'){
			if(this.state.hazardRatingAnnualRainfall.match(hazard_rating_annual_rainfall_regex) === null
			|| this.state.hazardRatingAnnualRainfall > 100){
				//$("#hazard_rating_annual_rainfall").css("background-color", "red");
				alert(hazard_rating_annual_rainfall_format_S);
			}
			//else
			//	$("#hazard_rating_annual_rainfall").css("background-color", "white");
		
			 	         }
						 
		   if(value=='K'){
			if(this.state.hazardRatingSlopeHeightAxialLength.match(hazard_rating_slope_height_axial_length_regex) === null
			|| this.state.hazardRatingSlopeHeightAxialLength > 100){
				//$("#hazard_rating_slope_height_axial_length").css("background-color", "red");
				alert(hazard_rating_slope_height_axial_length_format_S);
			}
			//else
			//	$("#hazard_rating_slope_height_axial_length").css("background-color", "white");
		
			  	         }						 
			if(value=='L'){
				if(this.state.hazardLandslideThawStability.match(hazard_landslide_thaw_stability_regex) === null
				|| this.state.hazardLandslideThawStability > 100){
					//$("#hazard_landslide_thaw_stability").css("background-color", "red");
					alert(hazard_landslide_thaw_stability_format_S);
				}
				//else
				//	$("#hazard_landslide_thaw_stability").css("background-color", "white");
			
			  			  }	
						  
			 if(value=='M'){
				if(this.state.hazardLandslideMaintFrequency.match(hazard_landslide_maint_frequency_regex) === null
				|| this.state.hazardLandslideMaintFrequency > 100){
					//$("#hazard_landslide_maint_frequency").css("background-color", "red");
					alert(hazard_landslide_maint_frequency_format_S);
				}
				//else
				//	$("#hazard_landslide_maint_frequency").css("background-color", "white");
			
			  			  	}
											  
			 if(value=='N'){
				if(this.state.hazardLandslideMovementHistory.match(hazard_landslide_movement_history_regex) === null
				|| this.state.hazardLandslideMovementHistory > 100){
					//$("#hazard_landslide_movement_history").css("background-color", "red");
					alert(hazard_landslide_movement_history_format_S);
				}
				//else
				//	$("#hazard_landslide_movement_history").css("background-color", "white");
			
							 }	
							 
			if(value=='O'){
			 	if(this.state.hazardRockfallMaintFrequency.match(hazard_rockfall_maint_frequency_regex) === null
			 	|| this.state.hazardRockfallMaintFrequency > 100){
			 		//$("#hazard_rockfall_maint_frequency").css("background-color", "red");
			 		alert(hazard_rockfall_maint_frequency_format_S);
			 	}
			 	//else
			 		//$("#hazard_rockfall_maint_frequency").css("background-color", "white");
			 
			  	
				 			  }	
							  
			if(value=='P'){
			 	if(this.state.caseOneStrucCond.match(case_one_struc_cond_regex) === null
			 	|| this.state.caseOneStrucCond > 100){
			 		//$("#case_one_struc_cond").css("background-color", "red");
			 		alert(case_one_struc_cond_format_S); 
			 	}
			 	//else
			 	//	$("#case_one_struc_cond").css("background-color", "white");
			
				 			  	}
												  
			 if(value=='Q'){
			 	if(this.state.caseOneRockFriction.match(case_one_rock_friction_regex) === null
			 	|| this.state.caseOneRockFriction > 100){
			 		//$("#case_one_rock_friction").css("background-color", "red");
			 		alert(case_one_rock_friction_format_S);
			 	}
			 	//else
			 	//	$("#case_one_rock_friction").css("background-color", "white");
			 
				 				}
									
			if(value=='R'){
			 	if(this.state.caseTwoStrucCondition.match(case_two_struc_condition_regex) === null
			 	|| this.state.caseTwoStrucCondition > 100){
			 		//$("#case_two_struc_condition").css("background-color", "red");
			 		alert(case_two_struc_condition_format_S);
			 	}
			 	//else
			 	//	$("#case_two_struc_condition").css("background-color", "white");
			 
				 				 }
								 	
			 if(value=='S'){
			 	if(this.state.caseTwoDiffErosion.match(case_two_diff_erosion_regex) === null
			 	|| this.state.caseTwoDiffErosion > 100){
			 		//$("#case_two_diff_erosion").css("background-color", "red");
			 		alert(case_two_diff_erosion_format_S);
			 	}
			 	//else
			 	//	$("#case_two_diff_erosion").css("background-color", "white");
			  	
				 				 }
				
				if(value=='V'){
				 	if(this.state.routeTrailWidth.match(route_trail_width_regex) === null
				 	|| this.state.routeTrailWidth > 100){
				 		//$("#route_trail_width").css("background-color", "red");
				 		alert(route_trail_width_format_S);
				 	}
				 	//else
				 	//	$("#route_trail_width").css("background-color", "white");
				
								 }			
								 
				 if(value=='W'){
				 	if(this.state.humanExFactor.match(human_ex_factor_regex) === null
				 	|| this.state.humanExFactor > 100){
				 		//$("#human_ex_factor").css("background-color", "red");
				 		alert(human_ex_factor_format_S);
				 	}
				 	//else
				 	//	$("#human_ex_factor").css("background-color", "white");
				 
				 				}	
								
				if(value=='X'){
				 	if(this.state.percentDsd.match(percent_dsd_regex) === null
				 	|| this.state.percentDsd > 100){
				 		//$("#percent_dsd").css("background-color", "red");
				 		alert(percent_dsd_format_S);
				 	}
				 	//else
				 	//	$("#percent_dsd").css("background-color", "white");
				 
								 }	
								 	
				 if(value=='Y'){
				 	if(this.state.rWImpacts.match(r_w_impacts_regex) === null
				 	|| this.state.rWImpacts > 100){
				 		//$("#r_w_impacts").css("background-color", "red");
				 		alert(r_w_impacts_format_S);
				 	}
				 	//else
				 	//	$("#r_w_impacts").css("background-color", "white");
				 		
				 				 }	
								 
				if(value=='Z'){
				 	if(this.state.enviroCultImpacts.match(enviro_cult_impacts_regex) === null
				 	|| this.state.enviroCultImpacts > 100){
				 		//$("#enviro_cult_impacts").css("background-color", "red");
				 		alert(enviro_cult_impacts_format_S);
				 	}
				 	//else
				 	//	$("#enviro_cult_impacts").css("background-color", "white");
							
								 }	
								 	
				 if(value=='AA'){
				 	if(this.state.maintComplexity.match(maint_complexity_regex) === null
				 	|| this.state.maintComplexity > 100){
				 		//$("#maint_complexity").css("background-color", "red");
				 		alert(maint_complexity_format_S);
				 	}
				 //	else
				 //		$("#maint_complexity").css("background-color", "white");
				 			
								  }		
								  		 
				 if(value=='BB'){
				 	if(this.state.eventCost.match(event_cost_regex) === null
				 	|| this.state.eventCost > 100){
				 		//$("#event_cost").css("background-color", "red");
				 		alert(event_cost_format_S);
				 	}
				 	//else
				 	//	$("#event_cost").css("background-color", "white");
				 			
				 				 }	
								 			 			 			 	 				  
																		 
		}
		
  render() {
	      let pickerRegion = null;
		  let pickerLocal = null;
		  let hazardType = null;
		  let bulkSize = null;
		  let volume = null;
		  let tableA = null; 
		  let inputA = null;
		  let tableB = null; 
		  let inputB = null;
		  let tableC = null; 
		  let inputC = null;
		  let tableD = null; 
		  let inputD = null;
		let tableE = null; 
		let inputE = null;
		let tableF = null; 
		let inputF = null;
		let inputLandTotal = null;
		let inputRockTotal = null;
		let tableL = null; 
		let inputL = null;
		let tableM = null; 
		let inputM = null;
		let tableN = null; 
		let inputN = null;
		let tableO = null; 
		let inputO = null;
		let tableP = null; 
		let inputP = null;
		let tableQ = null; 
		let inputQ = null;
		let tableR = null; 
		let inputR = null;
		let tableS = null; 
		let inputS = null;
		let hazardLandTotal = null;
		let hazardRockTotal = null;
//ratings data array
let dataSourceA = [{cat:'Landslide-Roadway Width Affected',
						3:'0-5%',
						9:'6-25%',
						27:'26-50%',
						81:'51-100%'}];
					
		//management area filter					
	      if (this.state.selectedAgency !='search_0') {
	        pickerRegion = <Picker itemStyle={{fontSize:14,height:80}} style={styles.picker} style={{ flex:1 }} 
			enabled={true}
			selectedValue={this.state.selectedRegion}
			onValueChange={(value)=>this.setState({selectedRegion:value},()=>{
				this.saveSiteInfo()
			})}
			onBlur={()=>this.onBlurInputCheck('selectedRegion')}>
		    <Picker.Item value="search_0" label="Select State/Region/Territory" />
		    {this.renderRegion()}
		  </Picker> ;
	      } else {
	        pickerRegion = null;
			//this.setState({selectedRegion:'search_0'})
			pickerLocal = null;
	      }
		  
	      if (this.state.selectedRegion !='search_0') {
			pickerLocal = <Picker itemStyle={{fontSize:14,height:80}} style={styles.picker} style={{flex:1}}
			enabled={true}
			selectedValue={this.state.selectedLocal}
			onValueChange={(value)=>this.setState({selectedLocal:value},()=>{
				this.saveSiteInfo()
			})}
			onBlur={()=>this.onBlurInputCheck('selectedLocal')}>
		    <Picker.Item value="search_0" label="Select Local/County/Territory" />
		     {this.renderLocal()}
		  </Picker> ;
	      } else {
	        pickerLocal = null;
	      }
		  //filtering hazard type based rockfall/landslide
		  if(this.state.rockfallLandslide == 'rockfall'){
			  //this.blkSizeVolume(this.state.rockfallLandslide);
			  //filter hazard_type
			  const filteredAssets = [
  										{ label: 'Planar', value: '1' },
   			   							{ label: 'Wedge', value: '2' },
   			   							{ label: 'Toppling', value: '3' },
  										{ label: 'Raveling/Undermining', value: '4' },
   			   							{ label: 'Rock Avalanche', value: '5' },
    			  						{ label: 'Indeterminate Rock Failures', value: '6' },
    			  						{ label: 'Diff. Erosion', value: '7' },];
 //const filteredAssets = this.props.assets.filter(asset => asset.label.indexOf(value) < 8);
 			 hazardType = <SelectMultiple
             items={filteredAssets}
             selectedItems={this.state.hazardType}
             onSelectionsChange={this.onSelectionsChange}
			 onBlur={()=>this.onBlurInputCheck('hazardType')} />;
			 
			 //ditchWidth
			ditchWidth1=<TextInput 
			returnKeyType={'next'}
			onSubmitEditing={() => {this.maximumDitchWidth.focus()}}
			ref={nextInput => this.minimumDitchWidth = nextInput} 
			keyboardType='numeric'
			style={{width:40}}
			value={this.state.minimumDitchWidth}
			onChangeText={(val)=>this.setState({minimumDitchWidth:val},()=>{
				this.saveSiteInfo()
			})}
			style={styles.textInput}
			onBlur={()=>this.onBlurInputCheck('minimumDitchWidth')}
			
			placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>;
			
			ditchWidth2=<TextInput 
			returnKeyType={'next'}
			onSubmitEditing={() => {this.minimumDitchDepth.focus()}}
			ref={nextInput => this.maximumDitchWidth = nextInput} 
			keyboardType='numeric'
			style={{width:40}}
			value={this.state.maximumDitchWidth}
			onChangeText={(val)=>this.setState({maximumDitchWidth:val},()=>{
				this.saveSiteInfo()
			})}
			style={styles.textInput}
			onBlur={()=>this.onBlurInputCheck('maximumDitchWidth')}
			
			placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>;
			
			//ditchDepth
			ditchDepth1=<TextInput 
			returnKeyType={'next'}
			onSubmitEditing={() => {this.maximumDitchDepth.focus()}}
			ref={nextInput => this.minimumDitchDepth = nextInput} 
			keyboardType='numeric'
			style={{width:40}}
			value={this.state.minimumDitchDepth}
			onChangeText={(val)=>this.setState({minimumDitchDepth:val},()=>{
				this.saveSiteInfo()
			})}
			style={styles.textInput}
			onBlur={()=>this.onBlurInputCheck('minimumDitchDepth')}
			
			placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>;
		
			ditchDepth2=<TextInput 
			returnKeyType={'next'}
			onSubmitEditing={() => {this.firstBeginDitchSlope.focus()}}
			ref={nextInput => this.maximumDitchDepth = nextInput} 
			keyboardType='numeric'
			style={{width:40}}
			value={this.state.maximumDitchDepth}
			onChangeText={(val)=>this.setState({maximumDitchDepth:val},()=>{
				this.saveSiteInfo()
			})}
			style={styles.textInput}
			onBlur={()=>this.onBlurInputCheck('maximumDitchDepth')}
			
			placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>;
			
			//ditchSlope
			ditchSlope1=<TextInput 
			returnKeyType={'next'}
			onSubmitEditing={() => {this.firstEndDitchSlope.focus()}}
			ref={nextInput => this.firstBeginDitchSlope = nextInput}
			keyboardType='numeric'
			style={{width:40}}
			value={this.state.firstBeginDitchSlope}
			onChangeText={(val)=>this.setState({firstBeginDitchSlope:val},()=>{
				this.saveSiteInfo()
			})}
			style={styles.textInput}
			onBlur={()=>this.onBlurInputCheck('firstBeginDitchSlope')}
			placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>;
			
			ditchSlope2=<TextInput 
			returnKeyType={'next'}
			onSubmitEditing={() => {this.secondBeginDitchSlope.focus()}}
			ref={nextInput => this.firstEndDitchSlope = nextInput}
			keyboardType='numeric'
			style={{width:40}}
			value={this.state.firstEndDitchSlope}
			onChangeText={(val)=>this.setState({firstEndDitchSlope:val},()=>{
				this.saveSiteInfo()
			})}
			style={styles.textInput}
			onBlur={()=>this.onBlurInputCheck('firstEndDitchSlope')}
			placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>;
			
			ditchSlope3=<TextInput 
			returnKeyType={'next'}
			onSubmitEditing={() => {this.secondEndDitchSlope.focus()}}
			ref={nextInput => this.secondBeginDitchSlope = nextInput}
			keyboardType='numeric'
			style={{width:40}}
			value={this.state.secondBeginDitchSlope}
			onChangeText={(val)=>this.setState({secondBeginDitchSlope:val},()=>{
				this.saveSiteInfo()
			})}
			style={styles.textInput}
			onBlur={()=>this.onBlurInputCheck('secondBeginDitchSlope')}
			placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>;
			
			ditchSlope4=<TextInput 
			returnKeyType={'next'}
			onSubmitEditing={() => {this.blkSize.focus()}}
			ref={nextInput => this.secondEndDitchSlope = nextInput}
			keyboardType='numeric'
			style={{width:40}}
			value={this.state.secondEndDitchSlope}
			onChangeText={(val)=>this.setState({secondEndDitchSlope:val},()=>{
				this.saveSiteInfo()
			})}
			style={styles.textInput}
			onBlur={()=>this.onBlurInputCheck('secondEndDitchSlope')}
			placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>;
		
			//bulkSize 
			bulkSize = <TextInput 
			returnKeyType={'next'}
			onSubmitEditing={() => {this.volume.focus()}}
			ref={nextInput => this.blkSize = nextInput} 
			keyboardType='numeric' 
			value={this.state.blkSize}
			onChangeText={(val)=>this.setState({blkSize:val},()=>{
				this.saveSiteInfo()
			})}
			onBlur={()=>{
				this.onBlurInputCheck('blkSize');
				this.blkSizeVolume(this.state.rockfallLandslide);
				this.prelimRockfallRating(this.state.rockfallLandslide);
				this.rockfallHazardTotal(this.state.rockfallLandslide);
				
				
			}}
			style={styles.textInput}
			placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>;
			//volume
			volume = <TextInput 
			returnKeyType={'next'}
			onSubmitEditing={() => {this.startAnnualRainfall.focus()}}
			ref={nextInput => this.volume = nextInput} 
			keyboardType='numeric'
			value={this.state.volume}
			onChangeText={(val)=>this.setState({volume:val},()=>{
				this.saveSiteInfo()
			})}
			onBlur={()=>{
				this.onBlurInputCheck('volume');
				this.blkSizeVolume(this.state.rockfallLandslide);
				this.prelimRockfallRating(this.state.rockfallLandslide);
				this.rockfallHazardTotal(this.state.rockfallLandslide);
				
			}}
			style={styles.textInput}
			placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>;
			
			//A
			tableA = null; 
			inputA = null;
			//B
			tableB = null; 
			inputB = null;
			//C
			tableC = null; 
			inputC = null; 
			
			//D
   			//tableD = <Table height={110} columnWidth={60} columns={columns} dataSource={dataSourceD} />;
			
     	  	  tableD =
       	  	  <RadioForm
     		  style={{marginLeft:40,}}
                 radio_props={formSourceD}
                 initial={this.state.prelimRockfallDitchEffKey}
     		 	 formHorizontal={false}
                 onPress={(value) => {
     				this.setState({prelimRockfallDitchEff:value},()=>{
  	   				
  	   				this.saveSiteInfo();
  					this.prelimRockfallRating(this.state.rockfallLandslide);
  					this.rockfallHazardTotal(this.state.rockfallLandslide);
     				});
     		 		}
     		 		}
     				onBlur={()=>{
  					this.onBlurInputCheck('D');
  					this.prelimRockfallRating(this.state.rockfallLandslide);
  					this.rockfallHazardTotal(this.state.rockfallLandslide);
     			}}
     		 /> 	;	
 
			inputD = <TextInput 
			keyboardType='numeric'
			value={this.state.prelimRockfallDitchEff}
			onChangeText={(val)=>this.setState({prelimRockfallDitchEff:val},()=>{
				this.saveSiteInfo();
			})}
			style={styles.textInput}
			onBlur={()=>{
				this.onBlurInputCheck('D');
				this.prelimRockfallRating(this.state.rockfallLandslide);
				this.rockfallHazardTotal(this.state.rockfallLandslide);
				
			}}
			placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>;
			
			//E
   			//tableE = <Table height={100} columnWidth={60} columns={columns} dataSource={dataSourceE} />;
   	  	  	tableE =
     	  	  <RadioForm
   		  	   style={{marginLeft:40,}}
               radio_props={formSourceE}
               initial={this.state.prelimRockfallRockfallHistoryKey}
   		 	   formHorizontal={false}
               onPress={(value) => {
   				this.setState({prelimRockfallRockfallHistory:value},()=>{
	   				
	   				this.saveSiteInfo();
					this.prelimRockfallRating(this.state.rockfallLandslide);
					this.rockfallHazardTotal(this.state.rockfallLandslide);
   				});
   		 		}
   		 		}
   				onBlur={()=>{
					this.onBlurInputCheck('E');
					this.prelimRockfallRating(this.state.rockfallLandslide);
					this.rockfallHazardTotal(this.state.rockfallLandslide);
   			}}
   		 	/> 	;	
 		   	
			
			inputE = <TextInput 
			keyboardType='numeric'
			value={this.state.prelimRockfallRockfallHistory}
			onChangeText={(val)=>this.setState({prelimRockfallRockfallHistory:val},()=>{
				this.saveSiteInfo();
			})}
			style={styles.textInput}
			editable={this.state.aadtCheck}
			onBlur={()=>{
				this.onBlurInputCheck('E');
				this.prelimRockfallRating(this.state.rockfallLandslide);
				this.rockfallHazardTotal(this.state.rockfallLandslide);
				
			}}
			placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>;
			
			//F
   			//tableF = <Table height={110} columnWidth={60} columns={columns} dataSource={dataSourceF} />;
	  	  	tableF =
  	  	    <RadioForm
		  	   style={{marginLeft:40,}}
               radio_props={formSourceF}
               initial={this.state.prelimRockfallBlockSizeEventVolKey}
		 	   formHorizontal={false}
               onPress={(value) => {
				this.setState({prelimRockfallBlockSizeEventVol:value},()=>{
   				
   				this.saveSiteInfo();
				this.prelimRockfallRating(this.state.rockfallLandslide);
				this.rockfallHazardTotal(this.state.rockfallLandslide);
				});
		 		}
		 		}
				onBlur={()=>{
				this.onBlurInputCheck('F');
				this.prelimRockfallRating(this.state.rockfallLandslide);
				this.rockfallHazardTotal(this.state.rockfallLandslide);
			}}
		 	/> 	;	
			inputF = <TextInput 
			keyboardType='numeric'
			value={this.state.prelimRockfallBlockSizeEventVol}
			onChangeText={(val)=>this.setState({prelimRockfallBlockSizeEventVol:val},()=>{
				this.saveSiteInfo();
			})}
			style={styles.textInput}
			onBlur={()=>{
				this.onBlurInputCheck('F');
				this.prelimRockfallRating(this.state.rockfallLandslide);
				this.rockfallHazardTotal(this.state.rockfallLandslide);
				
			}}
			placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>;
			
				//input Landslide Total
			inputLandTotal = null;
			
		   //input Rockfall Total
			inputRockTotal = <TextInput 
			value={this.state.prelimRatingRockfallRotal}
			editable={false}
			onChangeText={(val)=>this.setState({prelimRatingRockfallRotal:val})}
			style={styles.textInputGray}
			placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>;
			
			//L
			tableL = null; 
			inputL = null;
			//M
			tableM = null; 
			inputM = null;
			//N
			tableN = null; 
			inputN = null;
			
			//O
			//tableO = <Table height={130} columnWidth={60} columns={columns} dataSource={dataSourceO} />;
  	  	tableO =
  	  	<RadioForm
  			style={{marginLeft:40,}}
       		radio_props={formSourceO}
       	 	initial={this.state.hazardRockfallMaintFrequencyKey}
 	 		formHorizontal={false}
       	 	onPress={(value) => {
			this.setState({hazardRockfallMaintFrequency:value},()=>{
			
			this.saveSiteInfo();
			this.rockfallHazardTotal(this.state.rockfallLandslide);
		});
 		}
 		}
		onBlur={()=>{
			this.onBlurInputCheck('O');
			//this.prelimRockfallRating(this.state.rockfallLandslide);
			this.rockfallHazardTotal(this.state.rockfallLandslide);
		}}
 		/> 	;

			inputO = <TextInput 
			keyboardType='numeric'
			value={this.state.hazardRockfallMaintFrequency}
			onChangeText={(val)=>this.setState({hazardRockfallMaintFrequency:val},()=>{
				this.saveSiteInfo();
			})}
			style={styles.textInput}
			onBlur={()=>{
				this.onBlurInputCheck('O');
				//this.prelimRockfallRating(this.state.rockfallLandslide);
				this.rockfallHazardTotal(this.state.rockfallLandslide);
				
			}}
			placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>;
			
			//P
			//tableP = <Table height={110} columnWidth={60} columns={columns} dataSource={dataSourceP} />;
  	  		tableP =
  	  		<RadioForm
  			style={{marginLeft:40,}}
       		radio_props={formSourceP}
       	 	initial={this.state.caseOneStrucCondKey}
 	 		formHorizontal={false}
       	 	onPress={(value) => {
			this.setState({caseOneStrucCond:value},()=>{
			this.saveSiteInfo();
			this.rockfallHazardTotal(this.state.rockfallLandslide);
			});
 			}
 			}
			onBlur={()=>{
			this.onBlurInputCheck('P');
			//this.prelimRockfallRating(this.state.rockfallLandslide);
			this.rockfallHazardTotal(this.state.rockfallLandslide);
			}}
 			/> 	;
			
			inputP = <TextInput 
			keyboardType='numeric'
			value={this.state.caseOneStrucCond}
			onChangeText={(val)=>this.setState({caseOneStrucCond:val},()=>{
				this.saveSiteInfo();
			})}
			style={styles.textInput}
			onBlur={()=>{
				this.onBlurInputCheck('P');
				//this.prelimRockfallRating(this.state.rockfallLandslide);
				this.rockfallHazardTotal(this.state.rockfallLandslide);
				
			}}
			placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>;
			
			//Q
			//tableQ = <Table height={110} columnWidth={60} columns={columns} dataSource={dataSourceQ} />;
  	  		tableQ =
  	  		<RadioForm
  			style={{marginLeft:40,}}
       		radio_props={formSourceQ}
       	 	initial={this.state.caseOneRockFrictionKey}
 	 		formHorizontal={false}
       	 	onPress={(value) => {
			this.setState({caseOneRockFriction:value},()=>{
			this.saveSiteInfo();
			this.rockfallHazardTotal(this.state.rockfallLandslide);
			});
 			}
 			}
			onBlur={()=>{
			this.onBlurInputCheck('Q');
			//this.prelimRockfallRating(this.state.rockfallLandslide);
			this.rockfallHazardTotal(this.state.rockfallLandslide);
			}}
 			/> 	;
			
			inputQ = <TextInput 
			keyboardType='numeric'
			value={this.state.caseOneRockFriction}
			onChangeText={(val)=>this.setState({caseOneRockFriction:val},()=>{
				this.saveSiteInfo();
			})}
			style={styles.textInput}
			onBlur={()=>{
				this.onBlurInputCheck('Q');
				//this.prelimRockfallRating(this.state.rockfallLandslide);
				this.rockfallHazardTotal(this.state.rockfallLandslide);
				
			}}
			placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>;
			
			//R
			//tableR = <Table height={110} columnWidth={60} columns={columns} dataSource={dataSourceR} />;
  	  		tableR =
  	  		<RadioForm
  			style={{marginLeft:40,}}
       		radio_props={formSourceR}
       	 	initial={this.state.caseTwoStrucConditionKey}
 	 		formHorizontal={false}
       	 	onPress={(value) => {
			this.setState({caseTwoStrucCondition:value},()=>{
			this.saveSiteInfo();
			this.rockfallHazardTotal(this.state.rockfallLandslide);
			});
 			}
 			}
			onBlur={()=>{
			this.onBlurInputCheck('R');
			//this.prelimRockfallRating(this.state.rockfallLandslide);
			this.rockfallHazardTotal(this.state.rockfallLandslide);
			}}
 			/> 	;
			
			inputR = <TextInput
			keyboardType='numeric' 
			value={this.state.caseTwoStrucCondition}
			onChangeText={(val)=>this.setState({caseTwoStrucCondition:val},()=>{
				this.saveSiteInfo();
			})}
			style={styles.textInput}
			onBlur={()=>{
				this.onBlurInputCheck('R');
				//this.prelimRockfallRating(this.state.rockfallLandslide);
				this.rockfallHazardTotal(this.state.rockfallLandslide);
				
			}}
			placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>;
			
			//S
			//tableS = <Table height={110} columnWidth={60} columns={columns} dataSource={dataSourceS} />;
  	  		tableS =
  	  		<RadioForm
  			style={{marginLeft:40,}}
       		radio_props={formSourceS}
       	 	initial={this.state.caseTwoDiffErosionKey}
 	 		formHorizontal={false}
       	 	onPress={(value) => {
			this.setState({caseTwoDiffErosion:value},()=>{
			this.saveSiteInfo();
			this.rockfallHazardTotal(this.state.rockfallLandslide);
			});
 			}
 			}
			onBlur={()=>{
			this.onBlurInputCheck('S');
			//this.prelimRockfallRating(this.state.rockfallLandslide);
			this.rockfallHazardTotal(this.state.rockfallLandslide);
			}}
 			/> 	;
			
			inputS = <TextInput 
			keyboardType='numeric'
			value={this.state.caseTwoDiffErosion}
			onChangeText={(val)=>this.setState({caseTwoDiffErosion:val},()=>{
				//alert("ch rk"+this.state.hazardRatingRockfallTotal);
				this.saveSiteInfo();
			})}
			style={styles.textInput}
			onBlur={()=>{
				this.onBlurInputCheck('S');
				//alert(this.state.hazardRatingRockfallTotal);
				//this.prelimRockfallRating(this.state.rockfallLandslide);
				this.rockfallHazardTotal(this.state.rockfallLandslide);
				//this.saveSiteInfo();
			}}
			placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>;
			
			//T
			hazardLandTotal = null;
			
			//U

			hazardRockTotal = <TextInput 
			value={this.state.hazardRatingRockfallTotal}
			editable={false}
			onChangeText={(val)=>this.setState({hazardRatingRockfallTotal:val})}
			style={styles.textInputGray}
			placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>;
			
			//landslide
			  }else{
			  //filter hazard_type	  
			  const filteredAssets = [
    			  						{ label: 'Translational', value: '8' },
    			  						{ label: 'Rotational', value: '9' },
    			  						{ label: 'Debris Flow', value: '10' },
    			  						{ label: 'Shallow Slump', value: '11' },
				 	 					{ label: 'Erosional Failure', value: '12' },
			  							{ label: 'Above, Below, or Across Route', value: '13' },];
  			 hazardType = <SelectMultiple
             items={filteredAssets}
             selectedItems={this.state.hazardType}
             onSelectionsChange={this.onSelectionsChange} />;
			 //ditchWidth
			 ditchWidth1=null;
			 ditchWidth2=null;
			 //ditchDepth
			 ditchDepth1=null;
			 ditchDepth2=null;
			 //ditchSlope
			 ditchSlope1=null;
			 ditchSlope2=null;
			 ditchSlope3=null;
			 ditchSlope4=null;
			 //bulkSize
			 bulkSize = null;
			// this.setState({blkSize:'0'});
			 //volume
			//this.setState({volume:'0'});
			 volume = null;
			// this.onRockfallLandslideChange;
			// this.setState({volume:'0'});
			//A
 	   			//tableA = <Table height={110} columnWidth={60} columns={columns} dataSource={dataSourceA} />;
     	  	  tableA =
       	  	  <RadioForm
     		  style={{marginLeft:40,}}
                 radio_props={formSourceA}
                 initial={this.state.prelimLandslideRoadWidthAffectedKey}
     		 	 formHorizontal={false}
                 onPress={(value) => {
     				   this.setState({prelimLandslideRoadWidthAffected:value},()=>{
  	   					    this.saveSiteInfo();
 							this.prelimLandslideRating(this.state.rockfallLandslide);
 							this.landslideHazardTotal(this.state.rockfallLandslide);
     				});
     		 		}
     		 		}
     				onBlur={()=>{
						this.onBlurInputCheck('A');
						this.prelimLandslideRating(this.state.rockfallLandslide);
						this.landslideHazardTotal(this.state.rockfallLandslide);
     			}}
     		 	/> 	;	
			 
				inputA = <TextInput 
				keyboardType='numeric'
				value={this.state.prelimLandslideRoadWidthAffected}
				onChangeText={(val)=>this.setState({prelimLandslideRoadWidthAffected:val},()=>{
					this.saveSiteInfo();
				})}
				style={styles.textInput}
				onBlur={()=>{
					this.onBlurInputCheck('A');
					this.prelimLandslideRating(this.state.rockfallLandslide);
					this.landslideHazardTotal(this.state.rockfallLandslide);
					
				}}
				placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
				</TextInput>;
				
			//B
				//tableB = <Table height={220} columnWidth={60} columns={columns} dataSource={dataSourceB} />;
       	  	  	tableB =
         	  	<RadioForm
       		  	style={{marginLeft:40,}}
                   radio_props={formSourceB}
                   initial={this.state.prelimLandslideSlideErosionEffectsKey}
       		 	   formHorizontal={false}
                   onPress={(value) => {
       				   this.setState({prelimLandslideSlideErosionEffects:value},()=>{
    	   					this.saveSiteInfo();
   							this.prelimLandslideRating(this.state.rockfallLandslide);
   							this.landslideHazardTotal(this.state.rockfallLandslide);
       				});
       		 		}
       		 		}
       				onBlur={()=>{
  						this.onBlurInputCheck('B');
  						this.prelimLandslideRating(this.state.rockfallLandslide);
  						this.landslideHazardTotal(this.state.rockfallLandslide);
       			}}
       		 	/> 	;
				
				inputB = <TextInput 
				keyboardType='numeric'
				value={this.state.prelimLandslideSlideErosionEffects}
				onChangeText={(val)=>this.setState({prelimLandslideSlideErosionEffects:val},()=>{
					this.saveSiteInfo();
				})}
				style={styles.textInput}
				onBlur={()=>{
					this.onBlurInputCheck('B');
					this.prelimLandslideRating(this.state.rockfallLandslide);
					this.landslideHazardTotal(this.state.rockfallLandslide);
					
				}}
				placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
				</TextInput>	;
				
				//C
 	   			//tableC = <Table height={110} columnWidth={60} columns={columns} dataSource={dataSourceC} />;
    	  	  	tableC =
      	  	    <RadioForm
    		  	style={{marginLeft:40,}}
                radio_props={formSourceC}
                initial={this.state.prelimLandslideLengthAffectedKey}
    		 	formHorizontal={false}
                onPress={(value) => {
    				   this.setState({prelimLandslideLengthAffected:value},()=>{
 	   					this.saveSiteInfo();
						this.prelimLandslideRating(this.state.rockfallLandslide);
						this.landslideHazardTotal(this.state.rockfallLandslide);
    				});
    		 		}
    		 		}
    				onBlur={()=>{
					this.onBlurInputCheck('C');
					this.prelimLandslideRating(this.state.rockfallLandslide);
					this.landslideHazardTotal(this.state.rockfallLandslide);
    			}}
    		 	/> 	;	
				
				inputC = <TextInput 
				keyboardType='numeric'
				value={this.state.prelimLandslideLengthAffected}
				onChangeText={(val)=>this.setState({prelimLandslideLengthAffected:val},()=>{
					this.saveSiteInfo();
				})}
				style={styles.textInput}
				editable={this.state.aadtCheck}
				onBlur={()=>{
					this.onBlurInputCheck('C');
					this.prelimLandslideRating(this.state.rockfallLandslide);
					this.landslideHazardTotal(this.state.rockfallLandslide);
					
				}}
				placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
				</TextInput>;
				
				//D
				tableD = null; 
				inputD = null;
				
				//E
				tableE = null; 
				inputE = null;
				
				//F
				tableF = null; 
				inputF = null;
				
				//input Landslide Total
				inputLandTotal = <TextInput 
				value={this.state.prelimRatingLandslideTotal}
				editable={false}
				onChangeText={(val)=>this.setState({prelimRatingLandslideTotal:val})}
				style={styles.textInputGray}
				placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
				</TextInput>;
				
		   //input Rockfall Total
				inputRockTotal = null;
				
				//L
				//tableL = <Table height={110} columnWidth={60} columns={columns} dataSource={dataSourceL} />;
       	  	    tableL =
         	  	<RadioForm
       		       style={{marginLeft:40,}}
                   radio_props={formSourceL}
                   initial={this.state.hazardLandslideThawStabilityKey}
       		 	   formHorizontal={false}
                   onPress={(value) => {
       				   this.setState({hazardLandslideThawStability:value},()=>{
    	   					this.saveSiteInfo();
   								//this.prelimLandslideRating(this.state.rockfallLandslide);
   							this.landslideHazardTotal(this.state.rockfallLandslide);
       				});
       		 		}
       		 		}
       				onBlur={()=>{
  						this.onBlurInputCheck('L');
  						//this.prelimLandslideRating(this.state.rockfallLandslide);
  						this.landslideHazardTotal(this.state.rockfallLandslide);
       			}}
       		 	/> 	;	
				
				inputL = <TextInput 
				keyboardType='numeric'
				value={this.state.hazardLandslideThawStability}
				onChangeText={(val)=>this.setState({hazardLandslideThawStability:val},()=>{
					this.saveSiteInfo();
				})}
				style={styles.textInput}
				onBlur={()=>{
					this.onBlurInputCheck('L');
					this.landslideHazardTotal(this.state.rockfallLandslide);
					
				}}
				placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
				</TextInput>;
				
				//M
				//tableM = <Table height={110} columnWidth={60} columns={columns} dataSource={dataSourceM} />;
   	  	  	  tableM =
     	  	  <RadioForm
   		  	   style={{marginLeft:40,}}
               radio_props={formSourceM}
               initial={this.state.hazardLandslideMaintFrequencyKey}
   		 	   formHorizontal={false}
               onPress={(value) => {
   				   this.setState({hazardLandslideMaintFrequency:value},()=>{
	   					this.saveSiteInfo();
							//this.prelimLandslideRating(this.state.rockfallLandslide);
						this.landslideHazardTotal(this.state.rockfallLandslide);
   				});
   		 		}
   		 		}
   				onBlur={()=>{
					this.onBlurInputCheck('M');
					//this.prelimLandslideRating(this.state.rockfallLandslide);
					this.landslideHazardTotal(this.state.rockfallLandslide);
   			}}
   		 	/> 	;	
				
				inputM = <TextInput 
				keyboardType='numeric'
				value={this.state.hazardLandslideMaintFrequency}
				onChangeText={(val)=>this.setState({hazardLandslideMaintFrequency:val},()=>{
					this.saveSiteInfo();
				})}
				style={styles.textInput}
				onBlur={()=>{
					this.onBlurInputCheck('M');
					this.landslideHazardTotal(this.state.rockfallLandslide);
					
				}}
				placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
				</TextInput>;
				
				//N
				//tableN = <Table height={200} columnWidth={60} columns={columns} dataSource={dataSourceN} />;
   	  	  	tableN =
     	  	  <RadioForm
   		  	   style={{marginLeft:40,}}
               radio_props={formSourceN}
               initial={this.state.hazardLandslideMovementHistoryKey}
   		 	   formHorizontal={false}
               onPress={(value) => {
   				   this.setState({hazardLandslideMovementHistory:value},()=>{
	   					this.saveSiteInfo();
							//this.prelimLandslideRating(this.state.rockfallLandslide);
						this.landslideHazardTotal(this.state.rockfallLandslide);
   				});
   		 		}
   		 		}
   				onBlur={()=>{
					this.onBlurInputCheck('N');
					//this.prelimLandslideRating(this.state.rockfallLandslide);
					this.landslideHazardTotal(this.state.rockfallLandslide);
   			}}
   		 	/> 	;	
				
				inputN = <TextInput 
				keyboardType='numeric'
				value={this.state.hazardLandslideMovementHistory}
				onChangeText={(val)=>this.setState({hazardLandslideMovementHistory:val},()=>{
					this.saveSiteInfo();
				})}
				style={styles.textInput}
				onBlur={()=>{
					this.onBlurInputCheck('N');
					this.landslideHazardTotal(this.state.rockfallLandslide);
					
				}}
				placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
				</TextInput>;
				
				//O
				tableO = null; 
				inputO = null;
				//P
				tableP = null; 
				inputP = null;
				//Q
				tableQ = null; 
				inputQ = null;
				//R
				tableR = null; 
				inputR = null;
				//S
				tableS = null; 
				inputS = null;
				
				//T

				hazardLandTotal = <TextInput 
				value={this.state.hazardRatingLandslideTotal}
				editable={false}
				onChangeText={(val)=>this.setState({hazardRatingLandslideTotal:val})}
				style={styles.textInputGray}
				placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
				</TextInput>;
				
				//U
				hazardRockTotal = null;
     
		  }
		 //aadt checkbox
		  if(this.state.aadtUsageCalcCheckbox == true){
		  	//this
		  }
		
		  			
    return (
      <View style={styles.container}>
      	<View style={styles.header}>
  	  		<Icon name="menu" 
			style={{marginTop:20,marginRight:Dimensions.get('window').width*0.38,color:'white'}} 
			size={40} 
			backgroundColor="#3b5998" 
			onPress={() => this.props.navigation.navigate('DrawerOpen')}>
  	  		</Icon>
     		<Text 
			style={styles.headerText}
			onPress={() => this.props.navigation.navigate('DrawerOpen')}>
			 Offline ID : {this.state.id}
			</Text>
		
      	</View>
 		<ScrollView>	
       	<View style={styles.section}>
      		<Text 
 			style={styles.sectionText}
 			>
 			Site Information
 			</Text>
       	</View>	
  		<View style={{flex:1}}>
 			<Text style={styles.labelText}>Management Area:</Text>	
 			<Picker itemStyle={{fontSize:14, height:80}} style={styles.picker} style={{flex:1}}
 			selectedValue={this.state.selectedAgency}
 			onValueChange={this.onValueChange}
 			onBlur={()=>this.onBlurInputCheck('selectedAgency')}>
 		    <Picker.Item value="search_0" label="Select Agency" />
 		    <Picker.Item value="FS" label="FS"  />
 			<Picker.Item value="NPS" label="NPS"  />
 		    <Picker.Item value="BLM" label="BLM"  />
			<Picker.Item value="OTHER" label="OTHER"  />
 		  </Picker>	
 		  <View style={styles.borderLine} />	
				
 		  {pickerRegion}
		  
 		  <View style={styles.borderLine} />	
		  
 		  {pickerLocal}		
		  
 		</View>	
 		<View style={styles.borderLine} />	
		  
 	    <View style={{flex:1}}>
 			 <Text style={styles.labelText}>Date:</Text>
 	    	 <DatePicker
 	         style={{width: 200, paddingBottom:5}}
 	         date={this.state.date}
 	         mode="datetime"
 			 selectedValue={this.state.date}
 	         placeholder="select date"
 	         format="YYYY-MM-DD hh:mm:ss"
 	         minDate="2016-05-01"
 	         maxDate="2050-12-31"
 	         confirmBtnText="Confirm"
 	         cancelBtnText="Cancel"
 	         customStyles={{
 	           dateIcon: {
 	             position: 'absolute',
 	             left: 0,
 	             top: 4,
 	             marginLeft: 20
 	           },
 	           dateInput: {
 	             marginLeft: 56
 	           }
 	           // ... You can check the source to find the other keys. 
 	         }}
 	         onDateChange={(date) => {this.setState({date: date},()=>{
 	         	this.saveSiteInfo()
 	         })}}
 			 onBlur={()=>this.onBlurInputCheck('date')}
 	       />
			 <Text> <Text style={styles.labelText}>Old Date:</Text>{this.state.oldDate}</Text>
 		</View>
  		<View style={styles.borderLine} />	
			 
 		<View style={{flex:1, alignItems: 'center',marginTop: 10,}}>
    		  <RadioForm
              radio_props={rockfallLandslide}
              initial={this.state.rockLandKey}
 			  formHorizontal={true}
			  disabled={true}
              onPress={(value) => {
 				 this.setState({rockfallLandslide:value},()=>{
 				 	this.lengthAffected(value);
 					this.blkSizeVolume(value);
    				 	this.prelimLandslideRating(value);
    					this.prelimRockfallRating(value);
 					this.rockfallHazardTotal(value);
 					this.landslideHazardTotal(value);
 				 });
 				 //alert(this.state.prelimLandslideLengthAffected);				 
 				 //alert(this.state.prelimLandslideLengthAffected);
				 
 				// alert(this.state.rockfallLandslide)
 			 }
 			 }
            /> 
 	    </View>	
  		<View style={styles.borderLine} />	
			 
 		<View style={{flex:1,}}>
    		  <Text style={styles.labelText}>Hazard Type:(Select all that apply within one of the categories)</Text>
 				{hazardType}
     	 
 	    </View>	
  		<View style={styles.borderLine} />	
				
 		<View style={{flex:1,}}>
    		  <Text style={styles.labelText}>Road/Trail No:</Text>
 				<TextInput 
				returnKeyType={'next'}
				onSubmitEditing={() => {this.rtClass.focus()}}
				value={this.state.rtNo}
 				onChangeText={(val)=>this.setState({rtNo:val},()=>{
 					this.saveSiteInfo()
 				})}
 				style={styles.textInput}
 				onBlur={()=>this.onBlurInputCheck('rtNo')}
 				placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
 				</TextInput>
     	 
 	    </View>	
  		<View style={styles.borderLine} />	
				
 		<View style={{flex:1, }}>
    		  <Text style={styles.labelText}>Road/Trail:</Text>
       	  <RadioForm
				 style={{marginLeft:40,}}
                 radio_props={roadOrTrail}
                 initial={this.state.roadOrTrailKey}
    			 formHorizontal={true}
                 onPress={(value) => {
 					this.setState({roadOrTrail:value},()=>{
 						this.routeTrailWidth();
						this.saveSiteInfo();
 					});
					
    				 //alert(this.state.rockfallLandslide)
    			 	}
    			 	}
 				onBlur={()=>{
 					this.routeTrailWidth();
 					this.onBlurInputCheck('roadOrTrail');
 				}}
            /> 		
     	 
 	    </View>	
  		<View style={styles.borderLine} />	
			 
 		<View style={{flex:1,}}>
 	   		  <Text style={styles.labelText}>Road/Trail Class:</Text>
 				<TextInput
				returnKeyType={'next'}
				onSubmitEditing={() => {this.rater.focus()}}
				ref={nextInput => this.rtClass = nextInput} 
				value={this.state.rtClass} 
 				onChangeText={(val)=>this.setState({rtClass:val},()=>{
 					this.saveSiteInfo()
 				})}
 				style={styles.textInput}
 				onBlur={()=>this.onBlurInputCheck('rtClass')}
				
 				placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
 				</TextInput>
     	 
 	    </View>	
 	 	<View style={styles.borderLine} />	
				
 		<View style={{flex:1,}}>
 		   		  <Text style={styles.labelText}>Rater:</Text>
 					<TextInput 
					returnKeyType={'next'}
					onSubmitEditing={() => {this.beginMileMarker.focus()}}
					ref={nextInput => this.rater = nextInput}
					value={this.state.rater} 
 					onChangeText={(val)=>this.setState({rater:val},()=>{
 						this.saveSiteInfo()
 					})}
 					style={styles.textInput}
 					onBlur={()=>this.onBlurInputCheck('rater')}
				
 					placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
 					</TextInput>
     	 
 		</View>	
 		<View style={styles.borderLine} />	
					
 		<View style={{flex:1,}}>
 			   		  <Text style={styles.labelText}>Beginning Mile Marker:</Text>
 						<TextInput
						returnKeyType={'next'}
						onSubmitEditing={() => {this.endMileMarker.focus()}}
						ref={nextInput => this.beginMileMarker = nextInput}
						keyboardType='numeric'
						value={this.state.beginMileMarker}  
 						onChangeText={(val)=>this.setState({beginMileMarker:val},()=>{
 							this.saveSiteInfo()
 						})}
 						style={styles.textInput}
 						onBlur={()=>this.onBlurInputCheck('beginMileMarker')}
				
 						placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
 						</TextInput>
     	 
 		</View>	
 		<View style={styles.borderLine} />	
						
 		<View style={{flex:1,}}>
 				   		  <Text style={styles.labelText}>Ending Mile Marker:</Text>
 							<TextInput 
							returnKeyType={'next'}
							onSubmitEditing={() => {this.beginCoordinateLatitude.focus()}}
							ref={nextInput => this.endMileMarker = nextInput}
							keyboardType='numeric'
							value={this.state.endMileMarker}
 							onChangeText={(val)=>this.setState({endMileMarker:val},()=>{
 								this.saveSiteInfo()
 							})}
 							style={styles.textInput}
 							onBlur={()=>this.onBlurInputCheck('endMileMarker')}
				
 							placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
 							</TextInput>
     	 
 		</View>	
 		<View style={styles.borderLine} />	
							
 		<View style={{flex:1,}}>
 				<Text style={styles.labelText}>Side:</Text>
 				<Picker itemStyle={{fontSize:14,height:80}} style={styles.picker} style={{ flex:1 }} 
 				selectedValue={this.state.side}
 				onValueChange={(value)=>this.setState({side:value},()=>{
 					this.saveSiteInfo()
 				})}
 				onBlur={()=>this.onBlurInputCheck('side')}>
 					{this.renderSide()}
 				</Picker>		   	
     	 
 		</View>	
 		<View style={styles.borderLine} />
																															  
 		<View style={{flex:1,}}>
 				<Text style={styles.labelText}>Weather:</Text>
 				<Picker itemStyle={{fontSize:14,height:80}} style={styles.picker} style={{ flex:1 }} 
 				selectedValue={this.state.weather}
 				onValueChange={(value)=>this.setState({weather:value},()=>{
 					this.saveSiteInfo()
 				})}
 				onBlur={()=>this.onBlurInputCheck('weather')}>
 					{this.renderWeather()}
 				</Picker>		   	
     	 
 		</View>	
 		<View style={styles.borderLine} />		
		
 		<View style={{flex:1,}}>
 		   		  <Text style={styles.labelText}>Begin Coord. Lat/Long:</Text>
      				<TouchableHighlight 
 						style={{height:20,width:90,backgroundColor:'#32cd32',marginLeft:20,}} 
 						onPress={this.getBeginCoordinates.bind(this)}>
 						<Text style={{fontSize:14,padding:1,}}>Get Coord</Text>
 					</TouchableHighlight>
 					<TextInput 
					returnKeyType={'next'}
					onSubmitEditing={() => {this.beginCoordinateLongitude.focus()}}
					ref={nextInput => this.beginCoordinateLatitude = nextInput}	
					keyboardType='numeric'	
 					onChangeText={(val)=>this.setState({beginCoordinateLatitude:val},()=>{
 						this.saveSiteInfo()
 					})}
 					value={this.state.beginCoordinateLatitude}
 					style={styles.textInput}
 					onBlur={()=>this.onBlurInputCheck('beginCoordinateLatitude')}
 					placeholder='Lat (##.#####)' placeholderTextColor='blue' underLineColor='transparent'>
 					</TextInput>
 					<TextInput
					returnKeyType={'next'}
					onSubmitEditing={() => {this.endCoordinateLatitude.focus()}}
					ref={nextInput => this.beginCoordinateLongitude = nextInput}	
 					onChangeText={(val)=>this.setState({beginCoordinateLongitude:val},()=>{
 						this.saveSiteInfo()
 					})}
 					style={styles.textInput}
 					value={this.state.beginCoordinateLongitude}
 					onBlur={()=>this.onBlurInputCheck('beginCoordinateLongitude')}
 					placeholder='Long (-###.#####)' placeholderTextColor='blue' underLineColor='transparent'>
 					</TextInput>
 
 		</View>	
 		<View style={styles.borderLine} />	
 		<View style={{flex:1,}}>
 		   		  <Text style={styles.labelText}>End Coord. Lat/Long:</Text>
      		<TouchableHighlight 
 					style={{height:20,width:90,backgroundColor:'#32cd32',marginLeft:20,}}
 					onPress={this.getEndCoordinates.bind(this)}>
 					<Text style={{fontSize:14,padding:1,}}>Get Coord</Text>
 			</TouchableHighlight>
 					<TextInput 
					returnKeyType={'next'}
					onSubmitEditing={() => {this.endCoordinateLongitude.focus()}}
					ref={nextInput => this.endCoordinateLatitude = nextInput}	
					keyboardType='numeric'
 					onChangeText={(val)=>this.setState({endCoordinateLatitude:val},()=>{
 						this.saveSiteInfo()
 					})}
 					style={styles.textInput}
 					value={this.state.endCoordinateLatitude}
 					onBlur={()=>this.onBlurInputCheck('endCoordinateLatitude')}
 					placeholder='Lat (##.#####)' placeholderTextColor='blue' underLineColor='transparent'>
 					</TextInput>
 					<TextInput 
					returnKeyType={'next'}
					onSubmitEditing={() => {this.aadt.focus()}}
					ref={nextInput => this.endCoordinateLongitude = nextInput}
 					onChangeText={(val)=>this.setState({endCoordinateLongitude:val},()=>{
 						this.saveSiteInfo()
 					})}
 					style={styles.textInput}
 					value={this.state.endCoordinateLongitude}
 					onBlur={()=>this.onBlurInputCheck('endCoordinateLongitude')}
 					placeholder='Long (-###.#####)' placeholderTextColor='blue' underLineColor='transparent'>
 					</TextInput>
 
 		</View>	
 		<View style={styles.borderLine} />	
		
 		<View style={{flex:1,}}>
 		   		  <Text style={styles.labelText}>Datum:</Text>
 					<TextInput 
 					value={this.state.datum}
 					onChangeText={(val)=>this.setState({datum:val})}
 					style={styles.textInputGray}
 					editable={false}
 					placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
 					</TextInput>
 
 		</View>	
 		<View style={styles.borderLine} />																											  
		
         <View style={{flex:1,}}>
 		   		  <Text style={styles.labelText}>AADT:</Text>
 					<TextInput 
					returnKeyType={'next'}
					onSubmitEditing={() => {this.lengthAffected_.focus()}}
					ref={nextInput => this.aadt = nextInput}
					keyboardType='numeric'
 					value={this.state.aadt}
 					onChangeText={(val)=>this.setState({aadt:val},()=>{
 						this.saveSiteInfo()
 					})}
 					onBlur={()=>{
 						this.onBlurInputCheck('aadt');
 						this.prelimAadt(this.state.aadtUsageCalcCheckbox);
 						this.prelimLandslideRating(this.state.rockfallLandslide);
 						this.prelimRockfallRating(this.state.rockfallLandslide);
 						this.humanExposureFactor();
 						this.riskTotal();
						
 					}}
 					style={styles.textInput}
 					placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
 					</TextInput>
 
 		</View>	
 		<View style={styles.borderLine} />	
		
 		<View style={{flex:1,}}>
 		   		  <Text style={styles.labelText}>Length of Affected Road/Trail (ft):</Text>
 					<TextInput 
					returnKeyType={'next'}
					onSubmitEditing={() => {this.slopeHeightAxialLength_.focus()}}
					ref={nextInput => this.lengthAffected_ = nextInput}
					keyboardType='numeric'
 					value={this.state.lengthAffected}
 					onChangeText={(val)=>this.setState({lengthAffected:val},()=>{
 						this.saveSiteInfo()
 					})}
 					onBlur={()=>{
 						this.onBlurInputCheck('lengthAffected');
 						this.lengthAffected(this.state.rockfallLandslide);
 						this.prelimLandslideRating(this.state.rockfallLandslide);
 						this.landslideHazardTotal(this.state.rockfallLandslide);
 						this.humanExposureFactor();
 						this.riskTotal();
 					}}
 					style={styles.textInput}
 					placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
 					</TextInput>
 
 		</View>	
 		<View style={styles.borderLine} />	
		
 		<View style={{flex:1,}}>
 		   		  <Text style={styles.labelText}>Slope Height (rock)/Axial Length (slide) (ft):</Text>
 					<TextInput 
					returnKeyType={'next'}
					onSubmitEditing={() => {this.slopeAngle.focus()}}
					ref={nextInput => this.slopeHeightAxialLength_ = nextInput}
					keyboardType='numeric'
 					value={this.state.slopeHeightAxialLength}
 					onChangeText={(val)=>this.setState({slopeHeightAxialLength:val},()=>{
 						this.slopeHeightAxialLength();
						this.saveSiteInfo()
					})}
 					style={styles.textInput}
 					onBlur={()=>{
 						this.onBlurInputCheck('slopeHeightAxialLength');
 						this.slopeHeightAxialLength();
 						this.rockfallHazardTotal(this.state.rockfallLandslide);
 						this.landslideHazardTotal(this.state.rockfallLandslide);
 					}}
					
 					placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
 					</TextInput>
 
 		</View>	
 		<View style={styles.borderLine} />				
		
 		<View style={{flex:1,}}>
 					<Text style={styles.labelText}>Slope Angle {String.fromCharCode(176)}:</Text>
 					<TextInput
					returnKeyType={'next'}
					onSubmitEditing={() => {this.sightDistance.focus()}}
					ref={nextInput => this.slopeAngle = nextInput} 
					keyboardType='numeric'
 					value={this.state.slopeAngle}
 					onChangeText={(val)=>this.setState({slopeAngle:val},()=>{
 						this.saveSiteInfo()
 					})}
 					style={styles.textInput}
 					onBlur={()=>this.onBlurInputCheck('slopeAngle')}
 					placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
 					</TextInput>
 
 		</View>	
 		<View style={styles.borderLine} />
		
 		<View style={{flex:1,}}>
 					<Text style={styles.labelText}>Sight Distance (ft):</Text>
 					<TextInput 
					returnKeyType={'next'}
					onSubmitEditing={() => {this.roadTrailWidth.focus()}}
					ref={nextInput => this.sightDistance = nextInput} 
					keyboardType='numeric'
 					value={this.state.sightDistance}
 					onChangeText={(val)=>this.setState({sightDistance:val},()=>{
 						this.saveSiteInfo()
 					})}
 					style={styles.textInput}
 					onBlur={()=>{
 						this.onBlurInputCheck('sightDistance');
 						this.percentDsd();
 						this.riskTotal();
						
 					}}
 					placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
 					</TextInput>
 
 		</View>	
 		<View style={styles.borderLine} />
		
 		<View style={{flex:1,}}>
 					<Text style={styles.labelText}>Usable Roadway/Trail width (ft):</Text>
 					<TextInput 
					returnKeyType={'next'}
					onSubmitEditing={() => {this.speedLimit.focus()}}
					ref={nextInput => this.roadTrailWidth = nextInput} 
					keyboardType='numeric'
 					value={this.state.roadTrailWidth}
 					onChangeText={(val)=>this.setState({roadTrailWidth:val},()=>{
						this.routeTrailWidth();
						this.saveSiteInfo()
					})}
 					style={styles.textInput}
 					onBlur={()=>{
 						this.onBlurInputCheck('roadTrailWidth');
 						this.routeTrailWidth();
 					}}
 					placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
 					</TextInput>
 
 		</View>	
 		<View style={styles.borderLine} />
		
 		<View style={{flex:1,}}>
 					<Text style={styles.labelText}>Speed Limit (mph):</Text>
 					<TextInput 
					returnKeyType={'next'}
					onSubmitEditing={() => {this.minimumDitchWidth.focus()}}
					ref={nextInput => this.speedLimit = nextInput} 
					keyboardType='numeric'
 					value={this.state.speedLimit}
 					onChangeText={(val)=>this.setState({speedLimit:val},()=>{
 						this.saveSiteInfo()
 					})}
 					style={styles.textInput}
 					onBlur={()=>{
 						this.onBlurInputCheck('speedLimit');
 						this.humanExposureFactor();
 						this.percentDsd();
 						this.riskTotal();
 					}}
 					placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
 					</TextInput>
 
 		</View>	
 		<View style={styles.borderLine} />
					
 		<View style={{flex:1,}}>
 					<Text style={styles.labelText}>Ditch Width Range (ft):</Text>	
					{ditchWidth1}	
					<Text style={styles.signText}>-</Text>
 				    {ditchWidth2}
 		</View>	
 		<View style={styles.borderLine} />			
		
 		<View style={{flex:1,}}>
 					<Text style={styles.labelText}>Ditch Depth Range (ft):</Text>
					{ditchDepth1}
					<Text style={styles.signText}>-</Text>
					{ditchDepth2}	
 		</View>	
 		<View style={styles.borderLine} />	
		
 		<View style={{flex:1,}}>
 					<Text style={styles.labelText}>Ditch Slope Range (H:V): </Text>	
					{ditchSlope1}
					<Text style={styles.signText}>:</Text>
					{ditchSlope2}
					<Text style={styles.signText}>-</Text>
					{ditchSlope3}
					<Text style={styles.signText}>:</Text>
					{ditchSlope4}
 		</View>	
 		<View style={styles.borderLine} />
					
 		<View style={{flex:1,}}>
 					<Text style={styles.labelText}>Block Size (ft):</Text>
 					{bulkSize}
 
 		</View>	
 		<View style={styles.borderLine} />
					
 		<View style={{flex:1,}}>
 					<Text style={styles.labelText}>Volume (cy): </Text>
 					{volume}
 
 		</View>	
 		<View style={styles.borderLine} />	
		
 		<View style={{flex:1,}}>
 					<Text style={styles.labelText}>Annual Rainfall Range (in):</Text>	
 					<TextInput 
					returnKeyType={'next'}
					onSubmitEditing={() => {this.endAnnualRainfall.focus()}}
					ref={nextInput => this.startAnnualRainfall = nextInput}
					keyboardType='numeric'
					style={{width:40}}
 					maxLength={4}
 					value={this.state.startAnnualRainfall}
 					onChangeText={(val)=>this.setState({startAnnualRainfall:val},()=>{
 						this.annualRainfall();
 						this.rockfallHazardTotal(this.state.rockfallLandslide);
 						this.landslideHazardTotal(this.state.rockfallLandslide);
						this.saveSiteInfo()
 					})}
 					style={styles.textInput}
 					onBlur={()=>{
 						this.onBlurInputCheck('startAnnualRainfall');
 						this.annualRainfall();
 						this.rockfallHazardTotal(this.state.rockfallLandslide);
 						this.landslideHazardTotal(this.state.rockfallLandslide);
 					}}
 					placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
 					</TextInput>
 					<Text style={styles.signText}>-</Text>
 					<TextInput 
					returnKeyType={'next'}
					onSubmitEditing={() => {this.comments.focus()}}
					ref={nextInput => this.endAnnualRainfall = nextInput}
					keyboardType='numeric'
					style={{width:40}}
 					maxLength={4}
 					value={this.state.endAnnualRainfall}
 					onChangeText={(val)=>this.setState({endAnnualRainfall:val},()=>{
 						this.annualRainfall();
 						this.rockfallHazardTotal(this.state.rockfallLandslide);
 						this.landslideHazardTotal(this.state.rockfallLandslide);
						this.saveSiteInfo()
 					})}
 					style={styles.textInput}
 					onBlur={()=>{
 						this.onBlurInputCheck('endAnnualRainfall');
 						this.annualRainfall();
 						this.rockfallHazardTotal(this.state.rockfallLandslide);
 						this.landslideHazardTotal(this.state.rockfallLandslide);
 					}}
 					placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
 					</TextInput>
 
 		</View>	
 		<View style={styles.borderLine} />	
					
 		<View style={{flex:1,}}>
 					<Text style={styles.labelText}>Sole Access Route: </Text>
 					<Picker itemStyle={{fontSize:14,height:80}} style={styles.picker} style={{ flex:1 }} 
 					selectedValue={this.state.soleAccessRoute}
 					onValueChange={(value)=>this.setState({soleAccessRoute:value})}
 					onBlur={()=>this.onBlurInputCheck('soleAccessRoute')}
 					>
 						{this.renderSoleAccessRoute()}
 					</Picker>		   	
     	 
 		</View>	
 		<View style={styles.borderLine} />	
						
 		<View style={{flex:1,}}>
 						<Text style={styles.labelText}>Mitigation Present: </Text>
 						<Picker itemStyle={{fontSize:14,height:80}} style={styles.picker} style={{ flex:1 }} 
 						selectedValue={this.state.fixesPresent}
 						onValueChange={(value)=>this.setState({fixesPresent:value})}
 						onBlur={()=>this.onBlurInputCheck('fixesPresent')}
 						>
 							{this.renderFixesPresent()}
 						</Picker>		   	
     	 
 		</View>	
 		<View style={styles.borderLine} />	
		
		<View style={{flex:1,}}>
							<Text style={styles.labelText}>Upload Images:</Text>
							<Upload 
							siteId={this.state.id} 
							slopeEvent={this.state.slopeEvent}
							/>

		</View>	
		<View style={styles.borderLine} />						
		
 		<View style={{flex:1,}}>
 						<Text style={styles.labelText}>Comments:</Text>
 						<TextInput
						returnKeyType={'next'}
						onSubmitEditing={() => {this.fmlaName.focus()}}
						ref={nextInput => this.comments = nextInput}	
 						multiline={true} 
 						numberOfLines={3}
 						value={this.state.comments}
 						onChangeText={(val)=>this.setState({comments:val},()=>{
 							this.saveSiteInfo();
 						})}
 						style={styles.textInput}
 						placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
 						</TextInput>
 		</View>	
 		<View style={styles.borderLine} />	
									
 		<View style={{flex:1,}}>
 						<Text style={styles.labelText}>Alternate database Name: </Text>
 						<TextInput 
						returnKeyType={'next'}
						onSubmitEditing={() => {this.fmlaId.focus()}}
						ref={nextInput => this.fmlaName = nextInput}
 						multiline={true} 
 						numberOfLines={2}
 						value={this.state.fmlaName}
 						onChangeText={(val)=>this.setState({fmlaName:val},()=>{
 							this.saveSiteInfo();
 						})}
 						style={styles.textInput}
 						placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
 						</TextInput>
 		</View>	
 		<View style={styles.borderLine} />																															
		
 		<View style={{flex:1,}}>
 						<Text style={styles.labelText}>Alternate database ID: </Text>
 						<TextInput 
						returnKeyType={'next'}
						onSubmitEditing={() => {this.fmlaDescription.focus()}}
						ref={nextInput => this.fmlaId = nextInput}
 						multiline={true} 
 						numberOfLines={2}
 						value={this.state.fmlaId}
 						onChangeText={(val)=>this.setState({fmlaId:val},()=>{
 							this.saveSiteInfo();
 						})}
 						style={styles.textInput}
 						placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
 						</TextInput>
 		</View>	
 		<View style={styles.borderLine} />
		
 		<View style={{flex:1,}}>
 						<Text style={styles.labelText}>Alternate database Description: </Text>
 						<TextInput 
						returnKeyType={'next'}
						onSubmitEditing={() => {}}
						ref={nextInput => this.fmlaDescription = nextInput}
 						value={this.state.fmlaDescription}
 						multiline={true} 
 						numberOfLines={3}
 						onChangeText={(val)=>this.setState({fmlaDescription:val},()=>{
 							this.saveSiteInfo();
 						})}
 						style={styles.textInput}
 						placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
 						</TextInput>
     	 
 		</View>	
					  
 		<View style={styles.borderLine} />	
														
								
	
   	<View style={styles.section}>
  		<Text 
 		style={styles.sectionText}
 		>
 		Preliminary Ratings
 		</Text>
	
   	</View>	
 		<View style={styles.tableView}>
 				<Text style={styles.tableText}>A. Landslide-Roadway Width Affected</Text>
 				{tableA}
 				{inputA}
 
 		</View>	
 		<View style={styles.borderLine} />	
		
 		<View style={styles.tableView}>
 				<Text style={styles.tableText}>B. Landslide - Slide/Erosion Effects</Text>
 				{tableB}
 				{inputB}	
 
 		</View>	
 		<View style={styles.borderLine} />				
		
 		<View style={styles.tableView}>
 				<Text style={styles.tableText}>C. Landslide - Roadway Length Affected</Text>
 				{tableC}
 				{inputC}
 
 		</View>	
 		<View style={styles.borderLine} />	
		
 		<View style={styles.tableView}>
 				<Text style={styles.tableText}>D. Rockfall - Ditch Effectiveness(Consider launch features) </Text>
 				{tableD}
 				{inputD}
 
 		</View>	
 		<View style={styles.borderLine} />	
		
 		<View style={styles.tableView}>
 				<Text style={styles.tableText}>E. Rockfall - Rockfall History</Text>
 				{tableE}
 				{inputE}
 
 		</View>	
 		<View style={styles.borderLine} />	
		
 		<View style={styles.tableView}>
 				<Text style={styles.tableText}>F. Rockfall - Block Size or Volume per Event</Text>
 				{tableF}
 				{inputF}
 	   			
 		</View>	
 		<View style={styles.borderLine} />
		
 		<View style={styles.tableView}>
 				<Text style={styles.tableText}>G. All - Impact on Use</Text>
      	  	  	<RadioForm
    		  	 style={{marginLeft:40,}}
                 radio_props={formSourceG}
                 initial={this.state.impactOnUseKey}
    			 formHorizontal={false}
                 onPress={(value) => {
    				   this.setState({impactOnUse:value},()=>{
 	   					this.saveSiteInfo();
						this.prelimLandslideRating(this.state.rockfallLandslide);
						this.prelimRockfallRating(this.state.rockfallLandslide);
    				});
    		 		}
    		 		}
    				onBlur={()=>{
					this.onBlurInputCheck('G');
					this.prelimLandslideRating(this.state.rockfallLandslide);
					this.prelimRockfallRating(this.state.rockfallLandslide);
    			}}
    		 	/> 	
     
 				<TextInput 
				keyboardType='numeric'
 				value={this.state.impactOnUse}
 				onChangeText={(val)=>this.setState({impactOnUse:val})}
 				style={styles.textInput}
 				onBlur={()=>{
 					this.onBlurInputCheck('G');
 					this.prelimLandslideRating(this.state.rockfallLandslide);
 					this.prelimRockfallRating(this.state.rockfallLandslide);
					this.saveSiteInfo()
					
 				}}
				
 				placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
 				</TextInput>
				
 		</View>	
 		<View style={styles.borderLine} />
		
 		<View style={styles.tableView}>
 				<Text style={styles.tableText}>H. All - AADT/Usage/Economic or Recreational Importance (highest rating applies)</Text>
     	  	  	<RadioForm
   		  	 	style={{marginLeft:40,}}
                radio_props={formSourceH}
                initial={this.state.aadtUsageKey}
   			    formHorizontal={false}
                onPress={(value) => {
   				   this.setState({aadtUsage:value},()=>{
	   					this.saveSiteInfo();
						this.prelimLandslideRating(this.state.rockfallLandslide);
						this.prelimRockfallRating(this.state.rockfallLandslide);
   				});
   		 		}
   		 		}
   				onBlur={()=>{
					this.onBlurInputCheck('H');
					this.prelimLandslideRating(this.state.rockfallLandslide);
					this.prelimRockfallRating(this.state.rockfallLandslide);
   			 }}
   		 	 /> 	
 			<CheckBox
 			    style={{flex: 1, padding: 10}}
 			    onClick={()=>{
 					this.setState({aadtUsageCalcCheckbox:!this.state.aadtUsageCalcCheckbox},()=>{
 						this.prelimAadt(this.state.aadtUsageCalcCheckbox);
						this.prelimRockfallRating(this.state.rockfallLandslide);
						this.prelimLandslideRating(this.state.rockfallLandslide);
 						this.setState({editable:!this.state.editable});
 						this.onBlurInputCheck('aadtUsageCalcCheckbox');
 					});
					
					
 				}}
 			    isChecked={this.state.aadtUsageCalcCheckbox}
 			    leftText={'Use AADT in calculation'}
 			/>
 				<TextInput 
				keyboardType='numeric'
 				value={this.state.aadtUsage}
 				onChangeText={(val)=>this.setState({aadtUsage:val},()=>{
 					this.saveSiteInfo()
 				})}
 				style={styles.textInputGray}
 				editable={this.state.editable}
 				onBlur={()=>{
 					this.onBlurInputCheck('H');
 					this.prelimLandslideRating(this.state.rockfallLandslide);
 					this.prelimRockfallRating(this.state.rockfallLandslide);
					this.saveSiteInfo()
					
 				}}
 				placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
 				</TextInput>
 
 		</View>	
 		<View style={styles.borderLine} />
		
 		<View style={{flex:1,}}>
 				<Text style={styles.labelText}>Preliminary Rating Landslide Total (A+B+C+G+H): </Text>
 				{inputLandTotal}
				
 
 		</View>	
 		<View style={styles.borderLine} />
				
 		<View style={{flex:1,}}>
 				<Text style={styles.labelText}>Preliminary Rating Rockfall Total (D+E+F+G+H):  </Text>
      		   	{inputRockTotal}
			   
 		</View>	
 		<View style={styles.borderLine} />	
		
 		<View style={{flex:1,}}>
 				<Text style={styles.labelText}>Preliminary Rating  Good (15-21 pts) | Fair (22-161 pts) | Poor (>161 pts) </Text>
     
 				<TextInput 
 				value={this.state.prelimRating}
 				editable={false}
 				onChangeText={(val)=>this.setState({prelimRating:val},()=>{
 					this.saveSiteInfo()
 				})}
 				style={styles.textInputGray}
 				placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
 				</TextInput>
 
 		</View>	
 		<View style={styles.borderLine} />				
						
   	<View style={styles.section}>
  		<Text 
 		style={styles.sectionText}
 		>
 		Slope Hazard Ratings
 		</Text>
	
   	</View>	
	
 	<View style={styles.tableView}>
 		<Text style={styles.tableText}>I. All - Slope Drainage</Text>
 	  	<RadioForm
  	 	style={{marginLeft:40,}}
       	radio_props={formSourceI}
       	initial={this.state.slopeDrainageKey}
	 	formHorizontal={false}
       	onPress={(value) => {
		   this.setState({slopeDrainage:value},()=>{
			    this.saveSiteInfo();
				this.rockfallHazardTotal(this.state.rockfallLandslide);
				this.landslideHazardTotal(this.state.rockfallLandslide);
		});
 		}
 		}
		onBlur={()=>{
			this.onBlurInputCheck('I');
			this.rockfallHazardTotal(this.state.rockfallLandslide);
			this.landslideHazardTotal(this.state.rockfallLandslide);
		}}
 		/> 	
 		

 		<TextInput 
		keyboardType='numeric'
 		value={this.state.slopeDrainage}
 		onChangeText={(val)=>this.setState({slopeDrainage:val},()=>{
 			this.saveSiteInfo()
 		})}
 		style={styles.textInput}
 		onBlur={()=>{
 			this.onBlurInputCheck('I');
 			this.rockfallHazardTotal(this.state.rockfallLandslide);
 			this.landslideHazardTotal(this.state.rockfallLandslide);
			
 		}}
 		placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
 		</TextInput>
		
 	</View>	
 	<View style={styles.borderLine} />
	
 	<View style={styles.tableView}>
 		<Text style={styles.tableText}>J. All - Annual Rainfall</Text>
 	  	<RadioForm
  	 	style={{marginLeft:40,}}
       	radio_props={formSourceJ}
       	initial={this.state.hazardRatingAnnualRainfallKey}
	 	formHorizontal={false}
       	onPress={(value) => {
		   this.setState({hazardRatingAnnualRainfall:value},()=>{
			    this.saveSiteInfo();
				this.rockfallHazardTotal(this.state.rockfallLandslide);
				this.landslideHazardTotal(this.state.rockfallLandslide);
		});
 		}
 		}
		onBlur={()=>{
			this.onBlurInputCheck('J');
			this.rockfallHazardTotal(this.state.rockfallLandslide);
			this.landslideHazardTotal(this.state.rockfallLandslide);
		}}
 		/> 	

 		<TextInput 
		keyboardType='numeric'
 		value={this.state.hazardRatingAnnualRainfall}
 		onChangeText={(val)=>this.setState({hazardRatingAnnualRainfall:val},()=>{
 			this.saveSiteInfo()
 		})}
 		style={styles.textInput}
 		onBlur={()=>{
 			this.onBlurInputCheck('J');
 			this.rockfallHazardTotal(this.state.rockfallLandslide);
 			this.landslideHazardTotal(this.state.rockfallLandslide);
			
 		}}
 		placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
 		</TextInput>
		
 	</View>	
 	<View style={styles.borderLine} />
	
 	<View style={styles.tableView}>
 		<Text style={styles.tableText}>K. All - Slope Height (rockfall)/Axial Length of slide (landslide)</Text>
 	  	<RadioForm
  	 	style={{marginLeft:40,}}
       	radio_props={formSourceK}
       	initial={this.state.hazardRatingSlopeHeightAxialLengthKey}
	 	formHorizontal={false}
       	onPress={(value) => {
		   this.setState({hazardRatingSlopeHeightAxialLength:value},()=>{
			    this.saveSiteInfo();
				this.rockfallHazardTotal(this.state.rockfallLandslide);
				this.landslideHazardTotal(this.state.rockfallLandslide);
		});
 		}
 		}
		onBlur={()=>{
			this.onBlurInputCheck('K');
			this.rockfallHazardTotal(this.state.rockfallLandslide);
			this.landslideHazardTotal(this.state.rockfallLandslide);
		}}
 		/> 

 		<TextInput 
		keyboardType='numeric'
 		value={this.state.hazardRatingSlopeHeightAxialLength}
 		onChangeText={(val)=>this.setState({hazardRatingSlopeHeightAxialLength:val},()=>{
 			this.saveSiteInfo()
 		})}
 		style={styles.textInput}
		editable={this.state.aadtCheck}
 		onBlur={()=>{
 			this.onBlurInputCheck('K');
 			this.rockfallHazardTotal(this.state.rockfallLandslide);
 			this.landslideHazardTotal(this.state.rockfallLandslide);
			
 		}}
 		placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
 		</TextInput>
		
 	</View>	
 	<View style={styles.borderLine} />
		
 	<View style={{flex:1,}}>
 		<Text style={styles.labelText}>Select One Unstable Slope Type </Text>
 		<Text style={styles.labelText}>Landslides / Erosion </Text>
		
 	<View style={styles.tableView}>
 		<Text style={styles.tableText}>L. Thaw Stability</Text>
 		{tableL} 
 		{inputL}
		
 	</View>	
 	<View style={styles.borderLine} />
	
 	<View style={styles.tableView}>
 		<Text style={styles.tableText}>M. Instability - Related Maint. Frequency</Text>
 		{tableM} 
 		{inputM}
		
 	</View>	
 	<View style={styles.borderLine} />
		
 	<View style={styles.tableView}>
 		<Text style={styles.tableText}>N. Movement History</Text>
 		{tableN} 
 		{inputN}
		
 	</View>	
 	<View style={styles.borderLine} />	
	
 	<Text style={styles.labelText}>Rockfalls </Text>
	
 	<View style={styles.tableView}>
 		<Text style={styles.tableText}>O. Rockfall-Related Maint. Frequency</Text>
 		{tableO} 
 		{inputO}
		
 	</View>	
 	<View style={styles.borderLine} />	
	
 	<Text style={styles.labelText}>Geologic Character Case 1 </Text>
	
 	<View style={styles.tableView}>
 		<Text style={styles.tableText}>P. Structural Condition</Text>
 		{tableP} 
 		{inputP}
		
 	</View>	
 	<View style={styles.borderLine} />
		
 	<View style={styles.tableView}>
 		<Text style={styles.tableText}>Q. Rock Friction</Text>
 		{tableQ} 
 		{inputQ}
		
		
 	</View>	
 	<View style={styles.borderLine} />
	
 	<Text style={styles.labelText}>Geologic Character Case 2 </Text>
	
 	<View style={styles.tableView}>
 		<Text style={styles.tableText}>R. Structural Condition</Text>
 		{tableR} 
 		{inputR}
		
		
 	</View>	
 	<View style={styles.borderLine} />
		
 	<View style={styles.tableView}>
 		<Text style={styles.tableText}>S. Diff. in Erosion Rates</Text>
 		{tableS} 
 		{inputS}
		
		
 	</View>	
 	<View style={styles.borderLine} />
				
 	</View>		
	
 	<View style={{flex:1,}}>
 		<Text style={styles.labelText}>T. LANDSLIDE HAZARD TOTAL (A+B+C+I+J+K+L+M+N): </Text>
 		{hazardLandTotal}

 	</View>	
 	<View style={styles.borderLine} />
		
 	<View style={{flex:1,}}>
 		<Text style={styles.labelText}>U. ROCKFALL HAZARD TOTAL (D+E+F+I+J+K+O+(greatest of P+Q or R+S)):  </Text>
 		{hazardRockTotal}

 	</View>	
 	<View style={styles.borderLine} />	
	
		
   	<View style={styles.section}>
  		<Text 
 		style={styles.sectionText}
 		>
 		Risk Ratings
 		</Text>
   	</View>	
		
 	<View style={styles.tableView}>
 		<Text style={styles.tableText}>V. Route Width or Trail Width</Text>
 	  	<RadioForm
  	 	style={{marginLeft:40,}}
       	radio_props={formSourceV}
       	initial={this.state.routeTrailWidthKey}
	 	formHorizontal={false}
       	onPress={(value) => {
		   this.setState({routeTrailWidth:value},()=>{
			    this.saveSiteInfo();
				this.riskTotal();
		});
 		}
 		}
		onBlur={()=>{
			this.onBlurInputCheck('V');
			this.riskTotal();
		}}
 		/> 

 		<TextInput 
		keyboardType='numeric'
 		value={this.state.routeTrailWidth}
 		onChangeText={(val)=>this.setState({routeTrailWidth:val},()=>{
 			this.saveSiteInfo()
 		})}
 		style={styles.textInput}
		editable={this.state.aadtCheck}
 		onBlur={()=>{
 			this.onBlurInputCheck('V');
 			this.riskTotal();
		    
 		}}
 		placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
 		</TextInput>
		
 	</View>	
 	<View style={styles.borderLine} />
	
 	<View style={styles.tableView}>
 		<Text style={styles.tableText}>W. Human Exposure Factor</Text>
 	  	<RadioForm
  	 	style={{marginLeft:40,}}
       	radio_props={formSourceW}
       	initial={this.state.humanExFactorKey}
	 	formHorizontal={false}
       	onPress={(value) => {
		   this.setState({humanExFactor:value},()=>{
			    this.saveSiteInfo();
				this.riskTotal();
		});
 		}
 		}
		onBlur={()=>{
			this.onBlurInputCheck('W');
			this.riskTotal();
		}}
 		/> 
		
 		<TextInput 
		keyboardType='numeric'
 		value={this.state.humanExFactor}
 		onChangeText={(val)=>this.setState({humanExFactor:val},()=>{
 			this.saveSiteInfo()
 		})}
 		style={styles.textInput}
 		onBlur={()=>{
 			this.onBlurInputCheck('W');
 			//this.humanExposureFactor();
 			this.riskTotal();
			
 		}}
 		placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
 		</TextInput>
		
 	</View>	
 	<View style={styles.borderLine} />
	
 	<View style={styles.tableView}>
 		<Text style={styles.tableText}>X. % of Decision Sight Distance (Judge avoidance ability on trails)</Text>
 	  	<RadioForm
  	 	style={{marginLeft:40,}}
       	radio_props={formSourceX}
       	initial={this.state.percentDsdKey}
	 	formHorizontal={false}
       	onPress={(value) => {
		   this.setState({percentDsd:value},()=>{
			    this.saveSiteInfo();
				this.riskTotal();
		});
 		}
 		}
		onBlur={()=>{
			this.onBlurInputCheck('X');
			this.riskTotal();
		}}
 		/> 

 		<TextInput 
		keyboardType='numeric'
 		value={this.state.percentDsd}
 		onChangeText={(val)=>this.setState({percentDsd:val},()=>{
 			this.saveSiteInfo()
 		})}
 		style={styles.textInput}
 		onBlur={()=>{
 			this.onBlurInputCheck('X');
 			this.riskTotal();
			
 		}}
 		placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
 		</TextInput>
		
 	</View>	
 	<View style={styles.borderLine} />
		
 	<View style={styles.tableView}>
 		<Text style={styles.tableText}>Y. Right of Way (R/W) Impacts (If Left Unattended)</Text>
 	  	<RadioForm
  	 	style={{marginLeft:40,}}
       	radio_props={formSourceY}
       	initial={this.state.rWImpactsKey}
	 	formHorizontal={false}
       	onPress={(value) => {
		   this.setState({rWImpacts:value},()=>{
			    this.saveSiteInfo();
				this.riskTotal();
		});
 		}
 		}
		onBlur={()=>{
			this.onBlurInputCheck('Y');
			this.riskTotal();
		}}
 		/> 
		
 		<TextInput 
		keyboardType='numeric'
 		value={this.state.rWImpacts}
 		onChangeText={(val)=>this.setState({rWImpacts:val},()=>{
 			this.saveSiteInfo()
 		})}
 		style={styles.textInput}
 		onBlur={()=>{
 			this.onBlurInputCheck('Y');
 			this.riskTotal();
			
 		}}
 		placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
 		</TextInput>
		
 	</View>	
 	<View style={styles.borderLine} />
	
 	<View style={styles.tableView}>
 		<Text style={styles.tableText}>Z. Environmental/Cultural Impacts if Left Unattended</Text>
 	  	<RadioForm
  	 	style={{marginLeft:40,}}
       	radio_props={formSourceZ}
       	initial={this.state.enviroCultImpactsKey}
	 	formHorizontal={false}
       	onPress={(value) => {
		   this.setState({enviroCultImpacts:value},()=>{
			    this.saveSiteInfo();
				this.riskTotal();
		});
 		}
 		}
		onBlur={()=>{
			this.onBlurInputCheck('Z');
			this.riskTotal();
		}}
 		/> 
		
 		<TextInput 
		keyboardType='numeric'
 		value={this.state.enviroCultImpacts}
 		onChangeText={(val)=>this.setState({enviroCultImpacts:val},()=>{
 			this.saveSiteInfo()
 		})}
 		style={styles.textInput}
 		onBlur={()=>{
 			this.onBlurInputCheck('Z');
 			this.riskTotal();
			
 		}}
 		placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
 		</TextInput>
		
 	</View>	
 	<View style={styles.borderLine} />
	
 	<View style={styles.tableView}>
 		<Text style={styles.tableText}>AA. Maintenance Complexity</Text>
 	  	<RadioForm
  	 	style={{marginLeft:40,}}
       	radio_props={formSourceAA}
       	initial={this.state.maintComplexityKey}
	 	formHorizontal={false}
       	onPress={(value) => {
		   this.setState({maintComplexity:value},()=>{
			    this.saveSiteInfo();
				this.riskTotal();
		});
 		}
 		}
		onBlur={()=>{
			this.onBlurInputCheck('AA');
			this.riskTotal();
		}}
 		/> 
		
 		<TextInput 
		keyboardType='numeric'
 		value={this.state.maintComplexity}
 		onChangeText={(val)=>this.setState({maintComplexity:val},()=>{
 			this.saveSiteInfo()
 		})}
 		style={styles.textInput}
 		onBlur={()=>{
 			this.onBlurInputCheck('AA');
 			this.riskTotal();
			
 		}}
 		placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
 		</TextInput>
		
 	</View>	
 	<View style={styles.borderLine} />
	
 	<View style={styles.tableView}>
 		<Text style={styles.tableText}>BB. Event Cost</Text>
 	  	<RadioForm
  	 	style={{marginLeft:40,}}
       	radio_props={formSourceBB}
       	initial={this.state.eventCostKey}
	 	formHorizontal={false}
       	onPress={(value) => {
		   this.setState({eventCost:value},()=>{
			    this.saveSiteInfo();
				this.riskTotal();
		});
 		}
 		}
		onBlur={()=>{
			this.onBlurInputCheck('BB');
			this.riskTotal();
		}}
 		/> 
		
 		<TextInput 
		keyboardType='numeric'
 		value={this.state.eventCost}
 		onChangeText={(val)=>this.setState({eventCost:val},()=>{
 			this.saveSiteInfo()
 		})}
 		style={styles.textInput}
 		onBlur={()=>{
 			this.onBlurInputCheck('BB');
 			this.riskTotal();
			
 		}}
 		placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
 		</TextInput>
		
 	</View>	
 	<View style={styles.borderLine} />
		
 	<View style={{flex:1,}}>
 		<Text style={styles.labelText}>CC. Risk Totals (G+H+V+W+X+Y+Z+AA+BB):</Text>

 		<TextInput 
 		value={this.state.riskTotal}
 		editable={false}
 		onChangeText={(val)=>this.setState({riskTotal:val},()=>{
 			this.saveSiteInfo()
 		})}
 		style={styles.textInputGray}
 		placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
 		</TextInput>

 	</View>	
 	<View style={styles.borderLine} />
		
 	<View style={{flex:1,}}>
 		<Text style={styles.labelText}>TOTAL USMP SCORE: LANDSLIDES (T+CC) OR ROCKFALL (U+CC): Good ({'<'}200 pts) | Fair (200-400 pts) | Poor (>400 pts)</Text>

 		<TextInput 
 		value={this.state.totalScore}
 		editable={false}
 		onChangeText={(val)=>this.setState({totalScore:val})}
 		style={styles.textInputGray}
 		placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
 		</TextInput>

 	</View>	
 	<View style={styles.borderLine} />	
	<View style={{flex:1,height:250}}>
	</View>		
		</ScrollView>
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
  	  marginRight:Dimensions.get('window').width*0.43,  
    },
    sectionText: {
      fontSize: 16,
  	  fontWeight:'bold',  
      color: 'black',
      padding: 4,
    },
    section: {
  	  height:30,  
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ddd9c3',
  	  borderBottomWidth: 1,
  	  borderBottomColor:'#ddd',
    },
    textInput:{
  	  height:40,
  	  borderWidth:0.5,
  	  borderColor:'#0f0f0f',
  	  //alignSelf:'stretch',
  	  color:'blue',
  	  backgroundColor: 'white',
  	  borderTopWidth: 2,
  	  borderTopColor: '#ededed',
  	  fontSize: 16,
	  marginLeft:20,
	  marginRight:20,	
    },
    textInputGray:{
  	  height:40,
  	  borderWidth:0.5,
  	  borderColor:'#0f0f0f',
  	  //alignSelf:'stretch',
  	  color:'blue',
  	  backgroundColor: '#ddd',
  	  borderTopWidth: 2,
  	  borderTopColor: '#ededed',
  	  fontSize: 16,
	  marginLeft:20,
	  marginRight:20,	
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
  	  width:100,
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
    signText:{
    	marginLeft:20,
    },
    picker:{
    	  height:150,
  	  width:150,
    },
    labelText:{
      fontSize: 16,
  	  fontWeight:'bold',  
      color: 'black',
      padding: 4,
	  marginLeft:15, 	
    },
    tableText:{
      fontSize: 16,
  	fontWeight:'bold',  
      color: 'black',
      padding: 4,
  	marginLeft:0,  
    },
    tableView:{
    	flex:1,
  	marginLeft:20,
    },
    borderLine:{
    	borderBottomColor: 'black', 
    	borderBottomWidth: 1, 
      width: Dimensions.get('window').width,
    }
});

//AppRegistry.registerComponent('Test', () => Test);
