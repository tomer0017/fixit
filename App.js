import React, { Component } from "react";
import { Platform, StyleSheet, Text, View,Image,TextInput,KeyboardAvoidingView,I18nManager } from "react-native";
import { BackgroundCarousel } from "./BackgroundCarousel";
import Firebase, {db} from './config'
import Login from "./LoginForm";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import HomeScreen from "./Home";
import SignUpScreen from "./SignUpScreen"
import SignInScreen from "./SignInScreen"
import Loading from "./Loading";
import SignUpCus from "./SignUpCus";
import SignUpPro from "./SignUpPro";
import Main from './main';
import SignUpPro2 from './SignUpPro2';
import  splashscreen from "./splashScreen";
import resPro from "./resPro";
import SlideBar from './SlideBar'
import Result from './Result'
import SignOut from './SignOut'
import ProfilePro from './ProfilePro'
import Request from './Request'
import Details from './Details'
import MyOrder from './MyOrder'
import MyWork from './MyWork'
import Pay from './Pay'
import PostReview from './PostReview'
import GooglePlacesInput from './temp'
import {Feather,MaterialIcons} from '@expo/vector-icons'

I18nManager.forceRTL(true);

const images = [
  "http://www.up2me.co.il/imgs/13938959.jpg",
  "http://www.up2me.co.il/imgs/60404479.jpg",
  "http://www.up2me.co.il/imgs/74169413.jpg"
  
];
import screen1 from './Screen1'
import screen2 from './Screen2'



const Draw = createDrawerNavigator({
  Screen1:{
    screen:screen1,
    navigationOptions:{
      title:"דף ראשי",
      drawerIcon: ({tintColor}) => <Feather name="home" size={16} color={tintColor} />,
      
    }
  },
  Screen2:{
    screen:Details,
    navigationOptions:{
      title:"הפרטים שלי",
      drawerIcon: ({tintColor}) => <Feather name="user" size={16} color={tintColor} />
    }
  },
  Screen3:{
    screen:MyOrder,
    navigationOptions:{
      title:"ההזמנות שלי",
      drawerIcon: ({tintColor}) => <Feather name="inbox" size={16} color={tintColor} />
    }
  },
  Screen4:{
    screen:SignOut,
    navigationOptions:{
      title:"התנתק",
      drawerIcon: ({tintColor}) => <Feather name="log-out" size={16} color={tintColor} />
    }
  },
},
{
  contentComponent: props=><SlideBar {...props} />,
  hideStatusBar:true,

  contentOptions:{
    activeBackgroundColor:"rgba(212,118,207,0.2)",
    activeTintColor:"#531159",
    itemsContainerStyle:{
      marginTop:16,
      marginHorizontal:8
    },
    itemStyle:{
      borderRadius:4
    }
    }
  
}

)

const Draw2 = createDrawerNavigator({
  Screen1:{
    screen:screen1,
    navigationOptions:{
      title:"דף ראשי",
      drawerIcon: ({tintColor}) => <Feather name="home" size={16} color={tintColor} />,
      
    }
  },
  Screen2:{
    screen:Details,
    navigationOptions:{
      title:"הפרטים שלי",
      drawerIcon: ({tintColor}) => <Feather name="user" size={16} color={tintColor} />
    }
  },
  Screen3:{
    screen:MyOrder,
    navigationOptions:{
      title:"ההזמנות שלי",
      drawerIcon: ({tintColor}) => <Feather name="inbox" size={16} color={tintColor} />
    }
  },
  Screen4:{
    screen:MyWork,
    navigationOptions:{
      title:"העבודות שלי",
      drawerIcon: ({tintColor}) => <Feather name="inbox" size={16} color={tintColor} />
    }
  },
  Screen5:{
    screen:SignOut,
    navigationOptions:{
      title:"התנתק",
      drawerIcon: ({tintColor}) => <Feather name="log-out" size={16} color={tintColor} />
    }
  },
},
{
  contentComponent: props=><SlideBar {...props} />,
  hideStatusBar:true,

  contentOptions:{
    activeBackgroundColor:"rgba(212,118,207,0.2)",
    activeTintColor:"#531159",
    itemsContainerStyle:{
      marginTop:16,
      marginHorizontal:8
    },
    itemStyle:{
      borderRadius:4
    }
    }
  
}

)


const RootStack = createStackNavigator({
    splash:{screen:splashscreen},
    Home:{screen:HomeScreen},
    SignIn:{screen:SignInScreen},
    SignUpCus:{screen:SignUpCus},
    SignUpPro2:{screen:SignUpPro2},
    Result:{screen:Result},
    ProfilePro:{screen:ProfilePro},
    Request:{screen:Request},
    Pay:{screen:Pay},
    PostReview:{screen:PostReview},
    draw:{screen:Draw,
          navigationOptions:{header:null}
         },
    draw2:{screen:Draw2,
          navigationOptions:{header:null}
         },
});

const App = createAppContainer(RootStack);

export default App;






const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbfbfb",
  },
  logo: {
    alignItems: 'center',
    flexGrow:1,
    padding:50
  },
});