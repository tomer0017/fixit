import React from 'react';
import { StyleSheet, Text, View,Image, ScrollView, Dimensions, TextInput,Button,TouchableOpacity,Keyboard, KeyboardAvoidingView,TouchableWithoutFeedback} from 'react-native';
import DatePicker from 'react-native-datepicker'
import DateTimePicker from "react-native-modal-datetime-picker";
import * as ImagePicker from 'expo-image-picker';
import Firebase , {db} from './config';



class SignUpCus extends React.Component { 

    static navigationOptions={
        title:'נותני שירות',
        headerTitleStyle: { flex: 1, textAlign: 'center'},
        headerRight: (<View />)
      }
      constructor(props) {
        super(props);
        this.state = {
        isDateTimePickerVisible: false,
        date:"תאריך לידה",
        pcolor:"#C7C7CD",
        image:'http://www.up2me.co.il/imgs/9827160.png',
        name: '',
        last:'',
        phone:'',
        email: '',
        password: '',
        adress:'',
        errors:{
          name:"הכנס שם"
        }
        };
      }

      

      showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
      };
     
      hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
      };
     
      handleDatePicked = date2 => {
        this.setState({ pcolor: "black" });
        this.setState({ date: String(date2.getDate())+"/"+String(date2.getMonth()+1)+"/"+String(date2.getFullYear()) });
        console.log("A date has been picked: ", date2.getDate());
        this.hideDateTimePicker();
      };

      _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          this.setState({ image: result.uri });
        }
      };

      handleSignUp = () => {
        const { email, password } = this.state
        Firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userInfo) =>{
              db.collection("users").doc(userInfo.user.uid).set({
                uid:userInfo.user.uid,
                name:this.state.name,
                last:this.state.last,
                phone:this.state.phone,
                email:this.state.email,
                password:this.state.password,
                adress:this.state.adress,
                date:this.state.date,
                image:this.state.image
              })
              .then(function() {
                console.log("Document successfully written!");
            })
            .catch(function(error) {
              console.error("Error writing document: ", error);
          });
          })
            .catch(error => console.log(error))
    };
    
    
      
    render() {
      
      return (
        <ScrollView >
          <KeyboardAvoidingView behavior="position">
            <View style={{alignItems:'center',flex:1}}>
            <Text style={styles.logo} >כדי שנוכל להכניס אותכם ל-FixIt אנא מלאו את הפרטים הבאים: </Text>
            <TouchableOpacity onPress={this._pickImage}>
            <Image
                style={{ width:100, height: 100,resizeMode: 'stretch' }}
                source={{uri: this.state.image}}
            />
            </TouchableOpacity>
            <Text style={styles.logo2} >*העלו תמונת פנים ברורה-כדי שיוכלו לזהות אתכם </Text>
            
            <View style={{flexDirection:'row'}}>
              <TextInput placeholder="שם פרטי" style={styles.textInput} onChangeText={name => this.setState({ name })}/>
              <TextInput placeholder="שם משפחה" style={styles.textInput} onChangeText={last => this.setState({ last })}/>
            </View>
            <TextInput placeholder="טלפון נייד" style={styles.textInput2} onChangeText={phone => this.setState({ phone })}/>
            <TextInput placeholder="כתובת מייל" style={styles.textInput2} onChangeText={email => this.setState({ email })}/>
            <View style={{flexDirection:'row'}}>
              <TextInput secureTextEntry={true} placeholder="סיסמא" style={styles.textInput} onChangeText={password => this.setState({ password })}/>
              <TextInput secureTextEntry={true} placeholder="סיסמא בשנית" style={styles.textInput}/>
            </View>
            <TextInput placeholder="כתובת" style={styles.textInput2} onChangeText={adress => this.setState({ adress })}/>
            <TouchableOpacity onPress={this.showDateTimePicker}>
            <TextInput placeholder={this.state.date} editable={false} style={styles.textInput2} placeholderTextColor={this.state.pcolor} onChangeText={date => this.setState({ date })} />
            </TouchableOpacity>
            <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this.handleDatePicked}
                onCancel={this.hideDateTimePicker}
              />
              <TouchableOpacity style={styles.LogInButton}  onPress={() => this.props.navigation.navigate('SignUpPro2',this.state)} >
                    <Text style={{color:'white',padding:12,fontWeight:'500',fontSize:18}}>המשך</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      );
    }
    
}

export default SignUpCus;

const styles = StyleSheet.create({
    logo: {
      padding:20,
      width:250,
      color:'#5d0a98',
      fontSize:15,
      textAlign:'center'
    },
    logo2: {
        padding:10,
        width:250,
        color:'#5d0a98',
        fontSize:10,
        textAlign:'center'
      },
    LogInButton:{
      alignItems:'center',
      backgroundColor:'black',
       height:50,
       width:350,
       borderRadius:7
  
    },
    textInput:{
        width:150,
        height:50,
        borderBottomColor:"black",
        borderBottomWidth:1,
        textAlign:'right',
        margin:10
      
    },
    textInput2:{
        width:320,
        height:50,
        borderBottomColor:"black",
        borderBottomWidth:1,
        textAlign:'right',
        margin:10
      
    },
    er:{
      
        textAlign:'right',
        color:'#5d0a98',
        fontSize:10,
    }
    
  });