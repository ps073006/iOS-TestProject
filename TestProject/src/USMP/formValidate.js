//form validation before submit
function validateForm(){

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
export {validateForm};