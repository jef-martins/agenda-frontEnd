import './site/Agendamento';
import React from 'react';
import logo from './logo.jpg';
import Agendamento from './site/Agendamento';


function App() {
  return (
    <div className="App">
      <div className="container centro">
        <div className="border border-5">
          <img className="tamanho-img" src={logo} alt=''/>
          <Agendamento/>
        </div>
      </div>
    </div>
  );
}

export default App;
