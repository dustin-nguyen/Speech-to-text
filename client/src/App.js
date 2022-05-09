
import React from "react";
//import './App.css';

import {  Route, Routes,HashRouter } from "react-router-dom";
import Header from "./common/Header";
import HomePage from "./homepage/HomePage";
import AboutPage from "./aboutpage/AboutPage";
import { ProvideAuth } from "./db/firebase";


import WelcomePage from "./welcomepage/WelcomePage";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api",{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }})
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);
  


  //console.log(user);
  return ( <ProvideAuth>
    <HashRouter>
      <Header />
      <p>{!data ? "Loading..." : data}</p>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/#/home" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </HashRouter>
    </ProvideAuth>
  );
}

export default App;
