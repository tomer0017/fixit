

import React from 'react';
import { Image, Text ,TouchableOpacity , View} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import PlacesInput from 'react-native-places-input';
import { getDistance, getPreciseDistance } from 'geolib';

 
class GooglePlacesInput extends React.Component 
{ 
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            place1:"",
            place2:""
            
        };
      }

done =()=>{
  var dis = getPreciseDistance(
    { latitude: this.state.place1.result.geometry.location.lat, longitude: this.state.place1.result.geometry.location.lng },
    { latitude: this.state.place2.result.geometry.location.lat, longitude: this.state.place2.result.geometry.location.lng }
  );
  console.log(dis)
}

    render(){
  return (
    <View style={{flex:1}}>
      <PlacesInput
          googleApiKey={'AIzaSyBDtT--9a-C4HkB1UiLF5BWGI1FXMzMpK0'}
          onSelect={place => this.setState({place1:place})}
          language={"iw-IL"}
          stylesContainer={{
            position: 'relative',
            alignSelf: 'stretch',
            margin: 0,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            shadowOpacity: 0,
            borderColor: '#dedede',
            borderWidth: 1,
            marginBottom: 10
        }}
        stylesList={{
            top: 50,
            borderColor: '#dedede',
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderBottomWidth: 1,
            left: -1,
            right: -1
        }}
          
      />
      <PlacesInput
          googleApiKey={'AIzaSyBDtT--9a-C4HkB1UiLF5BWGI1FXMzMpK0'}
          onSelect={place => this.setState({place2:place})}
          language={"iw-IL"}
          stylesContainer={{
            position: 'relative',
            alignSelf: 'stretch',
            margin: 0,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            shadowOpacity: 0,
            borderColor: '#dedede',
            borderWidth: 1,
            marginBottom: 10,
            
        }}
        stylesList={{
            top: 50,
            borderColor: '#dedede',
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderBottomWidth: 1,
            left: -1,
            right: -1
        }}
          
      />
      <TouchableOpacity style={{marginTop:50}} onPress={()=>this.done()}>
        <Text>לחץ</Text>
      </TouchableOpacity>

    </View>
  );
    }
};
 
export default GooglePlacesInput;