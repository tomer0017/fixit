import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
  Alert,
  Keyboard,
} from "react-native";
import { Rating, Header, AirbnbRating, Overlay } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import Firebase, { db, storage } from "./config";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import { StackActions, NavigationActions } from "react-navigation";

class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      pic: [],
      c: false,
      c2: false,
      img1: "",
      img2: "",
      img3: "",
      loading: false,
      finish: false,
      uidPost: "",
      resPic: [],
    };
  }

  static navigationOptions = {
    headerTitleStyle: { flex: 1, textAlign: "center" },
    headerRight: <View />,
    headerBackground: (
      <Image
        source={{ uri: "http://www.up2me.co.il/imgs/18553701.jpg" }}
        style={{ width: undefined, padding: 40 }}
      />
    ),
  };

  async componentDidMount() {
    console.log("Request componentDidMount");
    console.log(
      String(new Date().getDate()) +
        "/" +
        String(new Date().getMonth() + 1) +
        "/" +
        String(new Date().getFullYear())
    );
    var user = Firebase.auth().currentUser;
    await this.setState({ uidPost: user.uid });
  }

  handleSignUp = async () => {
    // this.setState({ loading: true });
    // db.collection("request")
    //   .add({
    //     text: this.state.text,
    //     adress: this.state.adress,
    //     getUid: this.props.navigation.getParam("uid"),
    //     postUid: this.state.uidPost,
    //     status: "ממתין לאישור",
    //     pic:
    //       "https://firebasestorage.googleapis.com/v0/b/fixitdatabase.appspot.com/o/image%2Frequst%2FxJVjs5jYOgA5IxAFrSA1%2F0?alt=media&token=df6efeff-b5c3-43e4-a189-b58a379997f8",
    //     date:
    //       String(new Date().getDate()) +
    //       "/" +
    //       String(new Date().getMonth() + 1) +
    //       "/" +
    //       String(new Date().getFullYear()),
    //   })
    //   .then(async (x) => {
    //     db.collection("request").doc(x.id).update({order:x.id})
    //     var picArr = this.state.pic;
    //     if (this.state.img1 != "") {
    //       picArr.push(this.state.img1);
    //     }
    //     if (this.state.img2 != "") {
    //       picArr.push(this.state.img2);
    //     }
    //     if (this.state.img3 != "") {
    //       picArr.push(this.state.img3);
    //     }
    //     await this.setState({ pic: picArr });
    //     const uploadAllPic= this.state.pic.map(async (t, index) => {
    //       var done = false;
    //       const response = await fetch(t);
    //       const blob = await response.blob();
    //       var uploadTask = Firebase.storage()
    //         .ref()
    //         .child("image/requst/" + x.id + "/" + String(index))
    //         .put(blob);
    //       uploadTask.on(
    //         "state_changed",
    //         (snapshot) => {
    //           // Observe state change events such as progress, pause, and resume
    //           // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //           var progress =
    //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //           console.log("Upload is " + progress + "% done");
    //           console.log("snapshop" + snapshot.state);
    //           switch (snapshot.state) {
    //             case "paused": // or 'paused'
    //               console.log("Upload is paused");
    //               break;
    //             case "running": // or 'running'
    //               console.log("Upload is running");
    //               break;
    //           }
    //         },
    //         (error) => {
    //           // Handle unsuccessful uploads
    //         },
    //         () => {
    //           // Handle successful uploads on complete
    //           // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //           uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
    //             switch (index) {
    //               case 0:
    //                 this.setState({ img1: downloadURL });
    //                 var a = this.state.resPic;
    //                 a.push(downloadURL);
    //                 this.setState({ resPic: a });
    //                 console.log("File available at 1 ", downloadURL);
    //                 return downloadURL;
    //                 break;
    //               case 1:
    //                 this.setState({ img2: downloadURL });
    //                 var a = this.state.resPic;
    //                 a.push(downloadURL);
    //                 this.setState({ resPic: a });
    //                 console.log("File available at 2 ", downloadURL);
    //                 return downloadURL;
    //                 break;
    //               case 2:
    //                 this.setState({ img3: downloadURL });
    //                 var a = this.state.resPic;
    //                 a.push(downloadURL);
    //                 this.setState({ resPic: a });
    //                 console.log("File available at 3 ", downloadURL);
    //                 return downloadURL;
    //                 break;
    //             }
    //           });
    //         }
    //       );
    //     });
    //   await Promise.all(uploadAllPic).then(result=>{
    //     console.log("jhgg")
    //   this.setState({ finish: true });
    //   this.setState({ loading: false });
    //   })
      
    //   });
    this.setState({ loading: true });
    console.log("sadsd")
    var picArr = this.state.pic;
        if (this.state.img1 != "") {
          picArr.push(this.state.img1);
        }
        if (this.state.img2 != "") {
          picArr.push(this.state.img2);
        }
        if (this.state.img3 != "") {
          picArr.push(this.state.img3);
        }
        this.setState({ pic: picArr });
        db.collection("request").add({
          text: this.state.text,
        getUid: this.props.navigation.getParam("uid"),
        postUid: this.state.uidPost,
        status: "ממתין לאישור",
        review:false,
        date:
          String(new Date().getDate()) +
          "/" +
          String(new Date().getMonth() + 1) +
          "/" +
          String(new Date().getFullYear()),
        }).then(x=>{
          db.collection("request").doc(x.id).update({order:x.id})
          const requst=this.state.pic.map((t,index)=>{
            return this.uploadImage(t,x,index)
          })
          Promise.all(requst).then(result=>{
            db.collection("request").doc(x.id).update({pic:result})
            this.setState({ loading: false });
            this.setState({ finish: true });
            console.log(result)
          })
        })
    
  };

  uploadImage= async (t,x,index)=>{
    return new  Promise(async (resolve, reject) => {
    const response = await fetch(t);
          const blob = await response.blob();
          var uploadTask = Firebase.storage()
            .ref()
            .child("image/requst/" + x.id + "/" + String(index))
            .put(blob);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              var progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              console.log("snapshop" + snapshot.state);
              switch (snapshot.state) {
                case "paused": // or 'paused'
                  console.log("Upload is paused");
                  break;
                case "running": // or 'running'
                  console.log("Upload is running");
                  break;
              }
            },
            (error) => {
              // Handle unsuccessful uploads
            },
            () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log("File available at 1 ", downloadURL);
                    resolve(downloadURL);
              });
            }
          );
      })
  }

  done = () => {
    resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "draw" })],
    });
    this.props.navigation.dispatch(resetAction);
  };

  submit = async () => {
    if (this.state.text == "") {
      await this.setState({ c: true });
    } else {
      await this.setState({ c: false });
    }
    if (!(this.state.c)) {
      this.handleSignUp();

    }
  };

  _pickImage = async (a) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      switch (a) {
        case 1:
          console.log(1);
          this.setState({ img1: result.uri });
          break;
        case 2:
          this.setState({ img2: result.uri });
          break;
        case 3:
          this.setState({ img3: result.uri });
          break;
      }
    }
  };

  render() {
    console.log("Request render");
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
            <Overlay
              overlayStyle={{ alignItems: "center" }}
              isVisible={this.state.finish}
              height="auto"
            >
              <Text
                style={{ textAlign: "center", fontSize: 30, marginTop: 50 }}
              >
                הבקשה נשלחה {"\n"} בהצלחה
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 50,
                  height: 100,
                  color: "#5d0a98",
                }}
              >
                כרגע בעל המקצוע בוחן את הבקשה {"\n"} יש להתעדכן במצב הבקשה{" "}
                {"\n"} בהזמנות ממתינות
              </Text>
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
                onPress={this.done}
              >
                <Text style={{ color: "white" }}>סיום</Text>
              </TouchableOpacity>
            </Overlay>
            <Text style={{ color: "#5d0a98" }}>
              תארו את המשימה כך שבעל המקצוע ידע אם יש ביכולותו לבצעה
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 20 }}>
              תיאור המשימה
            </Text>
            <TextInput
              multiline={true}
              onChangeText={(text) => this.setState({ text })}
              style={{
                width: 320,
                height: 100,
                borderWidth: 1,
                borderColor: this.state.c ? "red" : "#540863",
                textAlign: "right",
                marginTop: 10,
                textAlignVertical: "top",
              }}
            />
            {this.state.c ? (
              <Text style={{ color: "red" }}>שדה חובה*</Text>
            ) : null}
            <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 20 }}>
              הוספת תמונות
            </Text>
            <Text style={{ color: "#5d0a98", fontSize: 10 }}>
              ניתן להוסיף עד 3 תמונות
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity
                onPress={this._pickImage.bind(this, 1)}
                style={this.state.img1 == "" ? styles.img : { borderRadius: 8 }}
              >
                {this.state.img1 == "" ? (
                  <Text style={{ fontSize: 50 }}>+</Text>
                ) : (
                  <View>
                    <ImageBackground
                      style={[styles.img, { resizeMode: "stretch" }]}
                      source={{ uri: this.state.img1 }}
                    >
                      <View
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          marginTop: 80,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => this.setState({ img1: "" })}
                        >
                          <AntDesign name="delete" size={16} />
                        </TouchableOpacity>
                      </View>
                    </ImageBackground>
                  </View>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this._pickImage.bind(this, 2)}
                style={this.state.img2 == "" ? styles.img : { borderRadius: 8 }}
              >
                {this.state.img2 == "" ? (
                  <Text style={{ fontSize: 50 }}>+</Text>
                ) : (
                  <View>
                    <ImageBackground
                      style={[styles.img, { resizeMode: "stretch" }]}
                      source={{ uri: this.state.img2 }}
                    >
                      <View
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          marginTop: 80,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => this.setState({ img2: "" })}
                        >
                          <AntDesign name="delete" size={16} />
                        </TouchableOpacity>
                      </View>
                    </ImageBackground>
                  </View>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this._pickImage.bind(this, 3)}
                style={this.state.img3 == "" ? styles.img : { borderRadius: 8 }}
              >
                {this.state.img3 == "" ? (
                  <Text style={{ fontSize: 50 }}>+</Text>
                ) : (
                  <View>
                    <ImageBackground
                      style={[styles.img, { resizeMode: "stretch" }]}
                      source={{ uri: this.state.img3 }}
                    >
                      <View
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          marginTop: 80,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => this.setState({ img3: "" })}
                        >
                          <AntDesign name="delete" size={16} />
                        </TouchableOpacity>
                      </View>
                    </ImageBackground>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                onPress={this.submit}
                style={{
                  marginTop: 20,
                  width: 80,
                  height: 50,
                  backgroundColor: "#540863",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: "white" }}>סיום</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default Request;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f4f5f6",
    padding: 20,
    flex: 1,
  },
  img: {
    marginTop: 20,
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: "#540863",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});
