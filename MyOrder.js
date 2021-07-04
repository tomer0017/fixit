import React, { Component } from "react";
import { Platform, StyleSheet, Text, View,Image,TextInput,TouchableOpacity,ScrollView,ActivityIndicator,RefreshControl } from "react-native";
import {DrawerNavigatorItems} from 'react-navigation-drawer'
import { EvilIcons } from '@expo/vector-icons'; 
import Firebase , {db} from './config'
import { SearchBar,Header,Overlay } from 'react-native-elements'
import { StackActions, NavigationActions } from 'react-navigation';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";


class MyOrder extends React.Component 
{ 
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            order:[],
            loading:true,
            c:false,
            user:[],
            lay:false,
            lay2:false,
            lay3:false,
            some_order:null,
            refreshing:false
        };
      }

      componentDidMount(){
        console.log("MyOrder componentDidMount")
        this.setState({order:[]})
        var user = Firebase.auth().currentUser
        db.collection("request").where("postUid","==",user.uid)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                    var a=this.state.order
                    a.push(doc.data())
                    this.setState({order:a})
                
            });
            if(this.state.order.length==0)
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
    }

    profile = (temp) =>{
        console.log("profile")
        db.collection("users").where("uid", "==",temp)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var a = doc.data()
          this.props.navigation.navigate('ProfilePro',a)
        });
    })
    }

    dinie = (order) =>{
        db.collection("request").doc(order.order).update({
            status:"בוטל"
        })
        // resetAction = StackActions.reset({
        //   index: 0,
        //   actions: [NavigationActions.navigate({ routeName: 'draw' })],
        // });
        // this.props.navigation.dispatch(resetAction)
        this.setState({lay:false})
        this.setState({ loading: true });
        this.componentDidMount()
        
    }

    some =(order)=>{
        this.setState({some_order:order})
        this.setState({lay:true})
    }

    some2 =(order)=>{
        this.setState({some_order:order})
        this.setState({lay2:true})
    }

    some3 = async (order)=>{
        await this.setState({some_order:order})
        this.props.navigation.navigate("Pay",{order:this.state.some_order.order,onGoBack:this.componentDidMount.bind(this)})
    }

    _onRefresh =()=>{
      this.setState({ loading: true });
      this.setState({refreshing: true});
      this.componentDidMount()
      this.setState({refreshing: false});
    
    
    }

      orderRender = () =>{
        return this.state.order.map((t,index) =>{
            var flag=true
            if(t.rev==0)
            {
                flag=false
            }
            return(
                <View style={styles.order} key={index}>
                    <TouchableOpacity onPress={
              t.status == "ממתין לאישור"
                ? () => this.some(t)
                : t.status == "מאושר" ? () => this.some2(t)
                : t.status == "ממתין לתשלום" ? () => this.some3(t) 
                : !t.review && t.status=="שולם" ? ()=>this.props.navigation.navigate("PostReview",{order:t.order,postUid:t.postUid,getUid:t.getUid,onGoBack:this.componentDidMount.bind(this)}) : null
            }>
                {this.state.some_order!=null ?
                <Overlay
        overlayStyle={{ alignItems: "center" }}
        isVisible={this.state.lay}
        height="auto"
      >
        <Text
          style={{
            textAlign: "center",
            marginTop: 50,
            height: 100,
            color: "#5d0a98",
            fontSize: 20,
          }}
        >
          ברצונך לבטל את ההזמנה?
        </Text>
        
        <View style={{justifyContent:'center',flexDirection:'row',marginTop:50}}>
            <TouchableOpacity onPress={()=>this.dinie(this.state.some_order)} style={{margin:20}}>
                <Text style={{fontSize:20}}>
                   כן
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.setState({lay:false})} style={{margin:20}}>
                <Text style={{fontSize:20,color:'red'}}>
                    לא
                </Text>
            </TouchableOpacity>
        </View>
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
          onPress={() => this.setState({ lay: false })}
        >
          <Text style={{ color: "white" }}>סיום</Text>
        </TouchableOpacity>
      </Overlay>
      :
      null
        }
        {this.state.some_order!=null ?
    <Overlay
        overlayStyle={{ alignItems: "center" }}
        isVisible={this.state.lay2}
        height="auto"
      >
        <Text
          style={{
            textAlign: "center",
            marginTop: 50,
            height: 100,
            color: "#5d0a98",
            fontSize: 20,
          }}
        >
          בעל המקצוע לא {"\n"} הזין את התשלום {"\n"} הדרוש
        </Text>
        
        
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
          onPress={() => this.setState({ lay2: false })}
        >
          <Text style={{ color: "white" }}>סגור</Text>
        </TouchableOpacity>
      </Overlay>
      :
      null
        }
        {this.state.some_order!=null ?
    <Overlay
        overlayStyle={{ alignItems: "center" ,height:300}}
        isVisible={this.state.lay3}
        height="auto"
        
      >
        <Text
          style={{
            textAlign: "center",
            marginTop: 50,
            height: 100,
            color: "#5d0a98",
            fontSize: 20,
          }}
        >
         בצע תשלום
        </Text>
        <CreditCardInput labels={{ number: "מספר כרטים", expiry: "תפוגה", cvc: "CVC/CCV" }} onChange={this._onChange} />
        
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
          onPress={() => this.setState({ lay3: false })}
        >
          <Text style={{ color: "white" }}>סגור</Text>
        </TouchableOpacity>
      </Overlay>
      :
      null
        }
                    <View>
                    <Text style={{marginTop:5,marginLeft:5,fontWeight:'300',color: t.status=="מאושר" ? "green" : (t.status=="שולם" ? "blue" : "red")}}>{t.status}</Text>
                    {
                      t.status=="שולם" && t.review==false ?
                    
                    <Text style={{marginTop:5,marginRight:100,fontWeight:'300',color:"orange"}}>
                      <EvilIcons name="star" size={15} color="orange" />
                        לחץ כדי לתת חוות דעת
                        <EvilIcons name="star" size={15} color="orange" />
                    </Text>
                    : t.status=="שולם" && t.review==true ?
                    <Text style={{marginTop:5,marginRight:100,fontWeight:'300',color:"orange"}}>
                      <EvilIcons name="star" size={15} color="orange" />
                        חוות דעת ניתנה
                        <EvilIcons name="star" size={15} color="orange" />
                    </Text>
                    : null
                    }
                    <Text>מספר הזמנה: {t.order}</Text>
                    <Text style={{marginTop:5,marginLeft:5,color:"#5d0a98"}}>הוזמן ב- {t.date}</Text>
                    </View>
                    <View style={{marginTop:10,marginLeft:5,flexDirection:'row',justifyContent:'center'}}>
                        {
                        t.pic.length>0 ?
                        t.pic.map(p=>{
                            console.log(p);
                            return (<Image
                            style={{ width: 100, height: 100, resizeMode: "stretch",borderWidth:0.2,borderColor:"black",margin:5 }}
                            source={{ uri:p }}
                            key={p}
                            />)
                        })
                        :
                        null
                        }
                    </View>
                    <View style={{alignItems:'center'}}>
                        <Text>תוכן ההזמנה:</Text>
                        <Text style={{marginTop:5,marginLeft:5}}>{t.text}</Text>
                    </View>
                    {
                t.price ?
                <View>
                    <Text>מחיר:  {t.price}₪</Text>
                </View>
                :
                null
            }
                    <TouchableOpacity onPress={()=>this.profile(t.getUid)} style={{marginTop:5,marginLeft:120,backgroundColor:"#5d0a98",width:120,borderRadius:4}}>
                        <Text style={{color:'white'}}>פרופיל בעל המקצוע</Text>
                    </TouchableOpacity>
                    <Text></Text>
                </TouchableOpacity>
                </View>
            )
        })
        
    }

    _onChange = form => console.log(form.valid);
      
    render()
    {
        console.log("MyOrder render")
        return(
            <View style={{flex:1}}>
                <Header
                leftComponent={{ icon: 'menu', color: '#fff',onPress:this.props.navigation.openDrawer}}
                centerComponent={{ text: 'FixIt', style: { color: '#fff' } }}
                //containerStyle={{backgroundColor:'#540863'}}
                backgroundImage={{uri:'http://www.up2me.co.il/imgs/18553701.jpg'}}
                />
                <View style={styles.container}>
                {
                    this.state.loading ?
                    <ActivityIndicator 
                        size="large" 
                        color="#540863" 
                        style={{ alignItems:'center'}}
                    />
                    :
                    <View style={{alignItems:'center'}}>
                        <ScrollView showsVerticalScrollIndicator={false}
                        refreshControl={
                          <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                          />
                        }>
                        <Text style={{fontSize:25,marginTop:10}}>ההזמנות שלי</Text>
                        {this.orderRender()}
                        {/* <CreditCardInput labels={{ number: "מספר כרטים", expiry: "תפוגה", cvc: "CVC/CCV" }} onChange={this._onChange} /> */}
                        </ScrollView>
                    </View>
                }
                </View>
            </View>
        )
    }
}
export default MyOrder;

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