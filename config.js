import firebase from 'firebase';
import firestore from 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyBxAYec8UEizvf0UH9YDJMolcf9wjZLXU4",
    authDomain: "fixitdatabase.firebaseapp.com",
    databaseURL: "https://fixitdatabase.firebaseio.com",
    projectId: "fixitdatabase",
    storageBucket: "fixitdatabase.appspot.com",
    messagingSenderId: "687984466808",
    appId: "1:687984466808:web:99375ad57f03a9b6d0c68d"
  };

let f=firebase.initializeApp(firebaseConfig);


export default f;
export const db = f.firestore();