import firebaseApp from "./firebase.js";
import 'firebase/firestore';

const saveTranscription = (userGmail,textInput) => {
    const saveToFirebase = firebaseApp.firestore();
    saveToFirebase.collection("transcription").add({
      email: userGmail,
      text: textInput
    });
    console.log("User"+userGmail+" store successful")
  };

export default saveTranscription;