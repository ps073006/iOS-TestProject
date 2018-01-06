import React ,{Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Platform,
  Image,
  Alert,
  ListView,
} from 'react-native'
//import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import realm from '../USMP/realm';
var FileUpload = require('NativeModules').FileUpload;

export default class Upload extends Component {
  constructor(props){
    super(props);
	//photos
	let photos = [];	
	if(props.slopeEvent==1){
		 photos = realm.objects('PHOTOS_SLOPE').filtered('id='+ parseInt(props.siteId));
	}else{
		 photos = realm.objects('PHOTOS').filtered('id='+ parseInt(props.siteId));
	}
	const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1.id !== r2.id});
	//alert(photos.length);
	var photoArray =[];
	for(let i=0;i< photos.length; i++){	
      let source = {uri: photos[i].photo, isStatic: true};
	  photoArray.push(source);
	}
    this.state = {
      avatarSource: ds.cloneWithRows(photoArray),//null,
      imgBase64: '',
	  images:photoArray, 
	  siteId:props.siteId,
	  slopeEvent:props.slopeEvent,			
    }
  }
  
  takePhotoTapped(){
 	   ImagePicker.openCamera({
 	     width: 1600,
 	     height: 1600,
 	     cropping: true
 	   }).then(image => {
           let source = {uri: image.path.replace('file://', ''), isStatic: true};
   		  //this.setState({avatarSource: source});
   		  var newArray = this.state.images.slice();
   		  newArray.push(source);
   		  this.setState({ 
  			 avatarSource: this.state.avatarSource.cloneWithRows(newArray),
 			 images: newArray });
 		  //alert(this.state.images[i]['photo']);	
 	     console.log(image);
 	   }).catch((error) => {
		alert("No photo taken.");
		          //console.error(error);
		      });
  }

  selectPhotoTapped() {
   /* const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };*/
	   
	ImagePicker.openPicker({
	  multiple: true
	}).then(images => {
		for(let i=0;i< images.length; i++){
			
          let source = {uri: images[i].path.replace('file://', ''), isStatic: true};
  		  //this.setState({avatarSource: source});
  		  var newArray = this.state.images.slice();
  		  newArray.push(source);
  		  this.setState({ 
 			 avatarSource: this.state.avatarSource.cloneWithRows(newArray),
			 images: newArray });
		  //alert(this.state.images[i]['photo']);
		  //alert(this.state.avatarSource[i]);		
		}
			
	  console.log(images);
	}).catch((error) => {
		alert("No photo selected");
		console.error(error);
		      });
  }

  upload(){
	  if(this.state.images.length>0){
   	   realm.write(()=>{
		   //alert(this.state.slopeEvent)
		   let sites =[];
		   if(this.state.slopeEvent==1){
    	 	  sites = realm.objects('PHOTOS_SLOPE').filtered('id='+parseInt(this.state.siteId)); 
	  	 	}else{
	    	  sites = realm.objects('PHOTOS').filtered('id='+parseInt(this.state.siteId)); 
		   }
		
   		 //deleting and updating existing images
   		if(sites.length>0){
   			realm.delete(sites);	
   		}
	
	
   		for(let i = 0; i < this.state.images.length; i++){
			
 		   if(this.state.slopeEvent==1){
	      		let	images = realm.create('PHOTOS_SLOPE',{
	      				id: parseInt(this.state.siteId),
	      				photo:this.state.images[i]['uri'].toString(),

	      			},true);
     	 	  }else{
		   		let	images = realm.create('PHOTOS',{
		   				id: parseInt(this.state.siteId),
		   				photo:this.state.images[i]['uri'].toString(),

		   			},true);
 	    	  }
   		
   			//alert(this.state.images[i])
   	 	}
		
   		 alert(" Images saved offline")
		
   	 	});
		
	  }else{
	  	alert(" No Images selected to save offline")
	  }
	   
  }

  render() {
	  let images = this.state.images.length;
	 // alert(this.state.siteId)
	  let image = images < 2 ? <Text> {images} image selected </Text>: <Text>  {images} images selected </Text>;
	//  let img = this.state.avatarSource == null? null:
	 //      <Image
	  //       source={this.state.avatarSource}
	    //     style={{height: 200, width: 200}}
	     //  />
    return (
        <View style={styles.container}>
          <TouchableOpacity onPress={this.takePhotoTapped.bind(this)}>
		<View style={{marginBottom: 20,backgroundColor:'#d3d3d3', width:180, height:40,marginTop:5,justifyContent: 'center',
          alignItems: 'center'}}>
           <Text>Take Photo with camera</Text> 
            
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
		<View style={{marginBottom: 20,backgroundColor:'#d3d3d3', width:120, height:30,marginTop:5,justifyContent: 'center',
          alignItems: 'center'}}>
           <Text>Select Photos</Text> 
            
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{backgroundColor:'#32cd32', width:60, height:30,marginTop:5,justifyContent: 'center',
          alignItems: 'center'}} onPress={this.upload.bind(this)}>
            <Text>Upload</Text>
          </TouchableOpacity>
		{image}
		<ListView 
		style={styles.listView}
		horizontal={true}	
		contentInset={{bottom:60}}
		enableEmptySections={true}
		automaticallyAdjustContentInsets={false}
		dataSource = {this.state.avatarSource}
		renderRow = {(data)=>
		//<Image source={data} style={styles.uploadAvatar} />
		<Image source={{uri: 'file://'+data.uri}} style={styles.uploadAvatar} />
		//<Text>{data.uri}</Text>
		}
		/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  uploadAvatar: {
	  flexDirection: 'column',
      width: 100,
      height: 100,
      marginLeft: 10,
	  marginTop:10,
    },
  listView: {
	  flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: '#eeeeee',
      width: 700,
	  height:120,
      },
});