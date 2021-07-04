import React, { Component } from "react";
import { Platform, StyleSheet, Text, View,Image,TextInput,TouchableOpacity,ScrollView,ActivityIndicator } from "react-native";
import {DrawerNavigatorItems} from 'react-navigation-drawer'
import {Ioniconst} from '@expo/vector-icons'
import Firebase , {db} from './config'
import { SearchBar,Header,Overlay,AirbnbRating,Rating } from 'react-native-elements'
import { StackActions, NavigationActions } from 'react-navigation';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";



class PostReview extends React.Component 
{ 
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            time:0,
            prefo:0,
            price:0,
            text:""
        };
      }

      static navigationOptions={
        headerTitleStyle: { flex: 1, textAlign: 'center'},
        headerRight: (<View />),
        headerBackground: (
            <Image
              source={{ uri: 'http://www.up2me.co.il/imgs/18553701.jpg' }}
              style={{width:undefined,padding:40}}
            />
          )
      }

rating=()=>{
  console.log("rating")
  db.collection("users").doc(this.props.navigation.getParam('getUid')).get().then(doc=>{
    db.collection("users").doc(this.props.navigation.getParam('getUid')).update({
      rev:doc.data().rev+1,
      prof:doc.data().prof+this.state.prefo,
      price:doc.data().price+this.state.price,
      arrive:doc.data().arrive+this.state.time
  })
  
  db.collection("users").doc(this.props.navigation.getParam('postUid')).get().then(doc=>{
    console.log("dssfds")
    db.collection("reviews").add({
      avg:(this.state.prefo+this.state.price+this.state.time)/3,
      prof:this.state.prefo,
      price:this.state.price,
      arrive:this.state.time,
      date:String(new Date().getDate()) +
      "/" +
      String(new Date().getMonth() + 1) +
      "/" +
      String(new Date().getFullYear()),
      name:doc.data().name+" "+doc.data().last,
      city:doc.data().adress,
      uidGet:this.props.navigation.getParam('getUid'),
      uidPost:this.props.navigation.getParam('postUid'),
      text:this.state.text
  })
  db.collection("request").doc(this.props.navigation.getParam('order')).update({
    review:true
})
  this.props.navigation.state.params.onGoBack()
  this.props.navigation.goBack()
  })
})


// this.props.navigation.state.params.onGoBack()
// this.props.navigation.goBack()


}


ratingCompleted=(rating)=> {
  this.setState({time:rating})
}

ratingCompleted2=(rating)=> {
  this.setState({prefo:rating})
}

ratingCompleted3=(rating)=> {
  this.setState({price:rating})
}

      
render()
{
    console.log("MyOrder render")
    return(
        
            <View style={styles.container}>
                
                    <Text style={{fontSize:25,marginTop:10}}>חוות דעת</Text>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{marginTop:19,fontSize:15}}>הגיע בזמין</Text>
                    <AirbnbRating onFinishRating={this.ratingCompleted} isDisabled={false} reviews={[]} size={15} defaultRating={0} reviewSize={0} starContainerStyle={{marginLeft:10}}></AirbnbRating>
                    </View>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{marginTop:19,fontSize:15}}>מקצועיות</Text>
                    <AirbnbRating onFinishRating={this.ratingCompleted2} isDisabled={false} reviews={[]} size={15} defaultRating={0} reviewSize={0} starContainerStyle={{marginLeft:10}}></AirbnbRating>
                    </View>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{marginTop:19,fontSize:15}}>מחיר הוגן</Text>
                    <AirbnbRating onFinishRating={this.ratingCompleted3} isDisabled={false} reviews={[]} size={15} defaultRating={0} reviewSize={0} starContainerStyle={{marginLeft:10}}></AirbnbRating>
                    </View>
                    <TextInput
              multiline={true}
              onChangeText={(text) => this.setState({ text })}
              style={{
                width: 320,
                height: 100,
                borderWidth: 1,
                borderColor:"#540863",
                textAlign: "right",
                marginTop: 10,
                textAlignVertical: "top",
              }}
              placeholder="תאר את השירות שקיבלת"
            />
                    <TouchableOpacity
          style={{
            marginTop: 20,
            width: 80,
            height: 50,
            backgroundColor: "black",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
            marginTop: 100,
          }}
          onPress={this.rating}
        >
          <Text style={{ color: "white" }}>דרג</Text>
        </TouchableOpacity>
                    
        </View>
    )

}

}
export default PostReview;

const styles = StyleSheet.create({
container: {
  backgroundColor: "#f4f5f6",
  padding:20,
  alignItems:'center',
  flex:1
},
order:{
    margin: 8,
    width:360,
    borderColor:'#fbfbfb',
    backgroundColor:"#FFFFFF",
    borderWidth:0.5,
    borderRadius:8,
    elevation:1,
    justifyContent:'space-around'
}
});