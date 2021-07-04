import React, { Component } from "react";
import {Platform,ActivityIndicator,ScrollView, StyleSheet, Text, View,Image,TextInput,KeyboardAvoidingView,Alert,TouchableOpacity } from "react-native";
import Firebase , {db} from './config';
import { CheckBox } from 'react-native-elements'

class SignUpPro2 extends Component {

    static navigationOptions={
        header:null
      }

      constructor(props) {
        super(props);
        this.state = {
          count:0,
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
          ],
          final:[],
          loading:false
        };
      }

      checkBox(val)
    {
      var arr=this.state.sub
      arr[val].c=!arr[val].c
      this.setState({sub:arr})
    }

    b = () => {
      var arr=this.state.final
      this.state.sub.map(t=>{
        console.log(t.c)
        if(t.c)
        {
          arr.push(t.name)
        }
      }
      )
      this.setState({final:arr})
      if(this.state.final.length>0)
      {
        this.handleSignUp()
      }
      else
      {
        Alert.alert("יש לבחור לפחות תחום התמחות אחד")
      }
    }

    upCounter = (val) => {
      if(val)
      {
        this.setState({ count:this.state.count+1 });
      }
      else
      {
        this.setState({ count:this.state.count-1 });
      }
    };

    handleSignUp = () => {
      const { email, password } = {email:this.props.navigation.getParam('email'),password:this.props.navigation.getParam('password')}
      this.setState({loading:true})
      Firebase.auth()
          .createUserWithEmailAndPassword(email, password)
          .then((userInfo) =>{
            db.collection("users").doc(userInfo.user.uid).set({
              uid:userInfo.user.uid,
              name:this.props.navigation.getParam('name'),
              last:this.props.navigation.getParam('last'),
              phone:this.props.navigation.getParam('phone'),
              email:this.props.navigation.getParam('email'),
              password:this.props.navigation.getParam('password'),
              adress:this.props.navigation.getParam('place'),
              lat:this.props.navigation.getParam('lat'),
              lng:this.props.navigation.getParam('lng'),
              date:this.props.navigation.getParam('date'),
              image:this.props.navigation.getParam('image'),
              Professions:this.state.final,
              kind:'p',
              rev:0,
              price:0,
              arrive:0,
              prof:0
            })
            .then(()=> {
              console.log("Document successfully written!");
              this.props.navigation.navigate("draw2")
          })
          .catch(function(error) {
            console.error("Error writing document: ", error);
        });
        })
          .catch(error => console.log(error))
  };


      renderSub = () => {
          return this.state.sub.map(t => {
              return(
                <TouchableOpacity key={t.name} onPress={() => {if(this.state.count<3||t.c){this.checkBox(t.id);this.upCounter(t.c);}}} style={styles.CheckBox}>
                <Image 
                style={{ width:40, height: 40,resizeMode: 'stretch' }}
                source={{uri:t.uri}} />
                <View >
                  <Text>{t.name}</Text>
                </View>
                <CheckBox
                  checked={t.c}
                  onPress={() => { }}
                />
              </TouchableOpacity>
              )
          })
      }


    render() {
      console.log("SignUpPro2 render")
        return (
          <View style={styles.container}>
              {this.state.loading ?
              <ActivityIndicator
              size="large"
              color="#540863"
              style={{ alignItems: "center" }}
            />
            :
                
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.logo} >בחר תחומי התמחות </Text>
                    <Text style={styles.logo2} >*ניתן לבחור 3 תחומים </Text>
                    {this.renderSub()}
                     <TouchableOpacity style={styles.LogInButton}  onPress={this.b} >
                        <Text style={{color:'white',padding:12,fontWeight:'500',fontSize:18}}>סיום</Text>
                    </TouchableOpacity> 
                </ScrollView>
      
            }
            </View>
        );
    }


}

export default SignUpPro2;

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#fbfbfb",
      alignItems: 'center',
      marginTop:10,
      flex:1
    },
    logo: {
      padding:20,
      width:250,
      color:'#5d0a98',
      fontSize:15,
      textAlign:'center'
    },
    logo2: {
      width:250,
      color:'#5d0a98',
      fontSize:10,
      textAlign:'center'
    },
    LogInButton:{
      alignItems:'center',
      backgroundColor:'black',
       height:50,
       width:325,
       borderRadius:7,
  
    },
    CheckBox:{
        margin: 2,
        width:325,
        height:50,
        borderColor:'black',
        borderRadius:8,
        overflow:'hidden',
        borderWidth:0.5,
        justifyContent:'space-between'
        ,paddingLeft:10,
        flexDirection:'row',
        alignItems:'center'
    }
  });