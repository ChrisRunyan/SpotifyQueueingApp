import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDqOLOBFwnUPqRAVRZY2HjDKNAZ3ZqlzKU",
    authDomain: "apollo-queue-app.firebaseapp.com",
    databaseURL: "https://apollo-queue-app.firebaseio.com",
    projectId: "apollo-queue-app",
    storageBucket: "apollo-queue-app.appspot.com",
    messagingSenderId: "873661626171"
  }

const app = firebase.initializeApp(config)

export default app
export const databaseRef = app.database().ref()
export const roomRef = databaseRef.child("rooms");
export const songRef = databaseRef.child("songs");

//TODO get rooms ref && export
//TODO get songs ref && export