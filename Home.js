import React, { Component } from "react";
import { Platform, StyleSheet, Text, View,Image,TextInput,KeyboardAvoidingView,Alert,ImageBackground } from "react-native";
import {Icon} from 'native-base';
import { BackgroundCarousel } from "./BackgroundCarousel";
import Login from "./LoginForm";
import LoginScreen from"./SignInScreen";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Permissions } from 'expo-permissions';
const images = [
  "http://www.up2me.co.il/imgs/5646963.jpg",
  "http://www.up2me.co.il/imgs/96748356.jpg",
  "http://www.up2me.co.il/imgs/65278362.jpg"
  
];



class HomeScreen extends Component {

  static navigationOptions={
    header:null
  }
  
  
  
  render() {
    return (
      <ImageBackground source={{uri:'http://www.up2me.co.il/imgs/25054379.jpg'}} style={{width: '100%', height: '100%'}}>
      <View style={styles.container}>
        <Image
              style={{ width:100, height: 100,resizeMode: 'stretch' }}
              source={{uri: 'http://www.up2me.co.il/imgs/3427446.png'}}
          />
          <Text style={{fontSize:20}}>ברוכים הבאים!</Text>
        <View style={styles.logo}>
          <Text/>
          <Text/>
          <Text/>
          <BackgroundCarousel  images={images} />
      </View>
      <Login SignUp={() => this.props.navigation.navigate('SignUpCus')} SignIn={() => this.props.navigation.navigate('SignIn')}/>
    </View>
    </ImageBackground>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fbfbfb",
      alignItems: 'center',
      padding:40
    },
    logo: {
      alignItems: 'center',
      flexGrow:1,
      padding:50,
      justifyContent:'center'
    },
  });