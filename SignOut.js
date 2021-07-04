import React, { Component } from "react";
import Firebase , {db} from './config';
import { StackActions, NavigationActions } from 'react-navigation';

class SignOut extends Component {

    componentDidMount(){
        Firebase.auth().signOut()
        .then(()=>{
            resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Home' })],
              });
              this.props.navigation.dispatch(resetAction)
        });
        
    };

    render(){
        return(
            null
        )
    }


}

export default SignOut;