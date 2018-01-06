
//newsite.js
import Upload from '../components/Upload';
<View style={{flex:1,}}>
					<Text style={styles.labelText}>Upload Images:</Text>
					<Upload 
					siteId={this.state.siteId} 
					onBlur={()=>this.saveSiteInfo()}
				
					/>

</View>	
<View style={styles.borderLine} />			
					
					//editsite.js
					import Upload from '../components/Upload';
					
<View style={{flex:1,}}>
					<Text style={styles.labelText}>Upload Images:</Text>
					<Upload 
					siteId={this.state.id} 
					/>

</View>	
<View style={styles.borderLine} />								
					