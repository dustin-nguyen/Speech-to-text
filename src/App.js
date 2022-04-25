import logo from './logo.svg';
import React from 'react';
import './App.css';

function Header(props){
  console.log(props);
  return(
    <header>
      <h1>Speech to Text</h1>
    </header>  
  );
}
function Header2(props){
  console.log(props.userName);
  return(
    <h2>
      Welcome {props.userName}
    </h2>
  );
}
function App() {
  return (
    <div className="App">
      <Header/>
      <Header2 userName="Duc"/>
    </div>
  );
}

export default App;
