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
import {dataRegion,dataLocal,dataSide,dataWeather,dataYesNo} from './agencyInfo.js';
import realm from './realm';

const maintenanceType = [
  {label: 'New Maintenance', value: 'N' },
  {label: 'Repeat Maintenance (within 5 years)', value: 'O' }
];

const typeofEvent = [
  {label: 'Recent Unstable Slope Event', value: 'USE' },
  {label: 'Routine Maintenance', value: 'RM' },	
  {label: 'Slope Mitigation/Repair', value: 'SM' }
];

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



export default class NewMaintenance extends Component {
	constructor(props){
		super(props);
		
		const data = this.props.navigation.state.params;
	
		var date = new Date();
		
        var today = date.getFullYear() + "-" + (((date.getMonth()+1) < 10)?"0":"") + 
			(date.getMonth()+1) + "-" + ((date.getDate() < 10)?"0":"") + date.getDate();

         var timeNow =((date.getHours() < 10)?"0":"") + date.getHours() 
			 +":"+ ((date.getMinutes() < 10)?"0":"") + date.getMinutes() +":"+
			  ((date.getSeconds() < 10)?"0":"") + date.getSeconds();
  		var date = today+" "+timeNow;
		//MAINTENANCE_FORM table
		let sites = realm.objects('MAINTENANCE_FORM');
		let sitesSorted = sites.sorted('id');
		var last_id = 0;
		if(sitesSorted.length>0){
			last_id = sitesSorted[sitesSorted.length-1].id;
		}
		last_id = last_id +1;
		
		//maintenanceType
		var maintenanceTypeKey = -1;
		//alert(data.maintenanceType.toString())
		if(data.maintenanceType.toString()== 'N'){
			var maintenanceTypeKey = 0;
		}
		else if(data.maintenanceType.toString()== 'O'){
			var maintenanceTypeKey = 1;
		}
		
		//typeofEvent
		var typeofEventKey = -1;
		//alert(data.typeofEvent.toString())
		if(data.typeofEvent.toString()== 'USE'){
			var typeofEventKey = 0;
		}
		else if(data.typeofEvent.toString()== 'RM'){
			var typeofEventKey = 1;
		}
		else if(data.typeofEvent.toString()== 'SM'){
			var typeofEventKey = 2;
		}
		
		//alert(data.maintenanceType.toString()+ "  "+data.typeofEvent.toString());
		
		this.state={
			id:data.id,
			siteId:data.siteId.toString(),
			codeRelation:data.codeRelation,
			maintenanceType:data.maintenanceType.toString(),
			maintenanceTypeKey:maintenanceTypeKey,
			rtNo:data.rtNo,
			beginMileMarker:data.beginMileMarker.toFixed(2).toString(),
			endMileMarker:data.endMileMarker.toFixed(2).toString(),
			maintenanceLat:data.maintenanceLat.toString(),
			maintenanceLong:data.maintenanceLong.toString(),
			selectedAgency:data.selectedAgency,
			selectedRegion:data.selectedRegion,
			selectedLocal:data.selectedLocal,
			typeofEvent:data.typeofEvent.toString(),
			typeofEventKey:typeofEventKey,
			eventDesc:data.eventDesc,
			date: date,
			oldDate:data.date,
			total:data.total,
			designPse:data.designPse.toString(),
			removeDitchDebris:data.removeDitchDebris.toString(),
			removeRoadTrailDebris:data.removeRoadTrailDebris.toString(),
			relevelAggregate:data.relevelAggregate.toString(),
			relevelPatch:data.relevelPatch.toString(),
			drainageImprovement:data.drainageImprovement.toString(),
			deepPatch:data.deepPatch.toString(),
			haulDebris:data.haulDebris.toString(),
			scalingRockSlopes:data.scalingRockSlopes.toString(),
			roadTrailAlignment:data.roadTrailAlignment.toString(),
			repairRockfallBarrier:data.repairRockfallBarrier.toString(),
			repairRockfallNetting:data.repairRockfallNetting.toString(),
			sealingCracks:data.sealingCracks.toString(),
			guardrail:data.guardrail.toString(),
			cleaningDrains:data.cleaningDrains.toString(),
			flaggingSigning:data.flaggingSigning.toString(),
			other1Desc:data.other1Desc,
			other1:data.other1.toString(),
			other2Desc:data.other2Desc,
			other2:data.other2.toString(),
			other3Desc:data.other3Desc,
			other3:data.other3.toString(),
			other4Desc:data.other4Desc,
			other4:data.other4.toString(),
			other5Desc:data.other5Desc,
			other5:data.other5.toString(),
			totalPercent:data.totalPercent,
			designPseVal:data.designPseVal.toString(),
			removeDitchDebrisVal:data.removeDitchDebrisVal.toString(),
			removeRoadTrailDebrisVal:data.removeRoadTrailDebrisVal.toString(),
			relevelAggregateVal:data.relevelAggregateVal.toString(),
			relevelPatchVal:data.relevelPatchVal.toString(),
			drainageImprovementVal:data.drainageImprovementVal.toString(),
			deepPatchVal:data.deepPatchVal.toString(),
			haulDebrisVal:data.haulDebrisVal.toString(),
			scalingRockSlopesVal:data.scalingRockSlopesVal.toString(),
			roadTrailAlignmentVal:data.roadTrailAlignmentVal.toString(),
			repairRockfallBarrierVal:data.repairRockfallBarrierVal.toString(),
			repairRockfallNettingVal:data.repairRockfallNettingVal.toString(),
			sealingCracksVal:data.sealingCracksVal.toString(),
			guardrailVal:data.guardrailVal.toString(),
			cleaningDrainsVal:data.cleaningDrainsVal.toString(),
			flaggingSigningVal:data.flaggingSigningVal.toString(),
			other1Val:data.other1Val.toString(),
			other2Val:data.other2Val.toString(),
			other3Val:data.other3Val.toString(),
			other4Val:data.other4Val.toString(),
			other5Val:data.other5Val.toString(),
		}
	}
	
	sum_percentages(){
	  var input1 = this.state.designPse;
	  var input2 = this.state.removeDitchDebris;
	  var input3 = this.state.removeRoadTrailDebris;
	  var input4 = this.state.relevelAggregate;
	  var input5 = this.state.relevelPatch;
	  var input6 = this.state.drainageImprovement;
	  var input7 = this.state.deepPatch;
	  var input8 = this.state.haulDebris;
	  var input9 = this.state.scalingRockSlopes;
	  var input10 = this.state.roadTrailAlignment;
	  var input11 = this.state.repairRockfallBarrier;
	  var input12 = this.state.repairRockfallNetting;
	  var input13 = this.state.sealingCracks;
	  var input14 = this.state.guardrail;
	  var input15 = this.state.cleaningDrains;
	  var input16 = this.state.flaggingSigning;
	  var input17 = this.state.other1;
	  var input18 = this.state.other2;
	  var input19 = this.state.other3;
	  var input20 = this.state.other4;
	  var input21 = this.state.other5;
	  var total = this.state.total;
	  var result = parseInt(input1) + parseInt(input2) + parseInt(input3) + parseInt(input4)
	        + parseInt(input5) + parseInt(input6) + parseInt(input7) + parseInt(input8)
	        + parseInt(input9) + parseInt(input10) + parseInt(input11) + parseInt(input12)
	        + parseInt(input13) + parseInt(input14) + parseInt(input15) + parseInt(input16)
	        + parseInt(input17) + parseInt(input18) + parseInt(input19) + parseInt(input20)
	         + parseInt(input21);
		//alert(result);	 
	  if(!isNaN(result)){
		  //alert(result);
		  this.setState({totalPercent:result.toString()},()=>{
	    	this.saveSiteInfo();
	    });	
	    //document.getElementById('total_percent').value = result;
	  }
	  if(!isNaN(input1)){
		  this.setState({designPseVal:parseFloat(total * (input1/100))},()=>{
	    	this.saveSiteInfo();
	    });	
	   // document.getElementById('design_pse_val').value = parseInt(total * (input1/100));
    
	  }
	  if(!isNaN(input2)){
		  this.setState({removeDitchDebrisVal:parseFloat(total * (input2/100))},()=>{
	    	this.saveSiteInfo();
	    });	
	    //document.getElementById('remove_ditch_debris_val').value = parseInt(total * (input2/100));
    
	  }
	  if(!isNaN(input3)){
		  this.setState({removeRoadTrailDebrisVal:parseFloat(total * (input3/100))},()=>{
	    	this.saveSiteInfo();
	    });
	    //document.getElementById('remove_road_trail_debris_val').value = parseInt(total * (input3/100));
    
	  }
	  if(!isNaN(input4)){
		  this.setState({relevelAggregateVal:parseFloat(total * (input4/100))},()=>{
	    	this.saveSiteInfo();
	    });
	    
	    //document.getElementById('relevel_aggregate_val').value = parseInt(total * (input4/100));
    
	  }
	  if(!isNaN(input5)){
		  this.setState({relevelPatchVal:parseFloat(total * (input5/100))},()=>{
	    	this.saveSiteInfo();
	    });
		  
	    //document.getElementById('relevel_patch_val').value = parseInt(total * (input5/100));
    
	  }
	  if(!isNaN(input6)){
		  this.setState({drainageImprovementVal:parseFloat(total * (input6/100))},()=>{
	    	this.saveSiteInfo();
	    });
		
	   // document.getElementById('drainage_improvement_val').value = parseInt(total * (input6/100));
    
	  }
	  if(!isNaN(input7)){
		  this.setState({deepPatchVal:parseFloat(total * (input7/100))},()=>{
	    	this.saveSiteInfo();
	    });
		
	   // document.getElementById('deep_patch_val').value = parseInt(total * (input7/100));
    
	  }
	  if(!isNaN(input8)){
		  this.setState({haulDebrisVal:parseFloat(total * (input8/100))},()=>{
	    	this.saveSiteInfo();
	    });
		
	   // document.getElementById('haul_debris_val').value = parseInt(total * (input8/100));
    
	  }
	  if(!isNaN(input9)){
		  this.setState({scalingRockSlopesVal:parseFloat(total * (input9/100))},()=>{
	    	this.saveSiteInfo();
	    });
		
	    //document.getElementById('scaling_rock_slopes_val').value = parseInt(total * (input9/100));
    
	  }
	  if(!isNaN(input10)){
		  this.setState({roadTrailAlignmentVal:parseFloat(total * (input10/100))},()=>{
	    	this.saveSiteInfo();
	    });
		
	    //document.getElementById('road_trail_alignment_val').value = parseInt(total * (input10/100));
    
	  }
	  if(!isNaN(input11)){
		  this.setState({repairRockfallBarrierVal:parseFloat(total * (input11/100))},()=>{
	    	this.saveSiteInfo();
	    });
		
	   // document.getElementById('repair_rockfall_barrier_val').value = parseInt(total * (input11/100));
    
	  }
	  if(!isNaN(input12)){
		  this.setState({repairRockfallNettingVal:parseFloat(total * (input12/100))},()=>{
	    	this.saveSiteInfo();
	    });
		
	    //document.getElementById('repair_rockfall_netting_val').value = parseInt(total * (input12/100));
    
	  }
	  if(!isNaN(input13)){
		  this.setState({sealingCracksVal:parseFloat(total * (input13/100))},()=>{
	    	this.saveSiteInfo();
	    });
		
	   // document.getElementById('sealing_cracks_val').value = parseInt(total * (input13/100));
    
	  }
	  if(!isNaN(input14)){
		  this.setState({guardrailVal:parseFloat(total * (input14/100))},()=>{
	    	this.saveSiteInfo();
	    });
		
	    //document.getElementById('guardrail_val').value = parseInt(total * (input14/100));
    
	  }
	  if(!isNaN(input15)){
		  this.setState({cleaningDrainsVal:parseFloat(total * (input15/100))},()=>{
	    	this.saveSiteInfo();
	    });
		
	   // document.getElementById('cleaning_drains_val').value = parseInt(total * (input15/100));
    
	  }
	  if(!isNaN(input16)){
		  this.setState({flaggingSigningVal:parseFloat(total * (input16/100))},()=>{
	    	this.saveSiteInfo();
	    });
		
	   // document.getElementById('flagging_signing_val').value = parseInt(total * (input16/100));
    
	  }
	  if(!isNaN(input17)){
		  this.setState({other1Val:parseFloat(total * (input17/100))},()=>{
	    	this.saveSiteInfo();
	    });
		
	   // document.getElementById('other1_val').value = parseInt(total * (input17/100));
    
	  }
	  if(!isNaN(input18)){
		  this.setState({other2Val:parseFloat(total * (input18/100))},()=>{
	    	this.saveSiteInfo();
	    });
		
	    //document.getElementById('other2_val').value = parseInt(total * (input18/100));
    
	  }
	  if(!isNaN(input19)){
		  this.setState({other3Val:parseFloat(total * (input19/100))},()=>{
	    	this.saveSiteInfo();
	    });
		
	    //document.getElementById('other3_val').value = parseInt(total * (input19/100));
    
	  }
	  if(!isNaN(input20)){
		  this.setState({other4Val:parseFloat(total * (input20/100))},()=>{
	    	this.saveSiteInfo();
	    });
		
	   // document.getElementById('other4_val').value = parseInt(total * (input20/100));
    
	  }
	  if(!isNaN(input21)){
  		  this.setState({other5Val:parseFloat(total * (input21/100))},()=>{
	    	this.saveSiteInfo();
	    });
		
	    //document.getElementById('other5_val').value = parseInt(total * (input21/100));
    
	  }
	  
	  //this.saveSiteInfo();
	}
	
	
	saveSiteInfo(){
		/*alert("siteId:"+ this.state.siteId+"codeRelation:"+this.state.codeRelation+
		"maintenanceType:"+this.state.maintenanceType+"rtNo"+this.state.rtNo+"beginMileMarker"+this.state.beginMileMarker+
		"endMileMarker"+this.state.endMileMarker+"maintenanceLat"+this.state.maintenanceLat+"maintenanceLong"+this.state.maintenanceLong+
		"selectedAgency"+this.state.selectedAgency+"selectedRegion"+this.state.selectedRegion+"selectedLocal"+this.state.selectedLocal+
		"typeofEvent"+this.state.typeofEvent+"eventDesc"+this.state.eventDesc+"date"+this.state.date+"total"+this.state.total+
		"designPse"+this.state.designPse+"removeDitchDebris"+this.state.removeDitchDebris+"removeRoadTrailDebris"+this.state.removeRoadTrailDebris+
		"relevelAggregate"+this.state.relevelAggregate+"relevelPatch"+this.state.relevelPatch+"drainageImprovement"+this.state.drainageImprovement+
		"deepPatch"+this.state.deepPatch+"haulDebris"+this.state.haulDebris+"scalingRockSlopes"+this.state.scalingRockSlopes+
		"roadTrailAlignment"+this.state.roadTrailAlignment+"repairRockfallBarrier"+this.state.repairRockfallBarrier+
		"repairRockfallNetting"+this.state.repairRockfallNetting+"sealingCracks"+this.state.sealingCracks+
		"guardrail"+this.state.guardrail+"cleaningDrains"+this.state.cleaningDrains+"flaggingSigning"+this.state.flaggingSigning+
		"other1Desc"+this.state.other1Desc+"other1"+this.state.other1+"other2Desc"+this.state.other2Desc+"other2"+this.state.other2+
		"other3Desc"+this.state.other3Desc+"other3"+this.state.other3+"other4Desc"+this.state.other4Desc+"other4"+this.state.other4+
		"other5Desc"+this.state.other5Desc+"other5"+this.state.other5+"totalPercent"+this.state.totalPercent+"designPseVal"+this.state.designPseVal+
		"removeDitchDebrisVal"+this.state.removeDitchDebrisVal+"removeRoadTrailDebrisVal"+this.state.removeRoadTrailDebrisVal+
		"relevelAggregateVal"+this.state.relevelAggregateVal+"relevelPatchVal"+this.state.relevelPatchVal+
		"drainageImprovementVal"+this.state.drainageImprovementVal+"deepPatchVal"+this.state.deepPatchVal+
		"haulDebrisVal"+this.state.haulDebrisVal+"scalingRockSlopesVal"+this.state.scalingRockSlopesVal+
		"roadTrailAlignmentVal"+this.state.roadTrailAlignmentVal+"repairRockfallBarrierVal"+this.state.repairRockfallBarrierVal+
		"repairRockfallNettingVal"+this.state.repairRockfallNettingVal+"sealingCracksVal"+this.state.sealingCracksVal+
		"guardrailVal"+this.state.guardrailVal+"cleaningDrainsVal"+this.state.cleaningDrainsVal+
		"flaggingSigningVal"+this.state.flaggingSigningVal+"other1Val"+this.state.other1Val+"other2Val"+this.state.other2Val+
		"other3Val"+this.state.other3Val+"other4Val"+this.state.other4Val+"other5Val"+this.state.other5Val);*/
		
	  	realm.write(()=>{
			let site = realm.create('MAINTENANCE_FORM',{
			id: this.state.id,
			siteId:isNaN(parseInt(this.state.siteId))? 0:parseInt(this.state.siteId),
			codeRelation:this.state.codeRelation,
			maintenanceType:this.state.maintenanceType,
			rtNo:this.state.rtNo,
			beginMileMarker:isNaN(parseFloat(this.state.beginMileMarker))? 0.0: parseFloat(this.state.beginMileMarker),
			endMileMarker:isNaN(parseFloat(this.state.endMileMarker))? 0.0: parseFloat(this.state.endMileMarker),
			maintenanceLat:isNaN(parseFloat(this.state.maintenanceLat))? 0.0: parseFloat(this.state.maintenanceLat),
			maintenanceLong:isNaN(parseFloat(this.state.maintenanceLong))? 0.0: parseFloat(this.state.maintenanceLong),
			selectedAgency:this.state.selectedAgency,
			selectedRegion:this.state.selectedRegion,
			selectedLocal:this.state.selectedLocal,
			typeofEvent:this.state.typeofEvent,
			eventDesc:this.state.eventDesc,
			date:this.state.date,
			total:this.state.total,
			designPse:isNaN(parseFloat(this.state.designPse))? 0.0: parseFloat(this.state.designPse),
			removeDitchDebris:isNaN(parseFloat(this.state.removeDitchDebris))? 0.0: parseFloat(this.state.removeDitchDebris),
			removeRoadTrailDebris:isNaN(parseFloat(this.state.removeRoadTrailDebris))? 0.0: parseFloat(this.state.removeRoadTrailDebris),
			relevelAggregate:isNaN(parseFloat(this.state.relevelAggregate))? 0.0: parseFloat(this.state.relevelAggregate),
			relevelPatch:isNaN(parseFloat(this.state.relevelPatch))? 0.0: parseFloat(this.state.relevelPatch),
			drainageImprovement:isNaN(parseFloat(this.state.drainageImprovement))? 0.0: parseFloat(this.state.drainageImprovement),
			deepPatch:isNaN(parseFloat(this.state.deepPatch))? 0.0: parseFloat(this.state.deepPatch),
			haulDebris:isNaN(parseFloat(this.state.haulDebris))? 0.0: parseFloat(this.state.haulDebris),
			scalingRockSlopes:isNaN(parseFloat(this.state.scalingRockSlopes))? 0.0: parseFloat(this.state.scalingRockSlopes),
			roadTrailAlignment:isNaN(parseFloat(this.state.roadTrailAlignment))? 0.0: parseFloat(this.state.roadTrailAlignment),
			repairRockfallBarrier:isNaN(parseFloat(this.state.repairRockfallBarrier))? 0.0: parseFloat(this.state.repairRockfallBarrier),
			repairRockfallNetting:isNaN(parseFloat(this.state.repairRockfallNetting))? 0.0: parseFloat(this.state.repairRockfallNetting),
			sealingCracks:isNaN(parseFloat(this.state.sealingCracks))? 0.0: parseFloat(this.state.sealingCracks),
			guardrail:isNaN(parseFloat(this.state.guardrail))? 0.0: parseFloat(this.state.guardrail),
			cleaningDrains:isNaN(parseFloat(this.state.cleaningDrains))? 0.0: parseFloat(this.state.cleaningDrains),
			flaggingSigning:isNaN(parseFloat(this.state.flaggingSigning))? 0.0: parseFloat(this.state.flaggingSigning),
			other1Desc:this.state.other1Desc,
			other1:isNaN(parseFloat(this.state.other1))? 0.0: parseFloat(this.state.other1),
			other2Desc:this.state.other2Desc,
			other2:isNaN(parseFloat(this.state.other2))? 0.0: parseFloat(this.state.other2),
			other3Desc:this.state.other3Desc,
			other3:isNaN(parseFloat(this.state.other3))? 0.0: parseFloat(this.state.other3),
			other4Desc:this.state.other4Desc,
			other4:isNaN(parseFloat(this.state.other4))? 0.0: parseFloat(this.state.other4),
			other5Desc:this.state.other5Desc,
			other5:isNaN(parseFloat(this.state.other5))? 0.0: parseFloat(this.state.other5),
			totalPercent:this.state.totalPercent,
			designPseVal:isNaN(parseFloat(this.state.designPseVal))? 0.0: parseFloat(this.state.designPseVal),
			removeDitchDebrisVal:isNaN(parseFloat(this.state.removeDitchDebrisVal))? 0.0: parseFloat(this.state.removeDitchDebrisVal),
			removeRoadTrailDebrisVal:isNaN(parseFloat(this.state.removeRoadTrailDebrisVal))? 0.0: parseFloat(this.state.removeRoadTrailDebrisVal),
			relevelAggregateVal:isNaN(parseFloat(this.state.relevelAggregateVal))? 0.0: parseFloat(this.state.relevelAggregateVal),
			relevelPatchVal:isNaN(parseFloat(this.state.relevelPatchVal))? 0.0: parseFloat(this.state.relevelPatchVal),
			drainageImprovementVal:isNaN(parseFloat(this.state.drainageImprovementVal))? 0.0: parseFloat(this.state.drainageImprovementVal),
			deepPatchVal:isNaN(parseFloat(this.state.deepPatchVal))? 0.0: parseFloat(this.state.deepPatchVal),
			haulDebrisVal:isNaN(parseFloat(this.state.haulDebrisVal))? 0.0: parseFloat(this.state.haulDebrisVal),
			scalingRockSlopesVal:isNaN(parseFloat(this.state.scalingRockSlopesVal))? 0.0: parseFloat(this.state.scalingRockSlopesVal),
			roadTrailAlignmentVal:isNaN(parseFloat(this.state.roadTrailAlignmentVal))? 0.0: parseFloat(this.state.roadTrailAlignmentVal),
			repairRockfallBarrierVal:isNaN(parseFloat(this.state.repairRockfallBarrierVal))? 0.0: parseFloat(this.state.repairRockfallBarrierVal),
			repairRockfallNettingVal:isNaN(parseFloat(this.state.repairRockfallNettingVal))? 0.0: parseFloat(this.state.repairRockfallNettingVal),
			sealingCracksVal:isNaN(parseFloat(this.state.sealingCracksVal))? 0.0: parseFloat(this.state.sealingCracksVal),
			guardrailVal:isNaN(parseFloat(this.state.guardrailVal))? 0.0: parseFloat(this.state.guardrailVal),
			cleaningDrainsVal:isNaN(parseFloat(this.state.cleaningDrainsVal))? 0.0: parseFloat(this.state.cleaningDrainsVal),
			flaggingSigningVal:isNaN(parseFloat(this.state.flaggingSigningVal))? 0.0: parseFloat(this.state.flaggingSigningVal),
			other1Val:isNaN(parseFloat(this.state.other1Val))? 0.0: parseFloat(this.state.other1Val),
			other2Val:isNaN(parseFloat(this.state.other2Val))? 0.0: parseFloat(this.state.other2Val),
			other3Val:isNaN(parseFloat(this.state.other3Val))? 0.0: parseFloat(this.state.other3Val),
			other4Val:isNaN(parseFloat(this.state.other4Val))? 0.0: parseFloat(this.state.other4Val),
			other5Val:isNaN(parseFloat(this.state.other5Val))? 0.0: parseFloat(this.state.other5Val),
				},true);
				
	  	});
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
	
 //setting state to default for management area
 onValueChange = (value) => {
    this.setState({selectedAgency:value},()=>{
    	//this.saveSiteInfo();
    })
	if(value == 'search_0'){
   	 	this.setState({selectedRegion:'search_0'})			
	}
  }
  
  //getCoordinates start
  getBeginCoordinates(){
	  navigator.geolocation.getCurrentPosition(
	        (position) => {
	          var maintenanceLong = JSON.stringify(position.coords.longitude);
			  var maintenanceLat = JSON.stringify(position.coords.latitude);
			  //alert(beginCoordinateLongitude)
	          this.setState({maintenanceLong});
			  this.setState({maintenanceLat});
	        },
	        (error) => alert(error.message),
	        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
	      );
  }
  
  //onBlur Input Check
  onBlurInputCheck(value){
	if(value == 'siteId'){
		if(this.state.siteId.match(site_id_regex) === null){
			alert(site_id_format_S);
		}
		else {
			this.saveSiteInfo();
		}
	
			}
	
	  if(value == 'selectedAgency'){
	    if(this.state.selectedAgency.match(umbrella_agency_regex) === null)
	    {
	        alert(umbrella_agency_format_S);
	    }
	   
	  } 
	  
	  if(value == 'selectedRegion'){
	    if(this.state.selectedRegion.match(regional_admin_regex) === null)
	    {
	        alert(regional_admin_format_S);
	    }
	   
	    }
	
	  if(value == 'selectedLocal'){
	    if(this.state.selectedLocal.match(local_admin_regex) === null)
	    {
	        alert(local_admin_format_S);
	    }
	 
		    }	
			
	  if(value == 'date'){
		if(this.state.date.match(date_regex) === null)
		{
			alert(date_format_S);
		}
			
			}		
			
	  if(value == 'rtNo'){
		if(this.state.rtNo.match(road_trail_number_regex) === null)
		{
			alert(road_trail_number_format_S);
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
	  if(value == 'maintenanceLat'){
		if(this.state.maintenanceLat.match(/^\d+\.\d+$/) === null)
		{
			alert("Maintenance Coordinate Latitude format must match '##.#####'.");
		
		}
		
			}
			
	  if(value == 'maintenanceLong'){
		if(this.state.maintenanceLong.match(/^-\d+\.\d+$/) === null)
		{
			alert("Maintenance Coordinate Longitude format must match '-###.#####'.");
		
		}
			
			}	
			
	  if(value == 'total'){
  		if(this.state.total.match(total_regex) === null)
		{
  			alert(total_format_S);
  		}else{
  			this.saveSiteInfo();
  		}
	
  			}			
		
	  if(value == 'totalPercent'){
		if(isNaN(this.state.totalPercent) || this.state.totalPercent != 100)
		{
			alert("Running total of the cost percentages should be equal to 100.");
		
		}
			}
	
	  if(value > 100 || value < 0 && value !='maintenanceLat' && value !='maintenanceLong' 
		  && value !='totalPercent' && value !='total' && value !='beginMileMarker'
  		  && value !='siteId' && value !='endMileMarker')
		{   
			alert("Make sure all fields in cost percentages  are less than or equal to 100 or  greater than or equal to 0. Fields have been colored with red.");			
			
		}else{
			this.saveSiteInfo();
			//alert("i am here");
		}	
	
  }
	
	render(){
      let pickerRegion = null;
	  let pickerLocal = null;
	//management area filter					
      if (this.state.selectedAgency !='search_0') {
        pickerRegion = <Picker itemStyle={{fontSize:14,height:80}} style={styles.picker} style={{ flex:1 }} 
		enabled={true}
		selectedValue={this.state.selectedRegion}
		onValueChange={(value)=>this.setState({selectedRegion:value},()=>{
			//this.saveSiteInfo();
		})}
		onBlur={()=>this.onBlurInputCheck('selectedRegion')}
		>
	    <Picker.Item value="search_0" label="Select State/Region" />
	    {this.renderRegion()}
	  </Picker> ;
      } else {
        pickerRegion = null;
		pickerLocal = null;
      }
	  
      if (this.state.selectedRegion !='search_0') {
		pickerLocal = <Picker itemStyle={{fontSize:14,height:80}} style={styles.picker} style={{flex:1}}
		enabled={true}
		selectedValue={this.state.selectedLocal}
		onValueChange={(value)=>this.setState({selectedLocal:value},()=>{
			//this.saveSiteInfo();
		})}
		onBlur={()=>this.onBlurInputCheck('selectedLocal')}
		>
	    <Picker.Item value="search_0" label="Select Local" />
	     {this.renderLocal()}
	  </Picker> ;
      } else {
        pickerLocal = null;
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

			EDIT MAINTENANCE FORM
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
			<Text style={styles.labelText}>Site ID:</Text>	
			<TextInput
			value={this.state.siteId}
			returnKeyType={'next'}
			keyboardType='numeric'
			onSubmitEditing={() => {
				this.codeRelation.focus();
			}} 
			onChangeText={(val)=>this.setState({siteId:val},()=>{
				//this.saveSiteInfo();
			
			})}
			style={styles.textInput}
			onBlur={()=>{
				this.onBlurInputCheck('siteId');
			}}
			placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
			</View>
			
			<View style={styles.borderLine} />
			
			<View style={{flex:1,}}>
	  	  	<Text style={styles.labelText}>Facility Index Code Relationship/Job Code Tracking (Optional):</Text>
			<TextInput
			value={this.state.codeRelation}
			returnKeyType={'next'}
			onSubmitEditing={() => {
				this.rtNo.focus();
			}}
			ref={nextInput => this.codeRelation = nextInput} 
			onChangeText={(val)=>this.setState({codeRelation:val},()=>{
				this.saveSiteInfo();
			
			})}
			style={styles.textInput}
			onBlur={()=>{
			
			}}
			placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
 	 
    		</View>	
			<View style={styles.borderLine} />	
			
			<View style={{flex:1, }}>
	  	  	<Text style={styles.labelText}>Maintenance Type:</Text>
  	  	  	<RadioForm
			style={{marginLeft:40,}}
            radio_props={maintenanceType}
            initial={this.state.maintenanceTypeKey}
		 	formHorizontal={false}
            onPress={(value) => {
				this.setState({maintenanceType:value},()=>{
					this.saveSiteInfo();
				});
		 	}
		 	}
			onBlur={()=>{
		
			}}
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
					onSubmitEditing={() => {this.maintenanceLat.focus()}}
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
   		  	<Text style={styles.labelText}>Maintenance Lat/Long:</Text>
			<TouchableHighlight 
				style={{height:20,width:90,backgroundColor:'#32cd32',marginLeft:20,}} 
				onPress={this.getBeginCoordinates.bind(this)}>
				<Text style={{fontSize:14,padding:1,}}>Get Coord</Text>
			</TouchableHighlight>
			<TextInput	
			returnKeyType={'next'}
			onSubmitEditing={() => {this.maintenanceLong.focus()}}
			ref={nextInput => this.maintenanceLat = nextInput} 		 
			keyboardType='numeric'
			onChangeText={(val)=>this.setState({maintenanceLat:val},()=>{
				
			})}
			value={this.state.maintenanceLat}
			style={styles.textInput}
			onBlur={()=>this.onBlurInputCheck('maintenanceLat')}
			placeholder='Lat (##.#####)' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
			<TextInput 
			returnKeyType={'next'}
			onSubmitEditing={() => {this.eventDesc.focus()}}
			ref={nextInput => this.maintenanceLong = nextInput} 
			onChangeText={(val)=>this.setState({maintenanceLong:val},()=>{
				//this.saveSiteInfo();
			})}
			style={styles.textInput}
			value={this.state.maintenanceLong}
			onBlur={()=>this.onBlurInputCheck('maintenanceLong')}
			placeholder='Long (-###.#####)' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>

			</View>	
			<View style={styles.borderLine} />	
			
 			<View style={{flex:1}}>
			<Text style={styles.labelText}>Agency Information:</Text>	
			
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
			
			<View style={{flex:1,}}>
			<Text style={styles.labelText}>Notes:</Text>
			<TextInput 
			returnKeyType={'next'}
			onSubmitEditing={() => {//this.total.focus();
			}}
			ref={nextInput => this.eventDesc = nextInput}
			multiline={true} 
			numberOfLines={3}
			style={styles.textInput}
			placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>

			</View>	
			<View style={styles.borderLine} />	
			
			<View style={{flex:1, }}>
	  	  	<Text style={styles.labelText}>Type of Event:</Text>
  	  	  	<RadioForm
			style={{marginLeft:40,}}
            radio_props={typeofEvent}
            initial={this.state.typeofEventKey}
		 	formHorizontal={false}
            onPress={(value) => {
				this.setState({typeofEvent:value},()=>{
					//this.routeTrailWidth();
					//this.saveSiteInfo();
				});
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
				<Text style={styles.labelText}>Description of Events/Activities: </Text>
				<TextInput 
				returnKeyType={'next'}
				onSubmitEditing={() => {this.total.focus();}}
				ref={nextInput => this.eventDesc = nextInput}
				value={this.state.eventDesc}
				multiline={true} 
				numberOfLines={3}
				onChangeText={(val)=>this.setState({eventDesc:val},()=>{
					this.saveSiteInfo();
				})}
				style={styles.textInput}
				placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
				</TextInput>
 
			</View>	
			<View style={styles.borderLine} />	
	  
    		<View style={{flex:1}}>
		 	<Text style={styles.labelText}>Date(s) of Maintenance:</Text>
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
         	//this.saveSiteInfo();
         	})}}
		 	onBlur={()=>this.onBlurInputCheck('date')}
       	 	/>
		    <Text> <Text style={styles.labelText}>Old Date:</Text>{this.state.oldDate}</Text>
			</View>
			<View style={styles.borderLine} />
			
      		<View style={styles.section}>
     		<Text 
			style={styles.sectionText}
			>
			Estimated total cost of the maintenance activity ($)
			</Text>
      		</View>	
			
			<View style={{flex:1,}}>
			<TextInput
			value={this.state.total}
			returnKeyType={'next'}
			keyboardType='numeric'
			onSubmitEditing={() => {
				//alert(this.state.rtNo);
				this.designPse.focus();
				//this.onBlurInputCheck('total');
			}} 
			ref={nextInput => this.total = nextInput} 
			onChangeText={(val)=>this.setState({total:val},()=>{
				//this.saveSiteInfo();
				//alert(val);
				//this.onBlurInputCheck('rtNo');
			})}
			style={styles.textInput}
			onBlur={()=>{
				//this.rtClass.focus();
				//alert(this.state.rtNo);
				this.onBlurInputCheck('total');
			}}
			placeholder='15,000' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
 	 
    		</View>	
			<View style={styles.borderLine} />	
			
      		<View style={styles.section}>
     		<Text 
			style={styles.sectionText}
			>
			Action : Cost(%)
			</Text>
      		</View>	
			
			<View style={{flex:1,}}>
	  	  	<Text style={styles.labelText}>Design, PS&E:</Text>
			<TextInput
			value={this.state.designPse}
			returnKeyType={'next'}
			keyboardType='numeric'
			onSubmitEditing={() => {
				//alert(this.state.rtNo);
				this.removeDitchDebris.focus();
				//this.onBlurInputCheck('designPse');
			}} 
			ref={nextInput => this.designPse = nextInput} 
			onChangeText={(val)=>this.setState({designPse:val},()=>{
				
			})}
			style={styles.textInput}
			onBlur={()=>{
				this.onBlurInputCheck('designPse');
				this.sum_percentages();
			}}
			placeholder='0' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
 	 
    		</View>	
			<View style={styles.borderLine} />
			
			<View style={{flex:1,}}>
	  	  	<Text style={styles.labelText}>Removing debris from the road ditch and/or maintaining other drainage features:</Text>
			<TextInput
			value={this.state.removeDitchDebris}
			returnKeyType={'next'}
			keyboardType='numeric'
			onSubmitEditing={() => {
				this.removeRoadTrailDebris.focus();
				this.onBlurInputCheck('removeDitchDebris');
			}} 
			ref={nextInput => this.removeDitchDebris = nextInput} 
			onChangeText={(val)=>this.setState({removeDitchDebris:val},()=>{
				
			})}
			style={styles.textInput}
			onBlur={()=>{
				this.onBlurInputCheck('removeDitchDebris');
				this.sum_percentages();
			}}
			placeholder='0' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
 	 
    		</View>	
			<View style={styles.borderLine} />	
			
			<View style={{flex:1,}}>
	  	  	<Text style={styles.labelText}>Removing debris from the roadway or trail: </Text>
			<TextInput
			value={this.state.removeRoadTrailDebris}
			returnKeyType={'next'}
			keyboardType='numeric'
			onSubmitEditing={() => {
				this.relevelAggregate.focus();
				this.onBlurInputCheck('removeRoadTrailDebris');
			}} 
			ref={nextInput => this.removeRoadTrailDebris = nextInput} 
			onChangeText={(val)=>this.setState({removeRoadTrailDebris:val},()=>{

			})}
			style={styles.textInput}
			onBlur={()=>{
				this.onBlurInputCheck('removeRoadTrailDebris');
				this.sum_percentages();
			}}
			placeholder='0' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
 	 
    		</View>	
			<View style={styles.borderLine} />
			
			
			<View style={{flex:1,}}>
	  	  	<Text style={styles.labelText}>Re-leveling roadway (aggregate): </Text>
			<TextInput
			value={this.state.relevelAggregate}
			returnKeyType={'next'}
			keyboardType='numeric'
			onSubmitEditing={() => {
				this.relevelPatch.focus();
				this.onBlurInputCheck('relevelAggregate');
			}} 
			ref={nextInput => this.relevelAggregate = nextInput} 
			onChangeText={(val)=>this.setState({relevelAggregate:val},()=>{

			})}
			style={styles.textInput}
			onBlur={()=>{
				this.onBlurInputCheck('relevelAggregate');
				this.sum_percentages();
			}}
			placeholder='0' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
 	 
    		</View>	
			<View style={styles.borderLine} />
			
			<View style={{flex:1,}}>
	  	  	<Text style={styles.labelText}>Re-leveling roadway (asphalt patch): </Text>
			<TextInput
			value={this.state.relevelPatch}
			returnKeyType={'next'}
			keyboardType='numeric'
			onSubmitEditing={() => {
				this.drainageImprovement.focus();
				this.onBlurInputCheck('relevelPatch');
			}} 
			ref={nextInput => this.relevelPatch = nextInput} 
			onChangeText={(val)=>this.setState({relevelPatch:val},()=>{
				
			})}
			style={styles.textInput}
			onBlur={()=>{
				this.onBlurInputCheck('relevelPatch');
				this.sum_percentages();
			}}
			placeholder='0' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
 	 
    		</View>	
			<View style={styles.borderLine} />	
			
			<View style={{flex:1,}}>
	  	  	<Text style={styles.labelText}>Constructing a drainage improvement:  </Text>
			<TextInput
			value={this.state.drainageImprovement}
			returnKeyType={'next'}
			keyboardType='numeric'
			onSubmitEditing={() => {
				this.deepPatch.focus();
				this.onBlurInputCheck('drainageImprovement');
			}} 
			ref={nextInput => this.drainageImprovement = nextInput}
			onChangeText={(val)=>this.setState({drainageImprovement:val},()=>{

			})}
			style={styles.textInput}
			onBlur={()=>{
				this.onBlurInputCheck('drainageImprovement');
				this.sum_percentages();
			}}
			placeholder='0' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
 	 
    		</View>	
			<View style={styles.borderLine} />	
			
			<View style={{flex:1,}}>
	  	  	<Text style={styles.labelText}>Constructing a deep patch:  </Text>
			<TextInput
			value={this.state.deepPatch}
			returnKeyType={'next'}
			keyboardType='numeric'
			onSubmitEditing={() => {
				this.haulDebris.focus();
				this.onBlurInputCheck('deepPatch');
			}} 
			ref={nextInput => this.deepPatch = nextInput}
			onChangeText={(val)=>this.setState({deepPatch:val},()=>{

			})}
			style={styles.textInput}
			onBlur={()=>{
				this.onBlurInputCheck('deepPatch');
				this.sum_percentages();
			}}
			placeholder='0' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
 	 
    		</View>	
			<View style={styles.borderLine} />	
			
			<View style={{flex:1,}}>
	  	  	<Text style={styles.labelText}>Hauling debris away from the site:  </Text>
			<TextInput
			value={this.state.haulDebris}
			returnKeyType={'next'}
			keyboardType='numeric'
			onSubmitEditing={() => {
				this.scalingRockSlopes.focus();
				this.onBlurInputCheck('haulDebris');
			}} 
			ref={nextInput => this.haulDebris = nextInput}
			onChangeText={(val)=>this.setState({haulDebris:val},()=>{

			})}
			style={styles.textInput}
			onBlur={()=>{
				this.onBlurInputCheck('haulDebris');
				this.sum_percentages();
			}}
			placeholder='0' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
 	 
    		</View>	
			<View style={styles.borderLine} />
			
			<View style={{flex:1,}}>
	  	  	<Text style={styles.labelText}>Scaling of unstable rock slopes:  </Text>
			<TextInput
			value={this.state.scalingRockSlopes}
			returnKeyType={'next'}
			keyboardType='numeric'
			onSubmitEditing={() => {
				this.roadTrailAlignment.focus();
				this.onBlurInputCheck('scalingRockSlopes');
			}} 
			ref={nextInput => this.scalingRockSlopes = nextInput}
			onChangeText={(val)=>this.setState({scalingRockSlopes:val},()=>{
			
			})}
			style={styles.textInput}
			onBlur={()=>{
				this.onBlurInputCheck('scalingRockSlopes');
				this.sum_percentages();
			}}
			placeholder='0' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
 	 
    		</View>	
			<View style={styles.borderLine} />	
			
			<View style={{flex:1,}}>
	  	  	<Text style={styles.labelText}>Minor shifting of roadway/trail alignment:</Text>
			<TextInput
			value={this.state.roadTrailAlignment}
			returnKeyType={'next'}
			keyboardType='numeric'
			onSubmitEditing={() => {
				this.repairRockfallBarrier.focus();
				this.onBlurInputCheck('roadTrailAlignment');
			}} 
			ref={nextInput => this.roadTrailAlignment = nextInput}
			onChangeText={(val)=>this.setState({roadTrailAlignment:val},()=>{
				
			})}
			style={styles.textInput}
			onBlur={()=>{
				this.onBlurInputCheck('roadTrailAlignment');
				this.sum_percentages();
			}}
			placeholder='0' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
 	 
    		</View>	
			<View style={styles.borderLine} />
			
			<View style={{flex:1,}}>
	  	  	<Text style={styles.labelText}>Repair of rockfall barrier:</Text>
			<TextInput
			value={this.state.repairRockfallBarrier}
			returnKeyType={'next'}
			keyboardType='numeric'
			onSubmitEditing={() => {
				this.repairRockfallNetting.focus();
				this.onBlurInputCheck('repairRockfallBarrier');
			}} 
			ref={nextInput => this.repairRockfallBarrier = nextInput}
			onChangeText={(val)=>this.setState({repairRockfallBarrier:val},()=>{

			})}
			style={styles.textInput}
			onBlur={()=>{
				this.onBlurInputCheck('repairRockfallBarrier');
				this.sum_percentages();
			}}
			placeholder='0' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
 	 
    		</View>	
			<View style={styles.borderLine} />
			
			<View style={{flex:1,}}>
	  	  	<Text style={styles.labelText}>Repair of rockfall netting (on-slope): </Text>
			<TextInput
			value={this.state.repairRockfallNetting}
			returnKeyType={'next'}
			keyboardType='numeric'
			onSubmitEditing={() => {
				this.sealingCracks.focus();
				this.onBlurInputCheck('repairRockfallNetting');
			}} 
			ref={nextInput => this.repairRockfallNetting = nextInput}
			onChangeText={(val)=>this.setState({repairRockfallNetting:val},()=>{
				
			})}
			style={styles.textInput}
			onBlur={()=>{
				this.onBlurInputCheck('repairRockfallNetting');
				this.sum_percentages();
			}}
			placeholder='0' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
 	 
    		</View>	
			<View style={styles.borderLine} />
			
			<View style={{flex:1,}}>
	  	  	<Text style={styles.labelText}>Sealing cracks in pavement: </Text>
			<TextInput
			value={this.state.sealingCracks}
			returnKeyType={'next'}
			keyboardType='numeric'
			onSubmitEditing={() => {
				this.guardrail.focus();
				this.onBlurInputCheck('sealingCracks');
			}} 
			ref={nextInput => this.sealingCracks = nextInput}
			onChangeText={(val)=>this.setState({sealingCracks:val},()=>{

			})}
			style={styles.textInput}
			onBlur={()=>{
				this.onBlurInputCheck('sealingCracks');
				this.sum_percentages();
			}}
			placeholder='0' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
 	 
    		</View>	
			<View style={styles.borderLine} />
			
			<View style={{flex:1,}}>
	  	  	<Text style={styles.labelText}>Installing, maintaining, or replacing guardrail: </Text>
			<TextInput
			value={this.state.guardrail}
			returnKeyType={'next'}
			keyboardType='numeric'
			onSubmitEditing={() => {
				this.cleaningDrains.focus();
				this.onBlurInputCheck('guardrail');
			}} 
			ref={nextInput => this.guardrail = nextInput}
			onChangeText={(val)=>this.setState({guardrail:val},()=>{

			})}
			style={styles.textInput}
			onBlur={()=>{
				this.onBlurInputCheck('guardrail');
				this.sum_percentages();
			}}
			placeholder='0' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
 	 
    		</View>	
			<View style={styles.borderLine} />
			
			<View style={{flex:1,}}>
	  	  	<Text style={styles.labelText}>Cleaning and/or maintaining horizontal drains and associated subsurface drainage: </Text>
			<TextInput
			value={this.state.cleaningDrains}
			returnKeyType={'next'}
			keyboardType='numeric'
			onSubmitEditing={() => {
				this.flaggingSigning.focus();
				this.onBlurInputCheck('cleaningDrains');
			}} 
			ref={nextInput => this.cleaningDrains = nextInput}
			onChangeText={(val)=>this.setState({cleaningDrains:val},()=>{

			})}
			style={styles.textInput}
			onBlur={()=>{
				this.onBlurInputCheck('cleaningDrains');
				this.sum_percentages();
			}}
			placeholder='0' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
 	 
    		</View>	
			<View style={styles.borderLine} />
			
			<View style={{flex:1,}}>
	  	  	<Text style={styles.labelText}>Flagging and signing:  </Text>
			<TextInput
			value={this.state.flaggingSigning}
			returnKeyType={'next'}
			keyboardType='numeric'
			onSubmitEditing={() => {
				this.other1Desc.focus();
				this.onBlurInputCheck('flaggingSigning');
			}} 
			ref={nextInput => this.flaggingSigning = nextInput}
			onChangeText={(val)=>this.setState({flaggingSigning:val},()=>{

			})}
			style={styles.textInput}
			onBlur={()=>{
				this.onBlurInputCheck('flaggingSigning');
				this.sum_percentages();
			}}
			placeholder='0' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
 	 
    		</View>	
			<View style={styles.borderLine} />
			
			<View style={{flex:1,}}>
	  	  	<Text style={styles.labelText}>Other (enter description):  </Text>
			<TextInput
			value={this.state.other1Desc}
			returnKeyType={'next'}
			onSubmitEditing={() => {
				this.other1.focus();
				this.onBlurInputCheck('other1Desc');
			}} 
			ref={nextInput => this.other1Desc = nextInput}
			onChangeText={(val)=>this.setState({other1Desc:val},()=>{

			})}
			style={styles.textInput}
			onBlur={()=>{
				this.onBlurInputCheck('other1Desc');
			}}
			placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
			<View style={styles.borderLine} />
			<TextInput
			value={this.state.other1}
			returnKeyType={'next'}
			keyboardType='numeric'
			onSubmitEditing={() => {
				this.other2Desc.focus();
				this.onBlurInputCheck('other1');
			}} 
			ref={nextInput => this.other1 = nextInput}
			onChangeText={(val)=>this.setState({other1:val},()=>{

			})}
			style={styles.textInput}
			onBlur={()=>{
				this.onBlurInputCheck('other1');
				this.sum_percentages();
			}}
			placeholder='0' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
 	 
    		</View>	
			<View style={styles.borderLine} />
			
			<View style={{flex:1,}}>
	  	  	<Text style={styles.labelText}>Other (enter description):  </Text>
			<TextInput
			value={this.state.other2Desc}
			returnKeyType={'next'}
			onSubmitEditing={() => {
				this.other2.focus();
				this.onBlurInputCheck('other2Desc');
			}} 
			ref={nextInput => this.other2Desc = nextInput}
			onChangeText={(val)=>this.setState({other2Desc:val},()=>{
				
			})}
			style={styles.textInput}
			onBlur={()=>{
				this.onBlurInputCheck('other2Desc');
			}}
			placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
			<View style={styles.borderLine} />
			<TextInput
			value={this.state.other2}
			returnKeyType={'next'}
			keyboardType='numeric'
			onSubmitEditing={() => {
				this.other3Desc.focus();
				this.onBlurInputCheck('other2');
			}} 
			ref={nextInput => this.other2 = nextInput}
			onChangeText={(val)=>this.setState({other2:val},()=>{

			})}
			style={styles.textInput}
			onBlur={()=>{
				this.onBlurInputCheck('other2');
				this.sum_percentages();
			}}
			placeholder='0' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
 	 
    		</View>	
			<View style={styles.borderLine} />
			
			<View style={{flex:1,}}>
	  	  	<Text style={styles.labelText}>Other (enter description):  </Text>
			<TextInput
			value={this.state.other3Desc}
			returnKeyType={'next'}
			onSubmitEditing={() => {
				this.other3.focus();
				this.onBlurInputCheck('other3Desc');
			}} 
			ref={nextInput => this.other3Desc = nextInput}
			onChangeText={(val)=>this.setState({other3Desc:val},()=>{

			})}
			style={styles.textInput}
			onBlur={()=>{
				this.onBlurInputCheck('other3Desc');
			}}
			placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
			<View style={styles.borderLine} />
			<TextInput
			value={this.state.other3}
			returnKeyType={'next'}
			keyboardType='numeric'
			onSubmitEditing={() => {
				this.other4Desc.focus();
				this.onBlurInputCheck('other3');
			}} 
			ref={nextInput => this.other3 = nextInput}
			onChangeText={(val)=>this.setState({other3:val},()=>{

			})}
			style={styles.textInput}
			onBlur={()=>{
				this.onBlurInputCheck('other3');
				this.sum_percentages();
			}}
			placeholder='0' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
 	 
    		</View>	
			<View style={styles.borderLine} />
				
			<View style={{flex:1,}}>
	  	  	<Text style={styles.labelText}>Other (enter description):  </Text>
			<TextInput
			value={this.state.other4Desc}
			returnKeyType={'next'}
			onSubmitEditing={() => {
				this.other4.focus();
				this.onBlurInputCheck('other4Desc');
			}} 
			ref={nextInput => this.other4Desc = nextInput}
			onChangeText={(val)=>this.setState({other4Desc:val},()=>{

			})}
			style={styles.textInput}
			onBlur={()=>{
				this.onBlurInputCheck('other4Desc');
			}}
			placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
			<View style={styles.borderLine} />
			<TextInput
			value={this.state.other4}
			returnKeyType={'next'}
			keyboardType='numeric'
			onSubmitEditing={() => {
				this.other5Desc.focus();
				this.onBlurInputCheck('other4');
			}} 
			ref={nextInput => this.other4 = nextInput}
			onChangeText={(val)=>this.setState({other4:val},()=>{

			})}
			style={styles.textInput}
			onBlur={()=>{
				this.onBlurInputCheck('other4');
				this.sum_percentages();
			}}
			placeholder='0' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
 	 
    		</View>	
			<View style={styles.borderLine} />	
				
			<View style={{flex:1,}}>
	  	  	<Text style={styles.labelText}>Other (enter description):  </Text>
			<TextInput
			value={this.state.other5Desc}
			returnKeyType={'next'}
			onSubmitEditing={() => {
				this.other5.focus();
				this.onBlurInputCheck('other5Desc');
			}}
			ref={nextInput => this.other5Desc = nextInput} 
			onChangeText={(val)=>this.setState({other5Desc:val},()=>{

			})}
			style={styles.textInput}
			onBlur={()=>{
				this.onBlurInputCheck('other5Desc');
			}}
			placeholder='' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
			<View style={styles.borderLine} />
			<TextInput
			value={this.state.other5}
			returnKeyType={'next'}
			keyboardType='numeric'
			onSubmitEditing={() => {
				this.totalPercent.focus();
				this.onBlurInputCheck('other5');
			}}
			ref={nextInput => this.other5 = nextInput}  
			onChangeText={(val)=>this.setState({other5:val},()=>{

			})}
			style={styles.textInput}
			onBlur={()=>{
				this.onBlurInputCheck('other5');
				this.sum_percentages();
			}}
			placeholder='0' placeholderTextColor='blue' underLineColor='transparent'>
			</TextInput>
 	 
    		</View>	
			<View style={styles.borderLine} />	
			
      		<View style={styles.section}>
     		<Text 
			style={styles.sectionText}
			>
			Running total of the cost percentages(%)
			</Text>
      		</View>	
			
			<View style={{flex:1,}}>
			<TextInput
			value={this.state.totalPercent}
			returnKeyType={'next'}
			keyboardType='numeric'
			onSubmitEditing={() => {
				//alert(this.state.rtNo);
				//this.designPse.focus();
				this.onBlurInputCheck('totalPercent');
			}} 
			ref={nextInput => this.totalPercent = nextInput}  
			onChangeText={(val)=>this.setState({totalPercent:val},()=>{
				//this.saveSiteInfo();
				//alert(val);
				//this.onBlurInputCheck('rtNo');
			})}
			style={styles.textInput}
			onBlur={()=>{
				//this.rtClass.focus();
				//alert(this.state.rtNo);
				this.onBlurInputCheck('totalPercent');
			}}
			placeholder='0' placeholderTextColor='blue' underLineColor='transparent'>
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