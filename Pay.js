import React, { Component } from "react";
import { Platform, StyleSheet, Text, View,Image,TextInput,TouchableOpacity,ScrollView,ActivityIndicator } from "react-native";
import {DrawerNavigatorItems} from 'react-navigation-drawer'
import {Ioniconst} from '@expo/vector-icons'
import Firebase , {db} from './config'
import { SearchBar,Header,Overlay } from 'react-native-elements'
import { StackActions, NavigationActions } from 'react-navigation';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";




class Pay extends React.Component 
{ 
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            credit:null
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


_onChange = form => this.setState({credit:form});
pay = async() =>{
    
        console.log(this.state.credit)
        if(this.state.credit!=null && this.state.credit.valid)
        {
        db.collection("request").doc(this.props.navigation.getParam('order')).update({
            status:"שולם"
        })
    
        // resetAction = StackActions.reset({
        //   index: 0,
        //   actions: [NavigationActions.navigate({ routeName: 'draw' })],
        // });
        // this.props.navigation.dispatch(resetAction)
        // }
        this.props.navigation.state.params.onGoBack()
        this.props.navigation.goBack()
        
     }
        
    
}

      
render()
{
    console.log("MyOrder render")
    return(
        
            <View style={styles.container}>
                
                    <Text style={{fontSize:25,marginTop:10}}>בצע תשלום</Text>
                    <View style={{ height:400}}>
                    <CreditCardInput labels={{ number: "מספר כרטים", expiry: "תפוגה", cvc: "CVC/CCV" }} onChange={this._onChange} />
                    </View>
                    <TouchableOpacity
          style={{
            width: 80,
            height: 50,
            backgroundColor: "black",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
            marginBottom:200
          }}
          onPress={()=>this.pay()}
        >
          <Text style={{ color: "white" }}>שלם/י</Text>
        </TouchableOpacity>
                    
        </View>
    )

}

}
export default Pay;

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