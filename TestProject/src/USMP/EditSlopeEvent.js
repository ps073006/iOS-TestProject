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
} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/Entypo';
import DatePicker from 'react-native-datepicker';
import styles from '../styles/Textstyle';
import {dataRegion,dataLocal,dataSide,dataWeather,dataYesNo,dataState} from './agencyInfo.js';
import realm from './realm';
import SelectMultiple from 'react-native-select-multiple';
import Upload from '../components/Upload';

const roadOrTrail = [
  {label: 'Road', value: 'R' },
  {label: 'Trail', value: 'T' }
];

const hazardType = [
  {label: 'Rockfall', value: '0' },
  {label: 'Landslide/Erosion', value: '1' },	
  {label: 'Debris Flow', value: '2' },	
  {label: 'Snow avalanche', value: '3' }
];

const eventId = [
  {label: 'Known', value: 'K' },
  {label: 'Approximately', value: 'A' },
  {label: 'Unknown', value: 'U' }
];

const condition = [
  {label: 'Blocked', value: 'Blocked' },
  {label: 'Blocked, detours exist around the failure', value: 'Blocked, detours exist around the failure' },	
  {label: 'Partially Blocked but Passable', value: 'Partially Blocked but Passable' },	
  {label: 'Ditch Full of Debris', value: 'Ditch Full of Debris' },
  {label: 'Route threatened by unstable slope', value: 'Route threatened by unstable slope' }	
];

const sizeRock = [
  {label: 'Less than 3 inches (< 8cm) - baseball size or smaller', value: '1' },
  {label: 'Less than 1 foot (< 30cm) - basketball size or smaller', value: '2' },	
  {label: '1 to 3 feet (30 - 100cm) - fits through standard doorway', value: '3' },	
  {label: 'Greater than 3 feet (> 1m) - thousands of pounds', value: '4' }
];

const numFallenRocks = [
  {label: '1', value: '1' },
  {label: '2', value: '2' },	
  {label: '3-5', value: '5' },	
  {label: '5-10', value: '10' },
  {label: '10+', value: '11' }	
];

const volDebris = [
  {label: 'Less than 5 ft<sup>3</sup> (< 0.15 m<sup>3</sup>) – wheelbarrow or less', value: '1' },
  {label: 'Less than 2.5 yd<sup>3</sup> (< 2 m<sup>3</sup>) – pickup truck or less', value: '2' },	
  {label: 'Less than 10 yd<sup>3</sup> (< 8 m<sup>3</sup>) – dump truck or less', value: '3' },	
  {label: 'More than 10 yd<sup>3</sup> (> 8 m<sup>3</sup>) – several dump trucks', value: '4' }
];

const eventLocation = [
  {label: 'Above road/trail', value: 'above_road' },
  {label: 'Below road/trail', value: 'below_road' },	
  {label: 'At a culvert', value: 'at_culvert' },	
  {label: 'Above river', value: 'above_river' },
  {label: 'Above coast', value: 'above_coast' },
  {label: 'Burned area', value: 'burned_area' },	
  {label: 'Deforested slope', value: 'deforested_slope' },	
  {label: 'Urban', value: 'urban' },
  {label: 'Mine', value: 'mine' },
  {label: 'Retaining wall', value: 'retaining_wall' },	
  {label: 'Natural slope', value: 'natural_slope' },	
  {label: 'Engineered slope', value: 'engineered_slope' },
  {label: 'Unknown', value: 'unknown' },	
  {label: 'Other (Please describe in Observer Comments)', value: 'other' }
						
];

const CauseOfEvent = [
  {label: 'Rain', value: 'rain_checkbox' },
  {label: 'Thunderstorm/downpour', value: 'thunder_checkbox' },	
  {label: 'Continuous rain (for more than 24 hours)', value: 'cont_rain_checkbox' },	
  {label: 'Hurricane/cyclone', value: 'hurricane_checkbox' },
  {label: 'Flooding', value: 'flood_checkbox' },
  {label: 'Snowfall/snowmelt', value: 'snowfall_checkbox' },	
  {label: 'Prolonged freezing', value: 'freezing_checkbox' },	
  {label: 'High temperatures', value: 'high_temp_checkbox' },
  {label: 'Long-term creep/poor soil cond.', value: 'soil_checkbox' },		
  {label: 'Earthquake', value: 'earthquake_checkbox' },
  {label: 'Volcanic activity', value: 'volcano_checkbox' },	
  {label: 'Leaking pipe', value: 'leaky_pipe_checkbox' },	
  {label: 'Mining', value: 'mining_checkbox' },
  {label: 'Construction', value: 'construction_checkbox' },	
  {label: 'Dam embankment collapse', value: 'dam_embankment_collapse_checkbox' },
  {label: 'No obvious cause', value: 'not_obvious_checkbox' },
  {label: 'Unknown cause', value: 'unknown_checkbox' },	
  {label: 'Other (Please describe in Observer Comments)', value: 'other_checkbox' }
	
];

const damagesYN = [
  {label: 'Yes', value: 'Y' },
  {label: 'No', value: 'N' }
];


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


export default class NewMaintenance extends Component {
	constructor(props){
		super(props);
		
		const data = this.props.navigation.state.params;
	
		var date = new Date();
		
        var today = date.getFullYear() + "/" + (((date.getMonth()+1) < 10)?"0":"") + 
			(date.getMonth()+1) + "/" + ((date.getDate() < 10)?"0":"") + date.getDate();

        /* var timeNow =((date.getHours() < 10)?"0":"") + date.getHours() 
			 +":"+ ((date.getMinutes() < 10)?"0":"") + date.getMinutes() +":"+
			  ((date.getSeconds() < 10)?"0":"") + date.getSeconds();
  		var date = today+" "+timeNow;*/
		//MAINTENANCE_FORM table
		let sites = realm.objects('SLOPE_EVENT');
		let sitesSorted = sites.sorted('id');
		var last_id = 0;
		if(sitesSorted.length>0){
			last_id = sitesSorted[sitesSorted.length-1].id;
		}
		last_id = last_id +1;
		//selectDateApproximator
		var selectDateApproximatorKey = -1;
		if(data.selectDateApproximator.toString()== 'K'){
			var selectDateApproximatorKey = 0;
		}
		else if(data.selectDateApproximator.toString()== 'A'){
			var selectDateApproximatorKey = 1;
		}
		else if(data.selectDateApproximator.toString()== 'U'){
			var selectDateApproximatorKey = 2;
		}
		
		//hazardTypeVal
		/*if(data.hazardTypeVal.toString()== 'R'){
			var hazardTypeValKey = 0;
		}
		else if(data.hazardTypeVal.toString()== 'L'){
			var hazardTypeValKey = 1;
		}
		else if(data.hazardTypeVal.toString()== 'D'){
			var hazardTypeValKey = 2;
		}
		else if(data.hazardTypeVal.toString()== 'A'){
			var hazardTypeValKey = 3;
		}*/
		//hazardlinks
		let dataHazardType = realm.objects('HAZARD_LINK').filtered('id='+ parseInt(data.hazardTypeVal));
		var dataHazardtype = [];
		//alert("comment"+data.hazardTypeVal)
		for(let i=0;i<dataHazardType.length;i++){
			//dataHazardtype.push(dataHazardType[i].hazardLink.toString())
			dataHazardtype.push({value:dataHazardType[i].hazardLink.toString()})
			//alert("comment"+dataHazardtype[i])
		}
		//alert("comment"+dataHazardtype.length)
		
		//roadOrTrail
		var roadOrTrailKey = -1;
		if(data.roadOrTrail.toString()== 'R'){
			var roadOrTrailKey = 0;
		}
		else if(data.roadOrTrail.toString()== 'T'){
			var roadOrTrailKey = 1;
		}
		
		//condition
		var conditionKey = -1;
		if(data.condition.toString()== 'Blocked'){
			var conditionKey = 0;
		}
		else if(data.condition.toString()== 'Blocked, detours exist around the failure'){
			var conditionKey = 1;
		}
		else if(data.condition.toString()== 'Partially Blocked but Passable'){
			var conditionKey = 2;
		}
		else if(data.condition.toString()== 'Ditch Full of Debris'){
			var conditionKey = 3;
		}
		else if(data.condition.toString()== 'Route threatened by unstable slope'){
			var conditionKey = 4;
		}
		
		//sizeRockVal
		var sizeRockValKey = -1;
		if(data.sizeRockVal.toString()== '1'){
			var sizeRockValKey = 0;
		}
		else if(data.sizeRockVal.toString()== '2'){
			var sizeRockValKey = 1;
		}
		else if(data.sizeRockVal.toString()== '3'){
			var sizeRockValKey = 2;
		}
		else if(data.sizeRockVal.toString()== '4'){
			var sizeRockValKey = 3;
		}
		
		//numFallenRocksVal
		var numFallenRocksValKey = -1;
		if(data.numFallenRocksVal.toString()== '1'){
			var numFallenRocksValKey = 0;
		}
		else if(data.numFallenRocksVal.toString()== '2'){
			var numFallenRocksValKey = 1;
		}
		else if(data.numFallenRocksVal.toString()== '5'){
			var numFallenRocksValKey = 2;
		}
		else if(data.numFallenRocksVal.toString()== '10'){
			var numFallenRocksValKey = 3;
		}
		else if(data.numFallenRocksVal.toString()== '11'){
			var numFallenRocksValKey = 4;
		}
		
		//volDebrisVal
		var volDebrisValKey = -1;
		if(data.volDebrisVal.toString()== '1'){
			var volDebrisValKey = 0;
		}
		else if(data.volDebrisVal.toString()== '2'){
			var volDebrisValKey = 1;
		}
		else if(data.volDebrisVal.toString()== '3'){
			var volDebrisValKey = 2;
		}
		else if(data.volDebrisVal.toString()== '4'){
			var volDebrisValKey = 3;
		}
		
		//alert("comment"+data.damagesYNVal.toString())
		//damagesYNVal
		var damagesYNValKey = 1;
		if(data.damagesYNVal.toString()== 'Y'){
			var damagesYNValKey = 0;
		}
		else if(data.damagesYNVal.toString()== 'N'){
			var damagesYNValKey = 1;
		}
		
		var eventLocation =[];
		
		if(data.aboveRoad.toString()== '1'){
			eventLocation.push('above_road');
		}
		if(data.belowRoad.toString()== '1'){
			eventLocation.push('below_road');
		}
		if(data.atCulvert.toString()== '1'){
			eventLocation.push('at_culvert');
		}
		if(data.aboveRiver.toString()== '1'){
			eventLocation.push('above_river');
		}
		if(data.aboveCoast.toString()== '1'){
			eventLocation.push('above_coast');
		}
		if(data.burnedArea.toString()== '1'){
			eventLocation.push('burned_area');
		}
		if(data.deforestedSlope.toString()== '1'){
			eventLocation.push('deforested_slope');
		}
		if(data.urban.toString()== '1'){
			eventLocation.push('urban');
		}
		if(data.mine.toString()== '1'){
			eventLocation.push('mine');
		}
		if(data.retainingWall.toString()== '1'){
			eventLocation.push('retaining_wall');
		}
		if(data.naturalSlope.toString()== '1'){
			eventLocation.push('natural_slope');
		}
		if(data.engineeredSlope.toString()== '1'){
			eventLocation.push('engineered_slope');
		}
		if(data.unknownLocation.toString()== '1'){
			eventLocation.push('unknown');
		}
		if(data.otherLocation.toString()== '1'){
			eventLocation.push('other');
		}
		
		var CauseOfEvent =[];
		
		if(data.rain.toString()== '1'){
			CauseOfEvent.push('rain_checkbox');
		}
		if(data.thunder.toString()== '1'){
			CauseOfEvent.push('thunder_checkbox');
		}
		if(data.contRain.toString()== '1'){
			CauseOfEvent.push('cont_rain_checkbox');
		}
		if(data.hurricane.toString()== '1'){
			CauseOfEvent.push('hurricane_checkbox');
		}
		if(data.flood.toString()== '1'){
			CauseOfEvent.push('flood_checkbox');
		}
		if(data.snowfall.toString()== '1'){
			CauseOfEvent.push('snowfall_checkbox');
		}
		if(data.freezing.toString()== '1'){
			CauseOfEvent.push('freezing_checkbox');
		}
		if(data.highTemp.toString()== '1'){
			CauseOfEvent.push('high_temp_checkbox');
		}
		if(data.earthquake.toString()== '1'){
			CauseOfEvent.push('earthquake_checkbox');
		}
		if(data.volcano.toString()== '1'){
			CauseOfEvent.push('volcano_checkbox');
		}
		if(data.leakyPipe.toString()== '1'){
			CauseOfEvent.push('leaky_pipe_checkbox');
		}
		if(data.mining.toString()== '1'){
			CauseOfEvent.push('mining_checkbox');
		}
		if(data.construction.toString()== '1'){
			CauseOfEvent.push('construction_checkbox');
		}
		if(data.damEmbankmentCollapse.toString()== '1'){
			CauseOfEvent.push('dam_embankment_collapse_checkbox');
		}
		if(data.notObvious.toString()== '1'){
			CauseOfEvent.push('not_obvious_checkbox');
		}
		if(data.unknownCause.toString()== '1'){
			CauseOfEvent.push('unknown_checkbox');
		}
		if(data.otherCause.toString()== '1'){
			CauseOfEvent.push('other_checkbox');
		}
		
		this.state={
			id:data.id,
			slopeEvent:1,
			observerName:data.observerName,
			email:data.email,
			phoneNo:data.phoneNo,
			observerComments:data.observerComments,
			date:data.date,
			selectDateApproximator:data.selectDateApproximator,
			firstinput:data.firstinput,
			hazardTypeVal:dataHazardtype,
			selectedState:data.selectedState,
			rtNo:data.rtNo,
			roadOrTrail:data.roadOrTrail,
			beginMileMarker:data.beginMileMarker.toFixed(2).toString(),
			endMileMarker:data.endMileMarker.toFixed(2).toString(),
			datum:'WGS 84',
			beginCoordinateLatitude:data.beginCoordinateLatitude.toString(),
			beginCoordinateLongitude:data.beginCoordinateLongitude.toString(),
			condition:data.condition,
			affectedLength:data.affectedLength.toFixed(2).toString(),
			sizeRockVal:data.sizeRockVal,
			numFallenRocksVal:data.numFallenRocksVal,
			volDebrisVal:data.volDebrisVal,
			eventLocationVal:eventLocation,
			CauseOfEventVal:CauseOfEvent,
			damagesYNVal:data.damagesYNVal,
			damagesVal:data.damagesVal,
			aboveRoad:data.aboveRoad,
			belowRoad:data.belowRoad,
			atCulvert:data.atCulvert,
			aboveRiver:data.aboveRiver,
			aboveCoast:data.aboveCoast,
			burnedArea:data.burnedArea,
			deforestedSlope:data.deforestedSlope,
			urban:data.urban,
			mine:data.mine,
			retainingWall:data.retainingWall,
			naturalSlope:data.naturalSlope,
			engineeredSlope:data.engineeredSlope,
			unknownLocation:data.unknownLocation,
			otherLocation:data.otherLocation,
			rain:data.rain,
			thunder:data.thunder,
			contRain:data.contRain,
			hurricane:data.hurricane,
			flood:data.flood,
			snowfall:data.snowfall,
			freezing:data.freezing,
			highTemp:data.highTemp,
			earthquake:data.earthquake,
			volcano:data.volcano,
			leakyPipe:data.leakyPipe,
			mining:data.mining,
			construction:data.construction,
			damEmbankmentCollapse:data.damEmbankmentCollapse,
			notObvious:data.notObvious,
			unknownCause:data.unknownCause,
			otherCause:data.otherCause,
			roadOrTrailKey:roadOrTrailKey,
			selectDateApproximatorKey:selectDateApproximatorKey,
			//hazardTypeValKey:hazardTypeValKey,
			conditionKey:conditionKey,
			sizeRockValKey:sizeRockValKey,
			numFallenRocksValKey:numFallenRocksValKey,
			volDebrisValKey:volDebrisValKey,
			damagesYNValKey:damagesYNValKey,
			hazardLink:data.hazardTypeVal,
		}
	}
	
    renderState(){
		//this.setState({selectedAgency:value});
		//alert(value)
    	items=[];
		for(let item of dataState){
			let text = item;
				items.push(<Picker.Item key={item} value={item} label={text}/>)
		
		}
		return items;
    	}
	
	saveSiteInfo(){
		/*alert("observerName:"+ this.state.observerName+"email:"+this.state.email+
		"phoneNo:"+this.state.phoneNo+"observerComments"+this.state.observerComments+"date"+this.state.date+
		"selectDateApproximator"+this.state.selectDateApproximator+"firstinput"+this.state.firstinput
		+"hazardTypeVal"+this.state.hazardTypeVal+
		"selectedState"+this.state.selectedState+"rtNo"+this.state.rtNo+"roadOrTrail"+this.state.roadOrTrail+
		"beginMileMarker"+this.state.beginMileMarker+"endMileMarker"+this.state.endMileMarker+"datum"+this.state.datum
		+"beginCoordinateLatitude"+this.state.beginCoordinateLatitude+
		"beginCoordinateLongitude"+this.state.beginCoordinateLongitude+"condition"+this.state.condition
		+"affectedLength"+this.state.affectedLength+
		"sizeRockVal"+this.state.sizeRockVal+"numFallenRocksVal"+this.state.numFallenRocksVal
		+"volDebrisVal"+this.state.volDebrisVal+
		"damagesYNVal"+this.state.damagesYNVal+"damagesVal"+this.state.damagesVal);*/
		//alert("observerName:"+this.state.aboveRoad+"observerName:"+this.state.rain)
	  	realm.write(()=>{
			let site = realm.create('SLOPE_EVENT',{
			id: this.state.id,
			observerName:this.state.observerName,
			email:this.state.email,
			phoneNo:this.state.phoneNo,
			observerComments:this.state.observerComments,
			date:this.state.date,
			selectDateApproximator:this.state.selectDateApproximator,
			firstinput:this.state.firstinput,
			hazardTypeVal:this.state.hazardLink,
			selectedState:this.state.selectedState,
			rtNo:this.state.rtNo,
			roadOrTrail:this.state.roadOrTrail,
			beginMileMarker:isNaN(parseFloat(this.state.beginMileMarker))? 0.0: parseFloat(this.state.beginMileMarker),
			endMileMarker:isNaN(parseFloat(this.state.endMileMarker))? 0.0: parseFloat(this.state.endMileMarker),
			datum:this.state.datum,
			beginCoordinateLatitude:isNaN(parseFloat(this.state.beginCoordinateLatitude))? 0.0: parseFloat(this.state.beginCoordinateLatitude),
			beginCoordinateLongitude:isNaN(parseFloat(this.state.beginCoordinateLongitude))? 0.0: parseFloat(this.state.beginCoordinateLongitude),
			condition:this.state.condition,
			affectedLength:isNaN(parseFloat(this.state.affectedLength))? 0.0: parseFloat(this.state.affectedLength),
			sizeRockVal:isNaN(parseInt(this.state.sizeRockVal))? 0: parseInt(this.state.sizeRockVal),
			numFallenRocksVal:isNaN(parseInt(this.state.numFallenRocksVal))? 0: parseInt(this.state.numFallenRocksVal),
			volDebrisVal:isNaN(parseInt(this.state.volDebrisVal))? 0: parseInt(this.state.volDebrisVal),
			damagesYNVal:this.state.damagesYNVal,
			damagesVal:this.state.damagesVal,
			aboveRoad:isNaN(parseInt(this.state.aboveRoad))? 0: parseInt(this.state.aboveRoad),
			belowRoad:isNaN(parseInt(this.state.belowRoad))? 0: parseInt(this.state.belowRoad),
			atCulvert:isNaN(parseInt(this.state.atCulvert))? 0: parseInt(this.state.atCulvert),
			aboveRiver:isNaN(parseInt(this.state.aboveRiver))? 0: parseInt(this.state.aboveRiver),
			aboveCoast:isNaN(parseInt(this.state.aboveCoast))? 0: parseInt(this.state.aboveCoast),
			burnedArea:isNaN(parseInt(this.state.burnedArea))? 0: parseInt(this.state.burnedArea),
			deforestedSlope:isNaN(parseInt(this.state.deforestedSlope))? 0: parseInt(this.state.deforestedSlope),
			urban:isNaN(parseInt(this.state.urban))? 0: parseInt(this.state.urban),
			mine:isNaN(parseInt(this.state.mine))? 0: parseInt(this.state.mine),
			retainingWall:isNaN(parseInt(this.state.retainingWall))? 0: parseInt(this.state.retainingWall),
			naturalSlope:isNaN(parseInt(this.state.naturalSlope))? 0: parseInt(this.state.naturalSlope),
			engineeredSlope:isNaN(parseInt(this.state.engineeredSlope))? 0: parseInt(this.state.engineeredSlope),
			unknownLocation:isNaN(parseInt(this.state.unknownLocation))? 0: parseInt(this.state.unknownLocation),
			otherLocation:isNaN(parseInt(this.state.otherLocation))? 0: parseInt(this.state.otherLocation),
			rain:isNaN(parseInt(this.state.rain))? 0: parseInt(this.state.rain),
			thunder:isNaN(parseInt(this.state.thunder))? 0: parseInt(this.state.thunder),
			contRain:isNaN(parseInt(this.state.contRain))? 0: parseInt(this.state.contRain),
			hurricane:isNaN(parseInt(this.state.hurricane))? 0: parseInt(this.state.hurricane),
			flood:isNaN(parseInt(this.state.flood))? 0: parseInt(this.state.flood),
			snowfall:isNaN(parseInt(this.state.snowfall))? 0: parseInt(this.state.snowfall),
			freezing:isNaN(parseInt(this.state.freezing))? 0: parseInt(this.state.freezing),
			highTemp:isNaN(parseInt(this.state.highTemp))? 0: parseInt(this.state.highTemp),
			earthquake:isNaN(parseInt(this.state.earthquake))? 0: parseInt(this.state.earthquake),
			volcano:isNaN(parseInt(this.state.volcano))? 0: parseInt(this.state.volcano),
			leakyPipe:isNaN(parseInt(this.state.leakyPipe))? 0: parseInt(this.state.leakyPipe),
			mining:isNaN(parseInt(this.state.mining))? 0: parseInt(this.state.mining),
			construction:isNaN(parseInt(this.state.construction))? 0: parseInt(this.state.construction),
			damEmbankmentCollapse:isNaN(parseInt(this.state.damEmbankmentCollapse))? 0: parseInt(this.state.damEmbankmentCollapse),
			notObvious:isNaN(parseInt(this.state.notObvious))? 0: parseInt(this.state.notObvious),
			unknownCause:isNaN(parseInt(this.state.unknownCause))? 0: parseInt(this.state.unknownCause),
			otherCause:isNaN(parseInt(this.state.otherCause))? 0: parseInt(this.state.otherCause),
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
		
			if(this.state.hazardTypeVal.findIndex(checkArray)==-1){
				updateKey = 1;
			}
			//alert(updateKey);
		
			if(updateKey == 1){
			realm.delete(hazardlinks);

			for(let i = 0; i < this.state.hazardTypeVal.length; i++){
				this.state.hazardTypeVal[i]['value']
			let	hazardlink = realm.create('HAZARD_LINK',{
					id: parseInt(this.state.hazardLink),
					hazardLink:parseInt(this.state.hazardTypeVal[i]['value']),

				},true);
			
		
				}//for 
			}//if
				
	  	});
	}
	//setting selected hazardtypes
	onSelectionsChange = (hazardTypeVal) => {
	    // selectedFruits is array of { label, value }
	    this.setState({ hazardTypeVal:hazardTypeVal },()=>{
			this.saveSiteInfo();
	    	//alert(hazardTypeVal[0]['value'])
	    })
		
	  }

  onSelectionsChangeLocation = (value) => {
	    // selectedFruits is array of { label, value }
	    this.setState({eventLocationVal:value},()=>{
			//this.saveSiteInfo();
	    	//alert(this.state.eventLocationVal[0]['label']);
			this.setState({aboveRoad:0},()=>{
				 this.saveSiteInfo();
				});
			this.setState({belowRoad:0},()=>{
				 this.saveSiteInfo();
				});
			this.setState({atCulvert:0},()=>{
				 this.saveSiteInfo();
				});		
			this.setState({aboveRiver:0},()=>{
				 this.saveSiteInfo();
				});		
			this.setState({aboveCoast:0},()=>{
				 this.saveSiteInfo();
				});	
			this.setState({burnedArea:0},()=>{
					 this.saveSiteInfo();
					});
			this.setState({deforestedSlope:0},()=>{
					 this.saveSiteInfo();
					});
			this.setState({urban:0},()=>{
					 this.saveSiteInfo();
					});		
			this.setState({mine:0},()=>{
					 this.saveSiteInfo();
					});		
			this.setState({retainingWall:0},()=>{
					 this.saveSiteInfo();
					});
			this.setState({naturalSlope:0},()=>{
					this.saveSiteInfo();
					});		
			this.setState({engineeredSlope:0},()=>{
					this.saveSiteInfo();
					});		
			this.setState({unknownLocation:0},()=>{
					this.saveSiteInfo();
					});		
			this.setState({otherLocation:0},()=>{
					this.saveSiteInfo();
					});
			
			for(let i=0;i<this.state.eventLocationVal.length;i++){
				//alert(this.state.eventLocationVal[i]['label']);
				if(this.state.eventLocationVal[i]['value']=='above_road'){
					this.setState({aboveRoad:1},()=>{
						 this.saveSiteInfo();
						})
				}
				if(this.state.eventLocationVal[i]['value']=='below_road'){
					this.setState({belowRoad:1},()=>{
						 this.saveSiteInfo();
						})
				}
				if(this.state.eventLocationVal[i]['value']=='at_culvert'){
					this.setState({atCulvert:1},()=>{
						 this.saveSiteInfo();
						})
				}
				if(this.state.eventLocationVal[i]['value']=='above_river'){
					this.setState({aboveRiver:1},()=>{
						 this.saveSiteInfo();
						})
				}
				if(this.state.eventLocationVal[i]['value']=='above_coast'){
					this.setState({aboveCoast:1},()=>{
						 this.saveSiteInfo();
						})
				}
				if(this.state.eventLocationVal[i]['value']=='burned_area'){
					this.setState({burnedArea:1},()=>{
						 this.saveSiteInfo();
						})
				}
				if(this.state.eventLocationVal[i]['value']=='deforested_slope'){
					this.setState({deforestedSlope:1},()=>{
						 this.saveSiteInfo();
						})
				}
				if(this.state.eventLocationVal[i]['value']=='urban'){
					this.setState({urban:1},()=>{
						 this.saveSiteInfo();
						})
				}
				if(this.state.eventLocationVal[i]['value']=='mine'){
					this.setState({mine:1},()=>{
						 this.saveSiteInfo();
						})
				}
				if(this.state.eventLocationVal[i]['value']=='retaining_wall'){
					this.setState({retainingWall:1},()=>{
						 this.saveSiteInfo();
						})
				}
				if(this.state.eventLocationVal[i]['value']=='natural_slope'){
					this.setState({naturalSlope:1},()=>{
						 this.saveSiteInfo();
						})
				}
				if(this.state.eventLocationVal[i]['value']=='engineered_slope'){
					this.setState({engineeredSlope:1},()=>{
						 this.saveSiteInfo();
						})
				}
				if(this.state.eventLocationVal[i]['value']=='unknown'){
					this.setState({unknownLocation:1},()=>{
						 this.saveSiteInfo();
						})
				}
				if(this.state.eventLocationVal[i]['value']=='other'){
					this.setState({otherLocation:1},()=>{
						 this.saveSiteInfo();
						})
				}
			}//end for loop
	    })
		
	  }	
	  
  onSelectionsChangeEvent = (value) => {
		    // selectedFruits is array of { label, value }
		    this.setState({CauseOfEventVal:value},()=>{
				//this.saveSiteInfo();
		    	//alert(this.state.CauseOfEventVal[0]['label'])
					this.setState({rain:0},()=>{
					 	this.saveSiteInfo();
						});
					this.setState({thunder:0},()=>{
					  	this.saveSiteInfo();
					 	});
					this.setState({contRain:0},()=>{
						 this.saveSiteInfo();
						});
					this.setState({hurricane:0},()=>{
						 this.saveSiteInfo();
						});	
					this.setState({flood:0},()=>{
						 this.saveSiteInfo();
						});
					this.setState({snowfall:0},()=>{
						  this.saveSiteInfo();
						 });
					this.setState({freezing:0},()=>{
						 this.saveSiteInfo();
						});
					this.setState({highTemp:0},()=>{
						 this.saveSiteInfo();
						});	
						this.setState({earthquake:0},()=>{
						 	this.saveSiteInfo();
							});
						this.setState({volcano:0},()=>{
						  	this.saveSiteInfo();
						 	});
						this.setState({leakyPipe:0},()=>{
							 this.saveSiteInfo();
							});
						this.setState({mining:0},()=>{
							 this.saveSiteInfo();
							});	
						this.setState({construction:0},()=>{
							 this.saveSiteInfo();
							});
						this.setState({damEmbankmentCollapse:0},()=>{
							  this.saveSiteInfo();
							 });
						this.setState({notObvious:0},()=>{
							 this.saveSiteInfo();
							});
						this.setState({unknownCause:0},()=>{
							 this.saveSiteInfo();
							});
						this.setState({otherCause:0},()=>{
							 this.saveSiteInfo();
							});	
						
				for(let i=0;i<this.state.CauseOfEventVal.length;i++){
					if(this.state.CauseOfEventVal[i]['value']=='rain_checkbox'){
						this.setState({rain:1},()=>{
							 this.saveSiteInfo();
							})
					}
					if(this.state.CauseOfEventVal[i]['value']=='thunder_checkbox'){
						this.setState({thunder:1},()=>{
							 this.saveSiteInfo();
							})
					}
					if(this.state.CauseOfEventVal[i]['value']=='cont_rain_checkbox'){
						this.setState({contRain:1},()=>{
							 this.saveSiteInfo();
							})
					}
					if(this.state.CauseOfEventVal[i]['value']=='hurricane_checkbox'){
						this.setState({hurricane:1},()=>{
							 this.saveSiteInfo();
							})
					}
					if(this.state.CauseOfEventVal[i]['value']=='flood_checkbox'){
						this.setState({flood:1},()=>{
							 this.saveSiteInfo();
							})
					}
					if(this.state.CauseOfEventVal[i]['value']=='snowfall_checkbox'){
						this.setState({snowfall:1},()=>{
							 this.saveSiteInfo();
							})
					}
					if(this.state.CauseOfEventVal[i]['value']=='freezing_checkbox'){
						this.setState({freezing:1},()=>{
							 this.saveSiteInfo();
							})
					}
					if(this.state.CauseOfEventVal[i]['value']=='high_temp_checkbox'){
						this.setState({highTemp:1},()=>{
							 this.saveSiteInfo();
							})
					}
					if(this.state.CauseOfEventVal[i]['value']=='earthquake_checkbox'){
						this.setState({earthquake:1},()=>{
							 this.saveSiteInfo();
							})
					}
					if(this.state.CauseOfEventVal[i]['value']=='volcano_checkbox'){
						this.setState({volcano:1},()=>{
							 this.saveSiteInfo();
							})
					}
					if(this.state.CauseOfEventVal[i]['value']=='leaky_pipe_checkbox'){
						this.setState({leakyPipe:1},()=>{
							 this.saveSiteInfo();
							})
					}
					if(this.state.CauseOfEventVal[i]['value']=='mining_checkbox'){
						this.setState({mining:1},()=>{
							 this.saveSiteInfo();
							})
					}
					if(this.state.CauseOfEventVal[i]['value']=='construction_checkbox'){
						this.setState({construction:1},()=>{
							 this.saveSiteInfo();
							})
					}
					if(this.state.CauseOfEventVal[i]['value']=='dam_embankment_collapse_checkbox'){
						this.setState({damEmbankmentCollapse:1},()=>{
							 this.saveSiteInfo();
							})
					}
					if(this.state.CauseOfEventVal[i]['value']=='not_obvious_checkbox'){
						this.setState({notObvious:1},()=>{
							 this.saveSiteInfo();
							})
					}
					if(this.state.CauseOfEventVal[i]['value']=='unknown_checkbox'){
						this.setState({unknownCause:1},()=>{
							 this.saveSiteInfo();
							})
					}
					if(this.state.CauseOfEventVal[i]['value']=='other_checkbox'){
						this.setState({otherCause:1},()=>{
							 this.saveSiteInfo();
							})
					}
				}//end for loop
		    })
		
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
  
  //onBlur Input Check
  onBlurInputCheck(value){
	  if(value == 'rtNo'){
		if(this.state.rtNo.match(road_trail_number_regex) === null)
		{
			alert(road_trail_number_format_S);
		}else{
			this.saveSiteInfo();
		}
			
			}
			
	  if(value == 'phoneNo'){
		if(this.state.phoneNo.match(phone_no_regex) === null)
		{
			alert(phone_no_format_S);
		}else{
			this.saveSiteInfo();
		}
			
			}
			
	  if(value == 'beginMileMarker'){
		if(this.state.beginMileMarker.match(begin_mile_marker_regex) === null)
		{
			alert(begin_mile_marker_format_S);
		}else{
			this.saveSiteInfo();
		}
	
			}
			
	  if(value == 'endMileMarker'){
		if(this.state.endMileMarker.match(end_mile_marker_regex) === null)
		{
			alert(end_mile_marker_format_S);
			
		}else{
			this.saveSiteInfo();
		}
			
			}	
		
	  if(value == 'affectedLength'){
	  	if(this.state.affectedLength.match(affectedLength_regex) === null)
		{
	  		alert(affectedLength_format_S);
			
	  	}else{
	  		this.saveSiteInfo();
	  	}
			
	  		}		
				
	  if(value == 'beginCoordinateLatitude'){
		if(this.state.beginCoordinateLatitude.match(/^\d+\.\d+$/) === null)
		{
			alert("Begin Coordinate Latitude format must match '##.#####'.");
		
		}
		
			}
			
	  if(value == 'beginCoordinateLongitude'){
		if(this.state.beginCoordinateLongitude.match(/^-\d+\.\d+$/) === null)
		{
			alert("Begin Coordinate Longitude format must match '-###.#####'.");
		
		}
			
			}
			
	  if(this.state.damagesYNVal == "Y" && this.state.damagesVal == "")
		{
			alert("Please describe the Deaths, Injuries, or Damages Occur Due to the Landslide/Rockfall.");
			
		}			
  }
	
	render(){
		var firstinput = null;
		var sizeRockVar = null;
		var numFallenRocksVar = null;
		var volDebrisVar = null;
		var damages = null;
		
		if(this.state.damagesYNVal=='Y'){
			damages = <TextInput 
			returnKeyType={'next'}
			onSubmitEditing={() =>{ }}
			value={this.state.damagesVal}
			multiline={true} 
			numberOfLines={3}
			onChangeText={(val)=>this.setState({damagesVal:val},()=>{
				this.saveSiteInfo();
			})}
			style={styles.textInput}
			placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>;
		}
		
		if(this.state.damagesYNVal=='N'){
			damages = null;
		}
		
		if(this.state.selectDateApproximator=='U'){
			firstinput = null;
		}
		if(this.state.selectDateApproximator=='K'||this.state.selectDateApproximator=='A'){
			firstinput = 
    	 	<DatePicker
         	style={{width: 200, paddingBottom:5}}
         	date={this.state.firstinput}
         	mode="date"
		 	selectedValue={this.state.firstinput}
         	placeholder="select Event date"
         	format="MM/DD/YYYY"
         	minDate="05/01/2016"
         	maxDate="12/31/2050"
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
         	onDateChange={(date) => {this.setState({firstinput: date},()=>{
         	//this.saveSiteInfo();
         	})}}
		 	onBlur={()=>{}}
       	 	/>;
		}
		
		if(this.state.hazardTypeVal.length > 0){
			//alert(this.state.hazardTypeVal[0] )
			if(this.state.hazardTypeVal[0]['value']=='0'){
				//alert(this.state.hazardTypeVal[0]['value'] )
			    sizeRockVar =  <RadioForm
				style={{marginLeft:40,}}
	            radio_props={sizeRock}
	            initial={this.state.sizeRockValKey}
			 	formHorizontal={false}
	            onPress={(value) => {
					this.setState({sizeRockVal:value},()=>{
						this.saveSiteInfo();
					});
			 	}
			 	}
				onBlur={()=>{
		
				}}
	       	 	/> 		;
			
			    numFallenRocksVar =  <RadioForm
				style={{marginLeft:40,}}
	            radio_props={numFallenRocks}
	            initial={this.state.numFallenRocksValKey}
			 	formHorizontal={false}
	            onPress={(value) => {
					this.setState({numFallenRocksVal:value},()=>{
						this.saveSiteInfo();
					});
			 	}
			 	}
				onBlur={()=>{
		
				}}
	       	 	/> 		;
			
				volDebrisVar = null;
			}
			if(this.state.hazardTypeVal[0]['value']=='1'||this.state.hazardTypeVal[0]['value']=='2'||this.state.hazardTypeVal[0]['value']=='3'){
				//alert(this.state.hazardTypeVal[0]['value'] )
				sizeRockVar = null;
				numFallenRocksVar = null;
			
				volDebrisVar = <RadioForm
				style={{marginLeft:40,}}
	            radio_props={volDebris}
	            initial={this.state.volDebrisValKey}
			 	formHorizontal={false}
	            onPress={(value) => {
					this.setState({volDebrisVal:value},()=>{
						this.saveSiteInfo();
					});
			 	}
			 	}
				onBlur={()=>{
		
				}}
	       	 	/> 		;
			}
			
		}else{
			//alert(this.state.hazardTypeVal.length )
			sizeRockVar = null;
			numFallenRocksVar = null;
			volDebrisVar = null;
		}
     
	return(
	<View style={styles.container}>
	      	<View style={styles.header}>
	  	  	<Icon name="menu" 
			style={{marginTop:20,marginRight:Dimensions.get('window').width*0.3,color:'white'}}  
			size={40} 
			backgroundColor="#3b5998" 
			onPress={() => this.props.navigation.navigate('DrawerOpen')}>			
			</Icon>
			<Text
			style={styles.headerText}
			onPress={() => this.props.navigation.navigate('DrawerOpen')}>

			Edit Slope Event Form
			</Text>
	      	</View>
			<ScrollView>	
      		<View style={styles.section}>
     		<Text 
			style={styles.sectionText}
			>
			Observer Information
			</Text>
      		</View>	
			
 			<View style={{flex:1}}>
			<Text style={styles.labelText}>Observer Name:</Text>	
			<TextInput
			value={this.state.observerName}
			returnKeyType={'next'}
			onSubmitEditing={() => {
				this.email.focus();
			}} 
			onChangeText={(val)=>this.setState({observerName:val},()=>{	
			
			})}
			style={styles.textInput}
			onBlur={()=>{
				this.saveSiteInfo();
				//this.onBlurInputCheck('observerName');
			}}
			placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
			</View>	
			<View style={styles.borderLine} />
			
			<View style={{flex:1,}}>
	  	  	<Text style={styles.labelText}>Email:</Text>
			<TextInput
			value={this.state.email}
			returnKeyType={'next'}
			onSubmitEditing={() => {
				this.phoneNo.focus();
			}}
			ref={nextInput => this.email = nextInput} 
			onChangeText={(val)=>this.setState({email:val},()=>{
				
			
			})}
			style={styles.textInput}
			onBlur={()=>{
				this.saveSiteInfo();
			}}
			placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
    		</View>	
			<View style={styles.borderLine} />	
			
			<View style={{flex:1,}}>
	  	  	<Text style={styles.labelText}>Phone No.:</Text>
			<TextInput
			value={this.state.phoneNo}
			returnKeyType={'next'}
			keyboardType='numeric'
			onSubmitEditing={() => {
				this.observerComments.focus();
			}}
			ref={nextInput => this.phoneNo = nextInput} 
			onChangeText={(val)=>this.setState({phoneNo:val},()=>{
				
			})}
			style={styles.textInput}
			onBlur={()=>{
				this.onBlurInputCheck('phoneNo');//this.saveSiteInfo();
			
			}}
			placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
 	 
    		</View>	
			<View style={styles.borderLine} />	
			
			<View style={{flex:1,}}>
			<Text style={styles.labelText}>Observer Comments: </Text>
			<TextInput 
			returnKeyType={'next'}
			onSubmitEditing={() =>{ }}
			ref={nextInput => this.observerComments = nextInput}
			value={this.state.observerComments}
			multiline={true} 
			numberOfLines={3}
			onChangeText={(val)=>this.setState({observerComments:val},()=>{
				this.saveSiteInfo();
			})}
			style={styles.textInput}
			placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
			</View>	
			<View style={styles.borderLine} />	
			
			<View style={{flex:1,}}>
	  	  	<Text style={styles.labelText}>Today{"'"}s Date:</Text>
			<TextInput
			value={this.state.date}
			editable={false}
			onSubmitEditing={() => {
			
			}}
			onChangeText={(val)=>this.setState({date:val},()=>{
				//this.saveSiteInfo();
			
			})}
			style={styles.textInput}
			onBlur={()=>{
			  this.saveSiteInfo();
			}}
			placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
    		</View>	
			<View style={styles.borderLine} />	
			
			<View style={{flex:1, }}>
	  	  	<Text style={styles.labelText}>Date of Event:</Text>
  	  	  	<RadioForm
			style={{marginLeft:40,}}
            radio_props={eventId}
            initial={this.state.selectDateApproximatorKey}
		 	formHorizontal={false}
            onPress={(value) => {
				this.setState({selectDateApproximator:value},()=>{
					this.saveSiteInfo();
				});
		 	}
		 	}
			onBlur={()=>{
		
			}}
       	 	/> 		
 	 
   		 	</View>	
			<View style={styles.borderLine} />	
			
    		<View style={{flex:1}}>
			
		 	{firstinput}
			
			</View>
			<View style={styles.borderLine} />	
			
      		<View style={styles.section}>
     		<Text 
			style={styles.sectionText}
			>
			Event Information
			</Text>
      		</View>	
			
			<View style={{flex:1, }}>
	  	  	<Text style={styles.labelText}>Hazard Type:(Select all that apply)</Text>
			<SelectMultiple
            items={hazardType}
            selectedItems={this.state.hazardTypeVal}
            onSelectionsChange={this.onSelectionsChange}
		    onBlur={()=>{
				//this.onBlurInputCheck('hazardType');
			}} />
  	  	  	{/*<RadioForm
			style={{marginLeft:40,}}
            radio_props={hazardType}
            initial={this.state.hazardTypeValKey}
		 	formHorizontal={false}
            onPress={(value) => {
				this.setState({hazardTypeVal:value},()=>{
					//this.routeTrailWidth();
					this.saveSiteInfo();
				});
		 	}
		 	}
			onBlur={()=>{
				//this.routeTrailWidth();
				//this.onBlurInputCheck('roadOrTrail');
			}}
       	 	/> 	*/}	
 	 
   		 	</View>	
			<View style={styles.borderLine} />	
			
			<View style={{flex:1,}}>
	  	  	<Text style={styles.labelText}>State:</Text>
			<Picker 
			itemStyle={{fontSize:14,height:80}} 
			style={styles.picker} 
			style={{ flex:1 }} 
			enabled={true}
			selectedValue={this.state.selectedState}
			onValueChange={(value)=>this.setState({selectedState:value},()=>{
							this.saveSiteInfo();
			})}
			onBlur={()=>{}}
			>
				{this.renderState()}
			</Picker> 
   		 	</View>	
			<View style={styles.borderLine} />	
				
			<View style={{flex:1,}}>
					<Text style={styles.labelText}>Upload Images:</Text>
					<Upload 
					siteId={this.state.id} 
					slopeEvent={this.state.slopeEvent}
					onBlur={()=>this.saveSiteInfo()}
		
					/>

			</View>	
			<View style={styles.borderLine} />				
			
			<View style={{flex:1,}}>
	  	  	<Text style={styles.labelText}>Road/Trail No:</Text>
			<TextInput
			value={this.state.rtNo}
			returnKeyType={'next'}
			onSubmitEditing={() => {
				this.beginMileMarker.focus();
				//this.onBlurInputCheck('rtNo');
			}} 
			ref={nextInput => this.rtNo = nextInput} 
			onChangeText={(val)=>this.setState({rtNo:val},()=>{
				//this.saveSiteInfo();
				//alert(val);
				//this.onBlurInputCheck('rtNo');
			})}
			style={styles.textInput}
			onBlur={()=>{
				//this.rtClass.focus();
				//alert(this.state.rtNo);
				this.onBlurInputCheck('rtNo');
			}}
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
		 	formHorizontal={false}
            onPress={(value) => {
				this.setState({roadOrTrail:value},()=>{
					//this.routeTrailWidth();
					this.saveSiteInfo();
				});
				
			 //alert(this.state.rockfallLandslide)
		 	}
		 	}
			onBlur={()=>{
				//this.routeTrailWidth();
				//this.onBlurInputCheck('roadOrTrail');
			}}
            /> 		
 	 
    		</View>	
			<View style={styles.borderLine} />
			
			<View style={{flex:1,}}>
	   		  <Text style={styles.labelText}>Beginning Mile Marker:</Text>
				<TextInput
				value={this.state.beginMileMarker}
				returnKeyType={'next'}
				onSubmitEditing={() => {this.endMileMarker.focus()}}
				ref={nextInput => this.beginMileMarker = nextInput}
				keyboardType='numeric'
				onChangeText={(val)=>this.setState({beginMileMarker:val},()=>{
					
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
				 	value={this.state.endMileMarker}
					returnKeyType={'next'}
					onSubmitEditing={() => {this.beginCoordinateLatitude.focus()}}
					ref={nextInput => this.endMileMarker = nextInput} 
					keyboardType='numeric'
					onChangeText={(val)=>this.setState({endMileMarker:val},()=>{
					
					})}
					style={styles.textInput}
					onBlur={()=>this.onBlurInputCheck('endMileMarker')}
		
					placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
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
   		  	<Text style={styles.labelText}>Event location Coord.  Lat/Long:</Text>
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
				this.saveSiteInfo();
			})}
			value={this.state.beginCoordinateLatitude}
			style={styles.textInput}
			onBlur={()=>this.onBlurInputCheck('beginCoordinateLatitude')}
			placeholder='Lat (##.#####)' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
			<TextInput 
			returnKeyType={'next'}
			onSubmitEditing={() => {this.affectedLength.focus()}}
			ref={nextInput => this.beginCoordinateLongitude = nextInput} 
			onChangeText={(val)=>this.setState({beginCoordinateLongitude:val},()=>{
				this.saveSiteInfo();
			})}
			style={styles.textInput}
			value={this.state.beginCoordinateLongitude}
			onBlur={()=>this.onBlurInputCheck('beginCoordinateLongitude')}
			placeholder='Long (-###.#####)' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
			</View>	
			<View style={styles.borderLine} />	
			
			<View style={{flex:1, }}>
	  	  	<Text style={styles.labelText}>Road/Trail Condition after failure:</Text>
  	  	  	<RadioForm
			style={{marginLeft:40,}}
            radio_props={condition}
            initial={this.state.conditionKey}
		 	formHorizontal={false}
            onPress={(value) => {
				this.setState({condition:value},()=>{
					this.saveSiteInfo();
				});
		 	}
		 	}
			onBlur={()=>{
		
			}}
       	 	/> 		
   		 	</View>	
			<View style={styles.borderLine} />	
			
 			<View style={{flex:1}}>
			<Text style={styles.labelText}>Length of Affected Road/Trail (ft): (1 m = 3 ft):</Text>	
			<TextInput
			value={this.state.affectedLength}
			returnKeyType={'next'}
			keyboardType='numeric'
			onSubmitEditing={() => {
				//this.email.focus();
			}} 
			ref={nextInput => this.affectedLength = nextInput} 
			onChangeText={(val)=>this.setState({affectedLength:val},()=>{
				//this.saveSiteInfo();
			
			})}
			style={styles.textInput}
			onBlur={()=>{
				this.onBlurInputCheck('affectedLength');
			}}
			placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
			</View>	
			<View style={styles.borderLine} />
			
    		<View style={{flex:1}}>
			<Text style={styles.labelText}>Size of Largest Fallen Rock:(Rockfall only)</Text>
		 	{sizeRockVar}
			
			</View>
			<View style={styles.borderLine} />	
			
    		<View style={{flex:1}}>
			<Text style={styles.labelText}>Number of Fallen Rocks:(Rockfall only)</Text>
		 	{numFallenRocksVar}
			
			</View>
			<View style={styles.borderLine} />	
			
    		<View style={{flex:1}}>
			<Text style={styles.labelText}>Estimated Volume of Debris:</Text>
		 	{volDebrisVar}
			
			</View>
			<View style={styles.borderLine} />	
			
    		<View style={{flex:1}}>
			<Text style={styles.labelText}>Description of Event Location:(Select all that apply)</Text>
			<SelectMultiple
             items={eventLocation}
             selectedItems={this.state.eventLocationVal}
             onSelectionsChange={this.onSelectionsChangeLocation}
			 onBlur={()=>this.saveSiteInfo()} />
			
			</View>
			<View style={styles.borderLine} />	
			
    		<View style={{flex:1}}>
			<Text style={styles.labelText}>Possible Cause of Event:(Select all that apply)</Text>
			<SelectMultiple
             items={CauseOfEvent}
             selectedItems={this.state.CauseOfEventVal}
             onSelectionsChange={this.onSelectionsChangeEvent}
			 onBlur={()=>this.saveSiteInfo()} />
			
			</View>
			<View style={styles.borderLine} />	
			 
 			<View style={{flex:1, }}>
 	  	  	<Text style={styles.labelText}>Did deaths, injuries or damages coincide with landslide/rockfall?</Text>
   	  	  	<RadioForm
 			style={{marginLeft:40,}}
            radio_props={damagesYN}
            initial={this.state.damagesYNValKey}
 		 	formHorizontal={false}
            onPress={(value) => {
 				this.setState({damagesYNVal:value},()=>{
 					this.saveSiteInfo();
 				});
 		 	}
 		 	}
 			onBlur={()=>{
		
 			}}
        	/> 		
    		</View>	
 			<View style={styles.borderLine} />	
			
   			<View style={{flex:1}}>
			<Text style={styles.labelText}>If yes, describe:</Text>
			{damages}
			</View>
			<View style={styles.borderLine} />	 
				
			<View style={{flex:1,height:250}}>
			</View>				
			</ScrollView>
			
	</View>
		);
	}	
}