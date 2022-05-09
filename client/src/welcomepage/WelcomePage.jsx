import "./WelcomePage.css";
import { Link, useNavigate } from "react-router-dom";

import {  useAuth } from "../db/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import React from "react";




function LoginButton() {
  const auth = useAuth();
  const navigate = useNavigate();

  const onLogin = () => {
    auth
      .signin()
      .then((user) => {
        console.log("Login succesful");
        navigate("/home");
      })
      .catch((error) => console.error(error));
  };
  return (

        <button className="button" onClick={onLogin}>
          <i className="fab fa-google"></i>Sign in with google
        </button>

  );
}

function LandingFrameMessage() {
  return (
    <div className="Landing-Frame-Message">
      <div className="Landing-Title">Speech to Text</div>

      <div className="Landing-description">
        Using FireBase to login and record user voice.
      </div>
      <br />
      <LoginButton />
    </div>
  );
}

function LandingFrame() {
  return (
    <div
      className="Landing-Frame"
      style={{
        backgroundImage: "url('/images/landing-page-background.jpg')",
      }}
    >
      <LandingFrameMessage />
    </div>
  );
}
function WelcomePage() {
  return (
    <div>
      <LandingFrame />
      <br />
    </div>
  );
}
export default WelcomePage;
