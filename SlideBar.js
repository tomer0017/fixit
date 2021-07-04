import React, { Component } from "react";
import { Platform, StyleSheet, Text, View,Image,TextInput,KeyboardAvoidingView,ScrollView,ImageBackground } from "react-native";
import {DrawerNavigatorItems} from 'react-navigation-drawer'
import {Ioniconst} from '@expo/vector-icons'
import Firebase, {db} from './config'


class Sidebar extends React.Component 
{ 
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
        fullName:null,
        pic:null
        };
      }

      componentDidMount(){
          console.log("SlideBar componentDidMount")
          this._isMounted=true
          this.ss();
      }


      ss = () =>{
        var user = Firebase.auth().currentUser
            console.log("SlideBar onAuthStateChanged")
            if(user!=null){
                let cityRef = db.collection('users').doc(user.uid);
                let getDoc = cityRef.get()
                .then(doc => {
                    if (!doc.exists) {
                    console.log('No such document!');
                    } else {
                    this.setState({fullName:doc.data().name+" "+doc.data().last})
                    this.setState({pic:doc.data().image})
                    }
                })
                .catch(err => {
                    console.log('Error getting document', err);
                });
            }
          
      }
    render()
    {
        console.log("SlideBar render")
        return(
            <ScrollView>
                <ImageBackground
                    source={{uri:'http://www.up2me.co.il/imgs/18553701.jpg'}}
                    style={{width:undefined,padding:16,paddingTop:48}}
                >
                    <Image 
                        source={{uri:this.state.pic}}
                        style={{width:80,height:80,borderRadius:40,borderWidth:3,borderColor:"#FFF"}}
                    />
                    <Text style={styles.name}>{this.state.fullName}</Text>
                </ImageBackground>
                <View style={styles.container}>
                    <DrawerNavigatorItems {...this.props}/>
                </View>
            </ScrollView>
        )
    }
}
export default Sidebar;

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    name:{
        color:"#FFF",
        fontSize:20,
        fontWeight:"800",
        marginVertical:8,
        paddingRight:10
    }
});