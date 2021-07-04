import React from 'react'
import { View,Image, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from 'firebase'
import { Permissions } from 'expo-permissions';


export default class Loading extends React.Component {
    state = {
        hasCameraPermission: null
       };
        componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
        this.props.navigation.navigate(user ? 'SignUp' : 'Home')
        })
      }
  render() {
    return (
      <View style={styles.container}>
        <Image
                style={{ width:350, height: 600,resizeMode: 'stretch' }}
                source={{uri: 'http://www.up2me.co.il/imgs/34561200.jpg'}}
            />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})