import React from 'react';
import { Alert, Text, View,Image, TextInput, Dimensions, Animated,Button,TouchableOpacity,StyleSheet,ActivityIndicator } from 'react-native';
import {db} from './config';
import Firebase  from './config';


class DetailsScreen extends React.Component {
  static navigationOptions={
    title:'התחברות FixIt',
    headerTitleStyle: { flex: 1, textAlign: 'center'},
    headerRight: (<View />)
    
 }
 
  state={
     email:'',
     password:'',
     loading:false
   };

   userNameChange = val=>{
     this.setState({
    username:val
     });
   };

   handleSubmit = async () => {
    const { email, password } = this.state
    try{
        this.setState({loading:true})
        Firebase.auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(()=>{
              var user = Firebase.auth().currentUser
              var docRef = db.collection("users").doc(user.uid).get().then(x=>{
                var kind=x.data().kind
                this.props.navigation.navigate(kind=="p" ? 'draw2' : 'draw')})
              })
              
              
            .catch(() =>{Alert.alert("אימייל או סיסמא לא נכונים"),this.setState({loading:false})} )
    }
    catch
    {
      Alert.alert("אימייל או סיסמא לא נכונים")
    }
  };

 
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        {
        this.state.loading ?
        <ActivityIndicator
            size="large"
            color="#540863"
            style={{ alignItems: "center" }}
          />
      :
      <View>
        <Text style={styles.logo} >כדי שנוכל להכניס אותכם ל-FixIt אנא מלאו את הפרטים הבאים: </Text>
        <View style={{padding:20}}>
          <TextInput style={styles.textInput} value={this.state.username} onChangeText={email => this.setState({ email })} placeholder="אימייל"/>
          <TextInput style={styles.textInput} onChangeText={password => this.setState({ password })} secureTextEntry={true} placeholder="סיסמא" />
          <Text/>
          <TouchableOpacity style={styles.LogInButton}  onPress={this.handleSubmit} >
                    <Text style={{color:'white',padding:12,fontWeight:'500',fontSize:18}}>התחבר</Text>
          </TouchableOpacity>
        </View>
        </View>
  }
      </View>
      
    );
  }
}

export default DetailsScreen;



const styles = StyleSheet.create({
  logo: {
    padding:20,
    width:250,
    color:'#5d0a98',
    fontSize:15,
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
    width:300,
    height:50,
    borderEndColor:'black',
    borderWidth:0.5,
    margin:10,
    alignItems:'center',
    paddingRight:6,
    textAlign:'right'
    
  },
  
});
