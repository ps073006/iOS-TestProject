
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
 var road_trail_class_format_S = "Road/Trail Class cannot be empty and must be shorter than 30 characters.";

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
