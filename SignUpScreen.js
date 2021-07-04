import React from 'react';
import { StyleSheet, Text, View,Image, ScrollView, Dimensions, Animated,Button,TouchableOpacity } from 'react-native';





class SignUpScreen extends React.Component {
    static navigationOptions={
        title:'הרשמה',
        headerTitleStyle: { flex: 1, textAlign: 'center'},
        headerRight: (<View />)
      }
    
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity style={styles.SignCus} onPress={() => this.props.navigation.navigate('SignUpPro')}   >
            <Text style={{color:'white',textAlign:'center',fontSize:18,padding:100}}>להצטרפות לנותני שירות</Text>
        </TouchableOpacity>
                <Text></Text>
        <TouchableOpacity style={styles.SignPro } onPress={() => this.props.navigation.navigate('SignUpCus')} >
            <Text style={{color:'black',textAlign:'center', fontSize:18,padding:100 }}>להצטרפות למחפשי שירות</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SignUpScreen;





const styles = StyleSheet.create({
  logo: {
    alignItems: 'center',
    padding: 50,
    justifyContent:'space-between'
  },
  SignCus:{
    alignItems:'center',
    backgroundColor:'#8038a6',
     height:250,
     width:350,
     borderRadius:30,
     borderWidth:2,
     borderColor:'#ded9e0'
     
  },
  SignPro:{
    alignItems:'center',
    backgroundColor:'#ded9e0',
     height:250,
     width:350,
     borderRadius:30,
     borderWidth:2,
     borderColor:'#d6b8e6'
  },
  
});
