import React from 'react';
import Logo from '../componentes/logo';
import '../App.css';
import '../bootstrap.css';
import {Link} from 'react-router-dom';

function App(props) {
  return (
      <div>
        <Logo/>
        <Link to="/" type="button" className="btn btn-outline-danger">Agendamento</Link>
      </div>
  );
}

export default App;
