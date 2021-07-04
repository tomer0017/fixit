import React, { Component } from "react";
import { Platform,Button, StyleSheet, Text, View,Image,TextInput,KeyboardAvoidingView,Alert,TouchableOpacity } from "react-native";
import Firebase , {db} from './config';
import firebase from 'firebase'


class Main extends Component {

    static navigationOptions={
      header:null
    }
    
    signout = () =>{
        Firebase.auth().signOut()
        .then(()=>{this.props.navigation.navigate('Home')});
        
    };

    ss = () =>{
      firebase.auth().onAuthStateChanged(user => {
        console.log(user.uid)
        })
    }
    
    
    render() {
      return (
        <View style={styles.container}>
          <Text>Welcome</Text>
          <TouchableOpacity onPress={this.signout}>
              <Text>2התנתק</Text>
          </TouchableOpacity>
          
      </View>
      );
    }
  }
  
  export default Main;








const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fbfbfb",
      alignItems: 'center',
      padding:40
    }
  });