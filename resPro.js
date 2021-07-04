import * as React from "react";
import { StyleSheet, View, ScrollView, Dimensions, Image,TouchableOpacity,Text } from "react-native";

class resPro extends React.Component{
    static navigationOptions={
        header:null
    }

    
    render(){
        return(
            <View style={styles.container}>
                
            </View>
        );
    }
}

export default resPro;

const styles = StyleSheet.create({
    container: {
        padding:20,
        width:'100%',
        height:50,
        backgroundColor:'black'
    },
    
    LogInButton:{
        alignItems:'center',
        backgroundColor:'#540863',
         height:50,
         width:350,
         borderRadius:7,
         
      },
      SignInButton:{
        alignItems:'center',
        backgroundColor:'#ded9e0',
         height:50,
         width:350,
         borderRadius:7
      }

    
  });