import React, { Component } from "react";
import {
  Platform,
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Firebase, { db } from "./config";
import firebase from "firebase";
import { FontAwesome5 } from "@expo/vector-icons";
import { Rating, Header, AirbnbRating } from "react-native-elements";

class ProfilePro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      r: false,
      user: [],
      loading: true,
      rev: [],
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

  componentDidMount() {
    db.collection("users")
      .where("uid", "==", String(this.props.navigation.getParam("uid")))
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var a = this.state.user;
          a.push(doc.data());
          this.setState({ user: a });
        });

        db.collection("reviews")
          .where("uidGet", "==", String(this.props.navigation.getParam("uid")))
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.docs.length == 0) {
              this.setState({ loading: false });
              this.setState({ r: true });
            }
            querySnapshot.forEach((doc) => {
              var a = this.state.rev;
              a.push(doc.data());
              this.setState({ rev: a });
              this.setState({ loading: false });
            });
          })
          .catch(function (error) {
            console.log("Error getting documents: ", error);
          });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  reviewRender = () => {
    return this.state.rev.map((t,key) => {
      return (
        <View key={key} style={{backgroundColor:'white',margin:3}}>
          <View style={{alignItems:'flex-start'}}>
          <Text style={{marginLeft:10,marginTop:10,fontSize:15,fontWeight:'bold'}}>{t.name+", "+t.city}</Text>
          <View style={{flexDirection:'row'}}>
            <Text style={{marginTop:16,marginLeft:10,fontSize:15,fontWeight:'bold',color:"#540863"}}>{t.avg}</Text>
            <AirbnbRating
              isDisabled={true}
              reviews={[]}
              size={10}
              defaultRating={t.avg}
              reviewSize={0}
              starContainerStyle={{ marginLeft: 10 }}
            ></AirbnbRating>
          </View>
          <Text style={{marginTop:16,marginLeft:10}}>{t.text}</Text>
          </View>
          <View
            style={{ justifyContent: "space-around", flexDirection: "row",marginTop:40 }}
          >
            <Text style={{ textAlign: "center" }}>{t.arrive}{"\n"} הגיע בזמן</Text>
            <View
              style={{
                borderLeftWidth: 1,
                borderLeftColor: "#C0C0C0",
                height: 20,
                marginTop:10
              }}
            ></View>
            <Text style={{ textAlign: "center" }}>{t.prof}{"\n"} מקצועיות</Text>
            <View
              style={{
                borderLeftWidth: 1,
                borderLeftColor: "#C0C0C0",
                height: 20,
                marginTop:10
              }}
            ></View>
            <Text style={{ textAlign: "center" }}>{t.price}{"\n"} מחיר הוגן</Text>
          </View>
          <Text></Text>
        </View>
      );
    });
  };

  resultRender = () =>{
    return this.state.user.map(t =>{
        var flag=true
        if(t.rev==0)
        {
            flag=false
        }
        return(
            <TouchableOpacity  key={t.email} style={styles.result}>
                <Text 
                    style={{color:"#540863",fontSize:20,marginLeft:10,marginTop:3,lineHeight:20}}>
                    {t.name+" "+t.last}
                </Text>
                <View style={{flexDirection:'row',alignItems:'center'}} >
                    <Text style={{marginTop:20,marginLeft:10}}>{flag ?(t.prof/t.rev+t.price/t.rev+t.arrive/t.rev)/3 : 0}</Text>
                    <AirbnbRating isDisabled={true} reviews={[]} size={10} defaultRating={(t.prof/t.rev+t.price/t.rev+t.arrive/t.rev)/3} reviewSize={0} starContainerStyle={{marginLeft:10}}></AirbnbRating>
                    <Text style={{marginTop:20,marginLeft:20}}>{flag ? t.rev+" חוות דעת" : "0 חוות דעת" }</Text>
                    <Image 
                        source={{uri:t.image}}
                        style={{width:80,height:80,borderRadius:40,borderWidth:3,borderColor:"#FFF",marginLeft:45}}
                    />
                </View>
                <View style={{justifyContent:'space-around',flexDirection:'row'}}>
                    <Text style={{textAlign:'center'}}>{flag ? t.arrive/t.rev : 0}{"\n"} הגיע בזמן</Text>
                    <View style={{borderLeftWidth:1,borderLeftColor:"black",height:20}}></View>
                    <Text style={{textAlign:'center'}}>{flag ? t.prof/t.rev : 0}{"\n"} מקצועיות</Text>
                    <View style={{borderLeftWidth:1,borderLeftColor:"black",height:20}}></View>
                    <Text style={{textAlign:'center'}}>{flag ? t.price/t.rev : 0}{"\n"} מחיר הוגן</Text>
                </View>
                <TouchableOpacity>
                    <View style={{width:300,height:40, backgroundColor:"#540863",marginLeft:25,marginTop:20,alignItems:'center',borderRadius:4}}>
                        <Text style={{color:"white",textAlign:'center',fontSize:20,marginTop:5}}>{t.phone}</Text>
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    })
    
    
}

  render() {
    console.log("Profile render");
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <ActivityIndicator
            size="large"
            color="#540863"
            style={{ alignItems: "center" }}
          />
        ) : (
          <View>
            {this.resultRender()}
            <View style={styles.rev}>
              <Text style={{ margin: 8, marginLeft: 20, color: "#540863" }}>
                {this.props.navigation.getParam("rev")} חוות דעת
              </Text>
            </View>
            {this.state.r ? <Text style={{marginLeft: 20}}>אין חוות דעת</Text> : <View>{this.reviewRender()}</View>}
          </View>
        )}
      </View>
    );
  }
}
export default ProfilePro;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f4f5f6",
    padding: 20,
    flex: 1,
    alignItems: "center",
  },
  result: {
    margin: 8,
    width: 360,
    height: 225,
    borderColor: "#f4f5f6",
    backgroundColor: "#f4f5f6",
    borderWidth: 0.5,
    borderRadius: 8,
  },
  rev: {
    width: 420,
    height: 40,
    backgroundColor: "#ead3ee",
    elevation: 1,
  },
});
