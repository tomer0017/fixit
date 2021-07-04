import * as React from "react";
import { StyleSheet, View, ScrollView, Dimensions, Image,TouchableOpacity,Text } from "react-native";

class LoginForm extends React.Component{
    static navigationOptions={
        header:null
    }

    
    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.LogInButton}  onPress={this.props.SignUp} >
                    <Text style={{color:'white',padding:12,fontWeight:'500',fontSize:18}}>רוצה להצטרף עכשיו!</Text>
                </TouchableOpacity>
                <Text></Text>
                <TouchableOpacity style={styles.SignInButton }  onPress={this.props.SignIn} >
                    <Text style={{color:'black',padding:15,fontSize:18 }}>כבר הצטרפת?התחבר/י</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

export default LoginForm;

const styles = StyleSheet.create({
    container: {
        padding:20
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