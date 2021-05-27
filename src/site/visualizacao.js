import React from 'react';
import Header from '../componentes/header';
import '../App.css';
import '../bootstrap.css';
import {Link} from 'react-router-dom';

function App(props) {
  return (
      <div>
        <Header/>
        <Link to="/" type="button" className="btn btn-outline-danger">Agendamento</Link>
      </div>
  );
}

export default App;
