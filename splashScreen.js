import React, { Component } from "react";
import { AppRegistry,ImageBackground, StyleSheet, Text, View,Image , Alert} from "react-native";
import firebase from 'firebase'
import { Permissions } from 'expo-permissions';
import { StackActions, NavigationActions } from 'react-navigation';
import Firebase , {db} from './config'

export default class splashscreen extends Component {


    _isMounted = false;
    static navigationOptions={
        header:null
      }
    state = {
        hasCameraPermission: null
       };
       
       createTwoButtonAlert = () =>{

        Alert.alert(
          "יש לאשר את ההרשמה דרך המייל",
          [
            {
              text: "סגור",
              onPress: ()=>this.props.navigation.navigate("Home"),
            }
          ],
          { cancelable: false }
        )

       }
       

      componentDidMount() {
        this._isMounted=true
            firebase.auth().onAuthStateChanged(user => {
                if(this._isMounted){
                console.log("Splash onAuthStateChanged")
                if(user!=null)
                {
                  if (!user.emailVerified) {
                    resetAction = StackActions.reset({
                      index: 0,
                      actions: [NavigationActions.navigate({ routeName: 'Home' })],
                    });
                    this.props.navigation.dispatch(resetAction)
                    
                  }
                  else{
                var docRef = db.collection("users").doc(user.uid).get().then(x=>{
                  var kind=x.data().kind
                  
                resetAction = StackActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate(user ? (kind=="c" ? { routeName: 'draw' } : { routeName: 'draw2' } ): { routeName: 'Home' })],
                });
                this.props.navigation.dispatch(resetAction)
                this._isMounted=false
              });
              }
            }
              else
              {
                resetAction = StackActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({ routeName: 'Home' })],
                });
                this.props.navigation.dispatch(resetAction)
              }
                }
                })
         }
    render(){
        console.log("Splash render")
        return(
        <View>
            {/* <Image source={'http://www.up2me.co.il/imgs/34561200.jpg'} style={{width: '100%', height: '100%'}}>
  
  </Image> */}


  
  <Image
                style={{ width: '100%', height: '100%',resizeMode: 'stretch' }}
                source={{uri: 'http://www.up2me.co.il/imgs/91848199.jpg'}}
            />
        </View>
        );
    }
}


const styles = StyleSheet.create({
    logo: {
      padding:20,
      width:250,
      color:'#5d0a98',
      fontSize:15,
      textAlign:'center'
    },
  });