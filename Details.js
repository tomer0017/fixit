import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import DatePicker from "react-native-datepicker";
import DateTimePicker from "react-native-modal-datetime-picker";
import * as ImagePicker from "expo-image-picker";
import Firebase, { db, storage } from "./config";
import { SearchBar,Header } from 'react-native-elements'
import uuid from "uuid";
import slidebar from './SlideBar'
import { StackActions, NavigationActions } from 'react-navigation';


class Details extends React.Component {
  static navigationOptions = {
    title: "נותני שירות",
    headerTitleStyle: { flex: 1, textAlign: "center" },
    headerRight: <View />,
  };
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      date: "",
      pcolor: "#C7C7CD",
      image: "http://www.up2me.co.il/imgs/9827160.png",
      name: "",
      last: "",
      phone: "",
      email: "",
      adress: "",
      loadImage: false,
      changePic:false,
      errorsArry: [
        "name",
        "last",
        "phone",
        "email",
        "adress",
        "date",
        "image",
      ],
      errors: {
        name: "שם פרטי",
        Cname: false,
        lname: "שם משפחה",
        Clname: false,
        phone: "טלפון נייד",
        Cphone: false,
        Cphon2: false,
        email: "כתובת מייל",
        Cemail: false,
        Ceail2: false,
        adress: "כתובת",
        Cadress: false,
        date: "תאריך לידה",
        Cdate: false,
        Cimage: false,
      },
    };
  }

  componentDidMount(){
    console.log("Details componentDidMount");
    var user = Firebase.auth().currentUser
    let cityRef = db.collection('users').doc(user.uid);
                let getDoc = cityRef.get()
                .then(doc => {
                    if (!doc.exists) {
                    console.log('No such document!');
                    } else {
                    this.setState({name:doc.data().name})
                    this.setState({last:doc.data().last})
                    this.setState({phone:doc.data().phone})
                    this.setState({date:doc.data().date})
                    this.setState({email:doc.data().email})
                    this.setState({adress:doc.data().adress})
                    this.setState({image:doc.data().image})
                    }
                })
                .catch(err => {
                    console.log('Error getting document', err);
                });
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
    if (this.state.date == "") {
      this.validate("date");
    }
  };

  handleDatePicked = (date2) => {
    this.setState({ pcolor: "black" });
    this.setState({
      date:
        String(date2.getDate()) +
        "/" +
        String(date2.getMonth() + 1) +
        "/" +
        String(date2.getFullYear()),
    });
    var a = this.state.errors;
    a.date = this.state.date;
    this.setState({ errors: a });
    this.validate("date");
    this.hideDateTimePicker();
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
      var a = this.state.errors;
      a.Cimage = false;
      this.setState({ errors: a });
      this.setState({changePic:true})
    } else {
      var a = this.state.errors;
      a.Cimage = true;
      this.setState({ errors: a });
    }
  };



  validate = (val) => {
    switch (val) {
      case "name":
        if (this.state.name == "") {
          console.log("dddd");
          var a = this.state.errors;
          a.name = "הכנס שם פרטי";
          a.Cname = true;
          this.setState({ errors: a });
        } else {
          var a = this.state.errors;
          a.Cname = false;
          this.setState({ errors: a });
        }
        break;
      case "last":
        if (this.state.last == "") {
          var a = this.state.errors;
          a.lname = "הכנס שם משפחה";
          a.Clname = true;
          this.setState({ errors: a });
        } else {
          var a = this.state.errors;
          a.Clname = false;
          this.setState({ errors: a });
        }
        break;
      case "phone":
        if (this.state.phone == "") {
          var a = this.state.errors;
          a.phone = "הכנס טלפון נייד";
          a.Cphone = true;
          a.Cphone2 = false;
          this.setState({ errors: a });
        } else {
          let rjx = /^05[0-9]{8}$/;
          let isValid = rjx.test(this.state.phone);
          if (!isValid) {
            var a = this.state.errors;
            a.Cphone2 = true;
            a.Cphone = true;
            this.setState({ errors: a });
          } else {
            var a = this.state.errors;
            a.Cphone2 = false;
            a.Cphone = false;
            this.setState({ errors: a });
          }
        }
        break;
      case "email":
        if (this.state.email == "") {
          var a = this.state.errors;
          a.email = "הכנס כתובת מייל";
          a.Cemail = true;
          a.Cemail2 = false;
          this.setState({ errors: a });
        } else {
          let rjx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
          let isValid = rjx.test(this.state.email);
          if (!isValid) {
            var a = this.state.errors;
            a.Cemail2 = true;
            a.Cemail = true;
            this.setState({ errors: a });
          } else {
            var a = this.state.errors;
            a.Cemail2 = false;
            a.Cemail = false;
            this.setState({ errors: a });
          }
        }
        break;
      case "adress":
        if (this.state.adress == "") {
          var a = this.state.errors;
          a.adress = "הכנס כתובת";
          a.Cadress = true;
          this.setState({ errors: a });
        } else {
          var a = this.state.errors;
          a.Cadress = false;
          this.setState({ errors: a });
        }
        break;
      case "date":
        if (this.state.date == "") {
          var a = this.state.errors;
          a.date = "הכנס תאריך לידה";
          a.Cdate = true;
          this.setState({ pcolor: "red" });
          this.setState({ errors: a });
        } else {
          var a = this.state.errors;
          a.Cdate = false;
          this.setState({ errors: a });
        }
        break;
      case "image":
        if (this.state.image == "http://www.up2me.co.il/imgs/9827160.png") {
          var a = this.state.errors;
          a.Cimage = true;
          this.setState({ errors: a });
        } else {
          var a = this.state.errors;
          a.Cimage = false;
          this.setState({ errors: a });
        }
        break;
    }
  };



  handleSignUpPic = async () => {
    this.state.errorsArry.map((t) => {
      this.validate(t);
    });
    if (
      !(
        this.state.errors.Cname ||
        this.state.errors.Clname ||
        this.state.errors.Cemail ||
        this.state.errors.Cemail2 ||
        this.state.errors.Cphone ||
        this.state.errors.Cphon2 ||
        this.state.errors.Cadress ||
        this.state.errors.Cdate ||
        this.state.errors.Cimage
      )
    ) {
      this.setState({ loadImage: true });
      const response = await fetch(this.state.image);
      const blob = await response.blob();
      var uploadTask = Firebase.storage()
        .ref()
        .child("image/" + this.state.email)
        .put(blob);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          console.log("snapshop"+snapshot.state)
          switch (snapshot.state) {
            case 'paused': // or 'paused'
              console.log("Upload is paused");
              break;
            case 'running': // or 'running'
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
            this.setState({ image: downloadURL });
            console.log("File available at", downloadURL);
            var user = Firebase.auth().currentUser
                db.collection("users")
                  .doc(user.uid)
                  .update({
                    name: this.state.name,
                    last: this.state.last,
                    phone: this.state.phone,
                    email: this.state.email,
                    adress: this.state.adress,
                    date: this.state.date,
                    image: this.state.image,
                  })
                  .then(() => {
                    console.log("Document successfully written!");
                    resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'draw' })],
                      });
                      this.props.navigation.dispatch(resetAction)
                  })
                  .catch(function (error) {
                    console.error("Error writing document: ", error);
                  });
          });
        }
      );
    }
  };

  handleSignUp = async () => {
    this.state.errorsArry.map((t) => {
      this.validate(t);
    });
    if (
      !(
        this.state.errors.Cname ||
        this.state.errors.Clname ||
        this.state.errors.Cemail ||
        this.state.errors.Cemail2 ||
        this.state.errors.Cphone ||
        this.state.errors.Cphon2 ||
        this.state.errors.Cadress ||
        this.state.errors.Cdate ||
        this.state.errors.Cimage
      )
    ) {
      this.setState({ loadImage: true });
      var user = Firebase.auth().currentUser
                db.collection("users")
                  .doc(user.uid)
                  .update({
                    name: this.state.name,
                    last: this.state.last,
                    phone: this.state.phone,
                    email: this.state.email,
                    adress: this.state.adress,
                    date: this.state.date
                  })
                  .then(() => {
                    console.log("Document successfully written!");
                    resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'draw' })],
                      });
                      this.props.navigation.dispatch(resetAction)
                  })
                  .catch(function (error) {
                    console.error("Error writing document: ", error);
                  });
    }
  };



  render() {
    console.log("Details render");
    return (
        <View>
            <Header
            leftComponent={{ icon: 'menu', color: '#fff',onPress:this.props.navigation.openDrawer}}
            centerComponent={{ text: 'FixIt', style: { color: '#fff' } }}
            //containerStyle={{backgroundColor:'#540863'}}
            backgroundImage={{uri:'http://www.up2me.co.il/imgs/18553701.jpg'}}
          />
      <ScrollView>
        <KeyboardAvoidingView behavior="position">
          {this.state.loadImage ? (
            <ActivityIndicator
              size="large"
              color="#540863"
              style={{ alignItems: "center" }}
            />
          ) : (
            <View style={{ alignItems: "center", flex: 1 }}>
              <Text style={styles.logo}>
                כדי שנוכל להכניס אותכם ל-FixIt אנא מלאו את הפרטים הבאים:
              </Text>
              <TouchableOpacity onPress={this._pickImage}>
                <Image
                  style={{ width: 100, height: 100, resizeMode: "stretch" }}
                  source={{ uri: this.state.image }}
                />
              </TouchableOpacity>
              {this.state.errors.Cimage ? (
                <Text style={{ fontSize: 10, color: "red", lineHeight: 10 }}>
                  יש לבחור תמונה
                </Text>
              ) : null}
              <View>
                <Text style={styles.logo2}>
                  *העלו תמונת פנים ברורה-כדי שיוכלו לזהות אתכם
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    placeholder={this.state.errors.name}
                    placeholderTextColor={
                      this.state.errors.Cname ? "red" : "#d3d3d3"
                    }
                    onBlur={this.validate.bind(this, "name")}
                    style={
                      this.state.errors.Cname
                        ? styles.textInputError
                        : styles.textInput
                    }
                    onChangeText={(name) => this.setState({ name })}
                    value={this.state.name}
                  />
                  <TextInput
                    placeholder={this.state.errors.lname}
                    placeholderTextColor={
                      this.state.errors.Clname ? "red" : "#d3d3d3"
                    }
                    onBlur={this.validate.bind(this, "last")}
                    style={
                      this.state.errors.Clname
                        ? styles.textInputError
                        : styles.textInput
                    }
                    onChangeText={(last) => this.setState({ last })}
                    value={this.state.last}
                  />
                </View>
                <TextInput
                  placeholder={this.state.errors.phone}
                  placeholderTextColor={
                    this.state.errors.Cphone ? "red" : "#d3d3d3"
                  }
                  onBlur={this.validate.bind(this, "phone")}
                  style={
                    this.state.errors.Cphone
                      ? styles.textInput2Error
                      : styles.textInput2
                  }
                  keyboardType="phone-pad"
                  onChangeText={(phone) => this.setState({ phone })}
                  value={this.state.phone}
                />
                {this.state.errors.Cphone2 ? (
                  <Text
                    style={{
                      fontSize: 10,
                      color: "red",
                      marginLeft: 10,
                      lineHeight: 10,
                    }}
                  >
                    מספר פאלפון לא תקין
                  </Text>
                ) : null}
                <TextInput
                  placeholder={this.state.errors.email}
                  placeholderTextColor={
                    this.state.errors.Cemail ? "red" : "#d3d3d3"
                  }
                  onBlur={this.validate.bind(this, "email")}
                  style={
                    this.state.errors.Cemail
                      ? styles.textInput2Error
                      : styles.textInput2
                  }
                  keyboardType="email-address"
                  onChangeText={(email) => this.setState({ email })}
                  value={this.state.email}
                />
                {this.state.errors.Cemail2 ? (
                  <Text
                    style={{
                      fontSize: 10,
                      color: "red",
                      marginLeft: 10,
                      lineHeight: 10,
                    }}
                  >
                    כתובת מייל לא תקינה
                  </Text>
                ) : null}
                <TextInput
                  placeholder={this.state.errors.adress}
                  placeholderTextColor={
                    this.state.errors.Cadress ? "red" : "#d3d3d3"
                  }
                  onBlur={this.validate.bind(this, "adress")}
                  style={
                    this.state.errors.Cadress
                      ? styles.textInput2Error
                      : styles.textInput2
                  }
                  onChangeText={(adress) => this.setState({ adress })}
                  value={this.state.adress}
                />
                <TouchableOpacity onPress={this.showDateTimePicker}>
                  <TextInput
                    placeholder={this.state.errors.date}
                    editable={false}
                    style={
                      this.state.errors.Cdate
                        ? styles.textInput2Error
                        : styles.textInput2
                    }
                    placeholderTextColor={this.state.pcolor}
                    onChangeText={(date) => this.setState({ date })}
                    value={this.state.date}
                  />
                </TouchableOpacity>
                <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this.handleDatePicked}
                  onCancel={this.hideDateTimePicker}
                />
                <View style={{ alignItems:'center' }}>
                  <TouchableOpacity
                    style={styles.LogInButton}
                    onPress={this.state.changePic ? this.handleSignUpPic : this.handleSignUp} 
                  >
                    <Text
                      style={{
                        color: "white",
                        padding: 12,
                        fontWeight: "500",
                        fontSize: 18,
                      }}
                    >
                      עדכן/י
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </KeyboardAvoidingView>
      </ScrollView>
      </View>
    );
  }
}

export default Details;

const styles = StyleSheet.create({
  logo: {
    padding: 20,
    width: 250,
    color: "#5d0a98",
    fontSize: 15,
    textAlign: "center",
  },
  logo2: {
    padding: 10,
    width: 250,
    color: "#5d0a98",
    fontSize: 10,
    textAlign: "center",
  },
  LogInButton: {
    alignItems: "center",
    backgroundColor: "black",
    height: 50,
    width: 180,
    borderRadius: 7,
    margin: 2,
  },
  textInput: {
    width: 150,
    height: 50,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    textAlign: "right",
    margin: 10,
  },
  textInput2: {
    width: 320,
    height: 50,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    textAlign: "right",
    margin: 10,
  },
  textInputError: {
    width: 150,
    height: 50,
    borderBottomColor: "red",
    borderBottomWidth: 1,
    textAlign: "right",
    margin: 10,
  },
  textInput2Error: {
    width: 320,
    height: 50,
    borderBottomColor: "red",
    borderBottomWidth: 1,
    textAlign: "right",
    margin: 10,
  },
  er: {
    textAlign: "right",
    color: "#5d0a98",
    fontSize: 10,
  },
});
