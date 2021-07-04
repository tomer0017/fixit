import React, { Component } from "react";
import { Platform,Button, StyleSheet, Text, View,Image,TextInput,KeyboardAvoidingView,Alert,TouchableOpacity,SafeAreaView ,ScrollView} from "react-native";
import Firebase , {db} from './config';
import firebase from 'firebase'
import {FontAwesome5} from '@expo/vector-icons'
import { SearchBar,Header } from 'react-native-elements'




class Screen1 extends Component {

    
  state = {
    search: '',
    sub:[
      {id:0,name:"הנדימן",c:false,uri:'http://www.up2me.co.il/imgs/93687035.png'},
      {id:1,name:"מזגנים",c:false,uri:'http://www.up2me.co.il/imgs/64555020.png'},
      {id:2,name:"חשמלאי",c:false,uri:'http://www.up2me.co.il/imgs/34486516.png'},
      {id:3,name:"מקררים",c:false,uri:'http://www.up2me.co.il/imgs/4102597.png'},
      {id:4,name:"מחשב",c:false,uri:'http://www.up2me.co.il/imgs/34313822.png'},
      {id:5,name:"מנעולן",c:false,uri:'http://www.up2me.co.il/imgs/51693313.png'},
      {id:6,name:"שיפוצים",c:false,uri:'http://www.up2me.co.il/imgs/26307592.png'},
      {id:7,name:"צבעי",c:false,uri:'http://www.up2me.co.il/imgs/89008523.png'},
      {id:8,name:"סורגים",c:false,uri:'http://www.up2me.co.il/imgs/68019621.png'},
      {id:9,name:"מסגריות",c:false,uri:'http://www.up2me.co.il/imgs/5094375.png'},
      {id:10,name:"אזעקות",c:false,uri:'http://www.up2me.co.il/imgs/19001929.png'},
      {id:11,name:"גז",c:false,uri:'http://www.up2me.co.il/imgs/65449453.png'},
      {id:12,name:"ניקיון",c:false,uri:'http://www.up2me.co.il/imgs/95408741.png'},
      {id:13,name:"אינסטלטור",c:false,uri:'http://www.up2me.co.il/imgs/99495764.png'},
      {id:14,name:"דוד שמש",c:false,uri:'http://www.up2me.co.il/imgs/94514556.png'},
      {id:15,name:"זגגים",c:false,uri:'http://www.up2me.co.il/imgs/27989740.png'},
    ]
  };

  updateSearch = search => {
    this.setState({ search });
  };
    signout = () =>{
        Firebase.auth().signOut()
        .then(()=>{this.props.navigation.navigate('Home')});
        
    };

    ss = () =>{
      firebase.auth().onAuthStateChanged(user => {
        console.log(user.uid)
        })
    }

    renderSub = () => {
      return this.state.sub.map(t => {
          return(
            <TouchableOpacity key={t.name} onPress={()=>this.props.navigation.navigate('Result',{name:t.name})} style={styles.CheckBox}>
              <Image 
                style={{ width:40, height: 40,resizeMode: 'stretch' }}
                source={{uri:t.uri}} />
              <View >
                <Text style={{marginLeft:100}}>{t.name}</Text>
              </View>
          </TouchableOpacity>
          )
      })
  }
    
    
    render() {
      console.log("Screen1 render")
      return (
        <View style={{flex:1}}>
          <Header
            leftComponent={{ icon: 'menu', color: '#fff',onPress:this.props.navigation.openDrawer}}
            centerComponent={{ text: 'FixIt', style: { color: '#fff' } }}
            //containerStyle={{backgroundColor:'#540863'}}
            backgroundImage={{uri:'http://www.up2me.co.il/imgs/18553701.jpg'}}
          />
          
            
            
          <View style={styles.container}>
              <ScrollView showsVerticalScrollIndicator={false} style={{paddingBottom:10}}>
              <Text style={{fontSize:30}}>חיפוש קטגוריה</Text>
            <SearchBar
              platform="ios"
              searchIcon={{ size: 24,color:'#540863' }}
              onChangeText={text => this.updateSearch(text)}
              placeholder="חפש..."
              value={this.state.search}
              round={true}
              containerStyle={{marginTop:5,backgroundColor:'#f4f5f6',borderTopColor:'#f4f5f6',borderBottomColor:'#f4f5f6'}}
              inputStyle={{backgroundColor:'#fbfbfb',borderWidth:0.2}}  
            />
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <View style={{borderBottomColor:"#a3a4a3",borderBottomWidth:1,width:100,marginRight:50}}/>
              <Text style={{color:"#a3a4a3"}}>קטגוריות</Text>
              <View style={{borderBottomColor:"#a3a4a3",borderBottomWidth:1,width:100,marginLeft:50}}/>
            </View>
                {this.renderSub()} 
                {/* <TouchableOpacity style={{height:100}}>
                  <Text></Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:100}}>
                  <Text></Text>
                </TouchableOpacity> */}
              </ScrollView>
            </View>
            </View>
          
        
      );
    }
  }
  
  export default Screen1;








const styles = StyleSheet.create({
    container: {
      backgroundColor: "#f4f5f6",
      padding:20,
      alignItems:'center',
      flex:1
    },
    CheckBox:{
      margin: 6,
      width:360,
      height:60,
      borderColor:"#f4f5f6",
      borderRadius:4,
      borderWidth:0.5,
      paddingLeft:10,
      flexDirection:'row',
      alignItems:'center',
      elevation:4,
      backgroundColor:"#FFFFFF",
      
      
    },
  bar:{

  }
  });