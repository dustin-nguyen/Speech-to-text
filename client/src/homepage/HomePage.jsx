import "./HomePage.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, firebaseApp } from "../db/firebase";
import useSpeechToText from "react-hook-speech-to-text";
import saveTranscription from "../db/storeData";
function LandingFrameMessage(props) {
  const auth = useAuth();
  const user = auth.user;

  const navigate = useNavigate();
  console.log(user);
  //let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
  let {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });
  results.map((result)=>console.log(result.transcript))
 // console.log(result.transcript);
  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;
  return (
    <div className="Landing-Frame-Message">
      <div className="Landing-Title">
        <h1>
          Hello, <span></span>
          {user.displayName}
        </h1>
      </div>
      <br />
      <div className="Landing-description">
        <img src={user.photoURL} alt="" />
        <br />
        <button
          className="button signout"
          onClick={() => {
            auth
              .signout()
              .then(() => {
                console.log("Sign out succesful");
                navigate("/");
              })
              .catch((error) => console.error(error));
          }}
        >
          Sign out
        </button>
      </div>
      <div className="Recoding-Sectiom">
        <h1>Recording: {isRecording.toString()}</h1>
        <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
        <ul>
          {results.map((result) => (
            <li key={result.timestamp}>{result.transcript}</li>
          ))}
          {interimResult && <li>{interimResult}</li>}
        </ul>
      </div>
      <div className="Store-Button-Section">
      <button
          className="Button-Store"
          onClick={() => {
            saveTranscription(user.email,results);
            results=[];
          }}
        >
          Store Data
        </button>
      </div>
    </div>
  );
}

function LandingFrame(props) {
  return (
    <div
      className="Landing-Frame"
      style={{
        backgroundImage: "url('/images/landing-page-background.jpg')",
      }}
    >
      <LandingFrameMessage props={props} />
      <br />
    </div>
  );
}
function HomePage(props) {
  return (
    <div>
      <LandingFrame props={props} />
      <br />
    </div>
  );
}
export default HomePage;
