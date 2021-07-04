import React, { Component } from "react";
import { StyleSheet, Text, View,TouchableOpacity,Image,ActivityIndicator,ScrollView, ImageBackground,Alert} from "react-native";
import { Rating,Header,AirbnbRating } from 'react-native-elements'
import Firebase , {db,storage} from './config';
import { getDistance, getPreciseDistance } from 'geolib';

class Result extends Component {
    

    constructor(props) {
        super(props);
        this.state = {
            c:false,
            user:[],
            loading:true,
            lat:"",
            lng:""
        }
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


    componentDidMount(){
        var user = Firebase.auth().currentUser
        new Promise((resolve, reject)=>{
            db.collection("users").doc(user.uid).get().then(t=>{
            var a=[]
            a.push(t.data().lat)
            a.push(t.data().lng)
            resolve(a)
            })
        }).then(f=>{
            db.collection("users").where("kind","==","p")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    var arr=doc.data().Professions
                    var check=arr.includes(this.props.navigation.getParam('name'))
                    if(check)
                    {
                        var dis = getPreciseDistance(
                            { latitude: f[0], longitude: f[1] },
                            { latitude: doc.data().lat, longitude: doc.data().lng }
                          )
                        if(user.uid!=doc.data().uid&&(dis/1000)<=8)
                        {
                            var a=this.state.user
                            a.push(doc.data())
                            a.sort((a, b) => b.rev - a.rev);
                            this.setState({user:a})
                        }
                    }
                });
                if(this.state.user.length==0)
                {
                    this.setState({loading:false})
                }
                else
                {
                    this.setState({loading:false})
                    this.setState({c:true})
                }
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
        })
        
    }

     createTwoButtonAlert = (t) =>{
        Alert.alert(
          "בחר כדי להמשיך",
          "בפרופיל יש חוות דעת",
          [
            {
              text: "צפה בפרופיל",
              onPress: ()=>this.props.navigation.navigate('ProfilePro',t),
              
            },
            { text: "הזמן שירות", onPress: ()=>this.props.navigation.navigate('Request',t) },
            { text: "בטל", onPress: () => console.log("בטל נלחץ") , style:'cancel' }
          ],
          { cancelable: false }
        )
      }



    resultRender = () =>{
        return this.state.user.map(t =>{
            var flag=true
            if(t.rev==0)
            {
                flag=false
            }
            return(
                <TouchableOpacity onPress={this.createTwoButtonAlert.bind(this,t)} key={t.email} style={styles.result}>
                    <Text 
                        style={{color:"#540863",fontSize:20,marginLeft:10,marginTop:3,lineHeight:20}}>
                        {t.name+" "+t.last}
                    </Text>
                    <Text style={{marginLeft:10}}>{this.props.navigation.getParam('name')}</Text>
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
        console.log("Result render")
        return (
            <View style={styles.container}>
                {
                    this.state.loading ?
                    <ActivityIndicator 
                        size="large" 
                        color="#540863" 
                        style={{ alignItems:'center'}}
                    />
                    :
                    this.state.c ?
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={{textAlign:'center',fontSize:20,marginBottom:20,fontWeight:'500'}}> בעלי מקצוע {"\n"} שנמצאו</Text>
                        {this.resultRender()}
                    </ScrollView>
                    :
                    <Text>אין תוצאות</Text>
                }
            </View>
           
        );
    }
}

export default Result;

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#f4f5f6",
      padding:20,
      flex:1,
      alignItems:'center'
    },
    result:{
        margin: 8,
        width:360,
        height:225,
        borderColor:'#fbfbfb',
        backgroundColor:"#FFFFFF",
        borderWidth:0.5,
        borderRadius:8,
        elevation:1
    }
  });