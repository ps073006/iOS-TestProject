////////////////////////////////////////////////////////////////////////////
//
// Copyright 2016 Realm Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
////////////////////////////////////////////////////////////////////////////

'use strict';

var Realm = require('realm');

class SITE_INFORMATION extends Realm.Object {}
SITE_INFORMATION.schema = {
	name: 'SITE_INFORMATION',
	primaryKey: 'id',
	properties: {
			id:{type:'int'},
			//siteId:{type:'int'},
			umbrellaAgency:{type:'string'},
			regionalAdmin:{type:'string'},
			localAdmin:{type:'string'},
			date:{type:'string'},
			hazardType:{type:'int'},
			rtNo:{type:'string'},
			roadOrTrail:{type:'string'},
			rtClass:{type:'string'},
			rater:{type:'string'},
			beginMileMarker:{type:'float'},
			endMileMarker:{type:'float'},
			side:{type:'string'},
			road:{type:'int'},
			trail:{type:'int'},
			weather:{type:'string'},
			beginCoordinateLatitude:{type:'double'},
			beginCoordinateLongitude:{type:'double'},
			endCoordinateLatitude:{type:'double'},
			endCoordinateLongitude:{type:'double'},
			datum:{type:'string'},
			aadt:{type:'int'},
			lengthAffected:{type:'float'},
			slopeHeightAxialLength:{type:'float'},
			slopeAngle:{type:'int'},
			sightDistance:{type:'float'},
			roadTrailWidth:{type:'float'},
			speedLimit:{type:'int'},
			minimumDitchWidth:{type:'float'},
			maximumDitchWidth:{type:'float'},
			minimumDitchDepth:{type:'float'},
			maximumDitchDepth:{type:'float'},
			firstBeginDitchSlope:{type:'int'},
			firstEndDitchSlope:{type:'int'},
			secondBeginDitchSlope:{type:'int'},
			secondEndDitchSlope:{type:'int'},
			blkSize:{type:'float'},
			volume:{type:'float'},
			startAnnualRainfall:{type:'int'},
			endAnnualRainfall:{type:'int'},
			soleAccessRoute:{type:'string'},
			fixesPresent:{type:'string'},
			comment:{type:'int'},
			fmla:{type:'int'},
			preliminaryRatingLandslideId:{type:'int'},
			preliminaryRatingRockfallId:{type:'int'},
			impactOnUse:{type:'int'},
			aadtUsage:{type:'int'},
			aadtUsageCalcCheckbox:{type:'bool'},
			prelimRating:{type:'int'},
			slopeDrainage:{type:'int'},
			hazardRatingAnnualRainfall:{type:'int'},
			hazardRatingSlopeHeightAxialLength:{type:'int'},
			hazardRatingLandslideId:{type:'int'},
			hazardRatingRockfallId:{type:'int'},
			routeTrailWidth:{type:'int'},
			humanExFactor:{type:'int'},
			percentDsd:{type:'int'},
			rWImpacts:{type:'int'},
			enviroCultImpacts:{type:'int'},
			maintComplexity:{type:'int'},
			eventCost:{type:'int'},
			hazardTotal:{type:'int'},
			riskTotal:{type:'int'},
			totalScore:{type:'int'},
			slopeStatus:{type:'int'},
			email:{type:'string'},
		
	}
};

class COMMENTS extends Realm.Object {}
COMMENTS.schema = {
	name: 'COMMENTS',
	primaryKey: 'id',
	properties: {
		id:{type:'int'},
		comment:{type:'string'},
		
	}
};

class FMLA_LINK extends Realm.Object {}
FMLA_LINK.schema = {
	name: 'FMLA_LINK',
	primaryKey: 'id',
	properties: {
		id:{type:'int'},
		fmlaName:{type:'string'},
		fmlaId:{type:'string'},
		fmlaDescription:{type:'string'},
	}
};

class ROAD extends Realm.Object {}
ROAD.schema = {
	name: 'ROAD',
	primaryKey: 'id',
	properties: {
		id:{type:'int'},
		direction:{type:'string'},
		rockSlope:{type:'string'},
		landslide:{type:'string'},
	}
};

class TRAIL extends Realm.Object {}
TRAIL.schema = {
	name: 'TRAIL',
	primaryKey: 'id',
	properties: {
		id:{type:'int'},
		direction:{type:'string'},
		side:{type:'string'},
	}
};

class HAZARD_LINK extends Realm.Object {}
HAZARD_LINK.schema = {
	name: 'HAZARD_LINK',
	properties: {
		id:{type:'int'},
		hazardLink:{type:'int'},
	}
};

class LANDSLIDE_PRILIMINARY_RATING extends Realm.Object {}
LANDSLIDE_PRILIMINARY_RATING.schema = {
	name: 'LANDSLIDE_PRILIMINARY_RATING',
	primaryKey: 'id',
	properties: {
		id:{type:'int'},
		roadWidthAffected:{type:'int'},
		slideErosionEffects:{type:'int'},
		lengthAffected:{type:'int'},
	}
};

class ROCKFALL_PRILIMINARY_RATING extends Realm.Object {}
ROCKFALL_PRILIMINARY_RATING.schema = {
	name: 'ROCKFALL_PRILIMINARY_RATING',
	primaryKey: 'id',
	properties: {
		id:{type:'int'},
		ditchEff:{type:'int'},
		rockfallHistory:{type:'int'},
		blockSizeEventVol:{type:'int'},
	}
};

class ROCKFALL_HAZARD_RATING extends Realm.Object {}
ROCKFALL_HAZARD_RATING.schema = {
	name: 'ROCKFALL_HAZARD_RATING',
	primaryKey: 'id',
	properties: {
		id:{type:'int'},
		maintFrequency:{type:'int'},
		caseOneStrucCond:{type:'int'},
		caseOneRockFriction:{type:'int'},
		caseTwoStrucCondition:{type:'int'},
		caseTwoDiffErosion:{type:'int'},
	}
};

class LANDSLIDE_HAZARD_RATING extends Realm.Object {}
LANDSLIDE_HAZARD_RATING.schema = {
	name: 'LANDSLIDE_HAZARD_RATING',
	primaryKey: 'id',
	properties: {
		id:{type:'int'},
		thawStability:{type:'int'},
		maintFrequency:{type:'int'},
		movementHistory:{type:'int'},
	}
};

class PHOTOS extends Realm.Object {}
PHOTOS.schema = {
	name: 'PHOTOS',
	properties: {
		id:{type:'int'},
		photo:{type:'string'},	
	}
};

class MAINTENANCE_FORM extends Realm.Object {}
MAINTENANCE_FORM.schema = {
	name: 'MAINTENANCE_FORM',
	primaryKey: 'id',
	properties: {
			id:{type:'int'},
			siteId:{type:'int'},
			codeRelation:{type:'string'},
			maintenanceType:{type:'string'},
			rtNo:{type:'string'},
			beginMileMarker:{type:'float'},
			endMileMarker:{type:'float'},
			maintenanceLat:{type:'double'},
			maintenanceLong:{type:'double'},
			selectedAgency:{type:'string'},
			selectedRegion:{type:'string'},
			selectedLocal:{type:'string'},
			typeofEvent:{type:'string'},
			eventDesc:{type:'string'},
			date:{type:'string'},
			total:{type:'string'},
			designPse:{type:'float'},
			removeDitchDebris:{type:'float'},
			removeRoadTrailDebris:{type:'float'},
			relevelAggregate:{type:'float'},
			relevelPatch:{type:'float'},
			drainageImprovement:{type:'float'},
			deepPatch:{type:'float'},
			haulDebris:{type:'float'},
			scalingRockSlopes:{type:'float'},
			roadTrailAlignment:{type:'float'},
			repairRockfallBarrier:{type:'float'},
			repairRockfallNetting:{type:'float'},
			sealingCracks:{type:'float'},
			guardrail:{type:'float'},
			cleaningDrains:{type:'float'},
			flaggingSigning:{type:'float'},
			other1Desc:{type:'string'},
			other1:{type:'float'},
			other2Desc:{type:'string'},
			other2:{type:'float'},
			other3Desc:{type:'string'},
			other3:{type:'float'},
			other4Desc:{type:'string'},
			other4:{type:'float'},
			other5Desc:{type:'string'},
			other5:{type:'float'},
			totalPercent:{type:'string'},
			designPseVal:{type:'float'},
			removeDitchDebrisVal:{type:'float'},
			removeRoadTrailDebrisVal:{type:'float'},
			relevelAggregateVal:{type:'float'},
			relevelPatchVal:{type:'float'},
			drainageImprovementVal:{type:'float'},
			deepPatchVal:{type:'float'},
			haulDebrisVal:{type:'float'},
			scalingRockSlopesVal:{type:'float'},
			roadTrailAlignmentVal:{type:'float'},
			repairRockfallBarrierVal:{type:'float'},
			repairRockfallNettingVal:{type:'float'},
			sealingCracksVal:{type:'float'},
			guardrailVal:{type:'float'},
			cleaningDrainsVal:{type:'float'},
			flaggingSigningVal:{type:'float'},
			other1Val:{type:'float'},
			other2Val:{type:'float'},
			other3Val:{type:'float'},
			other4Val:{type:'float'},
			other5Val:{type:'float'},
		
	}
};

class SLOPE_EVENT extends Realm.Object {}
SLOPE_EVENT.schema = {
	name: 'SLOPE_EVENT',
	primaryKey: 'id',
	properties: {
			id:{type:'int'},
			observerName:{type:'string'},
			email:{type:'string'},
			phoneNo:{type:'string'},
			observerComments:{type:'string'},
			date:{type:'string'},
			selectDateApproximator:{type:'string'},
			firstinput:{type:'string'},
			hazardTypeVal:{type:'int'},
			selectedState:{type:'string'},
			rtNo:{type:'string'},
			roadOrTrail:{type:'string'},
			beginMileMarker:{type:'float'},
			endMileMarker:{type:'float'},
			datum:{type:'string'},
			beginCoordinateLatitude:{type:'double'},
			beginCoordinateLongitude:{type:'double'},
			condition:{type:'string'},
			affectedLength:{type:'float'},
			sizeRockVal:{type:'int'},
			numFallenRocksVal:{type:'int'},
			volDebrisVal:{type:'int'},
			damagesYNVal:{type:'string'},
			damagesVal:{type:'string'},
			aboveRoad:{type:'int'},
			belowRoad:{type:'int'},
			atCulvert:{type:'int'},
			aboveRiver:{type:'int'},
			aboveCoast:{type:'int'},
			burnedArea:{type:'int'},
			deforestedSlope:{type:'int'},
			urban:{type:'int'},
			mine:{type:'int'},
			retainingWall:{type:'int'},
			naturalSlope:{type:'int'},
			engineeredSlope:{type:'int'},
			unknownLocation:{type:'int'},
			otherLocation:{type:'int'},
			rain:{type:'int'},
			thunder:{type:'int'},
			contRain:{type:'int'},
			hurricane:{type:'int'},
			flood:{type:'int'},
			snowfall:{type:'int'},
			freezing:{type:'int'},
			highTemp:{type:'int'},
			earthquake:{type:'int'},
			volcano:{type:'int'},
			leakyPipe:{type:'int'},
			mining:{type:'int'},
			construction:{type:'int'},
			damEmbankmentCollapse:{type:'int'},
			notObvious:{type:'int'},
			unknownCause:{type:'int'},
			otherCause:{type:'int'},
		
	}
};

class PHOTOS_SLOPE extends Realm.Object {}
PHOTOS_SLOPE.schema = {
	name: 'PHOTOS_SLOPE',
	properties: {
		id:{type:'int'},
		photo:{type:'string'},	
	}
};


export default new Realm({schema: [SITE_INFORMATION, COMMENTS, FMLA_LINK, ROAD, TRAIL, HAZARD_LINK, 
				LANDSLIDE_PRILIMINARY_RATING, ROCKFALL_PRILIMINARY_RATING, LANDSLIDE_HAZARD_RATING,
				ROCKFALL_HAZARD_RATING,PHOTOS,MAINTENANCE_FORM,SLOPE_EVENT,PHOTOS_SLOPE ],schemaVersion:6});