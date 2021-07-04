import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Linking,
  RefreshControl,
} from "react-native";
import { DrawerNavigatorItems } from "react-navigation-drawer";
import { Ioniconst } from "@expo/vector-icons";
import Firebase, { db } from "./config";
import { SearchBar, Header, Overlay } from "react-native-elements";
import { StackActions, NavigationActions } from 'react-navigation';


class MyWork extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      loading: true,
      c: false,
      user: [],
      lay: false,
      lay2:false,
      lay3:false,
      lay4:false,
      price:0,
      phone:"",
      some_order:null,
      refreshing:false
    };
  }

  componentDidMount() {
    console.log("MyOrder componentDidMount");
    this.setState({order:[]})
    var user = Firebase.auth().currentUser;
    db.collection("request")
      .where("getUid", "==", user.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
            db.collection("users").doc(doc.data().postUid).get().then(doc2=>{
                console.log("ggggggggggggggg")
                var a = this.state.order;
                var b=doc.data()
                b.phone=doc2.data().phone
                a.push(b);
                this.setState({ order: a });
            })
          
        });
        if (this.state.order.length == 0) 
        {
          this.setState({ loading: false });
        } 
        else 
        {
          var size=this.state.order.length
          var arry=[]
          for(let i=size-1;i>=0;i--)
          {
            console.log(i)
            arry.push(this.state.order[i])
          }
          this.setState({ order: arry });
          this.setState({ loading: false });
          this.setState({ c: true });
        }
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  profile = (temp) => {
    console.log("profile");
    db.collection("users")
      .where("uid", "==", temp)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var a = doc.data();
          this.props.navigation.navigate("ProfilePro", a);
        });
      });
  };

  overlayOrder = (order) => {
    return (
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
          באפשרותך לדבר עם הלקוח {"\n"} ולוודא שאתם מתואמים {"\n"} בפרטי ההזמנה
        </Text>
        <TouchableOpacity>
            <View style={{width:200,height:40, backgroundColor:"#540863",marginLeft:25,marginTop:20,alignItems:'center',borderRadius:4}}>
                <Text style={{color:"white",textAlign:'center',fontSize:20,marginTop:5}}>{order.status}</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: 20,
            width: 80,
            height: 50,
            backgroundColor: "#540863",
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
    );
  };

  agree = (order) =>{
      db.collection("request").doc(order.order).update({
          status:"מאושר"
      })
      // resetAction = StackActions.reset({
      //   index: 0,
      //   actions: [NavigationActions.navigate({ routeName: 'draw2' })],
      // });
      // this.props.navigation.dispatch(resetAction)
      this.setState({lay:false})
    this.setState({loading:true})
  this.componentDidMount()
}

dinie = (order) =>{
    db.collection("request").doc(order.order).update({
        status:"נדחה"
    })
    // resetAction = StackActions.reset({
    //   index: 0,
    //   actions: [NavigationActions.navigate({ routeName: 'draw2' })],
    // });
    // this.props.navigation.dispatch(resetAction)
    this.setState({lay:false})
    this.setState({loading:true})
  this.componentDidMount()
}

payed = (order) =>{
    this.setState({some_order:order})
    this.setState({lay2:false})
    this.setState({lay3:true})
}

credit_payed = (order) =>{
  this.setState({some_order:order})
  this.setState({lay2:false})
  this.setState({lay4:true})
}

payed2 = (order) =>{
    this.setState({some_order:order})
    db.collection("request").doc(order.order).update({
        price:this.state.price,
        status:"שולם"
    })
    // resetAction = StackActions.reset({
    //   index: 0,
    //   actions: [NavigationActions.navigate({ routeName: 'draw2' })],
    // });
    // this.props.navigation.dispatch(resetAction)
    this.setState({lay3:false})
    this.setState({loading:true})
  this.componentDidMount()
}

payed3 = (order) =>{
  this.setState({some_order:order})
  db.collection("request").doc(order.order).update({
      credit:this.state.price,
      price:this.state.price,
      status:"ממתין לתשלום"
  })
  // resetAction = StackActions.reset({
  //   index: 0,
  //   actions: [NavigationActions.navigate({ routeName: 'draw2' })],
  // });
  // this.props.navigation.dispatch(resetAction)
  this.setState({lay4:false})
  this.setState({loading:true})
  this.componentDidMount()
}

some =(order)=>{
  console.log(order.order)
  this.setState({some_order:order})
  this.setState({lay:true})
}

some2 =(order)=>{
  console.log(order.order)
  this.setState({some_order:order})
  this.setState({lay2:true})
}

_onRefresh =()=>{
  this.setState({ loading: true });
  this.setState({refreshing: true});
  this.componentDidMount()
  this.setState({refreshing: false});


}
  orderRender = () => {
    return this.state.order.map((t, index) => {
        
      var flag = true;
      if (t.rev == 0) {
        flag = false;
      }
      
      return (
          
        <View style={styles.order} key={index}>
          <TouchableOpacity
            onPress={
              t.status == "ממתין לאישור"
                ? () => {this.some(t)}
                : (t.status == "מאושר" ? () => this.some2(t) : null )
            }
          >
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
          באפשרותך לדבר עם הלקוח {"\n"} ולוודא שאתם מתואמים {"\n"} בפרטי ההזמנה
        </Text>
        <TouchableOpacity onPress={()=>Linking.openURL(`tel:${this.state.some_order.phone}`)}>
            <View style={{width:200,height:40, backgroundColor:"#540863",marginLeft:10,marginTop:20,alignItems:'center',borderRadius:4}}>
                <Text style={{color:"white",textAlign:'center',fontSize:20,marginTop:5}}>{this.state.some_order.phone}</Text>
            </View>
        </TouchableOpacity>
        <View style={{justifyContent:'center',flexDirection:'row',marginTop:50}}>
            <TouchableOpacity onPress={this.agree.bind(this,this.state.some_order)} style={{margin:20}}>
                <Text style={{fontSize:20}}>
                    קבל/י
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.dinie.bind(this,this.state.some_order)} style={{margin:20}}>
                <Text style={{fontSize:20,color:'red'}}>
                    דחה/י
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
          באפשרותך לדבר עם הלקוח {"\n"} ולוודא שאתם מתואמים {"\n"} בפרטי ההזמנה
        </Text>
        <TouchableOpacity onPress={()=>Linking.openURL(`tel:${this.state.some_order.phone}`)}>
            <View style={{width:200,height:40, backgroundColor:"#540863",marginLeft:10,marginTop:20,alignItems:'center',borderRadius:4}}>
                <Text style={{color:"white",textAlign:'center',fontSize:20,marginTop:5}}>{this.state.some_order.phone}</Text>
            </View>
        </TouchableOpacity>
        <View style={{justifyContent:'center',flexDirection:'row',marginTop:50}}>
            <TouchableOpacity onPress={()=>this.payed(this.state.some_order)} style={{margin:20}}>
                <Text style={{fontSize:20}}>
                     שולם במזומן
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.credit_payed(this.state.some_order)} style={{margin:20}}>
                <Text style={{fontSize:20}}>
                     תשלום באשראי
                </Text>
            </TouchableOpacity>
            
        </View>
        <TouchableOpacity onPress={()=>this.dinie(this.state.some_order)} style={{margin:20}}>
                <Text style={{fontSize:20,color:'red'}}>
                    דחה/י
                </Text>
            </TouchableOpacity>
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
          <Text style={{ color: "white" }}>סיום</Text>
        </TouchableOpacity>
      </Overlay>
      :
      null
        }
        {this.state.some_order!=null ?
      <Overlay
        overlayStyle={{ alignItems: "center" }}
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
          מה הסכום ששולם?
        </Text>
        <TextInput style={styles.textInput} onChangeText={price => this.setState({ price })}>
        </TextInput>
            <TouchableOpacity onPress={()=>this.payed2(this.state.some_order)} style={{margin:20}}>
                <Text style={{fontSize:20}}>
                    סיום
                </Text>
            </TouchableOpacity>
            
        
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
      : null
        }
        {this.state.some_order!=null ?
      <Overlay
        overlayStyle={{ alignItems: "center" }}
        isVisible={this.state.lay4}
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
          מה הסכום לתשלום?
        </Text>
        <TextInput style={styles.textInput} onChangeText={price => this.setState({ price })}>
        </TextInput>
            <TouchableOpacity onPress={()=>this.payed3(this.state.some_order)} style={{margin:20}}>
                <Text style={{fontSize:20}}>
                    סיום
                </Text>
            </TouchableOpacity>
            
        
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
          onPress={() => this.setState({ lay4: false })}
        >
          <Text style={{ color: "white" }}>סגור</Text>
        </TouchableOpacity>
      </Overlay>
      : null
        }
            <View>
              <Text
                style={{
                  marginTop: 5,
                  marginLeft: 5,
                  fontWeight: "300",
                  color: t.status=="מאושר" ? "green" : (t.status=="שולם" ? "blue" : "red"),
                }}
              >
                {t.status}
              </Text>
              <Text>מספר הזמנה: {t.order}</Text>
              <Text style={{ marginTop: 5, marginLeft: 5, color: "#5d0a98" }}>
                הוזמן ב- {t.date}
              </Text>
            </View>
            <View
              style={{
                marginTop: 10,
                marginLeft: 5,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {t.pic.length > 0
                ? t.pic.map((p) => {
                    console.log(p);
                    return (
                      <Image
                        style={{
                          width: 100,
                          height: 100,
                          resizeMode: "stretch",
                          borderWidth: 0.2,
                          borderColor: "black",
                          margin: 5,
                        }}
                        source={{ uri: p }}
                        key={p}
                      />
                    );
                  })
                : null}
            </View>
            <View style={{ alignItems: "center" }}>
              <Text>תוכן ההזמנה:</Text>
              <Text style={{ marginTop: 5, marginLeft: 5 }}>{t.text}</Text>
            </View>
            {
                t.price ?
                <View>
                    <Text>מחיר:  {t.price}₪</Text>
                </View>
                :
                null
            }
            
            <Text></Text>
          </TouchableOpacity>
        </View>
      );
    });
  };

  

  render() {
    console.log("MyOrder render");
    return (
      <View style={{ flex: 1 }}>
        <Header
          leftComponent={{
            icon: "menu",
            color: "#fff",
            onPress: this.props.navigation.openDrawer,
          }}
          centerComponent={{ text: "FixIt", style: { color: "#fff" } }}
          //containerStyle={{backgroundColor:'#540863'}}
          backgroundImage={{ uri: "http://www.up2me.co.il/imgs/18553701.jpg" }}
        />
        <View style={styles.container}>
          {this.state.loading ? (
            <ActivityIndicator
              size="large"
              color="#540863"
              style={{ alignItems: "center" }}
            />
          ) : (
            <View style={{ alignItems: "center" }}>
              <ScrollView showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                />
              }>
                <Text style={{ fontSize: 25, marginTop: 10 }}>העבודות שלי</Text>
                {this.orderRender()}
              </ScrollView>
            </View>
          )}
        </View>
      </View>
    );
  }
}
export default MyWork;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f4f5f6",
    padding: 20,
    alignItems: "center",
    flex: 1,
  },
  order: {
    margin: 8,
    width: 360,
    borderColor: "#fbfbfb",
    backgroundColor: "#FFFFFF",
    borderWidth: 0.5,
    borderRadius: 8,
    elevation: 1,
    justifyContent: "space-around",
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
